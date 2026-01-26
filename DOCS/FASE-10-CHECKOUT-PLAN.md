# 🎯 FASE 10 - CHECKOUT & PAYMENTS

**Data Início**: 24 de Janeiro de 2026  
**Duração Estimada**: 3-4 dias  
**Prioridade**: ⭐⭐⭐ CRÍTICA (para vendas)  

---

## 📋 ROADMAP FASE 10

### 1️⃣ **AUTENTICAÇÃO SUPABASE** (Dia 1 - 2h)

- [ ] Setup Supabase Auth
- [ ] Magic Link + Social Login
- [ ] ProtectedRoute component
- [ ] User profile management

### 2️⃣ **MERCADO PAGO INTEGRATION** (Dia 1-2 - 3h)

- [ ] Setup SDK
- [ ] Pix QR Code generation
- [ ] Cartão de Crédito form
- [ ] Tokenização segura

### 3️⃣ **PÁGINA CHECKOUT** (Dia 2 - 3h)

- [ ] Resumo do pedido
- [ ] Dados do cliente
- [ ] Endereço entrega
- [ ] Seletor de pagamento

### 4️⃣ **WEBHOOK DE PAGAMENTO** (Dia 2-3 - 2h)

- [ ] API route para webhook
- [ ] Validação de assinatura
- [ ] Atualizar status pedido
- [ ] Retry logic

### 5️⃣ **NOTIFICAÇÕES** (Dia 3 - 2h)

- [ ] Email de confirmação
- [ ] n8n webhook
- [ ] WhatsApp notification
- [ ] Admin dashboard

### 6️⃣ **TESTES & DEPLOY** (Dia 3-4 - 2h)

- [ ] Testes manuais
- [ ] Sandbox testing
- [ ] Production readiness
- [ ] Deploy

---

## 🏗️ ARQUITETURA FASE 10

```
┌─────────────────────────────────────────────────┐
│              CHECKOUT FLOW                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  /checkout (Page)                              │
│  ├─ AuthRequired (ProtectedRoute)              │
│  ├─ Resumo do Carrinho                         │
│  ├─ Formulário Cliente                         │
│  ├─ Endereço Entrega                           │
│  ├─ Método Pagamento (Pix/Cartão)              │
│  └─ Button "Confirmar Pedido"                  │
│                                                 │
│  ↓                                              │
│                                                 │
│  /checkout/pix (Page) ou /checkout/card        │
│  ├─ Integração Mercado Pago                    │
│  ├─ QR Code Pix (dinâmico) ou                  │
│  ├─ Form Cartão (seguro)                       │
│  └─ Polling para confirmação                   │
│                                                 │
│  ↓                                              │
│                                                 │
│  /checkout/success (Page)                      │
│  ├─ Pedido confirmado                          │
│  ├─ Número do pedido                           │
│  ├─ Email de confirmação                       │
│  └─ Link para rastrear                         │
│                                                 │
│  Webhook (Background)                          │
│  └─ Mercado Pago → /api/webhooks/payment      │
│     └─ Atualizar BD + Enviar notificações      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📂 ARQUIVOS A CRIAR

### Componentes (5)

```
src/components/
├─ checkout-summary.tsx          (Resumo pedido)
├─ payment-method-selector.tsx   (Pix/Cartão)
├─ pix-payment.tsx               (QR Code)
├─ card-payment.tsx              (Form cartão)
└─ protected-route.tsx           (Auth check)
```

### Pages (4)

```
app/
├─ checkout/
│  ├─ page.tsx                  (Main checkout)
│  ├─ pix/
│  │  └─ page.tsx               (Pix payment)
│  ├─ card/
│  │  └─ page.tsx               (Card payment)
│  └─ success/
│     └─ page.tsx               (Confirmação)
```

### API Routes (1)

```
app/api/
└─ webhooks/
   └─ payment/route.ts          (Mercado Pago webhook)
```

### Services (2)

```
src/services/
├─ payment.ts                    (Mercado Pago SDK)
└─ order.ts                      (Create/update pedidos)
```

### Database (1)

```
Schema SQL:
├─ TABLE pedidos                 (id, user_id, total, status, method, created_at)
├─ TABLE pedido_itens            (id, pedido_id, product_id, qty, preco)
└─ TABLE payment_webhooks        (id, event_id, payload, processed_at)
```

---

## 🔐 AUTENTICAÇÃO FLOW

```
1. Usuário clica [Ir para Checkout]
   ↓
2. Se não autenticado:
   └─ Redirect /auth/login (Magic Link)
      ├─ Email input
      ├─ Click link no email
      └─ Auto-login + redirect /checkout
   ↓
3. Se autenticado:
   └─ Continue /checkout (normal)
      ├─ Carrinho
      ├─ Dados Cliente
      └─ Pagamento
```

---

## 💳 PAGAMENTO FLOW

```
MERCADO PAGO FLOW:

1. POST /api/payments/create
   ├─ Quantidade itens
   ├─ Total
   └─ Email cliente
   ↓
2. Mercado Pago retorna:
   ├─ payment_id
   ├─ qr_code (Pix)
   └─ init_point (Cartão)
   ↓
3. Frontend exibe:
   ├─ QR Code grande (Pix)
   └─ Form seguro (Cartão)
   ↓
4. Cliente paga:
   ├─ Escaneia QR code OU
   └─ Digita dados cartão
   ↓
