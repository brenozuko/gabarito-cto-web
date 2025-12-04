# 📚 Introdução a Web -  CTO Studio

## 📑 Índice

1. [🎯 O que é este projeto?](#-o-que-é-este-projeto)
2. [🎨 O que é T3 Stack?](#-o-que-é-t3-stack)
3. [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
   - [Next.js 15](#1-nextjs-15-framework-react)
   - [React 19](#2-react-19-biblioteca-javascript)
   - [TypeScript](#3-typescript-javascript-com-tipos)
   - [Drizzle ORM](#4-drizzle-orm-gerenciador-de-banco-de-dados)
   - [SQLite](#5-sqlite-banco-de-dados)
   - [Tailwind CSS](#6-tailwind-css-framework-de-estilização)
   - [React Query](#7-react-query-tanstack-query-gerenciamento-de-dados)
   - [Zod](#8-zod-validação-de-dados)
4. [🔑 Terminologias Essenciais](#-terminologias-essenciais)
5. [🔄 Como Funciona (Fluxo Básico)](#-como-funciona-fluxo-básico)
6. [🎓 Conceitos Importantes para Iniciantes](#-conceitos-importantes-para-iniciantes)
7. [📊 Exemplo Prático: Criar uma Trilha](#-exemplo-prático-criar-uma-trilha)
8. [🚀 Comandos Principais](#-comandos-principais)
9. [💡 Dicas para Iniciantes](#-dicas-para-iniciantes)
10. [🎯 Desafios para Evoluir o Projeto](#-desafios-para-evoluir-o-projeto)
11. [📚 Recursos para Aprender Mais](#-recursos-para-aprender-mais)

---

## ⚠️ Disclaimer Importante

- **Desconforto é esperado** - É normal não entender tudo de primeira. Isso faz parte do aprendizado na carreira de engenheiro de software.
- **Este curso não cobre tudo** - Nem eu, nem ninguém somos enciclopedias. O importante é ter fundamentos sólidos e saber buscar informações.
- **Não existe "a forma certa"** - Este gabarito é uma sugestão. Existem muitas formas de fazer a mesma coisa, cada uma com seus prós e contras.
- **Debates são bem vindos** - Este código é open source para promover melhorias, discussões e aprendizado coletivo.
- **Estarei à disposição** - Vou estar disponível para dar continuidade no apoio ao aprendizado do grupo. Não hesitem em tirar dúvidas!

---

## 🎯 O que é este projeto?

Temos uma aplicação web para gerenciar **trilhas de aprendizado** (learning paths). 

### Funcionalidades principais:
- ✅ Criar trilhas de aprendizado (ex: "Curso de React", "Fundamentos de Node.js")
- ✅ Adicionar itens/tarefas dentro de cada trilha
- ✅ Marcar itens como concluídos
- ✅ Acompanhar progresso com barras de progresso
- ✅ Sistema de XP (pontos de experiência) - gamificação
- ✅ Estatísticas gerais (total de trilhas, itens concluídos, etc.)

**Exemplo prático:**
- Trilha: "Aprender React"
  - Item 1: "Instalar Node.js" (10 XP)
  - Item 2: "Criar primeiro componente" (20 XP)
  - Item 3: "Entender hooks" (30 XP)

---

## 🎨 O que é T3 Stack?

**T3 Stack** é um conjunto de tecnologias modernas e type-safe (TypeScript, Tailwind CSS, Next.js, Drizzle ORM, React Query, Zod, etc.) que trabalham juntas para criar aplicações web completas. O nome vem dos três "T's" principais: TypeScript, Tailwind e TRPC (ou APIs REST), mas na prática inclui muito mais ferramentas já integradas e configuradas.

O T3 Stack acelera o desenvolvimento porque elimina horas de configuração manual. Em vez de você precisar configurar TypeScript, Tailwind, ESLint, Prettier, banco de dados, validação e estrutura do projeto separadamente (o que pode levar bastante tempo), tudo já vem pronto e funcionando. Com um único comando, você tem um projeto completo configurado com as melhores práticas, permitindo que você foque em criar funcionalidades desde o primeiro momento.

---

## 🛠️ Tecnologias Utilizadas

### 1. **Next.js 15** (Framework React)
**O que é:** Framework para criar aplicações web modernas com React.

**Por que usar:**
- Cria páginas web rapidamente
- Roteamento automático (cada arquivo vira uma página)
- Otimizações automáticas de performance
- Pode renderizar no servidor (mais rápido)

**Analogia:** Se React é o motor do carro, Next.js é o carro completo com GPS, ar-condicionado e tudo mais.

---

### 2. **React 19** (Biblioteca JavaScript)
**O que é:** Biblioteca para criar interfaces de usuário (botões, formulários, páginas).

**Conceito chave - Componentes:**
- Componentes são como "blocos de LEGO" reutilizáveis
- Exemplo: um botão é um componente, você pode usar várias vezes
- Cada componente tem sua própria lógica e aparência

**Exemplo simples:**
```jsx
function Botao() {
  return <button>Clique aqui</button>;
}
```

---

### 3. **TypeScript** (JavaScript com tipos)
**O que é:** JavaScript que adiciona "tipos" para evitar erros.

**Por que usar:**
- **JavaScript normal:** `let idade = 25; idade = "vinte e cinco";` ✅ (permite, mas é errado!)
- **TypeScript:** `let idade: number = 25; idade = "vinte e cinco";` ❌ (erro! previne bugs)

**Benefícios:**
- Detecta erros antes de executar o código
- Autocomplete melhor no editor
- Código mais seguro e fácil de manter

---

### 4. **Drizzle ORM** (Gerenciador de Banco de Dados)
**O que é:** Ferramenta que conecta o código ao banco de dados de forma segura e type-safe.

**O que é ORM?**
- **ORM** = Object-Relational Mapping (Mapeamento Objeto-Relacional)
- Traduz código JavaScript/TypeScript para comandos SQL automaticamente
- Cria uma "ponte" entre o mundo orientado a objetos (código) e o mundo relacional (banco de dados)

**Exemplo prático:**
```typescript
// Com ORM (Drizzle) - Código TypeScript
await db.select().from(trails).where(eq(trails.id, 1));

// Vira automaticamente em SQL:
// SELECT * FROM trails WHERE id = 1;
```

---

#### 🤔 Por que usar ORM? (Problemas que resolve)

**1. Segurança - Prevenção de SQL Injection**
**Sem ORM (perigoso):**
```javascript
// ❌ VULNERÁVEL A SQL INJECTION
const query = `SELECT * FROM trails WHERE name = '${nomeUsuario}'`;
// Se usuário digitar: "'; DROP TABLE trails; --"
// Resultado: DELETE toda a tabela! 💥
```

**Com ORM (seguro):**
```typescript
// ✅ SEGURO - ORM trata os dados automaticamente
await db.select().from(trails).where(eq(trails.name, nomeUsuario));
// Drizzle automaticamente "escapa" os dados, prevenindo ataques
```

**2. Type Safety - Erros detectados antes de executar**
**Sem ORM:**
```javascript
// ❌ Erro só aparece quando executar
const trail = await db.query("SELECT * FROM trails WHERE id = ?", [id]);
console.log(trail.nome); // Erro! Coluna se chama "name", não "nome"
```

**Com ORM:**
```typescript
// ✅ TypeScript detecta o erro antes de executar
const trail = await db.select().from(trails).where(eq(trails.id, id));
console.log(trail.nome); // ❌ Erro de compilação! Avisa que é "name"
```

**3. Manutenibilidade - Código mais fácil de entender e manter**
**Sem ORM:**
```javascript
// ❌ SQL misturado com lógica, difícil de ler
const result = await db.query(
  "SELECT t.*, COUNT(i.id) as total_items FROM trails t " +
  "LEFT JOIN items i ON t.id = i.trail_id " +
  "WHERE t.created_at > ? GROUP BY t.id",
  [dataInicio]
);
```

**Com ORM:**
```typescript
// ✅ Código mais legível, próximo da linguagem natural
const result = await db
  .select({
    trail: trails,
    totalItems: count(items.id)
  })
  .from(trails)
  .leftJoin(items, eq(trails.id, items.trailId))
  .where(gt(trails.createdAt, dataInicio))
  .groupBy(trails.id);
```

**4. Portabilidade - Funciona com diferentes bancos**
- **Sem ORM:** Precisa reescrever SQL para cada banco (PostgreSQL, MySQL, SQLite têm sintaxes diferentes)
- **Com ORM:** Mesmo código funciona em qualquer banco suportado

**5. Migrações Automáticas - Controle de versão do banco**
- ORM ajuda a criar e aplicar mudanças no banco de forma controlada
- Exemplo: Adicionar nova coluna sem perder dados existentes

---

#### 📊 Resumo: ORM vs SQL Direto

| Aspecto | SQL Direto | ORM (Drizzle) |
|---------|-----------|---------------|
| **Segurança** | ❌ Vulnerável a SQL Injection | ✅ Protegido automaticamente |
| **Type Safety** | ❌ Erros só em runtime | ✅ Erros detectados antes |
| **Legibilidade** | ⚠️ SQL pode ser complexo | ✅ Código mais limpo |
| **Manutenção** | ⚠️ Difícil de refatorar | ✅ Fácil de mudar |
| **Portabilidade** | ❌ Depende do banco | ✅ Funciona em vários bancos |
| **Produtividade** | ⚠️ Mais código manual | ✅ Menos código, mais rápido |



### 5. **SQLite** (Banco de Dados)
**O que é:** Banco de dados leve que armazena dados em um arquivo.

**Características:**
- Arquivo único (ex: `db.sqlite`)
- Não precisa de servidor separado
- Perfeito para projetos pequenos/médios
- Dados ficam em tabelas (como planilhas Excel)

**Estrutura básica:**
- **Tabela `trails`:** armazena trilhas (id, nome, descrição)
- **Tabela `items`:** armazena itens (id, nome, XP, concluído, trilha_id)

---

### 6. **Tailwind CSS** (Framework de Estilização)
**O que é:** Framework CSS que usa classes para estilizar rapidamente.

**Como funciona:**
- Em vez de escrever CSS separado, você usa classes no HTML
- Exemplo: `<div className="bg-blue-500 text-white p-4">`
  - `bg-blue-500` = fundo azul
  - `text-white` = texto branco
  - `p-4` = padding (espaçamento interno)

**Vantagens:**
- Muito rápido de escrever
- Responsivo fácil (ex: `md:grid-cols-2` = 2 colunas em telas médias)
- Não precisa criar arquivos CSS separados

---

### 7. **React Query (TanStack Query)** (Gerenciamento de Dados)
**O que é:** Biblioteca para buscar e gerenciar dados da API.

**O que faz:**
- Busca dados do servidor
- Cache automático (não busca de novo se já tem)
- Atualização automática
- Estados de loading/error prontos

**Exemplo:**
```typescript
const { data, isLoading } = useListTrails();
// data = lista de trilhas
// isLoading = true enquanto carrega
```

---

### 8. **Zod** (Validação de Dados)
**O que é:** Biblioteca para validar se os dados estão corretos.

**Por que validar?**
- Usuário envia dados → precisa verificar se estão corretos
- Exemplo: email precisa ter "@", idade precisa ser número, etc.

**Exemplo:**
```typescript
const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  age: z.number().min(18, "Idade mínima 18")
});
```

---

## 🔑 Terminologias Essenciais

### **Frontend vs Backend**
- **Frontend:** O que o usuário vê (páginas, botões, formulários)
- **Backend:** Lógica do servidor (banco de dados, APIs, processamento)

### **API (Application Programming Interface)**
- **O que é:** Caminho de comunicação entre frontend e backend
- **Exemplo:** Frontend pede "me dê todas as trilhas" → API busca no banco → retorna dados

### **Rota (Route)**
- **O que é:** URL da página (ex: `/trails/1` = página da trilha com ID 1)
- **No Next.js:** Cada arquivo em `app/` vira uma rota automaticamente

### **Componente (Component)**
- **O que é:** Pedaço reutilizável de interface
- **Exemplo:** `<Button>`, `<Card>`, `<TrailCard>`

### **Hook (React Hook)**
- **O que é:** Função especial do React que adiciona funcionalidade
- **Exemplos:**
  - `useState`: gerencia estado (dados que mudam)
  - `useEffect`: executa código quando algo muda
  - Hooks customizados: lógica reutilizável

### **Estado (State)**
- **O que é:** Dados que podem mudar e atualizam a tela
- **Exemplo:** `const [nome, setNome] = useState("");`
  - `nome` = valor atual
  - `setNome` = função para mudar o valor

### **Props (Properties)**
- **O que é:** Dados passados de um componente para outro
- **Exemplo:** `<TrailCard name="React" progress={50} />`
  - `name` e `progress` são props

### **Type-Safe / Type Safety**
- **O que é:** Garantia de que os tipos estão corretos
- **Benefício:** Erros são detectados antes de executar

### **ORM (Object-Relational Mapping)**
- **O que é:** Traduz código para SQL automaticamente
- **Vantagem:** Não precisa escrever SQL manualmente

### **Migration (Migração)**
- **O que é:** Mudança na estrutura do banco de dados
- **Exemplo:** Adicionar nova coluna em uma tabela

---

## 🔄 Como Funciona (Fluxo Básico)

### 1. **Usuário acessa a página inicial**
```
Navegador → Next.js → Página (page.tsx)
```

### 2. **Página busca dados**
```
Página → React Query → API Route → Drizzle ORM → SQLite
```

### 3. **Dados retornam e são exibidos**
```
SQLite → Drizzle → API → React Query → Componentes → Tela
```

### 4. **Usuário interage (ex: cria trilha)**
```
Formulário → Validação (Zod) → API → Banco de Dados → Atualiza tela
```

---

## 🎓 Conceitos Importantes para Iniciantes

### **Client vs Server Components (Next.js)**
- **Server Component (padrão):**
  - Renderiza no servidor
  - Não tem JavaScript no navegador
  - Mais rápido, melhor para SEO

- **Client Component (`'use client'`):**
  - Renderiza no navegador
  - Tem interatividade (cliques, formulários)
  - Usa quando precisa de JavaScript

### **App Router (Next.js 15)**
- Sistema de roteamento baseado em arquivos
- `app/page.tsx` → rota `/`
- `app/trails/page.tsx` → rota `/trails`
- `app/trails/[id]/page.tsx` → rota `/trails/1` (dinâmica)

### **Hooks Customizados**
- Funções que encapsulam lógica reutilizável
- Exemplo: `useListTrails()` busca e retorna trilhas
- Facilita reutilização de código

---

## 📊 Exemplo Prático: Criar uma Trilha

1. **Usuário preenche formulário** (Frontend)
2. **Zod valida os dados** (Validação)
3. **Dados são enviados para API** (`/api/trails`)
4. **API usa Drizzle para salvar no banco** (Backend)
5. **React Query atualiza a lista automaticamente** (Frontend)
6. **Tela mostra a nova trilha** (UI)

---

## 🚀 Comandos Principais

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Compilar para produção
pnpm build

# Verificar erros de TypeScript
pnpm typecheck

# Formatar código
pnpm format:write
```

---


## 📚 Recursos para Aprender Mais

- [Next.js Docs](https://nextjs.org/docs) - Documentação oficial
- [React Docs](https://react.dev) - Documentação do React
- [Drizzle ORM](https://orm.drizzle.team/) - Documentação do Drizzle
- [Tailwind CSS](https://tailwindcss.com/docs) - Documentação do Tailwind
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guia do TypeScript
- [T3 Stack](https://create.t3.gg/) - Documentação e ferramenta para criar projetos T3

