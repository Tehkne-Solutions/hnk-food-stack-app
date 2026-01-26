# 🔐 CONFIGURAÇÃO FASE 10 - AUTH & PAYMENTS

## ⚙️ VARIÁVEIS DE AMBIENTE

Adicione ao `.env.local`:

```env
# ============================================
# SUPABASE (Existente - Verificar se está lá)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# ============================================
# MERCADO PAGO (Novo - Adicionar)
# ============================================
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=sandbox_xxxxx_sua_public_key
NEXT_SECRET_MERCADO_PAGO_ACCESS_TOKEN=sandbox_xxxxx_seu_access_token
MERCADO_PAGO_WEBHOOK_SECRET=seu_webhook_secret

# ============================================
# APLICAÇÃO
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 SETUP SUPABASE AUTH

### 1. Criar/Configurar Supabase Project

1. Ir para <https://supabase.com>
2. Sign in ou criar conta
3. Criar novo projeto ou usar projeto existente
4. Ir para **Settings > API Keys**
5. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY`

### 2. Configurar Email Provider

1. No Supabase, ir para **Authentication > Providers**
2. Ativar **Email**
3. Em **Email Settings**, configurar:
   - **Auth Email Templates**:
     - Magic Link template (default está ok)
     - Redirect URL: `http://localhost:3000/auth/callback`

### 3. Configurar Social Login (Opcional)

1. Em **Authentication > Providers**
2. Ativar **Google**:
   - Ir para Google Cloud Console
   - Criar OAuth credentials
   - Callback URL: `https://seu-dominio.supabase.co/auth/v1/callback?provider=google`
   - Copiar Client ID e Secret
   - Colar em Supabase

### 4. Criar Tabelas

Ir para **SQL Editor** no Supabase console e executar:

```sql
-- Criar tabela de usuários estendida (opcional)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: usuários só veem seu próprio perfil
CREATE POLICY "Users can view their own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);
```

---

## 💳 SETUP MERCADO PAGO

### 1. Criar Conta Mercado Pago

1. Ir para <https://www.mercadopago.com.br/developers>
2. Sign in ou criar conta
3. Ir para **Suas integrações > Credenciais de teste**
4. Você verá:
   - `Public key`: → `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`
   - `Access token`: → `NEXT_SECRET_MERCADO_PAGO_ACCESS_TOKEN`

### 2. Configurar Webhook

1. Em **Suas integrações > Webhooks**
2. Adicionar webhook URL: `https://seu-dominio.com/api/webhooks/payment`
3. Tipos de evento a escutar:
   - `payment.created`
   - `payment.updated`
   - `payment.completed`
   - `payment.declined`

### 3. Números de Teste (Sandbox)

**Pix (Sempre sucesso)**:

```
Chave Pix: qualquer@email.com
```

**Cartão Visa (Sucesso)**:

```
Número: 4111 1111 1111 1111
Venc.: 11/25
CVC: 123
```

**Cartão Mastercard (Recusado)**:

```
Número: 5555 5555 5555 4444
Venc.: 11/25
CVC: 123
```

---

## ✅ ARQUIVOS CRIADOS (FASE 10 - STEP 1)

### ✅ Serviços

- `src/services/auth.ts` - Utilitários de autenticação

### ✅ Componentes

- `src/components/protected-route.tsx` - Wrapper para rotas autenticadas
- `src/hooks/useAuth.tsx` - Hook para acessar usuário/auth

### ✅ Pages

- `app/auth/login/page.tsx` - Página de login com Magic Link + Social
- `app/auth/signup/page.tsx` - Página de signup
- `app/auth/callback/page.tsx` - Callback para confirmar Magic Link

---

## 🧪 TESTAR AUTH

### 1. Iniciar Dev Server

```bash
npm run dev
```

### 2. Testar Magic Link

1. Ir para `http://localhost:3000/auth/login`
2. Digitar email (ex: <teste@email.com>)
3. Clicar "Enviar Link de Acesso"
4. Verifique email (ou console Supabase) por link
5. Clicar no link do email
6. Deve fazer login automaticamente

### 3. Testar Social Login (se configurado)

1. Ir para login
2. Clicar "Continuar com Google"
3. Fazer login com Google
4. Deve fazer login automaticamente

### 4. Testar ProtectedRoute

```tsx
// Em qualquer page
import ProtectedRoute from "@/components/protected-route";

export default function MyPage() {
  return (
    <ProtectedRoute>
      <h1>Conteúdo protegido!</h1>
    </ProtectedRoute>
  );
}
```

---

## 🚨 TROUBLESHOOTING

**Erro: "supabaseUrl is required"**

- [ ] Verificar `.env.local` tem `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Restart dev server: `npm run dev`

**Erro: "Cannot find module '@supabase/supabase-js'"**

- [ ] Rodar: `npm install @supabase/supabase-js`
- [ ] Restart dev server

**Magic Link não chega no email**

- [ ] Verificar em Supabase > Authentication > Email Templates
- [ ] Testar com email real (não sandbox)
- [ ] Verificar spam folder

**Social Login não funciona**

- [ ] Verificar credenciais no Supabase
- [ ] Verificar redirect URL está correta
- [ ] Testar com usuario diferente

---

## 📊 PRÓXIMOS PASSOS

1. **Task 2**: Criar tabelas Supabase (pedidos, pedido_itens)
2. **Task 3**: Setup Mercado Pago SDK
3. **Task 4**: Criar /checkout page
4. **Task 5**: Implementar Pix Payment
5. **Task 6**: Implementar Card Payment
6. **Task 7**: Setup Webhook
7. **Task 8**: Testes & Deploy

---

## 📚 RECURSOS

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Mercado Pago SDK Node.js](https://www.mercadopago.com.br/developers/pt/reference)
- [Magic Link Pattern](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Next.js Auth Best Practices](https://nextjs.org/docs/app/building-your-application/authentication)
