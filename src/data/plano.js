// Todo o conteúdo do plano fica aqui. Para mudar um exercício, uma porção ou a semana,
// edite só este arquivo.

export const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
export const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// Exercício: { nome, series, reps, min, max } — min/max permitem sugerir progressão de carga.
// tipo 'tempo' ou 'cardio' = só marca como feito, sem carga.
const ex = (nome, series, reps, min, max, extra = {}) => ({ nome, series, reps, min, max, ...extra })
const tempo = (nome, series, reps) => ({ nome, series, reps, tipo: 'tempo' })
const cardio = (nome, reps) => ({ nome, series: 1, reps, tipo: 'cardio' })

export const TREINOS = {
  // ---------- João ----------
  supA: {
    nome: 'Superior A',
    foco: 'Peito e costas',
    exercicios: [
      ex('Supino reto com barra', 4, '6–8', 6, 8),
      ex('Remada curvada com barra', 4, '6–8', 6, 8),
      ex('Desenvolvimento com halteres sentado', 3, '8–10', 8, 10),
      ex('Puxada frente aberta', 3, '8–10', 8, 10),
      ex('Rosca direta com barra', 3, '8–12', 8, 12),
      ex('Tríceps testa', 3, '8–12', 8, 12),
    ],
  },
  infA: {
    nome: 'Inferior A',
    foco: 'Quadríceps',
    exercicios: [
      ex('Agachamento livre', 4, '6–8', 6, 8),
      ex('Leg press 45°', 3, '10–12', 10, 12),
      ex('Stiff com barra', 3, '8–10', 8, 10),
      ex('Cadeira extensora', 3, '12–15', 12, 15),
      ex('Panturrilha em pé', 4, '10–15', 10, 15),
      ex('Abdominal infra na barra ou banco', 3, '12–15', 12, 15),
    ],
  },
  supB: {
    nome: 'Superior B',
    foco: 'Costas e ombros',
    exercicios: [
      ex('Barra fixa (ou graviton)', 4, '6–10', 6, 10),
      ex('Supino inclinado com halteres', 4, '8–10', 8, 10),
      ex('Remada baixa no cabo', 3, '10–12', 10, 12),
      ex('Elevação lateral', 4, '12–15', 12, 15),
      ex('Rosca martelo', 3, '10–12', 10, 12),
      ex('Tríceps na corda', 3, '10–12', 10, 12),
    ],
  },
  infB: {
    nome: 'Inferior B',
    foco: 'Posterior e glúteos',
    exercicios: [
      ex('Hip thrust com barra', 4, '8–10', 8, 10),
      ex('Agachamento búlgaro', 3, '8–10 cada perna', 8, 10),
      ex('Mesa flexora', 3, '10–12', 10, 12),
      ex('Leg press com pés altos', 3, '12', 12, 12),
      ex('Panturrilha sentado', 4, '12–15', 12, 15),
      tempo('Prancha', 3, '45 s'),
    ],
  },
  fullC: {
    nome: 'Full body C',
    foco: 'Volume e pontos fracos',
    exercicios: [
      ex('Agachamento hack ou goblet', 3, '10–12', 10, 12),
      ex('Paralelas (ou supino máquina)', 3, '8–12', 8, 12),
      ex('Remada unilateral com halter', 3, '10–12', 10, 12),
      ex('Elevação lateral no cabo', 3, '15', 15, 15),
      ex('Face pull', 3, '15', 15, 15),
      ex('Rosca Scott', 2, '12', 12, 12),
      ex('Tríceps francês', 2, '12', 12, 12),
    ],
  },

  // ---------- Gabi ----------
  gabiA: {
    nome: 'Treino A',
    foco: 'Pernas e glúteos',
    exercicios: [
      tempo('Aquecimento: bike + bird-dog', 1, '5 min + 2 × 8 cada lado'),
      ex('Elevação pélvica (hip thrust)', 4, '10–12', 10, 12),
      ex('Cadeira extensora', 3, '12–15', 12, 15),
      ex('Agachamento búlgaro com halteres leves', 3, '10 cada perna', 10, 10),
      ex('Cadeira abdutora', 3, '15–20', 15, 20),
      ex('Panturrilha sentada', 3, '15', 15, 15),
      cardio('Esteira inclinada caminhando', '12–15 min'),
    ],
  },
  gabiB: {
    nome: 'Treino B',
    foco: 'Superior e core',
    exercicios: [
      ex('Puxada frente', 3, '10–12', 10, 12),
      ex('Supino na máquina', 3, '10–12', 10, 12),
      ex('Remada com apoio no peito', 3, '10–12', 10, 12),
      ex('Elevação lateral sentada', 3, '12–15', 12, 15),
      ex('Tríceps na corda', 2, '12–15', 12, 15),
      ex('Ponte de glúteo no chão', 2, '15', 15, 15),
      tempo('Curl-up modificado (McGill)', 3, '6 (segure 8–10 s)'),
      tempo('Prancha lateral', 3, '20–30 s cada lado'),
      tempo('Dead bug', 3, '8 cada lado'),
    ],
  },
  gabiC: {
    nome: 'Treino C',
    foco: 'Glúteos e posterior',
    exercicios: [
      ex('Hip thrust unilateral ou na máquina', 3, '12 cada perna', 12, 12),
      ex('Mesa flexora', 3, '10–12', 10, 12),
      ex('Step-up no banco com halteres', 3, '10 cada perna', 10, 10),
      ex('Coice de glúteo no cabo', 3, '12–15 cada perna', 12, 15),
      ex('Cadeira adutora', 3, '15', 15, 15),
      cardio('Bike ou elíptico', '15 min'),
    ],
  },
}

