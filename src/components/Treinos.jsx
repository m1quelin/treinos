import { TREINOS, DIAS } from '../data/plano.js'

export default function Treinos({ pessoa }) {
  const diasDoTreino = (id) =>
    pessoa.semana.map((s, i) => (s.treino === id ? DIAS[i] : null)).filter(Boolean).join(', ')

  return (
    <div className="pilha">
      <section className="cartao">
        <h2>Treinos {pessoa.id === 'joao' ? 'do João' : 'da Gabi'}</h2>
        <p className="sutil">{pessoa.dicaTreino}</p>
        <p className="sutil">
          <strong>Progressão:</strong> quando bater o topo da faixa de repetições em todas as séries, aumente a carga
          (2–5%) e volte para a base da faixa. O app avisa com o selo “Suba a carga”.
        </p>
      </section>

      {pessoa.avisos.map((a) => (
        <div key={a} className="aviso">{a}</div>
      ))}

      {pessoa.treinos.map((id) => {
        const t = TREINOS[id]
        return (
          <section key={id} className="cartao">
            <div className="cartao-topo">
              <div>
                <h2>{t.nome}</h2>
                <p className="sutil">{t.foco}</p>
              </div>
              <span className="etiqueta">{diasDoTreino(id)}</span>
            </div>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Exercício</th>
                  <th>Séries × reps</th>
                </tr>
              </thead>
              <tbody>
                {t.exercicios.map((e) => (
                  <tr key={e.nome}>
                    <td>{e.nome}</td>
                    <td className="nowrap">{e.series > 1 ? `${e.series} × ` : ''}{e.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      })}

      {pessoa.evitar && (
        <section className="cartao">
          <h2>O que evitar por enquanto</h2>
          <p className="sutil">Só retome com liberação do fisioterapeuta.</p>
          <ul className="lista">
            {pessoa.evitar.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="sutil">No domingo, a caminhada de 30–40 min é o melhor cardio extra: queima gordura sem impacto na coluna.</p>
        </section>
      )}
    </div>
  )
}
