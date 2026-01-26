# 📋 Instruções: Executar SQL Schema - FASE 10 Task 2

## ✅ Status: Pronto para Execução

O script SQL está pronto em: `DOCS/SCHEMA-FASE-10.sql`

---

## 🚀 Passo-a-Passo: Executar no Supabase

### 1️⃣ Acesse o Painel do Supabase

```
URL: https://supabase.com/dashboard
Projeto: qahnblupfaixfuhgrwiz
```

### 2️⃣ Navegue para SQL Editor

- Clique em **SQL Editor** (lado esquerdo)
- Clique em **+ New Query**

### 3️⃣ Cole o Script SQL

```bash
# Abra: DOCS/SCHEMA-FASE-10.sql
# Copie TODO o conteúdo
# Cole no editor do Supabase
```

### 4️⃣ Execute

### 5️⃣ Verifique Sucesso

Você deve ver:

```
✓ Query executed successfully
✓ Rows created: 4 tables
✓ Indexes created: 7
✓ Policies created: 12
```

Automated option (run locally)
--------------------------------

Se preferir executar o script automaticamente a partir do repositório local, há um helper em `scripts/run-sql-supabase.js`.

Requisitos:

- Node.js instalado
- Instalar dependência local: `npm install pg`
- Ter a string de conexão Postgres do Supabase (Project > Settings > Database > Connection string). NÃO compartilhe publicamente.

Exemplo PowerShell:

```
$env:SUPABASE_DB_URL = "postgres://user:password@db-host:5432/dbname"
node .\scripts\run-sql-supabase.js
```

Exemplo macOS/Linux:

```
SUPABASE_DB_URL="postgres://user:password@db-host:5432/dbname" node ./scripts/run-sql-supabase.js
```

O script executa o arquivo `DOCS/SCHEMA-FASE-10.sql` como uma única query. O arquivo foi escrito com `IF NOT EXISTS` e comandos idempotentes para evitar duplicação.

---

## 📊 O que será criado

### Tabelas (4)

- ✅ **pedidos** - Armazena pedidos do cliente
- ✅ **pedido_itens** - Itens dentro de cada pedido
- ✅ **payment_webhooks** - Log de webhooks do Mercado Pago
- ✅ **user_profiles** - Perfil do usuário

### Índices (7)

- Otimizam consultas de pedidos por user_id, payment_id, status

### Políticas de RLS (12)

- Segurança: cada usuário só vê seus próprios dados
- Impossível um usuário acessar pedidos de outro

### Views (1)

- `pedidos_com_resumo` - Pedidos com contagem de itens

### Triggers (2)

- Auto-atualiza `updated_at` quando registros mudam

---

## 🔑 Credentials (já configuradas)

```bash
# No seu .env.local você já tem:
NEXT_PUBLIC_SUPABASE_URL=https://qahnblupfaixfuhgrwiz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

---

## ✨ Próximos Passos Após Execução

1. **Verificar Tabelas** no Supabase Dashboard
   - Vá para **Table Editor**
   - Você deve ver 4 tabelas novas

2. **Testar Conexão** (código TypeScript)

   ```typescript
   const { data } = await supabase
     .from('pedidos')
     .select('*')
     .limit(1)
   
   console.log('Conexão OK:', data)
   ```

3. **FASE 10 Task 3** - Mercado Pago Integration
   - Instalar SDK: `npm install @mercadopago/sdk-nodejs`
   - Criar `src/services/payment.ts`
   - Setup credenciais sandbox

---

## ⚠️ Troubleshooting

**Erro: "permission denied"**

- Use a `SERVICE_ROLE_KEY` ao invés de `ANON_KEY`

**Erro: "table already exists"**

- O script usa `CREATE TABLE IF NOT EXISTS`
- Executar novamente é seguro

**Erro: "invalid UUID"**

- Certifique que UUIDs estão no formato correto
- SQL gera automaticamente com `uuid_generate_v4()`

---

## 📝 Checklist Final

- [ ] Acessei <https://supabase.com/dashboard>
- [ ] Criei uma nova query no SQL Editor
- [ ] Copiei o script de DOCS/SCHEMA-FASE-10.sql
- [ ] Cliquei em RUN
- [ ] Verifiquei que as 4 tabelas foram criadas
- [ ] Fechei as abas do navegador Supabase

**Quando tudo estiver pronto → Avise-me para prosseguir com FASE 10 Task 3!**
