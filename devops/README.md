# 🚀 DevOps - Tubo

Arquivos de CI/CD, automação e scripts para o projeto Tubo.

## 📁 Estrutura

```
devops/
├── github-actions/       # Workflows do GitHub Actions (futuro)
└── scripts/              # Scripts úteis de automação
```

## 📦 Docker

Os arquivos do Docker estão na **raiz do projeto**:

- `docker-compose.yml` - Serviços para desenvolvimento local
- `.env.example` - Template de variáveis de ambiente
- `init-scripts/` - Scripts de inicialização do PostgreSQL

Para subir o ambiente local:

```bash
# Na raiz do projeto
docker-compose up -d
```

Veja mais detalhes na [documentação principal](../README.md).

## 🔄 CI/CD

Os workflows do GitHub Actions serão adicionados em `github-actions/` conforme o projeto evolui.

## 🛠️ Scripts

Scripts úteis de automação serão adicionados em `scripts/` conforme necessário.

---

**Última atualização**: 25 de Dezembro de 2025
