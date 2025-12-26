import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    description: "Retorna informações sobre o status da aplicação",
  })
  @ApiResponse({
    status: 200,
    description: "Status da aplicação",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2025-12-25T00:00:00.000Z" },
        uptime: { type: "number", example: 123.456 },
      },
    },
  })
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
