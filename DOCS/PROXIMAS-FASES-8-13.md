# 📋 PRÓXIMAS FASES - ROADMAP COMPLETO

**Baseado em**: PROMPT PARA O APP FOOD STACK - FINAL.MD  
**Status**: 🎯 Definido e documentado  
**Data**: Janeiro 2026

---

## 🚀 FASE 8: E-Commerce Completo (Modal & Carrinho)

### Objectives

✅ Modal de detalhe de produto ao clicar  
✅ Gerenciamento de carrinho (sidebar/sheet)  
✅ Favoritos e lista de desejos  
✅ Cross-selling e recomendações  

### Features

- **Modal de Produto**:
  - Detalhes completos (descrição, imagens, preço)
  - Seletor de quantidade
  - Botões: Carrinho, Favoritos, Lista de Desejos
  - Seção de upsell (kits, recomendações)
  - Banner institucional sobre eventos

- **Cart Sheet** (Header):
  - Listagem de itens com edição
  - Subtotal e cálculo automático
  - Seção "Você também pode gostar"
  - Button para checkout

- **Database Tables**:
  - `favoritos` (user_id, product_id, tipo: favorito|wishlist)
  - `cart_items` (user_id, product_id, quantidade)
  - `recomendacoes` (product_id, recommended_product_id)

### Tech Stack

- **UI**: Radix UI + Shadcn components
- **State**: Cart Context + useCart hook
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS (Dark/Gold theme)

**Estimated**: 40-60 horas

---

## 🎬 FASE 9: Social-to-Blog Integration

### Objectives

✅ Importação automática do Instagram para Blog  
✅ Transformação com SEO refatorado  
✅ Abas flutuantes social (Fixed left sidebar)  
✅ Otimização para buscadores (JSON-LD)

### Features

- **InstagramSmartFeed Component**:
  - Fetch posts do Instagram (via API Instagram Graph)
  - Transformação automática com IA (Gemini)
  - Geração de slug, meta-description, tags
  - Status draft/published

- **Database Tables**:
  - `posts_blog` (id_instagram, titulo, conteudo_seo, slug, meta_description, tags, status)
  - `social_posts` (instagram_id, blog_post_id, sync_status)
  - `seo_keywords` (post_id, keyword, search_volume)

- **n8n Workflow**:
  - Trigger: Instagram Watch New Media
  - Process: Gemini API para transformação
  - Output: Salvar em posts_blog
  - Notification: WhatsApp ao criador

- **Blog Pages**:
  - `/blog` - Listagem de posts
  - `/blog/[slug]` - Post individual com SEO
  - `/blog/search` - Busca com filtros
  - Social cards flutuantes (Follow, Share)

### Tech Stack

- **API**: Instagram Graph API
- **IA**: Gemini 1.5 Pro (transformação de conteúdo)
- **Automation**: n8n workflow
- **SEO**: Next.js generateMetadata + JSON-LD
- **Fixed Widgets**: Framer Motion + position fixed

**Estimated**: 50-70 horas

---

## 💳 FASE 10: Checkout & Payments

### Objectives

✅ Autenticação segura (Supabase Auth + Magic Link)  
✅ Pagamento via Pix (QR Code dinâmico)  
✅ Pagamento via Cartão de Crédito  
✅ Webhook de confirmação em tempo real  

### Features

- **Authentication**:
  - Supabase Auth (Magic Link + Social Login)
  - ProtectedRoute para checkout
  - User profile management
  - Histórico de pedidos

- **Payment Methods**:
  - **Pix** (Mercado Pago):
    - Geração dinâmica de QR Code
    - Copy & Paste chave
    - Timer de expiração (10 min)
    - Polling para confirmação

  - **Cartão de Crédito** (Mercado Pago):
    - Tokenização segura
    - 3D Secure para segurança
    - Parcelamento (1-12x)
    - Validação em tempo real

- **Order Management**:
  - Database table `pedidos` (user_id, items, total, status, payment_method, created_at)
  - Database table `pedido_itens` (pedido_id, product_id, quantidade, preco)
  - Status flow: pending → paid → shipped → delivered

- **Webhook Handler**:
  - `/api/webhooks/payment` (Mercado Pago)
  - Atualiza status do pedido
  - Dispara notificação via n8n (WhatsApp)
  - Email de confirmação

- **UI Components**:
  - Resumo do pedido (elegante, clara)
  - Modal de pagamento Pix (QR Code grande)
  - Form seguro para cartão
  - Loading states e feedback visual

### Security

- ✅ Zod validation (backend)
- ✅ Idempotency keys (previne duplicação)
- ✅ SSL/TLS (Vercel HTTPS)
- ✅ Nunca expor API keys no frontend
- ✅ Sandbox mode para testes

### Tech Stack

- **Payments**: Mercado Pago SDK + Asaas (futuro)
- **Validation**: Zod schemas
- **Auth**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **Webhook**: NextAuth webhooks + n8n

### API Keys Needed

