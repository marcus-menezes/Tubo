# Tubo - Instruções para GitHub Copilot

## 🏄‍♂️ Sobre o Projeto

**Tubo** é uma rede social para surfistas brasileiros que combina:
- Posts de sessões (estilo Instagram/Facebook)
- Tracking e gamificação (estilo Strava)
- Descoberta de picos de surf (spots)
- Comunidade e conexões entre surfistas

**Slogan**: "Cada onda conta uma história"

## 🎯 Objetivo

Criar um MVP funcional até **maio de 2026** com funcionalidades básicas de rede social focada em surf.

## 📚 Arquivos de Referência

Sempre consulte estes arquivos para entender o projeto:
- `README.md` - Visão conceitual do projeto
- `docs/README.md` - Documentação técnica
- `docs/ROADMAP.md` - Planejamento completo do MVP com fases e features

## 🛠️ Stack Tecnológica

### Backend (NestJS)
- **Runtime**: Bun (não usar npm/yarn)
- **Framework**: NestJS 11 com TypeScript 5
- **ORM**: TypeORM com PostgreSQL
- **Linter/Formatter**: Biome (não usar ESLint/Prettier)
- **Documentação**: Swagger + Redoc
- **Autenticação**: JWT com Passport
- **Validação**: class-validator e class-transformer

### Mobile (Flutter)
- **Framework**: Flutter
- **Linguagem**: Dart
- A criar no diretório `mobile/`

### Infraestrutura
- **Database**: PostgreSQL 16 (Docker local, AWS RDS prod)
- **Cache**: Redis (planejado)
- **Storage**: AWS S3 (imagens/vídeos)
- **Container**: Docker com Rancher Desktop

## 📁 Estrutura do Projeto

```
Tubo/
├── backend/          # API NestJS
├── mobile/           # App Flutter (a criar)
├── database/         # Scripts SQL e migrations
├── devops/           # Configs de infra
└── docs/             # Documentação técnica
```

## 🎨 Convenções de Código

### Backend (NestJS)

#### Estrutura de Módulos
```
src/modules/<nome>/
├── entities/        # TypeORM entities
├── dto/            # DTOs de request/response
├── <nome>.module.ts
├── <nome>.controller.ts
├── <nome>.service.ts
└── README.md       # Documentação do módulo
```

#### Naming Conventions
- **Entities**: PascalCase, singular (ex: `User`, `Post`, `Spot`)
- **DTOs**: PascalCase com sufixo (ex: `CreateUserDto`, `UpdatePostDto`)
- **Services**: PascalCase com Service (ex: `UsersService`, `AuthService`)
- **Controllers**: PascalCase com Controller (ex: `UsersController`)
- **Arquivos**: kebab-case (ex: `user.entity.ts`, `create-user.dto.ts`)

#### Biome (Linter/Formatter)
```bash
# Rodar linting e formatação
bun run check:fix

# Configuração em backend/biome.json
```

**Regras principais**:
- Single quotes
- Semicolons obrigatórios
- 2 espaços de indentação
- 100 caracteres por linha

#### TypeORM Patterns

**Entity Example**:
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

#### Controller Patterns

```typescript
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

#### DTO Patterns

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@surf.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
```

### API Design

#### Prefixo Global
Todas as rotas devem ter prefixo `/api/v1`:
- `GET /api/v1/users`
- `POST /api/v1/auth/login`

#### Response Patterns
```typescript
// Sucesso
{ data: {...}, message?: 'Operação bem-sucedida' }

// Erro
{ statusCode: 400, message: 'Mensagem de erro', error: 'Bad Request' }

// Paginação
{
  data: [...],
  meta: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
}
```

## 🔐 Autenticação

- **JWT** com Passport
- Tokens armazenados no header: `Authorization: Bearer <token>`
- Refresh tokens (planejado)
- Guards para rotas protegidas

## 🗄️ Database

### PostgreSQL Extensions
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- UUIDs
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- Full-text search
CREATE EXTENSION IF NOT EXISTS "postgis";      -- Geolocalização
```

### Migrations
```bash
# Gerar migration
bun run typeorm migration:generate src/database/migrations/MigrationName

# Rodar migrations
bun run typeorm migration:run
```

## 🎯 Próximas Features (MVP)

Consulte `docs/ROADMAP.md` para detalhes completos.

### Fase 1: Core Backend
- [x] Setup NestJS + TypeORM
- [ ] Módulo Auth (JWT)
- [ ] Módulo Users
- [ ] Módulo Posts
- [ ] Módulo Spots

### Fase 2: Mobile
- [ ] Setup Flutter
- [ ] Telas de autenticação
- [ ] Feed de posts
- [ ] Perfil de usuário

## 🚀 Comandos Úteis

```bash
# Backend
cd backend
bun install
bun run start:dev        # Dev mode
bun run build            # Build
bun run check:fix        # Lint + format

# Database
docker-compose up -d     # Subir PostgreSQL
docker-compose down      # Parar containers

# NestJS CLI
bun x @nestjs/cli generate module <nome>
bun x @nestjs/cli generate controller <nome>
bun x @nestjs/cli generate service <nome>
```

## 💡 Dicas para Sugestões

1. **Use Bun**, não npm/yarn
2. **Use Biome**, não ESLint/Prettier
3. **Siga os padrões** de estrutura de módulos
4. **Documente** endpoints com Swagger decorators
5. **Valide** inputs com class-validator
6. **Use TypeORM** patterns consistentes
7. **Pense em mobile-first** para as APIs
8. **Contexto brasileiro**: nomes em português onde fizer sentido (ex: "pico" em vez de "spot" internamente)

## 🌍 Contexto Cultural

- **Público**: Surfistas brasileiros
- **Linguagem**: Português BR na UI, inglês no código
- **Referências**: Instagram (social), Strava (tracking), Facebook (comunidade)
- **Foco**: Picos brasileiros, condições do mar BR, comunidade local

---

**Desenvolvedor**: Marcus Menezes (marcusmenezes2009@gmail.com)  
**Início**: Dezembro 2025  
**Meta MVP**: Maio 2026
