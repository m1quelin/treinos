import { DIAS, PESSOAS, TREINOS } from '../data/plano.js'

function descricao(item) {
  if (item.tipo === 'treino') return { titulo: TREINOS[item.treino].nome, sub: TREINOS[item.treino].foco }
  return { titulo: item.titulo, sub: '' }
}

export default function Semana({ pessoaId }) {
  const diaAtual = new Date().getDay()
  // segunda a domingo
  const ordem = [1, 2, 3, 4, 5, 6, 0]

  return (
    <div className="pilha">
      <section className="cartao">
        <h2>Semana do casal</h2>
        <p className="sutil">
          A Gabi treina nos dias sem dança, e o João alterna superior e inferior para cada músculo trabalhar 3 vezes
          por semana. Terça, quinta e sexta dá para irem juntos.
        </p>
      </section>

      <div className="semana">
        <div className="semana-linha semana-cabeca">
          <span>Dia</span>
          <span className={pessoaId === 'joao' ? 'col-ativa' : ''}>João</span>
          <span className={pessoaId === 'gabi' ? 'col-ativa' : ''}>Gabi</span>
        </div>
        {ordem.map((d) => {
          const j = descricao(PESSOAS.joao.semana[d])
          const g = descricao(PESSOAS.gabi.semana[d])
          const tj = PESSOAS.joao.semana[d].tipo
          const tg = PESSOAS.gabi.semana[d].tipo
          return (
            <div key={d} className={`semana-linha ${d === diaAtual ? 'hoje' : ''}`}>
              <span className="semana-dia">{DIAS[d]}</span>
              <span className={`celula tipo-${tj}`}>
                <strong>{j.titulo}</strong>
                {j.sub && <small>{j.sub}</small>}
              </span>
              <span className={`celula tipo-${tg}`}>
                <strong>{g.titulo}</strong>
                {g.sub && <small>{g.sub}</small>}
              </span>
            </div>
          )
        })}
      </div>

      <section className="cartao">
        <p className="sutil">
          Semana de espetáculo (dança 4x): a Gabi tira o Treino B e mantém A e C. O skate do João fica de
          preferência longe do Inferior A. A cada 6–8 semanas, ou depois de uma temporada de espetáculos, façam
          uma semana leve com metade das séries.
        </p>
      </section>
    </div>
  )
}
