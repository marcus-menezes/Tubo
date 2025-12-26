# Backend - Tubo API

API REST construída com NestJS, TypeScript e PostgreSQL.

## 🚀 Quick Start

### Pré-requisitos
- Bun >= 1.0
- Rancher Desktop ou Docker Desktop
- PostgreSQL rodando (via docker-compose na raiz)

### Setup

```bash
# Instalar dependências
bun install

# Copiar .env (se não foi copiado)
cp ../.env.example .env

# Subir banco de dados (na raiz do projeto)
cd ..
docker-compose up -d
cd backend

# Rodar em desenvolvimento
bun run start:dev
```

A API estará disponível em: http://localhost:3000/api/v1

## 📁 Estrutura

```
src/
├── modules/           # Módulos da aplicação
│   ├── auth/         # Autenticação
│   ├── users/        # Usuários
│   ├── posts/        # Posts
│   └── spots/        # Spots de surf
├── common/           # Código compartilhado
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   └── interceptors/
├── config/           # Configurações
├── database/         # Entities e migrations
├── app.module.ts
└── main.ts
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
bun run start          # Rodar aplicação
bun run start:dev      # Rodar com hot-reload
bun run start:debug    # Rodar com debug

# Build
bun run build          # Build para produção

# Testes
bun run test           # Testes unitários
bun run test:watch     # Testes em watch mode
bun run test:cov       # Cobertura de testes
bun run test:e2e       # Testes end-to-end

# Linting
bun run lint           # Rodar Biome lint
bun run lint:fix       # Rodar Biome lint com fix
bun run format         # Formatar código
bun run check          # Check (lint + format)
bun run check:fix      # Check e fix tudo
```

## 🗄️ Banco de Dados

### Conexão Local (Docker)
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=tubo_dev
DATABASE_USER=tubo
DATABASE_PASSWORD=tubo123
```

## 📚 Documentação da API

A documentação da API está disponível em dois formatos:

### Scalar (Moderna) 🔥
Interface moderna e bonita com dark mode
- **URL**: http://localhost:3000/docs
- **Recomendado para desenvolvimento**

### Swagger UI (Tradicional)
Interface clássica do Swagger
- **URL**: http://localhost:3000/swagger
- **Fallback e testes rápidos**

**Ambas usam a mesma especificação OpenAPI 3.0**

## 🔐 Variáveis de Ambiente

Ver `.env.example` na raiz do projeto para todas as variáveis disponíveis.

## 🧪 Testes

```bash
# Unitários
bun run test

# E2E
bun run test:e2e

# Cobertura
bun run test:cov
```

---

**Stack:**
- NestJS 11
- TypeScript 5
- TypeORM 0.3
- PostgreSQL
- Bun runtime
