# FASE 10 - Task 2: Executar SQL no Supabase ✅

## Status

- ✅ Dev Server rodando em `http://localhost:3000`
- ✅ Todas as dependências instaladas
- ✅ Schema SQL pronto em `DOCS/SCHEMA-FASE-10.sql`
- 🔄 **AGORA**: Executar SQL no Supabase

## Passos para Executar

### 1️⃣ Acessar Supabase Console

```
URL: https://qahnblupfaixfuhgrwiz.supabase.co
```

### 2️⃣ Navegar para SQL Editor

- No menu lateral, clique em **"SQL Editor"**
- Clique em **"New Query"** ou **"+"**

### 3️⃣ Copiar e Colar SQL

O SQL completo está em `DOCS/SCHEMA-FASE-10.sql`

**Copia tudo do arquivo e cola no editor SQL do Supabase**

### 4️⃣ Executar

Clique no botão **"Run"** ou **⌘ + Enter**

### ✅ Resultado Esperado

```
Success
Query returned 0 rows
```

## O que será criado

### 📋 Tabelas

1. **pedidos** - Tabela de pedidos
   - 20+ colunas para dados do pedido
   - Índices de performance
   - Políticas RLS (Row Level Security)

2. **pedido_itens** - Itens do pedido
   - product_id, nome, preco, quantidade
   - Foreign key para pedidos (cascading delete)

3. **payment_webhooks** - Webhook audit trail
   - event_id, event_type, payload (JSONB)
   - retry_count, error_message

4. **user_profiles** - Perfis estendidos
   - full_name, avatar_url, phone
   - Endereço padrão

### 🔐 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- **Políticas de acesso**:
  - Usuários veem apenas seus próprios pedidos
  - INSERT/UPDATE/DELETE protegidos

### ⚙️ Automatização

- **Função**: `update_updated_at_column()`
- **Triggers**: Auto-atualiza `updated_at` em INSERT/UPDATE
- **View**: `pedidos_com_resumo` para dashboard

### 📊 Índices criados

```
idx_pedidos_user_id
idx_pedidos_payment_id
idx_pedidos_status
idx_pedidos_created_at
idx_pedido_itens_pedido_id
idx_payment_webhooks_event_id
idx_payment_webhooks_payment_id
idx_payment_webhooks_processed
```

## Próximos Passos após executar SQL

### ✅ Validar Setup

1. Ir para **"Database"** > **"Tables"** no console
2. Deve ver as 4 tabelas listadas:
   - `pedidos`
   - `pedido_itens`
   - `payment_webhooks`
   - `user_profiles`

### 🧪 Testar Fluxo Completo

1. Abrir <http://localhost:3000/auth/login>
2. Digitar um email qualquer
3. Deve receber um email de confirmation link (se Supabase email está configurado)
4. Clicar no link para autenticar

### 💳 Próximas Tasks (FASE 10)

- **Task 3**: Integrar Mercado Pago SDK
- **Task 4**: Criar páginas de Checkout
- **Task 5**: Implementar PIX e Card payment
- **Task 6**: Setup Webhooks para pagamentos

## SQL Executado

Arquivo: `DOCS/SCHEMA-FASE-10.sql`

### Resumo do que cada seção faz

**Seção 1: Tabela `pedidos`**

```sql
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- ... 40+ linhas de schema
  CONSTRAINT unique_payment_id UNIQUE(payment_id)
);
```

**Seção 2: Tabela `pedido_itens`**

```sql
CREATE TABLE IF NOT EXISTS pedido_itens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  -- ... product details
);
```

**Seção 3: Tabela `payment_webhooks`**

```sql
CREATE TABLE IF NOT EXISTS payment_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(255) UNIQUE NOT NULL,
  -- ... webhook details
);
```

**Seção 4-5: Função trigger + `user_profiles`**

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  -- ... profile details
);
```

## ⚠️ Importante

1. **Este arquivo é seguro para executar**: Usa `IF NOT EXISTS` então é idempotent (seguro rodar múltiplas vezes)

2. **RLS está habilitado** para segurança multi-tenant

3. **Dados de teste comentados** na seção final (remova em produção)

4. **Email deve estar configurado** no Supabase para enviar confirmation links

---

**Status**: 🟢 Pronto para executar SQL

**Tempo estimado**: 30-60 segundos

**Próximo passo**: Ir para Task 3 (Mercado Pago SDK)