5. Mercado Pago → Webhook
   ├─ POST /api/webhooks/payment
   ├─ Validar assinatura
   ├─ Atualizar BD
   └─ Enviar notificações
   ↓
6. Frontend (polling):
   ├─ GET /api/payments/{payment_id}/status
   ├─ Se pago:
   │  └─ Redirect /checkout/success
   └─ Se pendente:
      └─ Continue aguardando
```

---

## 📊 TABELAS SUPABASE

### pedidos

```sql
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Dados cliente
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  
  -- Endereço
  endereco VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(255),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  
  -- Pedido
  total DECIMAL(10, 2) NOT NULL,
  taxa_entrega DECIMAL(10, 2) DEFAULT 5.00,
  
  -- Pagamento
  payment_method VARCHAR(50), -- 'pix' | 'card'
  payment_id VARCHAR(255), -- Mercado Pago ID
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  UNIQUE(payment_id)
);
```

### pedido_itens

```sql
CREATE TABLE pedido_itens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  
  product_id VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INTEGER NOT NULL,
  
  created_at TIMESTAMP DEFAULT now()
);
```

### payment_webhooks (para debug)

```sql
CREATE TABLE payment_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100),
  payment_id VARCHAR(255),
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  
  created_at TIMESTAMP DEFAULT now(),
  processed_at TIMESTAMP
);
```

---

## 🔑 ENVIRONMENT VARIABLES

```env
# Mercado Pago
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=sandbox_xxxxx
NEXT_SECRET_MERCADO_PAGO_ACCESS_TOKEN=sandbox_xxxxx
MERCADO_PAGO_WEBHOOK_SECRET=xxxxx

# Supabase (já deve existir)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY=

# n8n (para notificações)
N8N_WEBHOOK_URL=https://n8n.seu-dominio.com/webhook/payment
```

---

## ✅ CHECKLIST FASE 10

### Setup

- [ ] Setup Supabase Auth
- [ ] Criar tabelas BD
- [ ] Setup Mercado Pago (Sandbox)
- [ ] Criar .env.local com credenciais

### Componentes

- [ ] CheckoutSummary
- [ ] PaymentMethodSelector
- [ ] PixPayment
- [ ] CardPayment
- [ ] ProtectedRoute

### Pages

- [ ] /checkout (main)
- [ ] /checkout/pix
- [ ] /checkout/card
- [ ] /checkout/success
- [ ] /auth/login (se não existir)

### API

- [ ] POST /api/payments/create
- [ ] GET /api/payments/{id}/status
- [ ] POST /api/webhooks/payment
- [ ] POST /api/orders/create

### Testes

- [ ] Login/Auth works
- [ ] Pix QR code appears
- [ ] Card form appears
- [ ] Webhook recebe notificações
- [ ] Email enviado
- [ ] Status atualizado

---

## ⏱️ TIMELINE

```
DIA 1 (24 Jan)
├─ 09:00 - Setup Supabase Auth + BD
├─ 11:00 - ProtectedRoute component
├─ 14:00 - Mercado Pago SDK setup
└─ 17:00 - Pix payment component

DIA 2 (25 Jan)
├─ 09:00 - Card payment component
├─ 11:00 - Checkout page (main)
├─ 14:00 - API routes
└─ 17:00 - Webhook setup

DIA 3 (26 Jan)
├─ 09:00 - Email + n8n integration
├─ 11:00 - Testing
├─ 14:00 - Fixes + polish
└─ 17:00 - Deploy to staging

DIA 4 (27 Jan)
├─ 09:00 - Production testing
├─ 12:00 - Final validation
└─ 15:00 - Deploy to production
```

---

## 🎓 TECH STACK FASE 10

- **Backend**: Next.js API Routes
- **Auth**: Supabase Auth + NextAuth (opcional)
- **Payment**: Mercado Pago SDK
- **Database**: Supabase PostgreSQL
- **Email**: SendGrid ou Brevo
- **Notifications**: n8n webhooks
- **Validation**: Zod schemas
- **UI**: Radix UI + Framer Motion

---

## 📚 RECURSOS

### Mercado Pago Docs

- <https://www.mercadopago.com.br/developers/pt/reference>

### Supabase Auth

- <https://supabase.com/docs/guides/auth>

### NextAuth (opcional para social)

- <https://next-auth.js.org/>

### n8n

- <https://n8n.io/docs/>

---

## 🚨 CONSIDERAÇÕES IMPORTANTES

1. **Sandbox Testing**
   - Usar credenciais sandbox até confirmar
   - Números de teste: 4111 1111 1111 1111 (Visa)

2. **Segurança**
   - Nunca expor access token no frontend
   - Validar webhook com assinatura
   - PCI compliance para cartão

3. **Retry Logic**
   - Implementar tentativas de pagamento
   - Timeout de 15 min para Pix
   - Handle falhas gracefully

4. **UX**
   - Loading states durante pagamento
   - Feedback visual claro
   - Error messages amigáveis

---

## ✨ PRÓXIMO PASSO

**Começar com**:

1. Setup Supabase Auth
2. Criar tabelas BD
3. Setup Mercado Pago SDK
4. Primeira component: ProtectedRoute

**Estimado**: 2 horas para começar a testar

---

Pronto para começar? 🚀

Qual parte você quer implementar primeiro?
