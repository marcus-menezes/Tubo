# 🛠️ Guia de Setup do Ambiente

Este guia detalha como configurar o ambiente de desenvolvimento do Tubo do zero.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Bun** >= 1.0 ([Instalar Bun](https://bun.sh/))
- **Rancher Desktop** ou **Docker Desktop** ([Rancher](https://rancherdesktop.io/) | [Docker](https://www.docker.com/))
- **Git** para clonar o repositório
- **VS Code** (recomendado) com extensões:
  - Biome
  - Docker
  - PostgreSQL

## Setup Completo

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/tubo.git
cd tubo
```

### 2. Configure Variáveis de Ambiente

#### 2.1. Raiz do Projeto (Docker Compose)

```bash
# Na raiz do projeto
cp .env.example .env
```

Edite o `.env` se necessário. Os valores padrão funcionam para desenvolvimento local:

```env
POSTGRES_DB=tubo_dev
POSTGRES_USER=tubo
POSTGRES_PASSWORD=tubo123
POSTGRES_PORT=5432
REDIS_PORT=6379
```

#### 2.2. Backend (API NestJS)

```bash
cd backend
cp .env.example .env
```

**⚠️ IMPORTANTE**: Edite `backend/.env` e **troque o JWT_SECRET**:

```env
JWT_SECRET=sua-chave-secreta-super-segura-aqui-com-pelo-menos-32-caracteres
```

Outras variáveis importantes:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=tubo_dev
DATABASE_USER=tubo
DATABASE_PASSWORD=tubo123

NODE_ENV=development
PORT=3000
API_PREFIX=api/v1
```

### 3. Suba a Infraestrutura (Docker)

```bash
# Na raiz do projeto
docker-compose up -d postgres

# Verificar se subiu corretamente
docker-compose ps

# Ver logs (se necessário)
docker-compose logs -f postgres
```

**Serviços disponíveis**:
- **PostgreSQL**: `localhost:5432`
- **Redis** (opcional): Use `docker-compose --profile full up -d` para subir o Redis

### 4. Instale as Dependências do Backend

```bash
cd backend
bun install
```

### 5. Execute as Migrations (quando houver)

```bash
# No diretório backend
bun run typeorm migration:run
```

### 6. Inicie o Servidor Backend

```bash
# Modo desenvolvimento (hot-reload)
bun run start:dev

# Modo produção
bun run build
bun run start:prod
```

A API estará disponível em:
- **API**: http://localhost:3000/api/v1
- **Swagger**: http://localhost:3000/api/docs
- **Redoc**: http://localhost:3000/api/redoc

## Verificação da Instalação

### Testar Conexão com o Banco

```bash
# Via Docker
docker exec -it tubo-postgres psql -U tubo -d tubo_dev

# Dentro do psql
\dt        # Listar tabelas
\q         # Sair
```

### Testar a API

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Listar usuários (quando o endpoint estiver pronto)
curl http://localhost:3000/api/v1/users
```

## Comandos Úteis

### Docker Compose

```bash
# Subir todos os serviços
docker-compose up -d

# Subir apenas PostgreSQL
docker-compose up -d postgres

# Subir com Redis (profile full)
docker-compose --profile full up -d

# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f postgres

# Parar serviços
docker-compose down

# Parar e remover volumes (⚠️ apaga dados!)
docker-compose down -v
```

### Backend (Bun)

```bash
# Desenvolvimento
bun run start:dev        # Hot-reload
bun run start:debug      # Debug mode

# Build
bun run build

# Testes
bun run test             # Unit tests
bun run test:e2e         # E2E tests
bun run test:cov         # Coverage

# Linting/Formatting (Biome)
bun run check            # Verificar
bun run check:fix        # Corrigir automaticamente

# Database
bun run typeorm migration:generate src/database/migrations/NomeMigration
bun run typeorm migration:run
bun run typeorm migration:revert
```

## Troubleshooting

### Porta 3000 já em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Erro de conexão com PostgreSQL

```bash
# 1. Verificar se o container está rodando
docker-compose ps

# 2. Reiniciar o PostgreSQL
docker-compose restart postgres

# 3. Ver logs de erro
docker-compose logs postgres

# 4. Verificar as credenciais no .env do backend
cat backend/.env | grep DATABASE
```

### Bun não encontrado

```bash
# Instalar Bun
curl -fsSL https://bun.sh/install | bash

# Ou no Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Erro "synchronize" em produção

Se você ver warnings sobre `synchronize: true`, **nunca use isso em produção**!

Configure `NODE_ENV=production` e use migrations:
```bash
bun run typeorm migration:run
```

### Extensions do PostgreSQL não carregadas

```bash
# Conectar no banco
docker exec -it tubo-postgres psql -U tubo -d tubo_dev

# Instalar extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "postgis";
```

## Estrutura de Pastas

```
Tubo/
├── .env                  # Variáveis Docker Compose
├── docker-compose.yml    # Infraestrutura
├── backend/
│   ├── .env             # Variáveis do backend
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── database/    # Config TypeORM
│   │   └── modules/     # Features
│   └── package.json
├── mobile/              # Flutter app (futuro)
├── database/
│   └── init/            # Scripts SQL iniciais
└── docs/               # Documentação
```

## Próximos Passos

Agora que seu ambiente está configurado:

1. ✅ Explore a [Documentação da API](http://localhost:3000/api/docs)
2. ✅ Leia o [Roadmap do Projeto](ROADMAP.md)
3. ✅ Veja a [Arquitetura Técnica](README.md)
4. ✅ Configure seu [Editor/IDE](CONTRIBUTING.md) (quando disponível)

## Dúvidas?

- Veja [ENVIRONMENT.md](ENVIRONMENT.md) para detalhes sobre variáveis de ambiente
- Consulte [backend/README.md](../backend/README.md) para comandos específicos do backend
- Abra uma [issue](https://github.com/seu-usuario/tubo/issues) no GitHub

---

**Última atualização**: Janeiro 2026  
**Desenvolvedor**: Marcus Menezes
