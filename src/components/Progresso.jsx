import { useRef, useState } from 'react'
import { recomendacao } from '../data/plano.js'
import { hoje, deISO, paraISO, formatarData, exportar } from '../storage.js'

const DIA_MS = 86400000

function media(lista) {
  return lista.length ? lista.reduce((n, x) => n + x.peso, 0) / lista.length : null
}

function Grafico({ pontos }) {
  if (pontos.length < 2) return <p className="sutil">Registre pelo menos 2 pesagens para ver o gráfico.</p>
  const L = 320, A = 140, P = 28
  const xs = pontos.map((p) => deISO(p.data).getTime())
  const ys = pontos.map((p) => p.peso)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys) - 0.5, maxY = Math.max(...ys) + 0.5
  const x = (v) => P + ((v - minX) / (maxX - minX || 1)) * (L - P * 1.5)
  const y = (v) => A - P + -((v - minY) / (maxY - minY || 1)) * (A - P * 1.6)
  const linha = pontos.map((p, i) => `${x(xs[i])},${y(p.peso)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${L} ${A}`} className="grafico" role="img" aria-label="Evolução do peso">
      <text x={4} y={y(maxY - 0.5) + 4} className="eixo">{(maxY - 0.5).toFixed(1)}</text>
      <text x={4} y={y(minY + 0.5) + 4} className="eixo">{(minY + 0.5).toFixed(1)}</text>
      <line x1={P} x2={L - P / 2} y1={y(minY + 0.5)} y2={y(minY + 0.5)} className="guia" />
      <line x1={P} x2={L - P / 2} y1={y(maxY - 0.5)} y2={y(maxY - 0.5)} className="guia" />
      <polyline points={linha} className="linha" />
      {pontos.map((p, i) => (
        <circle key={p.data} cx={x(xs[i])} cy={y(p.peso)} r="3.5" className="ponto">
          <title>{`${formatarData(p.data)}: ${p.peso} kg`}</title>
        </circle>
      ))}
      <text x={P} y={A - 6} className="eixo">{formatarData(pontos[0].data)}</text>
      <text x={L - P / 2} y={A - 6} className="eixo" textAnchor="end">{formatarData(pontos[pontos.length - 1].data)}</text>
    </svg>
  )
}

