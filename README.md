# 🚀 Meu Portfólio

Bem-vindo ao repositório do meu portfólio pessoal! Este é um projeto moderno, desenvolvido com as tecnologias mais recentes do ecossistema web para apresentar minhas habilidades, experiências e projetos de forma interativa e elegante.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## ✨ Funcionalidades

- **Design Responsivo**: Totalmente adaptado para dispositivos móveis, tablets e desktops.
- **Tema Dracula**: Estética inspirada no popular tema Dracula, com foco em legibilidade e estilo "terminal".
- **Animações Fluídas**: Utilização de Framer Motion para transições e micro-interações suaves.
- **Redirecionamento de URLs**: Sistema integrado para encurtamento e redirecionamento de links (Short URLs).
- **Formulário de Contato**: Integrado com Resend para envio de e-mails diretamente pelo portfólio.
- **Gerenciamento de Dados**: Integração com MongoDB via Mongoose para armazenamento dinâmico de informações.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React para renderização híbrida e rotas otimizadas.
- **Tailwind CSS**: Estilização baseada em utilitários para um design consistente e rápido.
- **Framer Motion**: Biblioteca poderosa para animações complexas.
- **Lucide React**: Conjunto de ícones elegantes e leves.

### Backend & Ferramentas
- **Mongoose / MongoDB**: Modelagem e banco de dados NoSQL.
- **Resend**: API de envio de e-mails de alta performance.
- **TypeScript**: Tipagem estática para maior segurança e produtividade no desenvolvimento.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Conta no MongoDB Atlas (ou instância local)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/cixpy/portfolio.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes chaves (veja o `.env.example` se disponível):
   ```env
   MONGODB_URI=seu_link_do_mongodb
   RESEND_API_KEY=sua_chave_do_resend
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse `http://localhost:3000` no seu navegador.

---

## 📂 Estrutura de Pastas

```text
src/
├── components/   # Componentes reutilizáveis (Home, Commons, Icons)
├── pages/        # Rotas e páginas da aplicação
├── styles/       # Estilos globais e configurações de tema
├── types/        # Definições de tipos TypeScript
└── api/          # Endpoints da API (dentro de pages)
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

