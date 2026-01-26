# 🔥 HNK Food Stack — Roadmap 7 Fases × 12 Micro-Fases

## Visão Geral

```
Arquiteto: Transformar Churrascaria Bem Estar em vitrine tecnológica de Elite
Design System: "The Ember System" (Zinc-950 + Amber-500)
Stack: Next.js 16 + TypeScript 5 + Tailwind CSS + Supabase + Mercado Pago
Timeline: 2 semanas para MVP completo
```

---

## 📊 Fases & Micro-fases

### **FASE 1: Fundação & Core Multitenant** (O Cérebro)

Estrutura base, design system, componentes reutilizáveis, multi-tenant

```
✅ 1.1  — Design System "The Ember System"
✅ 1.2  — Roteamento Multitenant (app/(shop)/[slug])
✅ 1.3  — Componentes Base (FireButton, PriceTag, ProductCard, SectionTitle)
✅ 1.4  — Google Fonts (Inter + JetBrains Mono)
✅ 1.5  — Home Bem Estar (Mock)
⏳ 1.6  — Zustand Cart Store (Mobile Sync)
⏳ 1.7  — Prisma Adapter & DB Schema
⏳ 1.8  — Slug Middleware Validation
⏳ 1.9  — SEO Metadata Dinâmico
⏳ 1.10 — UTC Link Builder & Tracking
⏳ 1.11 — Husky Linting & Pre-commit
⏳ 1.12 — GitHub Actions CI/CD
```

### **FASE 2: Design System & Reuso** (A Identidade)

Componentes avançados, animações, estado de carregamento, modais

```
⏳ 2.1  — PromoBanner Component
⏳ 2.2  — CartBadge (Flutuante)
⏳ 2.3  — CategorySlider (Scroll Horizontal)
⏳ 2.4  — StatusPill (Badges)
⏳ 2.5  — Skeleton Screens Loading
⏳ 2.6  — Framer Motion Setup (Transições)
⏳ 2.7  — Modal Base Component
⏳ 2.8  — Toast/Notification System
⏳ 2.9  — Micro-interações
⏳ 2.10 — Search Component (Debounce)
⏳ 2.11 — Acessibilidade WCAG
⏳ 2.12 — Documentação Componentes
```

### **FASE 3: Home & Vitrine "Bem Estar"** (A Fachada)

Página completa, filtros, integração WhatsApp, paralax

```
⏳ 3.1  — Header Dinâmico
⏳ 3.2  — Seção Destaques (Featured)
⏳ 3.3  — Grid de Produtos (Cortes)
⏳ 3.4  — Filtro por Categorias
⏳ 3.5  — Parallax Background (Chamas)
⏳ 3.6  — CTA WhatsApp Integrado
⏳ 3.7  — Footer Institucional
⏳ 3.8  — Sitemap.xml Dinâmico
⏳ 3.9  — Canonical Links SEO
⏳ 3.10 — Next/Image Optimization
⏳ 3.11 — Live Search (Produtos)
⏳ 3.12 — Micro-interações & Feedback
```

### **FASE 4: Marketing Intelligence** (O Rastreio)

Google Analytics, Meta Pixel, Google Ads, A/B testing

```
⏳ 4.1  — Google Analytics 4 Setup
⏳ 4.2  — Meta Pixel Events (ViewContent, AddToCart, Purchase)
⏳ 4.3  — Google Ads Conversion Tag
⏳ 4.4  — UTC Link Builder
⏳ 4.5  — DataLayer Standardization (GTM)
⏳ 4.6  — Event Tracking (Top Products)
⏳ 4.7  — Heatmap Integration (Hotjar/Clarity)
⏳ 4.8  — OpenGraph & Social Sharing
⏳ 4.9  — Landing Page URL Parameters (?promo=)
⏳ 4.10 — A/B Testing Framework
⏳ 4.11 — Error Logging API
⏳ 4.12 — CRM Integration (Pipedrive/HubSpot)
```

### **FASE 5: Checkout & Pagamento** (O Cofre)

Carrinho, checkout one-page, Mercado Pago, Impressora, automações

```
⏳ 5.1  — Carrinho (Cart Page)
⏳ 5.2  — Checkout One-Page (Form)
⏳ 5.3  — Mercado Pago Integration (PIX/Cartão)
⏳ 5.4  — Cálculo Dinâmico de Entrega
⏳ 5.5  — Sistema de Cupons
⏳ 5.6  — Pedido via WhatsApp (Cozinha)
⏳ 5.7  — Tela Success (Confetti Animation)
⏳ 5.8  — Notificação E-mail/SMS
⏳ 5.9  — PrintNode Kitchen Printer
⏳ 5.10 — Checkout Security & Rate Limit
⏳ 5.11 — Abandoned Cart Recovery Email
⏳ 5.12 — Tip/Service Fee Toggle
```

### **FASE 6: Administrativo & Dashboard** (O Controle)