// Semana: índice 0 = domingo. tipo: treino | danca | skate | descanso | cardio
export const PESSOAS = {
  joao: {
    id: 'joao',
    nome: 'João',
    objetivo: 'Ganhar massa e melhorar o físico',
    dados: '22 anos · 1,81 m · 65 kg (início)',
    pesoInicial: 65,
    metas: {
      kcal: '3.000–3.100 kcal',
      proteina: '130–170 g',
      gordura: '~85 g',
      carbo: '~420 g',
      agua: '~2,5 L',
      ritmo: '+0,25 a 0,5 kg por semana',
    },
    semana: [
      { tipo: 'skate', titulo: 'Skate ou descanso' },
      { tipo: 'treino', treino: 'supA' },
      { tipo: 'treino', treino: 'infA' },
      { tipo: 'descanso', titulo: 'Descanso ou skate' },
      { tipo: 'treino', treino: 'supB' },
      { tipo: 'treino', treino: 'infB' },
      { tipo: 'treino', treino: 'fullC' },
    ],
    treinos: ['supA', 'infA', 'supB', 'infB', 'fullC'],
    dicaTreino:
      'Termine cada série com 1 a 2 repetições "no tanque". Descanse 2–3 min nos compostos e 60–90 s nos isolados. Sem cardio extra além do skate: cada caloria conta.',
    avisos: [
      'Aprenda a técnica do agachamento e do supino com o professor antes de subir a carga.',
    ],
  },
  gabi: {
    id: 'gabi',
    nome: 'Gabi',
    objetivo: 'Perder gordura e tonificar',
    dados: '21 anos · 1,60 m · 80 kg (início)',
    pesoInicial: 80,
    metas: {
      kcal: '~1.800 kcal',
      proteina: '125–145 g',
      gordura: '~60 g',
      carbo: '~180 g',
      agua: '~2 L',
      ritmo: '−0,5 a 0,8 kg por semana',
    },
    semana: [
      { tipo: 'cardio', titulo: 'Caminhada leve 30–40 min (opcional)' },
      { tipo: 'danca', titulo: 'Dança (jazz e sapateado)' },
      { tipo: 'treino', treino: 'gabiA' },
      { tipo: 'danca', titulo: 'Dança (jazz e sapateado)' },
      { tipo: 'treino', treino: 'gabiB', semanaEspetaculo: 'Em semana de espetáculo, pule este treino.' },
      { tipo: 'treino', treino: 'gabiC' },
      { tipo: 'danca', titulo: 'Dança (jazz e sapateado)' },
    ],
    treinos: ['gabiA', 'gabiB', 'gabiC'],
    dicaTreino:
      'Use uma carga em que as 2 últimas repetições pesem mas a postura não quebre. Sentiu dor irradiando pela perna, formigamento ou dor aguda na lombar? Pare o exercício.',
    avisos: [
      'Hérnia de disco: leve este treino para o fisioterapeuta ou médico conferir antes de começar.',
    ],
    evitar: [
      'Agachamento livre e levantamento terra com barra pesada',
      'Stiff e good morning pesados',
      'Abdominal tradicional com muitas repetições, "canivete" e rotação com carga',
      'Leg press com amplitude que tira o quadril do banco',
      'Corrida em alta intensidade nos dias de dança',
    ],
  },
}

