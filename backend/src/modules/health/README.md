# Health Module

Módulo responsável pelos health checks da aplicação.

## Endpoints

### `GET /api/v1/health`
Retorna o status completo da aplicação:
- Status geral (ok/degraded)
- Timestamp atual
- Uptime do processo
- Versão da API
- Status da conexão com o banco de dados

**Resposta de sucesso (200)**:
```json
{
  "status": "ok",
  "timestamp": "2026-01-06T12:00:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0",
  "database": {
    "status": "connected",
    "type": "postgres"
  }
}
```

### `GET /api/v1/health/ping`
Ping simples para verificar se a API está respondendo.

**Resposta (200)**:
```json
{
  "message": "pong"
}
```

## Uso

### Em Monitoramento
Use para verificar se a aplicação está saudável:
```bash
curl http://localhost:3000/api/v1/health
```

### Em Load Balancers
Configure como health check endpoint:
- **AWS ELB/ALB**: `/api/v1/health/ping`
- **Kubernetes**: Liveness/Readiness probe em `/api/v1/health`

### Em CI/CD
Aguarde até a API estar saudável após deploy:
```bash
#!/bin/bash
until curl -f http://localhost:3000/api/v1/health/ping; do
  echo "Waiting for API..."
  sleep 2
done
echo "API is ready!"
```

## Futuras Melhorias

### @nestjs/terminus
Para health checks mais robustos, considere usar o `@nestjs/terminus`:

```bash
bun add @nestjs/terminus
```

Permite verificar:
- Database (TypeORM, Prisma)
- HTTP endpoints externos
- Disk space
- Memory usage
- Redis
- Custom checks

### Exemplo com Terminus
```typescript
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Get()
@HealthCheck()
check() {
  return this.health.check([
    () => this.db.pingCheck('database'),
    () => this.http.pingCheck('api', 'https://external-api.com'),
  ]);
}
```

## Monitoramento

Integre com ferramentas de monitoramento:
- **Datadog**: Custom metrics do health check
- **New Relic**: Synthetic monitoring
- **Prometheus**: Exporte métricas do `/health`
- **CloudWatch**: Alarmes baseados no status

## Segurança

**Nota**: Endpoints de health check geralmente devem:
- ✅ Estar públicos (sem autenticação)
- ✅ Não expor informações sensíveis
- ✅ Ser leves (não fazer operações pesadas)
- ❌ Não revelar detalhes de implementação em produção