export default function Progresso({ pessoa, dados, setDados }) {
  const [data, setData] = useState(hoje())
  const [peso, setPeso] = useState('')
  const arquivo = useRef(null)

  const pesos = [...(dados.pesos[pessoa.id] || [])].sort((a, b) => (a.data < b.data ? -1 : 1))

  function salvar(e) {
    e.preventDefault()
    const v = parseFloat(String(peso).replace(',', '.'))
    if (!v || v < 30 || v > 250) return
    setDados((d) => {
      const lista = (d.pesos[pessoa.id] || []).filter((p) => p.data !== data)
      return { ...d, pesos: { ...d.pesos, [pessoa.id]: [...lista, { data, peso: v }] } }
    })
    setPeso('')
  }

  function remover(dataRemover) {
    setDados((d) => ({
      ...d,
      pesos: { ...d.pesos, [pessoa.id]: (d.pesos[pessoa.id] || []).filter((p) => p.data !== dataRemover) },
    }))
  }

  function importar(ev) {
    const f = ev.target.files?.[0]
    if (!f) return
    const leitor = new FileReader()
    leitor.onload = () => {
      try {
        const json = JSON.parse(leitor.result)
        if (json && typeof json === 'object' && 'sessoes' in json) setDados({ sessoes: {}, refeicoes: {}, pesos: {}, ...json })
      } catch {
        alert('Arquivo de backup inválido.')
      }
    }
    leitor.readAsText(f)
    ev.target.value = ''
  }

  // Variação semanal: média dos últimos 7 dias vs. média dos 7 dias anteriores
  let variacao = null
  if (pesos.length) {
    const fim = deISO(pesos[pesos.length - 1].data).getTime()
    const semana1 = pesos.filter((p) => fim - deISO(p.data).getTime() < 7 * DIA_MS)
    const semana2 = pesos.filter((p) => {
      const dt = fim - deISO(p.data).getTime()
      return dt >= 7 * DIA_MS && dt < 14 * DIA_MS
    })
    if (semana1.length && semana2.length) variacao = media(semana1) - media(semana2)
  }
  const rec = recomendacao(pessoa.id, variacao)
  const atual = pesos.length ? pesos[pesos.length - 1].peso : null
  const total = atual != null ? atual - pessoa.pesoInicial : null

  // Treinos concluídos nas últimas 4 semanas
  const limite = paraISO(new Date(Date.now() - 28 * DIA_MS))
  const concluidos = Object.entries(dados.sessoes[pessoa.id] || {}).filter(([d, s]) => d >= limite && s.concluido).length
  const esperado = pessoa.treinos.length * 4

  return (
    <div className="pilha">
      <section className="cartao">
        <h2>Peso {pessoa.id === 'joao' ? 'do João' : 'da Gabi'}</h2>
        <p className="sutil">De manhã, em jejum, depois do banheiro, 3 vezes por semana. Vale a média da semana, não o dia.</p>
        <form className="form-peso" onSubmit={salvar}>
          <input type="date" value={data} onChange={(e) => setData(e.target.value || hoje())} aria-label="Data" />
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            placeholder="Peso (kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            aria-label="Peso em kg"
          />
          <button className="btn btn-principal" type="submit">Salvar</button>
        </form>

        <div className="metricas">
          <div><strong>{atual != null ? `${atual} kg` : '—'}</strong><span>atual</span></div>
          <div>
            <strong>{total != null ? `${total > 0 ? '+' : ''}${total.toFixed(1)} kg` : '—'}</strong>
            <span>desde {pessoa.pesoInicial} kg</span>
          </div>
          <div>
            <strong>{variacao != null ? `${variacao > 0 ? '+' : ''}${variacao.toFixed(2)}` : '—'}</strong>
            <span>kg/semana</span>
          </div>
        </div>

        <Grafico pontos={pesos} />

        <div className={`recomendacao ${rec?.nivel || ''}`}>
          <strong>Ajuste de calorias</strong>
          <p>{rec ? rec.texto : 'Registre o peso por 2 semanas para ver a recomendação.'}</p>
          <p className="sutil pequeno">Meta: {pessoa.metas.ritmo}. Refaçam os cálculos quando o peso mudar 4–5 kg.</p>
        </div>
      </section>

      <section className="cartao">
        <h2>Constância</h2>
        <p>
          <strong>{concluidos}</strong> de ~{esperado} treinos concluídos nas últimas 4 semanas.
        </p>
        <div className="barra"><div style={{ width: `${Math.min(100, (concluidos / esperado) * 100)}%` }} /></div>
        <p className="sutil pequeno">Fotos e medidas (cintura, quadril, braço, coxa) a cada 4 semanas, com a mesma luz e roupa.</p>
      </section>

      {pesos.length > 0 && (
        <section className="cartao">
          <h2>Histórico</h2>
          <ul className="historico">
            {[...pesos].reverse().map((p) => (
              <li key={p.data}>
                <span>{formatarData(p.data)}</span>
                <strong>{p.peso} kg</strong>
                <button className="btn-link" onClick={() => remover(p.data)} aria-label={`Remover ${p.data}`}>remover</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="cartao">
        <h2>Backup</h2>
        <p className="sutil">Os dados ficam só neste navegador. Exporte para guardar ou passar para outro celular.</p>
        <div className="botoes">
          <button className="btn" onClick={() => exportar(dados)}>Exportar backup</button>
          <button className="btn" onClick={() => arquivo.current?.click()}>Importar backup</button>
          <input ref={arquivo} type="file" accept="application/json" hidden onChange={importar} />
        </div>
      </section>
    </div>
  )
}
