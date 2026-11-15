import { useEffect, useState } from 'react'

// Os registros (cargas, refeições, peso) ficam salvos no navegador de cada aparelho.
const CHAVE = 'plano-casal:v1'

const VAZIO = { sessoes: {}, refeicoes: {}, pesos: {} }

function ler() {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? { ...VAZIO, ...JSON.parse(bruto) } : VAZIO
  } catch {
    return VAZIO
  }
}

function gravar(dados) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados))
  } catch {
    // armazenamento indisponível (aba anônima, etc.) — segue só em memória
  }
}

export function useDados() {
  const [dados, setDados] = useState(ler)
  useEffect(() => gravar(dados), [dados])
  return [dados, setDados]
}

export function exportar(dados) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `plano-casal-backup-${hoje()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function hoje() {
  const d = new Date()
  return paraISO(d)
}

export function paraISO(d) {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${dia}`
}

export function deISO(s) {
  const [a, m, d] = s.split('-').map(Number)
  return new Date(a, m - 1, d)
}

export function formatarData(s) {
  const d = deISO(s)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}
