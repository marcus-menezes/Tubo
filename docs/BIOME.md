# Biome Configuration

Este arquivo configura o [Biome](https://biomejs.dev/) para todo o monorepo.

## O que é Biome?

Biome é uma ferramenta moderna e rápida que substitui ESLint + Prettier, oferecendo:

- **Linting** - Análise estática de código
- **Formatting** - Formatação automática
- **Organize imports** - Organização de imports

## Estrutura

```
Tubo/
├── biome.json          # ⭐ Configuração única para todo o monorepo
└── backend/
    └── src/            # Código TypeScript formatado automaticamente
```

**Nota**: A configuração é centralizada. Não há `biome.json` nos subprojetos.

## Comandos

### Na raiz do projeto (formata tudo)

```bash
# Formatar todo o monorepo
bun run format

# Apenas verificar formatação
bun run format:check

# Lint (verificar problemas)
bun run lint

# Lint e corrigir automaticamente
bun run lint:fix

# Check completo (lint + format)
bun run check

# Check e fix tudo
bun run check:fix
```

### No backend

```bash
# Rodar da raiz (recomendado)
bun run check:fix

# Ou formatar apenas o backend
bunx biome check --write ./backend
```

```

## Configuração

### Regras Globais (biome.json na raiz)
Arquivo Único (biome.json na raiz)

Toda a configuração está centralizada em um único arquivo na raiz do monorepo.
- **Formatter**:
  - Indentação: 2 espaços
  - Line width: 100 caracteres
  - Quotes: Double quotes
  - Semicolons: Sempre
  - Trailing commas: Sempre

- **Linter**:
  - Regras recomendadas habilitadas
  - `noExplicitAny`: warning (não error)
  - `useImportType`: desabilitado

### Overrides por Projeto
da raiz tem overrides específicos para cada projeto:
- **backend/**: Regras TypeScript/NestJS específicas
- **mobile/**: Dart (Biome desabilitado - usa `dart format`)

Não é necessário criar `biome.json` em cada subprojeto.
- **mobile/**: Dart (Biome desabilitado - usa dart format)

## Integração com VS Code

Instale a extensão:
```

ext install biomejs.biome

````

Configuração automática (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
````

## CI/CD

No pipeline, adicione:

```yaml
- name: Check code quality
  run: bun run check
```

## Ignorar Arquivos

O `biome.json` já ignora automaticamente:

- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- Lock files

## Migração do ESLint/Prettier

Se você tinha ESLint ou Prettier antes:

1. **Remova** packages antigos:

   ```bash
   bun remove eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. **Delete** arquivos de config:

   ```bash
   rm .eslintrc.js .prettierrc .eslintignore .prettierignore
   ```

3. **Use** Biome:
   ```bash
   bun run check:fix
   ```

## Performance

Biome é escrito em Rust e é **muito mais rápido**:

- ~10-20x mais rápido que ESLint
- ~100x mais rápido que Prettier
- Ideal para monorepos grandes

---

**Nota**: O backend ainda tem seu próprio `biome.json` para compatibilidade, mas ele herda da configuração da raiz.