Gestão de itens, estoque, vendas, clientes, permissões, admin panel

```
⏳ 6.1  — Admin Item Management
⏳ 6.2  — Stock Control & Real-time Sync
⏳ 6.3  — Sales Dashboard (Charts/Gráficos)
⏳ 6.4  — Customer Management
⏳ 6.5  — Store Settings Config
⏳ 6.6  — Marketing Reports (GA4 + Meta)
⏳ 6.7  — User Permissions & Roles
⏳ 6.8  — QR Codes & Table Management
⏳ 6.9  — Customer Reviews & Feedback
⏳ 6.10 — Webhooks Manager Panel
⏳ 6.11 — Data Export (CSV/PDF)
⏳ 6.12 — Automation Panel (n8n)
```

### **FASE 7: Otimização & Mobile First** (O Acabamento)

PWA, cache, image compression, accessibility, load testing, lighthouse

```
⏳ 7.1  — PWA & Installable App
⏳ 7.2  — ISR & Cache Strategy
⏳ 7.3  — Image Compression (WebP)
⏳ 7.4  — Accessibility (A11y WCAG)
⏳ 7.5  — Load Testing (k6)
⏳ 7.6  — Dark Mode Native
⏳ 7.7  — Google Lighthouse 100/100
⏳ 7.8  — Haptic Feedback (Vibração)
⏳ 7.9  — Offline Mode (Service Worker)
⏳ 7.10 — Cross-Browser Testing
⏳ 7.11 — Technical Documentation
⏳ 7.12 — Launch & User Training
```

---

## 🎯 Timeline

| Semana | Fase | Objetivo | Entregável |
|--------|------|----------|-----------|
| 1 | 1-3 | Fundação + Home + Marketing | Bem Estar live em produção |
| 2 | 4-7 | Checkout + Admin + Otimização | MVP completo, Seu Junior treinado |

---

## 🚀 Status Atual (26 Jan 2026)

### ✅ Completado

- Design System "The Ember System"
- Componentes base (4 componentes)
- Roteamento multitenant
- Home mock (Bem Estar)
- Google Fonts integradas
- Tailwind config atualizado

### ⏳ Em Andamento

- Dev server running (<http://localhost:3000/bem-estar>)
- Teste de componentes

### 📋 Próximo

- Zustand store (1-2h)
- Prisma + Supabase schema (2-3h)
- Componentes FASE 2 (4-6h)

---

## 📚 Referências de Código

### Estrutura de Pastas

```
hnk-food-stack-app/
├── app/
│   ├── (shop)/
│   │   ├── layout.tsx          # Shop layout (header, footer)
│   │   └── [slug]/
│   │       └── page.tsx        # Home dinâmica por loja
│   ├── api/
│   │   ├── payments/
│   │   ├── coupons/
│   │   └── logs/
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── page.tsx                # Redireciona para /bem-estar
│   └── globals.css
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── FireButton.tsx
│   │   │   ├── PriceTag.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ... (mais componentes FASE 2)
│   │   └── ... (componentes existentes)
│   ├── context/
│   ├── services/
│   │   ├── mercadopago.ts
│   │   └── ...
│   └── utils/
│       ├── utm-helpers.ts
│       ├── currency.ts
│       └── ...
├── DOCS/
│   ├── DESIGN_SYSTEM.md
│   ├── FASE-1-STATUS.md
│   └── ROTEIRO-7-FASES.md (este arquivo)
└── tailwind.config.ts          # Ember System tokens
```

---

## 🎨 Decisões de Design

1. **Tema**: Dark mode obrigatório (Zinc-950 + Amber-500)
2. **Glassmorphism**: Backdrop blur + semi-transparent borders
3. **Tipografia**: Inter (body) + JetBrains Mono (preços)
4. **Componentes**: Reutilizáveis, JSDoc comments, tipo TypeScript
5. **SEO**: Dinâmico por loja, Open Graph, canonical links
6. **Performance**: ISR, Image optimization, PWA

---

## 🛠️ Tech Stack

```
Frontend:      Next.js 16 + TypeScript 5 + React 19
Styling:       Tailwind CSS 3.4 + Framer Motion
Database:      Supabase (Postgres) + Prisma ORM
Auth:          Supabase Auth
Payments:      Mercado Pago (PIX/Cartão)
Analytics:     Google Analytics 4 + Meta Pixel
Marketing:     Google Ads + UTM tracking
Automation:    n8n + Evolution API (WhatsApp)
Deployment:    Vercel
CI/CD:         GitHub Actions
```

---

## 📞 Contato & Suporte

**Cliente**: Churrascaria Bem Estar (Seu Junior)
**Projeto**: HNK Food Stack - Vitrine Digital
**Status**: 🟡 EM DESENVOLVIMENTO
**Próximo checkpoint**: FASE 1.6 (Zustand + Prisma)

---

*Documento atualizado: 26 de Janeiro de 2026*
*The Ember System v1.0*
