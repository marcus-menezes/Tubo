# 📮 Postman Collection - Tubo API

Arquivos de configuração para testar a API Tubo usando o Postman.

## 📁 Arquivos

- **`Tubo-API.postman_collection.json`** - Collection completa com todos os endpoints
- **`Tubo-Local.postman_environment.json`** - Environment para desenvolvimento local

## 🚀 Como Usar

### 1. Importar no Postman

#### Via Postman App

1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Arraste os dois arquivos `.json` ou clique em **Upload Files**
4. Confirme a importação

#### Via Postman Web

1. Acesse https://web.postman.co/
2. Clique em **Import** no workspace
3. Faça upload dos arquivos

### 2. Configurar o Environment

1. No Postman, clique no dropdown de **Environments** (canto superior direito)
2. Selecione **Tubo Local**
3. Verifique as variáveis:
   - `base_url`: `http://localhost:3000/api/v1`
   - `jwt_token`: (vazio inicialmente, preenchido automaticamente após login)

### 3. Iniciar o Backend

Certifique-se de que a API está rodando:

```bash
cd backend
bun run start:dev
```

API disponível em: http://localhost:3000

### 4. Testar os Endpoints

#### Fluxo Recomendado:

1. **Health Check**

   - `GET /health` - Verifica se a API está funcionando
   - `GET /health/ping` - Ping rápido

2. **Autenticação**

   - `POST /auth/register` - Cria um novo usuário
     - O JWT token é salvo automaticamente no environment
   - `POST /auth/login` - Faz login com usuário existente
     - O JWT token é salvo automaticamente
   - `GET /auth/profile` - Busca dados do usuário autenticado

3. **Usuários**
   - `GET /users` - Lista todos os usuários
   - `GET /users/:id` - Busca um usuário específico
   - `POST /users` - Cria novo usuário
   - `PATCH /users/:id` - Atualiza usuário
   - `DELETE /users/:id` - Remove usuário

## 🔐 Autenticação

### Token Automático

Os endpoints de **Register** e **Login** têm scripts que salvam automaticamente o JWT token no environment. Você não precisa copiar/colar manualmente.

### Token Manual

Se precisar configurar manualmente:

1. Faça login via `POST /auth/login`
2. Copie o `access_token` da resposta
3. Vá em **Environments** > **Tubo Local**
4. Cole o token na variável `jwt_token`
5. Salve

### Endpoints Protegidos

Os seguintes endpoints requerem autenticação (JWT token):

- `GET /auth/profile`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

A collection está configurada para usar automaticamente o token do environment.

## 📝 Variáveis de Environment

| Variável    | Descrição                 | Valor Padrão                        |
| ----------- | ------------------------- | ----------------------------------- |
| `base_url`  | URL base da API           | `http://localhost:3000/api/v1`      |
| `jwt_token` | Token JWT de autenticação | (vazio, preenchido automaticamente) |

## 🌍 Múltiplos Ambientes

Você pode criar environments adicionais para outros ambientes:

### Development

```json
{
  "base_url": "http://localhost:3000/api/v1"
}
```

### Staging

```json
{
  "base_url": "https://staging.tubo.app/api/v1"
}
```

### Production

```json
{
  "base_url": "https://api.tubo.app/api/v1"
}
```

## 🔄 Atualizando a Collection

Se novos endpoints forem adicionados à API:

1. **Manualmente**: Adicione novos requests na collection do Postman
2. **Via Swagger**: A API tem documentação Swagger em `/api/docs`
   - Você pode importar diretamente do Swagger/OpenAPI
   - File > Import > Link: `http://localhost:3000/swagger-json`

## 🐛 Troubleshooting

### Erro de conexão

```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Solução**: Certifique-se de que o backend está rodando (`bun run start:dev`)

### Token inválido

```
401 Unauthorized
```

**Solução**:

1. Faça login novamente (`POST /auth/login`)
2. Verifique se o token está no environment
3. Token pode ter expirado (padrão: 7 dias)

### CORS Error

```
Access to fetch at '...' has been blocked by CORS policy
```

**Solução**: O backend já tem CORS habilitado. Certifique-se de usar o Postman desktop app, não a versão web.

## 📚 Recursos Adicionais

- **Swagger UI**: http://localhost:3000/swagger
- **Redoc**: http://localhost:3000/api/docs
- **Swagger JSON**: http://localhost:3000/swagger-json

## 🤝 Contribuindo

Se você adicionar novos endpoints, por favor:

1. Atualize a collection Postman
2. Adicione exemplos de request/response
3. Documente as variáveis necessárias
4. Teste todos os fluxos

---

**Desenvolvedor**: Marcus Menezes  
**Versão da API**: 1.0.0
