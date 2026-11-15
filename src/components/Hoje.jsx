import { useState } from 'react'
import { DIAS, TREINOS, CARDAPIO } from '../data/plano.js'
import { hoje, deISO } from '../storage.js'
import SessaoTreino from './SessaoTreino.jsx'

const ROTULOS = {
  danca: 'Dia de dança',
  skate: 'Dia de skate',
  descanso: 'Descanso',
  cardio: 'Cardio leve',
}

export default function Hoje({ pessoa, dados, setDados, irPara }) {
  const [data, setData] = useState(hoje())
  const diaSemana = deISO(data).getDay()
  const plano = pessoa.semana[diaSemana]
  const sessaoSalva = dados.sessoes[pessoa.id]?.[data]
  const [escolhido, setEscolhido] = useState(null)

  const treinoId = escolhido || sessaoSalva?.treino || (plano.tipo === 'treino' ? plano.treino : null)

  const refeicoesHoje = dados.refeicoes[pessoa.id]?.[data] || {}
  const marcadas = CARDAPIO.filter((_, i) => refeicoesHoje[i])
  const kcal = marcadas.reduce((n, r) => n + r[pessoa.id].kcal, 0)
  const prot = marcadas.reduce((n, r) => n + r[pessoa.id].prot, 0)

  return (
    <div className="pilha">
      <section className="cartao destaque">
        <div className="linha-data">
          <div>
            <p className="sutil">{DIAS[diaSemana]}</p>
            <h1>{plano.tipo === 'treino' ? TREINOS[plano.treino].nome : plano.titulo}</h1>
            {plano.tipo !== 'treino' && <p className="sutil">{ROTULOS[plano.tipo]}</p>}
            {plano.semanaEspetaculo && <p className="aviso-mini">{plano.semanaEspetaculo}</p>}
          </div>
          <input
            type="date"
            className="campo-data"
            value={data}
            onChange={(e) => {
              setData(e.target.value || hoje())
              setEscolhido(null)
            }}
            aria-label="Data"
          />
        </div>

        <label className="trocar">
          <span>{treinoId ? 'Trocar treino:' : 'Quer treinar hoje?'}</span>
          <select value={treinoId || ''} onChange={(e) => setEscolhido(e.target.value || null)}>
            <option value="">{treinoId ? '—' : 'Escolha um treino'}</option>
            {pessoa.treinos.map((t) => (
              <option key={t} value={t}>
                {TREINOS[t].nome} — {TREINOS[t].foco}
              </option>
            ))}
          </select>
        </label>
      </section>

      {pessoa.avisos.map((a) => (
        <div key={a} className="aviso">{a}</div>
      ))}

      {treinoId && (
        <SessaoTreino
          key={`${data}-${treinoId}`}
          pessoa={pessoa}
          data={data}
          treinoId={treinoId}
          dados={dados}
          setDados={setDados}
        />
      )}

      <section className="cartao">
        <div className="cartao-topo">
          <h2>Alimentação de hoje</h2>
          <button className="btn-link" onClick={() => irPara('cardapio')}>Abrir cardápio</button>
        </div>
        <div className="metricas">
          <div><strong>{kcal}</strong><span>kcal de {pessoa.metas.kcal}</span></div>
          <div><strong>{prot} g</strong><span>proteína de {pessoa.metas.proteina}</span></div>
          <div><strong>{marcadas.length}/{CARDAPIO.length}</strong><span>refeições</span></div>
        </div>
      </section>
    </div>
  )
}
