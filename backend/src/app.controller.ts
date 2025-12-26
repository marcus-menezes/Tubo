import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppService } from "./app.service";

@ApiTags("health")
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  @Get()
  @ApiOperation({
    summary: "Health check",
    description: "Verifica se a API está rodando corretamente",
  })
  @ApiResponse({
    status: 200,
    description: "API funcionando normalmente",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Hello World!" },
      },
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  @ApiOperation({
    summary: "Health check detalhado",
    description:
      "Retorna informações sobre o status da aplicação e conexão com banco",
  })
  @ApiResponse({
    status: 200,
    description: "Status da aplicação",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2025-12-26T00:00:00.000Z" },
        uptime: { type: "number", example: 123.456 },
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
  async getHealth() {
    let databaseStatus = "disconnected";
    let databaseType = "unknown";

    try {
      // Tenta fazer uma query simples para verificar conexão
      await this.connection.query("SELECT 1");
      databaseStatus = "connected";
      databaseType = this.connection.options.type;
    } catch (error) {
      databaseStatus = "disconnected";
    }

    return {
      status: databaseStatus === "connected" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: databaseStatus,
        type: databaseType,
      },
    };
  }
}
