import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthService } from "./health.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: "Health check completo",
    description:
      "Retorna informações sobre o status da aplicação e conexão com banco de dados",
  })
  @ApiResponse({
    status: 200,
    description: "Status da aplicação",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2026-01-06T00:00:00.000Z" },
        uptime: { type: "number", example: 123.456 },
        version: { type: "string", example: "1.0.0" },
        database: {
          type: "object",
          properties: {
            status: { type: "string", example: "connected" },
            type: { type: "string", example: "postgres" },
          },
        },
      },
    },
  })
  async check() {
    return this.healthService.check();
  }

  @Get("ping")
  @ApiOperation({
    summary: "Ping simples",
    description: "Verifica se a API está respondendo",
  })
  @ApiResponse({
    status: 200,
    description: "API funcionando",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "pong" },
      },
    },
  })
  ping() {
    return { message: "pong" };
  }
}
