# 🎓 Notoria -- Plataforma de Gestão Educacional

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TanStack
Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🎯 Sobre o Projeto

O **Notoria** é uma plataforma de gestão educacional voltada para o
acompanhamento de **atividades, notas e desempenho de alunos**.\
Seu principal objetivo é **melhorar a comunicação entre professores e
estudantes**, oferecendo uma interface clara, intuitiva e responsiva.

---

## 👥 Público-alvo

- 🧑‍🏫 **Professores**: criar, gerenciar e corrigir atividades,
  acompanhar turmas e avaliar alunos.\
- 🧑‍🎓 **Alunos**: acompanhar atividades, enviar tarefas e visualizar
  seu desempenho em tempo real.

---

## 📌 Principais Funcionalidades

### Área do Professor

- Listagem e criação de atividades.\
- Acompanhamento de submissões.\
- Correção e atribuição de notas.

### Área do Aluno

- Visualização de atividades pendentes e concluídas.\
- Envio de respostas e arquivos.\
- Acompanhamento do **score geral** e progresso por turma.

### Dashboard

- Chat entre professor e aluno.
- Indicadores vizuais

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript** -- Tipagem estática para escalabilidade.\
- **React** -- Criação de interfaces dinâmicas.\
- **Next.js** -- Framework React com SSR.\
- **TanStack Query** -- Gerenciamento de estados assíncronos.\
- **Axios** -- Requisições HTTP.\
- **Tailwind CSS** -- Estilização moderna e responsiva.

---

## ⚙️ Instalação e Uso

### Pré-requisitos

- Node.js \>= 18\
- npm ou yarn
- [Api Notoria](https://github.com/nielassis/notoria-user-module)

### Passos

```bash
# Clone este repositório
git clone https://github.com/nielassis/notoria-front-end.git
cd notoria

# Instale as dependências
npm install

# Configure variáveis de ambiente no arquivo .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

# Execute o projeto
npm run dev

# Acesse em
http://localhost:3000
```

---

obs: antes de iniciar a aplicação front-end, lembre-se de iniciar a aplicação back-end
