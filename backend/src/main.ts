import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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
    .addBearerAuth()
    .setContact(
      "Marcus Menezes",
      "https://github.com/your-username/tubo",
      "marcusmenezes2009@gmail.com"
    )
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Scalar UI (Moderna) 🔥
  SwaggerModule.setup("docs", app, document, {
    useGlobalPrefix: false,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest/dist/browser/scalar.css",
    customJs:
      "https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest/dist/browser/standalone.js",
    customSiteTitle: "Tubo API - Documentação",
  });

  // Swagger UI tradicional (fallback)
  SwaggerModule.setup("swagger", app, document, {
    useGlobalPrefix: false,
    customSiteTitle: "Tubo API - Swagger",
    customCss: ".swagger-ui .topbar { display: none }",
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Tubo API rodando em http://localhost:${port}`);
  console.log(`📚 API Prefix: ${apiPrefix}`);
  console.log(`📖 Docs (Scalar): http://localhost:${port}/docs`);
  console.log(`📖 Swagger UI: http://localhost:${port}/swagger`);
}

bootstrap();
