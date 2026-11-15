import { TREINOS } from '../data/plano.js'
import { formatarData } from '../storage.js'

// Procura o registro mais recente deste exercício antes da data atual
function ultimoRegistro(sessoesPessoa, data, treinoId, nomeEx) {
  const datas = Object.keys(sessoesPessoa || {})
    .filter((d) => d < data && sessoesPessoa[d].treino === treinoId)
    .sort()
    .reverse()
  for (const d of datas) {
    const r = sessoesPessoa[d].ex?.[nomeEx]
    if (r && (r.carga || r.reps?.some(Boolean))) return { data: d, ...r }
  }
  return null
}

function deveSubir(exercicio, registro) {
  if (!registro || exercicio.tipo) return false
  const reps = (registro.reps || []).slice(0, exercicio.series)
  return reps.length === exercicio.series && reps.every((r) => Number(r) >= exercicio.max)
}

export default function SessaoTreino({ pessoa, data, treinoId, dados, setDados }) {
  const treino = TREINOS[treinoId]
  const sessoesPessoa = dados.sessoes[pessoa.id] || {}
  const sessao = sessoesPessoa[data]?.treino === treinoId ? sessoesPessoa[data] : { treino: treinoId, ex: {} }

  function atualizar(fn) {
    setDados((d) => {
      const doPessoa = { ...(d.sessoes[pessoa.id] || {}) }
      const atual = doPessoa[data]?.treino === treinoId ? doPessoa[data] : { treino: treinoId, ex: {} }
      doPessoa[data] = fn({ ...atual, ex: { ...atual.ex } })
      return { ...d, sessoes: { ...d.sessoes, [pessoa.id]: doPessoa } }
    })
  }

  function setCampo(nomeEx, campo, valor, i) {
    atualizar((s) => {
      const reg = { carga: '', reps: [], feitos: [], ...(s.ex[nomeEx] || {}) }
      if (campo === 'carga') reg.carga = valor
      else {
        const lista = [...(reg[campo] || [])]
        lista[i] = valor
        reg[campo] = lista
      }
      s.ex[nomeEx] = reg
      return s
    })
  }

  const totalSeries = treino.exercicios.reduce((n, e) => n + e.series, 0)
  const feitas = treino.exercicios.reduce((n, e) => {
    const r = sessao.ex[e.nome]
    if (!r) return n
    if (e.tipo) return n + (r.feitos || []).filter(Boolean).length
    return n + (r.reps || []).slice(0, e.series).filter((x) => x !== '' && x != null).length
  }, 0)
  const pct = Math.round((feitas / totalSeries) * 100)

  return (
    <section className="cartao">
      <div className="cartao-topo">
        <div>
          <h2>{treino.nome}</h2>
          <p className="sutil">{treino.foco}</p>
        </div>
        <div className="progresso-anel" style={{ '--pct': pct }} aria-label={`${pct}% das séries`}>
          <span>{pct}%</span>
        </div>
      </div>

      <ol className="exercicios">
        {treino.exercicios.map((e) => {
          const reg = sessao.ex[e.nome] || {}
          const ultimo = ultimoRegistro(sessoesPessoa, data, treinoId, e.nome)
          const subir = deveSubir(e, ultimo)
          return (
            <li key={e.nome} className="exercicio">
              <div className="ex-cabeca">
                <div>
                  <strong>{e.nome}</strong>
                  <span className="sutil"> · {e.series > 1 ? `${e.series} × ` : ''}{e.reps}</span>
                </div>
                {subir && <span className="selo">Suba a carga</span>}
              </div>

              {ultimo && !e.tipo && (
                <p className="ultimo">
                  Última vez ({formatarData(ultimo.data)}): {ultimo.carga ? `${ultimo.carga} kg · ` : ''}
                  {(ultimo.reps || []).filter(Boolean).join(' / ') || '—'} reps
                </p>
              )}

              {e.tipo ? (
                <div className="series">
                  {Array.from({ length: e.series }).map((_, i) => (
                    <label key={i} className={`check-serie ${reg.feitos?.[i] ? 'feito' : ''}`}>
                      <input
                        type="checkbox"
                        checked={!!reg.feitos?.[i]}
                        onChange={(ev) => setCampo(e.nome, 'feitos', ev.target.checked, i)}
                      />
                      {e.series > 1 ? `Série ${i + 1}` : 'Feito'}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="series">
                  <label className="campo-carga">
                    <span>kg</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.5"
                      placeholder={ultimo?.carga || '0'}
                      value={reg.carga ?? ''}
                      onChange={(ev) => setCampo(e.nome, 'carga', ev.target.value)}
                    />
                  </label>
                  {Array.from({ length: e.series }).map((_, i) => (
                    <label key={i} className="campo-reps">
                      <span>S{i + 1}</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder={String(e.max)}
                        value={reg.reps?.[i] ?? ''}
                        onChange={(ev) => setCampo(e.nome, 'reps', ev.target.value, i)}
                      />
                    </label>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <button
        className={`btn ${sessao.concluido ? 'btn-ok' : 'btn-principal'}`}
        onClick={() => atualizar((s) => ({ ...s, concluido: !s.concluido }))}
      >
        {sessao.concluido ? '✓ Treino concluído' : 'Concluir treino'}
      </button>
      <p className="dica">{pessoa.dicaTreino}</p>
    </section>
  )
}
