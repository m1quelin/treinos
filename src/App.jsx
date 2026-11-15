import { useEffect, useState } from 'react'
import { PESSOAS } from './data/plano.js'
import { useDados } from './storage.js'
import Hoje from './components/Hoje.jsx'
import Semana from './components/Semana.jsx'
import Treinos from './components/Treinos.jsx'
import Cardapio from './components/Cardapio.jsx'
import Progresso from './components/Progresso.jsx'

const ABAS = [
  { id: 'hoje', nome: 'Hoje', icone: '●' },
  { id: 'semana', nome: 'Semana', icone: '▦' },
  { id: 'treinos', nome: 'Treinos', icone: '▤' },
  { id: 'cardapio', nome: 'Cardápio', icone: '◐' },
  { id: 'progresso', nome: 'Progresso', icone: '↗' },
]

function lerPessoa() {
  try {
    return localStorage.getItem('plano-casal:pessoa') || 'joao'
  } catch {
    return 'joao'
  }
}

export default function App() {
  const [pessoaId, setPessoaId] = useState(lerPessoa)
  const [aba, setAba] = useState('hoje')
  const [dados, setDados] = useDados()
  const pessoa = PESSOAS[pessoaId]

  useEffect(() => {
    try {
      localStorage.setItem('plano-casal:pessoa', pessoaId)
    } catch {
      /* sem armazenamento */
    }
    document.documentElement.dataset.pessoa = pessoaId
  }, [pessoaId])

  const props = { pessoa, dados, setDados }

  return (
    <div className="app">
      <header className="topo">
        <div className="marca">
          <span className="marca-titulo">Plano João & Gabi</span>
          <span className="marca-sub">{pessoa.objetivo}</span>
        </div>
        <div className="seletor" role="tablist" aria-label="Pessoa">
          {Object.values(PESSOAS).map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === pessoaId}
              className={`seletor-btn ${p.id} ${p.id === pessoaId ? 'ativo' : ''}`}
              onClick={() => setPessoaId(p.id)}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </header>

      <nav className="abas" aria-label="Seções">
        {ABAS.map((a) => (
          <button
            key={a.id}
            className={`aba ${aba === a.id ? 'ativa' : ''}`}
            onClick={() => setAba(a.id)}
          >
            <span className="aba-icone" aria-hidden>{a.icone}</span>
            <span>{a.nome}</span>
          </button>
        ))}
      </nav>

      <main className="conteudo">
        {aba === 'hoje' && <Hoje key={pessoaId} {...props} irPara={setAba} />}
        {aba === 'semana' && <Semana pessoaId={pessoaId} />}
        {aba === 'treinos' && <Treinos {...props} />}
        {aba === 'cardapio' && <Cardapio {...props} />}
        {aba === 'progresso' && <Progresso {...props} />}
      </main>

      <footer className="rodape">
        Os registros ficam salvos neste navegador. Faça backup na aba Progresso.
      </footer>
    </div>
  )
}
