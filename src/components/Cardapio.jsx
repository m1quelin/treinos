import { CARDAPIO, TROCAS, DICAS } from '../data/plano.js'
import { hoje } from '../storage.js'

export default function Cardapio({ pessoa, dados, setDados }) {
  const data = hoje()
  const marcadas = dados.refeicoes[pessoa.id]?.[data] || {}
  const outro = pessoa.id === 'joao' ? 'gabi' : 'joao'

  function alternar(i) {
    setDados((d) => {
      const doPessoa = { ...(d.refeicoes[pessoa.id] || {}) }
      doPessoa[data] = { ...(doPessoa[data] || {}), [i]: !doPessoa[data]?.[i] }
      return { ...d, refeicoes: { ...d.refeicoes, [pessoa.id]: doPessoa } }
    })
  }

  const planoKcal = CARDAPIO.reduce((n, r) => n + (r[pessoa.id].opcional ? 0 : r[pessoa.id].kcal), 0)
  const planoProt = CARDAPIO.reduce((n, r) => n + (r[pessoa.id].opcional ? 0 : r[pessoa.id].prot), 0)
  const kcal = CARDAPIO.reduce((n, r, i) => n + (marcadas[i] ? r[pessoa.id].kcal : 0), 0)
  const prot = CARDAPIO.reduce((n, r, i) => n + (marcadas[i] ? r[pessoa.id].prot : 0), 0)

  const m = pessoa.metas

  return (
    <div className="pilha">
      <section className="cartao">
        <h2>Metas diárias {pessoa.id === 'joao' ? 'do João' : 'da Gabi'}</h2>
        <div className="metas">
          <div><span>Calorias</span><strong>{m.kcal}</strong></div>
          <div><span>Proteína</span><strong>{m.proteina}</strong></div>
          <div><span>Gordura</span><strong>{m.gordura}</strong></div>
          <div><span>Carboidrato</span><strong>{m.carbo}</strong></div>
          <div><span>Água</span><strong>{m.agua}</strong></div>
          <div><span>Ritmo</span><strong>{m.ritmo}</strong></div>
        </div>
      </section>

      <section className="cartao">
        <div className="cartao-topo">
          <div>
            <h2>Cardápio de hoje</h2>
            <p className="sutil">Mesma comida para os dois, porções diferentes. Marque o que comeu.</p>
          </div>
        </div>
        <div className="barra-wrap">
          <div className="barra-rotulo">
            <span>{kcal} / ~{planoKcal} kcal</span>
            <span>{prot} / ~{planoProt} g prot</span>
          </div>
          <div className="barra"><div style={{ width: `${Math.min(100, (kcal / planoKcal) * 100)}%` }} /></div>
        </div>

        <ul className="refeicoes">
          {CARDAPIO.map((r, i) => {
            const p = r[pessoa.id]
            return (
              <li key={r.refeicao} className={`refeicao ${marcadas[i] ? 'feita' : ''}`}>
                <label>
                  <input type="checkbox" checked={!!marcadas[i]} onChange={() => alternar(i)} />
                  <div>
                    <div className="ref-cabeca">
                      <strong>{r.refeicao}</strong>
                      <span className="sutil">~{p.kcal} kcal · {p.prot} g prot</span>
                    </div>
                    <p>{p.texto}</p>
                    <p className="sutil pequeno">
                      Base: {r.base}. {outro === 'gabi' ? 'Gabi' : 'João'}: {r[outro].texto.toLowerCase()}.
                    </p>
                  </div>
                </label>
              </li>
            )
          })}
        </ul>
        <p className="sutil pequeno">Valores aproximados. Um app como FatSecret ou MyFitnessPal ajuda a conferir nas primeiras semanas.</p>
      </section>

      <section className="cartao">
        <h2>Trocas que mantêm o plano</h2>
        <ul className="lista">{TROCAS.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <section className="cartao">
        <h2>Dicas práticas</h2>
        <ul className="lista">{DICAS.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>
    </div>
  )
}
