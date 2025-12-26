# 🗺️ Roadmap - Tubo

Planejamento de desenvolvimento e entrega do MVP

## 📋 Estrutura do Projeto

### Decisões Arquiteturais Pendentes

- [ ] Definir estrutura: Monorepo vs Multi-repo
- [ ] Escolher provedor de cloud (AWS / GCP / Azure)
- [ ] Definir banco de dados principal
- [ ] Definir estratégia de autenticação (JWT, OAuth, Firebase Auth)
- [ ] Escolher serviço de storage para imagens/vídeos (S3, Cloudinary, Firebase Storage)

---

## 🎯 MVP - Versão 1.0

### Fase 1: Setup e Fundação (2-3 semanas)

#### Backend (NestJS)
- [ ] Configurar projeto NestJS com TypeScript
- [ ] Estruturar módulos base (users, auth, posts)
- [ ] Configurar ORM (TypeORM / Prisma / Mongoose)
- [ ] Implementar autenticação e autorização
- [ ] Configurar variáveis de ambiente
- [ ] Setup de desenvolvimento com Docker (opcional)

#### Frontend (Flutter)
- [ ] Criar projeto Flutter
- [ ] Definir arquitetura de pastas
- [ ] Escolher e configurar state management
- [ ] Setup de rotas e navegação
- [ ] Criar design system base (cores, tipografia, componentes)
- [ ] Configurar chamadas HTTP (Dio / http)

#### DevOps
- [ ] Configurar repositório Git
- [ ] Definir estratégia de branches (Git Flow)
- [ ] Setup CI/CD básico
- [ ] Documentação de setup local

### Fase 2: Funcionalidades Core (4-6 semanas)

#### 👤 Autenticação e Perfil
- [ ] Cadastro de usuário (email/senha)
- [ ] Login/Logout
- [ ] Recuperação de senha
- [ ] Perfil de usuário
  - Nome, foto, bio
  - Nível de surf (iniciante, intermediário, avançado)
  - Localização (cidade/estado)
  - Spots favoritos

#### 📝 Posts e Feed
- [ ] Criar post de sessão
  - Texto/descrição
  - Upload de foto
  - Selecionar pico/spot
  - Condições do mar (altura onda, vento, maré)
  - Data e hora da sessão
- [ ] Feed de posts
  - Timeline com posts dos usuários seguidos
  - Infinite scroll
  - Pull to refresh
- [ ] Curtir posts
- [ ] Comentar posts
- [ ] Compartilhar posts

#### 🏖️ Spots/Picos
- [ ] Cadastro de spots
  - Nome do pico
  - Localização (mapa)
  - Descrição
  - Tipo de fundo (areia, pedra, coral)
  - Nível recomendado
  - Fotos do local
- [ ] Lista de spots
- [ ] Busca de spots por localização
- [ ] Detalhes do spot
  - Posts relacionados
  - Número de check-ins
  - Avaliação da galera

#### 👥 Social
- [ ] Buscar usuários
- [ ] Seguir/deixar de seguir usuários
- [ ] Ver perfis de outros usuários
- [ ] Lista de seguidores/seguindo

### Fase 3: Gamificação e Estatísticas (3-4 semanas)

#### 📊 Sistema de Tracking (Estilo Strava)
- [ ] Dashboard pessoal
  - Total de sessões
  - Horas surfadas
  - Spots visitados
  - Streak (dias consecutivos)
- [ ] Registro detalhado de sessão
  - Duração da sessão
  - Ondas pegadas (estimativa)
  - Quilometragem na água
  - Calorias queimadas
- [ ] Estatísticas mensais/anuais
  - Gráficos de progresso
  - Comparativo com período anterior
  - Melhores spots do mês
  - Dia/horário preferido
- [ ] Objetivos e metas
  - Definir metas pessoais
  - Progresso visual
  - Notificações de conquista

#### 🏆 Sistema de Conquistas
- [ ] Badges e conquistas
  - Primeira sessão
  - 10, 50, 100 sessões
  - Explorador (10 spots diferentes)
  - Madrugador (sessão antes das 7h)
  - Dedicado (7 dias consecutivos)
- [ ] Níveis de progressão
  - XP por atividades
  - Level up system
  - Títulos especiais
- [ ] Ranking e leaderboards
  - Ranking mensal/anual
  - Por região
  - Por categoria

#### 📱 Social Estilo Instagram/Facebook
- [ ] Feed algorítmico inteligente
- [ ] Explorar/Discover
- [ ] Trending posts
- [ ] Hashtags
- [ ] Menções (@)
- [ ] Salvar posts favoritos
- [ ] Compartilhar no feed de amigos

### Fase 4: Polimento e Testes (2-3 semanas)

- [ ] Tratamento de erros e loading states
- [ ] Otimização de performance
- [ ] Testes unitários (backend)
- [ ] Testes de widget (Flutter)
- [ ] Design responsivo e ajustes de UI/UX
- [ ] Documentação da API
- [ ] Testes em dispositivos reais

---

## 🚀 Pós-MVP - Funcionalidades Futuras

### Versão 1.1 - Aprimoramentos Sociais
- [ ] Notificações push
- [ ] Mensagens diretas (DM)
- [ ] Stories (24h)
- [ ] Badges e conquistas
- [ ] Sistema de reputação/karma
- [ ] Grupos/Comunidades por região

### Versão 1.2 - Informações e Dados
- [ ] Integração com APIs de previsão de ondas
  - Surfline
  - Windy
  - Magic Seaweed
