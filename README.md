# 📚 Gabarito CTO Web

Aplicação web para gerenciar trilhas de aprendizado (learning paths) construída com Next.js 15, React, TypeScript, Drizzle ORM e Tailwind CSS.

## 🎯 Visão Geral

Sistema de trilhas de aprendizado com gamificação (XP), progresso e estatísticas. Permite criar trilhas, adicionar itens, marcar conclusões e acompanhar o progresso.

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **pnpm** 10.15.0+ (gerenciador de pacotes)

## 🚀 Instalação

```bash
# Instalar dependências
pnpm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./db.sqlite"
NODE_ENV="development"
```

**Importante:** O arquivo `.env` não deve ser commitado no Git (já está no `.gitignore`).

## 🏃 Executando o Projeto

### Desenvolvimento

```bash
pnpm dev
```

Acesse `http://localhost:3000`

### Produção

```bash
# Compilar
pnpm build

# Iniciar servidor
pnpm start
```

## 🗄️ Banco de Dados

```bash
# Gerar migrações após alterar o schema
pnpm db:generate

# Aplicar mudanças no banco
pnpm db:push

# Abrir interface visual (Drizzle Studio)
pnpm db:studio
```

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Compila para produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm lint` | Verifica problemas de código |
| `pnpm lint:fix` | Corrige problemas de código automaticamente |
| `pnpm typecheck` | Verifica erros de TypeScript |
| `pnpm format:write` | Formata código com Prettier |
| `pnpm db:generate` | Gera migrações do banco |
| `pnpm db:push` | Aplica mudanças no banco |
| `pnpm db:studio` | Abre Drizzle Studio |

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Drizzle ORM** - ORM type-safe
- **SQLite (LibSQL)** - Banco de dados
- **Tailwind CSS 4.0** - Estilização
- **React Query** - Gerenciamento de dados
- **Zod** - Validação de schemas

## 📚 Documentação

Para documentação didática completa, consulte:
- [`docs/APRESENTACAO.md`](./docs/APRESENTACAO.md) - Apresentação completa do projeto
- [`docs/DESAFIOS.md`](./docs/DESAFIOS.md) - Desafios para evoluir o projeto

## 🔗 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [T3 Stack](https://create.t3.gg/)
