# 📚 Documentação do Projeto Gabarito CTO Web

Esta documentação explica de forma didática os arquivos básicos do projeto e as tecnologias utilizadas.

## 🎯 Visão Geral

Este é um projeto web construído com **Next.js 15**, utilizando o **T3 Stack** (Create T3 App) como base. O projeto combina React, TypeScript, Drizzle ORM e Tailwind CSS para criar uma aplicação moderna e type-safe.

---

## 📁 Estrutura de Arquivos

### 📄 Arquivos de Configuração na Raiz

#### `package.json`
**O que é:** Arquivo de configuração do Node.js que define as dependências, scripts e metadados do projeto.

**Principais informações:**
- **Nome do projeto:** `gabarito-cto-web`
- **Gerenciador de pacotes:** `pnpm` (versão 10.15.0)
- **Scripts disponíveis:**
  - `pnpm dev` - Inicia o servidor de desenvolvimento com Turbo
  - `pnpm build` - Compila o projeto para produção
  - `pnpm start` - Inicia o servidor de produção
  - `pnpm lint` - Verifica problemas de código
  - `pnpm typecheck` - Verifica erros de TypeScript
  - `pnpm db:generate` - Gera migrações do banco de dados
  - `pnpm db:push` - Aplica mudanças no banco de dados
  - `pnpm db:studio` - Abre o Drizzle Studio (interface visual do banco)

**Tecnologias principais:**
- **Next.js 15.2.3** - Framework React para produção
- **React 19** - Biblioteca para interfaces de usuário
- **Drizzle ORM 0.41.0** - ORM type-safe para banco de dados
- **LibSQL** - Cliente SQLite moderno
- **Zod 3.24.2** - Validação de schemas TypeScript
- **Tailwind CSS 4.0** - Framework CSS utility-first

---

#### `next.config.js`
**O que é:** Arquivo de configuração do Next.js que personaliza o comportamento do framework.

**O que faz:**
- Importa e valida as variáveis de ambiente antes de iniciar
- Permite pular validação de ambiente com `SKIP_ENV_VALIDATION` (útil para Docker)
- Configurações adicionais podem ser adicionadas aqui conforme necessário

**Por que é importante:** Garante que a aplicação só inicie com variáveis de ambiente válidas, prevenindo erros em runtime.

---

#### `tsconfig.json`
**O que é:** Arquivo de configuração do TypeScript que define como o código TypeScript deve ser compilado e verificado.

**Configurações principais:**
- **Target:** ES2022 (versão moderna do JavaScript)
- **Strict mode:** Ativado (maior segurança de tipos)
- **Module:** ESNext (módulos ES modernos)
- **Path aliases:** `~/*` aponta para `./src/*` (permite imports como `~/components/Button`)
- **JSX:** Preservado (Next.js processa JSX)

**Por que é importante:** Garante type-safety em todo o projeto, detectando erros antes da execução.

---

#### `drizzle.config.ts`
**O que é:** Arquivo de configuração do Drizzle ORM, que define como o ORM se conecta ao banco de dados.

**Configurações:**
- **Schema:** Localização dos modelos (`./src/server/db/schema.ts`)
- **Dialect:** SQLite (banco de dados usado)
- **Database URL:** Vem da variável de ambiente `DATABASE_URL`
- **Tables Filter:** Prefixo `gabarito-cto-web_` para todas as tabelas (permite múltiplos projetos no mesmo banco)

**Por que é importante:** Permite que o Drizzle gere migrações e se conecte corretamente ao banco de dados.

---

#### `eslint.config.js`
**O que é:** Arquivo de configuração do ESLint, ferramenta que analisa o código em busca de problemas e enforces padrões.

**Configurações principais:**
- **Next.js Core Web Vitals** - Regras de performance do Next.js
- **TypeScript ESLint** - Regras específicas para TypeScript
- **Drizzle Plugin** - Regras que garantem uso seguro do Drizzle (ex: sempre usar `WHERE` em `DELETE` e `UPDATE`)

**Por que é importante:** Mantém o código consistente, seguro e seguindo boas práticas.

---

#### `prettier.config.js`
**O que é:** Arquivo de configuração do Prettier, ferramenta que formata o código automaticamente.

**Configurações:**
- **Tailwind Plugin** - Organiza classes do Tailwind CSS automaticamente

**Por que é importante:** Mantém o código formatado de forma consistente, melhorando a legibilidade.

---

#### `postcss.config.js`
**O que é:** Arquivo de configuração do PostCSS, processador CSS que transforma CSS com plugins.

**Configurações:**
- **Tailwind CSS Plugin** - Processa e gera as classes do Tailwind CSS

**Por que é importante:** Permite que o Tailwind CSS funcione corretamente no projeto.

---

### 📂 Estrutura de Pastas

#### `src/app/`
**O que é:** Pasta do App Router do Next.js 15 (sistema de roteamento baseado em arquivos).

**Arquivos:**
- **`layout.tsx`** - Layout raiz da aplicação
  - Define metadados (título, descrição)
  - Configura fonte Google (Geist)
  - Importa estilos globais
  - Envolve todas as páginas

- **`page.tsx`** - Página inicial (`/`)
  - Componente React que renderiza a home
  - Usa Tailwind CSS para estilização
  - Exemplo de página do T3 Stack

---

#### `src/server/db/`
**O que é:** Pasta que contém a configuração do banco de dados.

**Arquivos:**
- **`index.ts`** - Configuração da conexão com o banco
  - Cria cliente LibSQL
  - Configura Drizzle ORM
  - Cacheia conexão em desenvolvimento (evita recriar a cada hot reload)

