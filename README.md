# 🏄‍♂️ Tubo - Monorepo

**Rede social para surfistas brasileiros**

*"Cada onda conta uma história"* 🌊

---

## 📁 Estrutura do Projeto

```
tubo/
├── backend/              # API NestJS + TypeScript
├── mobile/               # App Flutter
├── shared/               # Código compartilhado (types, constants)
├── database/             # Scripts e configurações do banco
│   ├── init/             # Scripts de inicialização do PostgreSQL
│   ├── migrations/       # Migrações do banco (futuro)
│   └── seeds/            # Dados de teste (futuro)
├── devops/               # CI/CD e scripts de automação
│   ├── github-actions/   # Workflows do GitHub Actions
│   └── scripts/          # Scripts úteis
├── docs/                 # Documentação do projeto
│   ├── README.md         # Visão geral e conceito
│   └── ROADMAP.md        # Planejamento e roadmap
├── docker-compose.yml    # Serviços para desenvolvimento local
├── .env.example          # Template de variáveis de ambiente
├── .gitignore
└── package.json          # Scripts do monorepo
```

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** >= 18.x
- **Bun** >= 1.0 (gerenciador de pacotes)
- **Rancher Desktop** ou Docker Desktop (para containers)
- **Flutter** >= 3.x
- **Dart** >= 3.x

### Setup Inicial

```bash
# Clone o repositório
git clone <repo-url>
cdSubir banco de dados local (PostgreSQL)
docker-compose up -d

#  tubo

# Instalar dependências root (quando houver)
bun install

# Setup backend
cd backend
bun install
bun run start:dev

# Setup mobile (em outro terminal)
cd mobile
flutter pub get
flutter run
```

## 📚 Documentação

- **[Documentação Completa](docs/README.md)** - Conceito, tecnologias e visão do projeto
- **[Roadmap](docs/ROADMAP.md)** - Planejamento de desenvolvimento e MVP

## 🛠️ Tecnologias

- **Backend**: NestJS, TypeScript, PostgreSQL/MongoDB
- **Mobile**: Flutter, Dart
- **Infraestrutura**: Docker, AWS/GCP (a definir)

## 📦 Workspaces

Este é um monorepo simples. Cada pasta (`backend/`, `mobile/`) é independente mas compartilham o mesmo repositório Git.

## 🎯 Status

🚧 **Em Desenvolvimento Inicial** - Iniciado em 25/12/2025

## 📄 Licença

A definir

---

Desenvolvido com ❤️ para a comunidade de surf brasileira
