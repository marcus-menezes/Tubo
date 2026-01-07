# 🔐 Variáveis de Ambiente

Este documento detalha todas as variáveis de ambiente usadas no projeto Tubo.

## Estrutura de .env

O projeto está organizado em **monorepo** com múltiplos `.env`:

```
Tubo/
├── .env                    # Docker Compose (PostgreSQL, Redis)
├── .env.example
├── backend/
│   ├── .env               # API NestJS
│   └── .env.example
└── mobile/                # Futuro
    ├── .env
    └── .env.example
```

## Raiz do Projeto (`.env`)

Contém **apenas** variáveis usadas pelo `docker-compose.yml`.

### PostgreSQL

```env
POSTGRES_DB=tubo_dev          # Nome do banco de dados
POSTGRES_USER=tubo            # Usuário do PostgreSQL
POSTGRES_PASSWORD=tubo123     # Senha do PostgreSQL
POSTGRES_PORT=5432            # Porta exposta no host
```

### Redis (Opcional)

```env
REDIS_PORT=6379               # Porta do Redis
```

### Valores Padrão

O `docker-compose.yml` usa a sintaxe `${VAR:-default}`, então funciona mesmo sem o `.env`:

```yaml
environment:
  POSTGRES_DB: ${POSTGRES_DB:-tubo_dev}
```

## Backend (`.env`)

Contém variáveis específicas da API NestJS.

### Database (Obrigatório)

```env
DATABASE_HOST=localhost       # Host do PostgreSQL
DATABASE_PORT=5432            # Porta do PostgreSQL
DATABASE_NAME=tubo_dev        # Nome do banco
DATABASE_USER=tubo            # Usuário do banco
DATABASE_PASSWORD=tubo123     # Senha do banco
```

**Nota**: Esses valores devem corresponder aos definidos no `.env` da raiz.

### Application (Obrigatório)

```env
NODE_ENV=development          # development | production | test
PORT=3000                     # Porta do servidor NestJS
API_PREFIX=api/v1             # Prefixo das rotas
```

### JWT (Obrigatório)

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production-MUST-CHANGE
JWT_EXPIRES_IN=7d             # Tempo de expiração do token
```

**⚠️ CRÍTICO**: Você **DEVE** trocar o `JWT_SECRET` por um valor único e seguro!

Gerar um JWT_SECRET seguro:
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Online (use com cuidado)
# https://www.random.org/strings/
```

### AWS S3 (Opcional - Futuro)

Para upload de imagens e vídeos em produção:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=tubo-uploads
```

### Redis Cache (Opcional - Futuro)

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=                # Vazio em dev local
```

### Email/SMTP (Opcional - Futuro)

Para notificações e recuperação de senha:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@tubo.app
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=noreply@tubo.app
```

### Rate Limiting (Opcional)

```env
THROTTLE_TTL=60               # Janela de tempo (segundos)
THROTTLE_LIMIT=10             # Máximo de requests
```

### Logging (Opcional)

```env
LOG_LEVEL=debug               # debug | info | warn | error
```

## Mobile (`.env`) - Futuro

Quando o app Flutter for criado:

```env
API_URL=http://localhost:3000/api/v1
GOOGLE_MAPS_API_KEY=your-key
FIREBASE_PROJECT_ID=tubo-app
```

## Ambientes

### Development (Local)

```env
NODE_ENV=development
DATABASE_HOST=localhost
JWT_SECRET=dev-secret-key-not-for-production
```

### Staging

```env
NODE_ENV=production
DATABASE_HOST=tubo-staging.xxxxxx.us-east-1.rds.amazonaws.com
JWT_SECRET=strong-staging-secret-32-chars-minimum
AWS_S3_BUCKET=tubo-staging-uploads
```

### Production

```env
NODE_ENV=production
DATABASE_HOST=tubo-prod.xxxxxx.us-east-1.rds.amazonaws.com
JWT_SECRET=super-strong-production-secret-64-chars-recommended
AWS_S3_BUCKET=tubo-production-uploads
SSL_ENABLED=true
```

## Segurança

### ⚠️ Regras Críticas

1. **NUNCA commite arquivos `.env`** - Eles estão no `.gitignore`
2. **SEMPRE use `.env.example`** como template (sem valores reais)
3. **TROQUE o JWT_SECRET** do valor padrão
4. **Use secrets diferentes** para dev/staging/prod
5. **Rotacione credenciais** periodicamente

### Checklist de Segurança

Antes de ir para produção:

- [ ] `.env` está no `.gitignore`
- [ ] `JWT_SECRET` foi alterado e tem >= 32 caracteres
- [ ] Senhas de produção são diferentes das de dev
- [ ] Credenciais AWS não estão hardcoded no código
- [ ] `.env.example` não contém valores reais
- [ ] Variáveis sensíveis estão em secret manager (AWS Secrets Manager, etc.)

### Boas Práticas

**✅ Fazer**:
- Usar `.env.example` como documentação
- Usar valores padrão seguros para dev
- Documentar cada variável
- Validar variáveis na inicialização do app

**❌ Não Fazer**:
- Commitar `.env` no Git
- Compartilhar `.env` por email/Slack
- Usar mesmas credenciais em todos os ambientes
- Deixar secrets em logs

## Validação de Variáveis

O NestJS valida variáveis na inicialização. Se algo estiver errado:

```bash
Error: JWT_SECRET is required
Error: DATABASE_HOST must be a valid host
```

Confira:
1. Arquivo `.env` existe?
2. Sintaxe está correta? (sem espaços extras)
3. Valores obrigatórios estão preenchidos?

## Ferramentas Úteis

### Verificar .env

```bash
# Listar variáveis do backend
cd backend
cat .env | grep -v "^#" | grep -v "^$"

# Verificar se variáveis estão carregadas (Node.js)
node -e "require('dotenv').config(); console.log(process.env.JWT_SECRET)"
```

### Gerar Secrets

```bash
# JWT Secret (32 bytes)
openssl rand -hex 32

# JWT Secret (64 bytes - mais seguro)
openssl rand -hex 64

# UUID
uuidgen
```

## Referências

- **NestJS Config**: https://docs.nestjs.com/techniques/configuration
- **dotenv**: https://github.com/motdotla/dotenv
- **Docker Compose Env**: https://docs.docker.com/compose/environment-variables/

## Dúvidas?

- Veja [SETUP.md](SETUP.md) para guia passo a passo
- Consulte [backend/README.md](../backend/README.md) para comandos
- Abra uma issue no GitHub

---

**Última atualização**: Janeiro 2026  
**Desenvolvedor**: Marcus Menezes