// Cardápio: mesma base, porções diferentes
export const CARDAPIO = [
  {
    refeicao: 'Café da manhã',
    base: 'Ovos, pão, fruta e café com leite',
    joao: { texto: '3 ovos mexidos, 2 pães franceses, 1 banana com 30 g de aveia e mel, 300 ml de leite integral', kcal: 900, prot: 40 },
    gabi: { texto: '2 ovos mexidos, 2 fatias de pão integral, 1 fruta, 150 ml de leite desnatado', kcal: 390, prot: 26 },
  },
  {
    refeicao: 'Almoço',
    base: 'Arroz, feijão, frango e salada',
    joao: { texto: '250 g de arroz, 2 conchas de feijão, 150 g de frango grelhado, salada, 1 col. sopa de azeite', kcal: 830, prot: 66 },
    gabi: { texto: '120 g de arroz (4 col. sopa), 1 concha de feijão, 150 g de frango, salada à vontade, 1 col. sopa de azeite', kcal: 560, prot: 54 },
  },
  {
    refeicao: 'Lanche pré-treino',
    base: 'Carboidrato + proteína antes da academia',
    joao: { texto: '2 fatias de pão com 2 col. sopa de pasta de amendoim + vitamina com 300 ml de leite, banana e 30 g de aveia', kcal: 715, prot: 31 },
    gabi: { texto: 'Iogurte proteico (ou 170 g de natural + 1 dose de whey), 1 fruta, 2 col. sopa de aveia', kcal: 270, prot: 19 },
  },
  {
    refeicao: 'Jantar',
    base: 'Carne ou peixe, batata e legumes',
    joao: { texto: '120 g de patinho ou peixe, 300 g de batata ou 200 g de macarrão, legumes, 1 col. sopa de azeite', kcal: 680, prot: 44 },
    gabi: { texto: '130 g de patinho ou peixe, 150 g de batata-doce, legumes à vontade, 1 col. chá de azeite', kcal: 450, prot: 40 },
  },
  {
    refeicao: 'Ceia',
    base: 'Leve, antes de dormir',
    joao: { texto: 'Opcional: 300 ml de leite + 1 col. sopa de pasta de amendoim, se o peso não subir', kcal: 280, prot: 10, opcional: true },
    gabi: { texto: '1 fruta + 1 fatia de queijo branco', kcal: 130, prot: 6 },
  },
]

export const TROCAS = [
  'Proteína: frango ↔ peixe, patinho, carne moída magra, ovos, atum',
  'Carboidrato: arroz ↔ macarrão, batata, mandioca, cuscuz (mesmo peso cozido)',
  'Pão ↔ tapioca, cuscuz, wrap integral',
]

export const DICAS = [
  'Cozinhem as proteínas e o arroz juntos no domingo e separem as marmitas da semana.',
  'João: se for difícil comer tanto volume, beba parte das calorias (vitamina, leite) e use azeite e pasta de amendoim.',
  'Gabi: monte metade do prato com salada e legumes e prefira bebidas sem açúcar.',
  'Os dois: 7–9 h de sono. Creatina (3–5 g/dia) é opcional e ajuda os dois.',
]

// Ajuste de calorias a partir da variação semanal do peso médio (kg/semana)
export function recomendacao(pessoaId, variacao) {
  if (variacao == null) return null
  if (pessoaId === 'joao') {
    if (variacao < 0.1) return { nivel: 'ajustar', texto: 'O peso quase não subiu. Acrescente ~200 kcal por dia (ex.: a ceia).' }
    if (variacao > 0.5) return { nivel: 'ajustar', texto: 'Subindo rápido demais. Tire ~150 kcal por dia para ganhar menos gordura.' }
    return { nivel: 'ok', texto: 'No ritmo esperado. Mantenha o plano.' }
  }
  if (variacao > -0.2) return { nivel: 'ajustar', texto: 'O peso quase não caiu. Tire ~150 kcal por dia ou faça +2 caminhadas de 30 min.' }
  if (variacao < -1) return { nivel: 'ajustar', texto: 'Caindo rápido demais. Acrescente ~150 kcal, principalmente se houver cansaço na dança.' }
  return { nivel: 'ok', texto: 'No ritmo esperado. Mantenha o plano.' }
}
