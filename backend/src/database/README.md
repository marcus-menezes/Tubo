# Database Module

Módulo responsável pela configuração da conexão com o PostgreSQL usando TypeORM.

## Configuração

A conexão é configurada via variáveis de ambiente (`.env`):

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=tubo_dev
DATABASE_USER=tubo
DATABASE_PASSWORD=tubo123
```

## Features

- **Auto-load de entities**: Carrega automaticamente todas as `*.entity.ts|js`
- **Synchronize em dev**: Sincroniza schema automaticamente em desenvolvimento
- **Logging**: Ativa logs SQL em desenvolvimento
- **Connection Pool**: Máximo de 10 conexões simultâneas
- **SSL**: Habilitado automaticamente em produção

## Uso

O módulo é importado globalmente no `AppModule`, não precisa reimportar em outros módulos:

```typescript
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ...],
})
export class AppModule {}
```

## Migrations

Para criar e rodar migrations:

```bash
# Gerar migration
bun run typeorm migration:generate src/database/migrations/NomeDaMigration

# Rodar migrations
bun run typeorm migration:run

# Reverter última migration
bun run typeorm migration:revert
```

## Boas Práticas

1. **Nunca use `synchronize: true` em produção**
2. **Use migrations** para mudanças de schema em produção
3. **Entities** devem estar em `entities/` dentro de cada módulo
4. **Indexes**: Adicione indexes para queries frequentes
5. **Relations**: Use `lazy: false` (padrão) e carregue com `relations` no find

## Troubleshooting

### Erro de conexão
- Verifique se o PostgreSQL está rodando: `docker-compose ps`
- Teste a conexão: `docker exec -it tubo-postgres psql -U tubo -d tubo_dev`

### Entities não encontradas
- Certifique-se que o arquivo termina com `.entity.ts`
- Verifique se está na estrutura: `src/modules/*/entities/*.entity.ts`
