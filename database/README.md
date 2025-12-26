# 🗄️ Database - Tubo

Scripts e configurações relacionados ao banco de dados PostgreSQL.

## 📁 Estrutura

```
database/
├── init/          # Scripts de inicialização (rodados automaticamente)
├── migrations/    # Migrações do banco (TypeORM/Prisma)
└── seeds/         # Dados de teste/exemplo
```

## 🚀 Init Scripts

Scripts em `init/` são executados **automaticamente** pelo Docker na primeira vez que o PostgreSQL é iniciado.

**Ordem de execução**: Alfabética (01-init.sql, 02-extensions.sql, etc)

### 01-init.sql

Configura extensões essenciais:
- `uuid-ossp` - Geração de UUIDs
- `pg_trgm` - Busca full-text
- `postgis` - Dados geográficos (para spots de surf)

## 🔄 Migrations

Migrações serão gerenciadas pelo ORM escolhido (TypeORM ou Prisma).

**Comandos (quando configurado):**

```bash
# Gerar nova migração
npm run migration:generate -- MigrationName

# Rodar migrações
npm run migration:run

# Reverter migração
npm run migration:revert
```

## 🌱 Seeds

Dados de exemplo para desenvolvimento:

```bash
# Rodar seeds (quando configurado)
npm run seed
```

---

**⚠️ Nota**: Scripts de migração e seeds serão criados quando o backend NestJS for configurado.