- **`schema.ts`** - Definição dos modelos/tabelas do banco
  - Define estrutura das tabelas usando Drizzle
  - Exemplo: tabela `posts` com campos `id`, `name`, `createdAt`, `updatedAt`
  - Usa prefixo `gabarito-cto-web_` para todas as tabelas

---

#### `src/env.js`
**O que é:** Arquivo que valida e exporta variáveis de ambiente de forma type-safe.

**O que faz:**
- Usa **Zod** para validar variáveis de ambiente
- Separa variáveis de servidor e cliente
- Garante que variáveis obrigatórias existam antes de iniciar
- Expõe variáveis de forma type-safe

**Variáveis configuradas:**
- `DATABASE_URL` - URL de conexão com o banco (obrigatória)
- `NODE_ENV` - Ambiente (development/test/production)

**Por que é importante:** Previne erros em runtime causados por variáveis de ambiente faltando ou inválidas.

---

#### `src/styles/globals.css`
**O que é:** Arquivo de estilos CSS globais da aplicação.

**O que contém:**
- Estilos base do Tailwind CSS
- Estilos customizados globais (se houver)

---

## 🛠️ Tecnologias Utilizadas

### **Next.js 15**
Framework React que oferece:
- **Server-Side Rendering (SSR)** - Renderiza páginas no servidor
- **Static Site Generation (SSG)** - Gera páginas estáticas
- **App Router** - Sistema de roteamento moderno baseado em arquivos
- **API Routes** - Cria endpoints de API facilmente
- **Otimizações automáticas** - Imagens, fontes, scripts otimizados

### **React 19**
Biblioteca para construir interfaces de usuário:
- **Componentes reutilizáveis** - Código modular e reutilizável
- **Hooks** - Gerenciamento de estado e efeitos colaterais
- **Virtual DOM** - Renderização eficiente

### **TypeScript**
Superset do JavaScript que adiciona tipos:
- **Type Safety** - Detecta erros antes da execução
- **Autocomplete** - Melhor experiência de desenvolvimento
- **Refatoração segura** - Mudanças de código mais confiáveis

### **Drizzle ORM**
ORM (Object-Relational Mapping) type-safe:
- **Type-Safe Queries** - Queries com verificação de tipos
- **Migrations** - Controle de versão do banco de dados
- **SQL-like** - Sintaxe próxima ao SQL puro
- **Multi-dialect** - Suporta vários bancos (SQLite, PostgreSQL, MySQL, etc.)

### **LibSQL**
Cliente SQLite moderno:
- **SQLite compatível** - Banco de dados leve e embutido
- **Turso compatível** - Pode usar Turso (SQLite distribuído) em produção
- **Performance** - Alta performance para aplicações pequenas/médias

### **Tailwind CSS 4.0**
Framework CSS utility-first:
- **Classes utilitárias** - Estilização rápida com classes
- **Responsivo** - Fácil criação de layouts responsivos
- **Customizável** - Totalmente configurável
- **Performance** - Apenas CSS usado é incluído no build

### **Zod**
Biblioteca de validação de schemas:
- **Type-Safe Validation** - Validação com tipos TypeScript
- **Runtime Validation** - Valida dados em runtime
- **Error Messages** - Mensagens de erro claras

### **ESLint**
Linter para JavaScript/TypeScript:
- **Code Quality** - Detecta problemas no código
- **Best Practices** - Enforce padrões de código
- **Custom Rules** - Regras customizadas (ex: Drizzle)

### **Prettier**
Formatador de código:
- **Consistência** - Formata código automaticamente
- **Zero Config** - Funciona out-of-the-box
- **Integração** - Funciona com ESLint

---

## 🚀 Como Usar

### Instalação
```bash
pnpm install
```

### Desenvolvimento
```bash
pnpm dev
```
Acesse `http://localhost:3000`

### Build para Produção
```bash
pnpm build
pnpm start
```

### Banco de Dados
```bash
# Gerar migrações
pnpm db:generate

# Aplicar mudanças
pnpm db:push

# Abrir interface visual
pnpm db:studio
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./db.sqlite"
NODE_ENV="development"
```

**Importante:** O arquivo `.env` não deve ser commitado no Git (já está no `.gitignore`).

---

## 🎓 Conceitos Importantes

### **App Router (Next.js 15)**
Sistema de roteamento baseado em arquivos. Cada arquivo na pasta `app/` vira uma rota:
- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[id]/page.tsx` → `/blog/123` (rota dinâmica)

### **Server Components vs Client Components**
- **Server Components** (padrão): Renderizados no servidor, não têm JavaScript no cliente
- **Client Components** (`'use client'`): Renderizados no cliente, têm interatividade

### **Type Safety**
Todo o projeto é type-safe:
- TypeScript verifica tipos em compile-time
- Zod valida dados em runtime
- Drizzle garante que queries estão corretas

---

## 🔗 Recursos Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Drizzle ORM](https://orm.drizzle.team/)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação Zod](https://zod.dev/)
- [T3 Stack](https://create.t3.gg/)

---

## 📌 Próximos Passos

1. Configure suas variáveis de ambiente no `.env`
2. Crie seus modelos no `src/server/db/schema.ts`
3. Gere e aplique migrações com `pnpm db:generate` e `pnpm db:push`
4. Crie suas páginas em `src/app/`
5. Adicione componentes reutilizáveis em `src/components/` (crie a pasta se necessário)

---

**Última atualização:** Este documento reflete o estado do projeto na versão inicial.

