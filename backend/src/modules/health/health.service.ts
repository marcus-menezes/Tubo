import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async check() {
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
      version: "1.0.0",
      database: {
        status: databaseStatus,
        type: databaseType,
      },
    };
  }
}