```env
MP_ACCESS_TOKEN=sandbox_xxx
MP_PUBLIC_KEY=sandbox_xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

**Estimated**: 60-80 horas

---

## 📧 FASE 11: CRM & Automations

### Objectives

✅ Gestão de clientes (CRM)  
✅ Automações de email/WhatsApp  
✅ Segmentação de leads  
✅ Follow-ups automáticos  

### Features

- **CRM Tables**:
  - `clientes` (email, phone, nome, tag, status, created_at)
  - `interacoes` (cliente_id, tipo: email|whatsapp|sms, conteudo, created_at)
  - `automacoes` (nome, trigger, acao, status, created_at)

- **Automations**:
  - **Pós-Compra**: "Obrigado pela compra" (WhatsApp + Email)
  - **Carrinho Abandonado**: Lembrete após 2h (Email)
  - **Inatividade**: "Sentimos sua falta" após 30 dias (WhatsApp)
  - **Eventos**: "Próximos eventos" (Email semanal)
  - **Aniversário**: +10% desconto (WhatsApp)

- **n8n Workflows**:
  - Trigger: Payment confirmed → Send WhatsApp
  - Trigger: Email open → Tag cliente
  - Trigger: No purchase in 30 days → Send reminder
  - Trigger: Birthday → Send discount coupon

- **Admin Dashboard**:
  - View clientes (lista, filtros)
  - View interações (histórico por cliente)
  - View automações (ativas, desativadas)
  - Enviar email/WhatsApp manual

### Tech Stack

- **CRM**: Supabase tables + Realtime
- **Email**: SendGrid ou Brevo
- **WhatsApp**: Evolution API + n8n
- **Automation**: n8n workflows
- **Analytics**: Google Analytics 4

**Estimated**: 40-60 horas

---

## 📱 FASE 12: Mobile App (React Native)

### Objectives

✅ App iOS/Android nativo  
✅ Push notifications  
✅ Offline-first data  
✅ Integração com cartão de fidelização  

### Features

- **Funcionalidades**:
  - Login/registro
  - Browse menu
  - Carrinho e checkout
  - Histórico de pedidos
  - Favoritos
  - Programa de fidelização (loyalty)
  - Push notifications
  - QR code scanner (para eventos)

- **Tech Stack**:
  - React Native com Expo
  - TypeScript
  - Redux ou Zustand para state
  - React Query para API
  - Firebase Cloud Messaging (push)
  - Stripe Mobile SDK

**Estimated**: 120-160 horas

---

## 🎯 FASE 13: Advanced Analytics & Reporting

### Objectives

✅ Dashboard avançado de vendas  
✅ Relatórios customizados  
✅ Previsão de demanda (ML)  
✅ Segmentação de clientes  

### Features

- **Analytics Dashboard**:
  - Revenue (total, por produto, por período)
  - Customers (novo, repeat, LTV)
  - Products (best sellers, low stock alerts)
  - Eventos (agendamentos, receita eventos)
  - Marketing (ROI, CAC, conversion rate)

- **Reports**:
  - Vendas diárias/semanais/mensais
  - Produtos mais vendidos
  - Clientes top spenders
  - Análise de cesta média
  - Performance de eventos

- **ML Predictions**:
  - Previsão de vendas (prophet/ARIMA)
  - Churn prediction
  - Product recommendations
  - Dynamic pricing

- **Tools**:
  - Metabase (self-hosted)
  - Google BigQuery (data warehouse)
  - Python scripts (ML models)

**Estimated**: 80-120 horas

---

## 📋 ROADMAP TIMELINE

```
JAN/2026:
└─ FASE 8: E-Commerce Modal (2-3 semanas)

FEV/2026:
├─ FASE 9: Social-to-Blog (2-3 semanas)
└─ FASE 10: Checkout & Payments (3-4 semanas)

MAR/2026:
├─ FASE 11: CRM & Automations (2-3 semanas)
└─ Testes e correções

ABR/2026:
└─ FASE 12: Mobile App (4-5 semanas, paralelo)

MAI/2026:
├─ FASE 13: Advanced Analytics
└─ Otimizações e performance

JUN/2026:
└─ Lançamento v2.0 (Production Ready)
```

---

## 📊 ARQUITETURA GERAL (FIM DO ROADMAP)

```
┌─────────────────────────────────────────────────────────────┐
│                    HNK FOOD STACK v2.0                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend:                                                  │
│  ├─ Next.js (Web)         ← FASE 8-11                      │
│  ├─ React Native (Mobile) ← FASE 12                        │
│  └─ Admin Dashboard       ← FASE 11, 13                    │
│                                                              │
│  Backend:                                                   │
│  ├─ Server Actions (Payments, CRM)                         │
│  ├─ API Routes (Webhooks)                                  │
│  └─ n8n (Automations)                                      │
│                                                              │
│  Data:                                                      │
│  ├─ Supabase (Main DB)                                     │
│  ├─ BigQuery (Analytics)  ← FASE 13                        │
│  └─ Redis (Cache)                                          │
│                                                              │
│  Integrations:                                              │
│  ├─ Mercado Pago (Payments)     ← FASE 10                  │
│  ├─ Instagram API (Social)      ← FASE 9                   │
│  ├─ Gemini 1.5 Pro (IA)         (Existente)               │
│  ├─ n8n (Automations)           (Existente)               │
│  ├─ SendGrid (Email)            ← FASE 11                  │
│  ├─ Evolution API (WhatsApp)    (Existente)               │
│  ├─ Google Analytics (Analytics) ← FASE 13                 │
│  └─ Metabase (BI)               ← FASE 13                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ PRÓXIMA AÇÃO

**Qual fase deseja iniciar?**

1. **FASE 8**: E-Commerce Modal (Recomendado - base para outras)
2. **FASE 9**: Social-to-Blog (Paralelo, SEO)
3. **FASE 10**: Checkout (Crítico para vendas)
4. **FASE 11**: CRM (Complemento)

**Comando para começar**:

```bash
# Exemplo: Iniciar FASE 8
npm install @radix-ui/react-dialog @radix-ui/react-slot clsx tailwind-merge

# Estrutura
src/
├─ components/
│  ├─ product-modal.tsx
│  ├─ cart-sheet.tsx
│  └─ product-card.tsx
├─ hooks/
│  └─ useCart.ts
├─ context/
│  └─ CartContext.tsx
└─ app/
   └─ api/cart/...
```

**Siga?** ✨
