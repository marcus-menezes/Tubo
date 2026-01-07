import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import getRedocMiddleware from "redoc-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  });

  // Prefixo global da API
  const apiPrefix = process.env.API_PREFIX || "api/v1";
  app.setGlobalPrefix(apiPrefix);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configuração do Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle("Tubo API")
    .setDescription(
      "🏄‍♂️ API da rede social para surfistas brasileiros\n\n" +
        '"Cada onda conta uma história"\n\n' +
        "Tubo é uma plataforma social que conecta surfistas, " +
        "permitindo compartilhar sessões, descobrir novos picos e acompanhar sua evolução."
    )
    .setVersion("1.0.0")
    .addTag("auth", "Autenticação e autorização")
    .addTag("users", "Gerenciamento de usuários")
    .addTag("posts", "Posts e sessões de surf")
    .addTag("spots", "Spots e picos de surf")
    .addTag("health", "Health checks e status")
    .addBearerAuth()
    .setContact(
      "Marcus Menezes",
      "https://github.com/your-username/tubo",
      "marcusmenezes2009@gmail.com"
    )
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Redoc (UI Moderna e Limpa) 🔥
  app.use(
    "/docs",
    getRedocMiddleware({
      specUrl: "/swagger-json",
      title: "Tubo API - Documentação",
    })
  );

  // Swagger JSON endpoint (necessário para Redoc)
  app.use("/swagger-json", (req, res) => {
    res.json(document);
  });

  // Swagger UI (fallback/alternativa)
  SwaggerModule.setup("swagger", app, document, {
    useGlobalPrefix: false,
    customSiteTitle: "Tubo API - Swagger",
    customCss: ".swagger-ui .topbar { display: none }",
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Tubo API rodando em http://localhost:${port}`);
  console.log(`📚 API Prefix: ${apiPrefix}`);
  console.log(`📖 Docs (Redoc): http://localhost:${port}/docs 🔥`);
  console.log(`📖 Swagger UI: http://localhost:${port}/swagger`);
  console.log(`🏥 Health Check: http://localhost:${port}/${apiPrefix}/health`);
}

bootstrap();
