-- Tubo Database Initialization Script
-- Executado automaticamente na primeira vez que o container PostgreSQL sobe

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- Para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Para busca full-text
CREATE EXTENSION IF NOT EXISTS "postgis";        -- Para dados geográficos (spots de surf) - opcional

-- Log de inicialização
DO $$
BEGIN
    RAISE NOTICE 'Tubo database initialized successfully! 🏄‍♂️';
END $$;
