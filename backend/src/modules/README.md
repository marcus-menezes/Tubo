# 🔐 Módulos Auth e Users

## ✅ O que foi implementado

### 👥 Módulo Users
- **Entity**: User com campos essenciais (email, password, name, avatar, bio, location)
- **DTOs**: CreateUserDto, UpdateUserDto, UserResponseDto (com exclusão de password)
- **Service**: CRUD completo com hash de senha usando bcrypt
- **Controller**: Endpoints REST para gerenciar usuários

### 🔑 Módulo Auth
- **JWT Strategy**: Autenticação com Passport JWT
- **Guards**: JwtAuthGuard para proteger rotas
- **Decorators**: @CurrentUser para acessar usuário autenticado
- **Endpoints**: Register, Login, Me

## 📡 Endpoints Disponíveis

### Auth (`/api/v1/auth`)

#### POST `/api/v1/auth/register`
Registrar novo usuário

**Body**:
```json
{
  "email": "joao@surf.com",
  "password": "senha123",
  "name": "João da Silva",
  "bio": "Surfista desde 2015",
  "location": "Florianópolis, SC"
}
```

**Response**:
```json
{
  "user": {
    "id": "uuid",
    "email": "joao@surf.com",
    "name": "João da Silva",
    "bio": "Surfista desde 2015",
    "location": "Florianópolis, SC",
    "isActive": true,
    "createdAt": "2025-12-26T03:00:00.000Z",
    "updatedAt": "2025-12-26T03:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/auth/login`
Login de usuário existente

**Body**:
```json
{
  "email": "joao@surf.com",
  "password": "senha123"
}
```

**Response**:
```json
{
  "user": {
    "id": "uuid",
    "email": "joao@surf.com",
    "name": "João da Silva",
    ...
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/v1/auth/me` 🔒
Obter dados do usuário autenticado

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response**:
```json
{
  "id": "uuid",
  "email": "joao@surf.com",
  "name": "João da Silva",
  ...
}
```

### Users (`/api/v1/users`)

#### GET `/api/v1/users` 🔒
Listar todos os usuários

**Headers**:
```
Authorization: Bearer <access_token>
```

#### GET `/api/v1/users/:id` 🔒
Buscar usuário por ID

#### PATCH `/api/v1/users/:id` 🔒
Atualizar usuário

**Body** (todos campos opcionais):
```json
{
  "name": "Novo Nome",
  "bio": "Nova bio",
  "location": "Nova localização"
}
```

#### DELETE `/api/v1/users/:id` 🔒
Deletar usuário

## 🧪 Como Testar

### 1. Registrar um usuário
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@surf.com",
    "password": "senha123",
    "name": "Teste Surfista"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@surf.com",
    "password": "senha123"
  }'
```

### 3. Usar o token nas rotas protegidas
```bash
# Copie o access_token da resposta do login

curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🔐 Segurança Implementada

- ✅ Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ JWT com expiração de 7 dias (configurável via .env)
- ✅ Password nunca retornado nas responses (ClassSerializerInterceptor)
- ✅ Validação de inputs com class-validator
- ✅ Guards para proteger rotas sensíveis

## 🎯 Próximos Passos

1. **Refresh Tokens** - Implementar refresh token para renovar access tokens
2. **Email Verification** - Confirmar email do usuário
3. **Password Reset** - Recuperação de senha via email
4. **Rate Limiting** - Proteção contra brute force
5. **OAuth** - Login social (Google, Facebook)

## 📚 Documentação

Acesse a documentação interativa:
- **Redoc**: http://localhost:3000/docs
- **Swagger**: http://localhost:3000/swagger
