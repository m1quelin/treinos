# Plano João & Gabi

Aplicação web com o plano de treino e alimentação do casal: treino do dia com registro de cargas e repetições, semana completa, cardápio com porções de cada um e acompanhamento do peso com sugestão de ajuste de calorias.

Feita com React + Vite. Não tem back-end: os registros ficam salvos no navegador (localStorage) de cada aparelho, com exportação e importação de backup na aba **Progresso**.

## O que tem

- **Hoje** — o que cada um faz no dia, com o treino para preencher carga (kg) e repetições por série. O app mostra a última sessão e avisa "Suba a carga" quando todas as séries bateram o topo da faixa.
- **Semana** — agenda do casal lado a lado (treino, dança, skate).
- **Treinos** — todos os treinos com séries e repetições, e a lista do que a Gabi deve evitar por causa da hérnia.
- **Cardápio** — metas diárias, refeições com porções de cada um para marcar ao longo do dia, trocas e dicas.
- **Progresso** — registro do peso, gráfico, variação semanal, sugestão de ajuste de calorias, constância de treinos e backup.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Subir para o GitHub

Mova o workflow primeiro (veja a seção abaixo), depois:

```bash
git init
git add .
git commit -m "Plano de treino e alimentação"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/plano-treino-casal.git
git push -u origin main
```

## Publicar no GitHub Pages

O workflow de publicação está em `workflow-github/deploy.yml`. Antes do primeiro commit, mova-o para a pasta que o GitHub lê:

```bash
mkdir -p .github/workflows
mv workflow-github/deploy.yml .github/workflows/deploy.yml
rmdir workflow-github
```

Depois:

1. No GitHub, abra **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Faça um push na branch `main` (ou rode o workflow em **Actions**).

O site fica em `https://SEU-USUARIO.github.io/plano-treino-casal/`. No celular, use "Adicionar à tela de início" para abrir como app.

## Editar o plano

Todo o conteúdo (exercícios, semana, porções, metas e regras de ajuste) está em `src/data/plano.js`. Mude ali e o app inteiro acompanha.

## Aviso

O plano é uma referência geral, não substitui acompanhamento profissional. A Gabi tem hérnia de disco e deve passar o treino por um fisioterapeuta ou médico antes de começar.