- [ ] Gráficos de condições do mar
- [ ] Histórico de condições por spot
- [ ] Calendário de marés
- [ ] Alertas de swell
- [ ] Mapa interativo de spots

### Versão 1.3 - Marketplace e Serviços
- [ ] Marketplace de equipamentos
  - Compra/venda de pranchas
  - Aluguel de equipamentos
  - Troca de gear
- [ ] Anúncios de aulas/coaching
- [ ] Surf trips e eventos
- [ ] Parceria com lojas e escolas
- [ ] Sistema de avaliações

### Versão 1.4 - Gamificação Avançada
- [ ] Desafios mensais e semanais
- [ ] Sistema de times/squads
- [ ] Competições entre regiões
- [ ] Conquistas colaborativas
- [ ] Compartilhamento em outras redes sociais (Instagram, Facebook, Twitter)
- [ ] Modo competitivo vs amigos

### Versão 2.0 - Features Avançadas
- [ ] Upload e edição de vídeos
- [ ] Transmissão ao vivo (live streaming)
- [ ] IA para análise de ondas em vídeos
- [ ] Modo offline
- [ ] Widget para tela inicial (condições do mar)
- [ ] Apple Watch / Wear OS app
- [ ] Integração com smartwatches para tracking
- [ ] Versão web (Flutter Web ou React)

### Ideias Futuras (Backlog)
- [ ] Integração com câmeras de surf (Insta360, GoPro)
- [ ] Previsão personalizada baseada em preferências
- [ ] Sessões guiadas por IA
- [ ] Rede de caronas para picos
- [ ] Sistema de review de spots
- [ ] Mapa de spots secretos (privado)
- [ ] Integração com Strava
- [ ] Podcast/Blog integrado
- [ ] Loja oficial do app
- [ ] Programa de embaixadores

---

## 📊 Métricas de Sucesso (MVP)

### Técnicas
- [ ] App rodando em iOS e Android
- [ ] 100% das features do MVP implementadas
- [ ] Cobertura de testes > 70%
- [ ] Performance: app carrega em < 3s
- [ ] Zero crashes críticos

### Produto
- [ ] 100 usuários cadastrados
- [ ] 500 posts criados
- [ ] 50 spots cadastrados
- [ ] 1000+ sessões registradas
- [ ] 50+ badges conquistados pela comunidade
- [ ] Taxa de retenção D7 > 30%
- [ ] NPS > 40
- [ ] Engajamento diário > 20%

---

## 🛠️ Stack Técnica Detalhada (Proposta)

### Backend
```
- NestJS (Framework)
- TypeScript
- PostgreSQL (Dados relacionais) + MongoDB (Dados não-estruturados)
- TypeORM / Prisma
- JWT Authentication
- Socket.io (tempo real)
- AWS S3 / Cloudinary (storage)
- Redis (cache)
- Jest (testes)
```

### Frontend Mobile
```
- Flutter 3.x
- Dart 3.x
- Riverpod / Bloc (state management)
- Dio (HTTP client)
- cached_network_image
- Google Maps Flutter
- firebase_messaging (notificações)
- shared_preferences (storage local)
- image_picker / image_cropper
```

### Infraestrutura
```
- Docker / Docker Compose
- AWS / GCP (cloud)
- GitHub Actions (CI/CD)
- Sentry (error tracking)
- Google Analytics / Mixpanel
```

---

## 📚 Aprendizados Esperados

### Flutter/Dart
- [ ] Dominar Widgets e composição
- [ ] State management na prática
- [ ] Navegação complexa
- [ ] Animações e transições
- [ ] Performance optimization
- [ ] Build e deploy (App Store / Play Store)

### Backend/NestJS
- [ ] Arquitetura de microserviços (opcional)
- [ ] Design de APIs RESTful
- [ ] Autenticação e segurança
- [ ] Upload e processamento de arquivos
- [ ] WebSockets para real-time
- [ ] Otimização de queries

### DevOps
- [ ] CI/CD para apps mobile
- [ ] Deploy de APIs
- [ ] Monitoramento e logs
- [ ] Backup e recuperação

---

## 🎯 Cronograma Estimado

**Total MVP: ~4-5 meses**

- Setup e Fundação: 2-3 semanas
- Funcionalidades Core: 4-6 semanas
- Gamificação e Estatísticas: 3-4 semanas
- Polimento e Testes: 2-3 semanas
- Buffer para imprevistos: 2-3 semanas

**Início**: 25 de Dezembro de 2025  
**MVP Target**: Maio 2026

---

## 📝 Notas e Considerações

### Prioridades
1. **Funcionalidade > Perfeição**: Entregar um MVP funcional
2. **UX Simples**: Interface intuitiva e rápida
3. **Social + Gamificação**: Balance entre rede social (Instagram/Facebook) e tracking (Strava)
4. **Comunidade**: Foco em conectar surfistas
5. **Mobile First**: Experiência mobile impecável

### Riscos e Mitigações
- **Complexidade**: Começar simples, iterar depois
- **Escopo**: Manter MVP enxuto, evitar feature creep
- **Performance**: Otimizar desde o início
- **Custos**: Começar com tier free dos serviços

### Open Questions
- Como monetizar? (Ads, Premium, Marketplace)
- Moderação de conteúdo?
- Privacidade de spots secretos?
- Como validar spots cadastrados?

---

**🚀 Projeto iniciado em: 25 de Dezembro de 2025**

*Última atualização: 25 de Dezembro de 2025*
