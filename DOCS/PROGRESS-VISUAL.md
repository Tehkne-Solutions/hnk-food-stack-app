# 🗺️ ROADMAP VISUAL - HNK Food Stack V2

## STATUS: 20% COMPLETO ✅ | 80% PENDENTE ⏳

```
████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 20%
```

---

## PROGRESS VISUAL POR CAMADA

### 🎨 CAMADA 1: DESIGN SYSTEM

```
[████████] Cores        ✅ DONE
[████████] Fonts        ✅ DONE
[████████] Animações    ✅ DONE
[████████] Shadows      ✅ DONE
[████████] Spacing      ✅ DONE
```

### 🧱 CAMADA 2: COMPONENTES REUTILIZÁVEIS

```
[████████] MetalCard        ✅ DONE
[████████] MetalButton      ✅ DONE
[████████] EmbersAnimation  ✅ DONE
[████████] MetalInput       ✅ DONE
[████████] HeroSection      ✅ DONE
[████████] Utils (cn)       ✅ DONE
```

### 🏠 CAMADA 3: LANDING PAGE

```
[████████] EmbersCanvas        ✅ DONE
[████████] HeroIndustrial      ✅ DONE (40% reduzido)
[████████] FeaturePlates       ✅ DONE (8 cards)
[████████] BrickTestimonials   ✅ DONE
[████████] IndustrialFooter    ✅ DONE
```

### 🎯 CAMADA 4: NAVEGAÇÃO & LAYOUT

```
[░░░░░░░░] Header Responsivo           ⏳ 0%
[░░░░░░░░] Menu Hambúrguer             ⏳ 0%
[░░░░░░░░] Root Layout + Metadata      ⏳ 0%
[░░░░░░░░] Global Header/Footer        ⏳ 0%
[░░░░░░░░] Middleware de Proteção      ⏳ 0%
```

### 📄 CAMADA 5: PÁGINAS INTERNAS

```
[░░░░░░░░] [slug] Sistema Dinâmico     ⏳ 0%
[░░░░░░░░] Bem Brasil (Glass-Noir)    ⏳ 0%
[░░░░░░░░] IA para WhatsApp            ⏳ 0%
[░░░░░░░░] Analytics Pro               ⏳ 0%
[░░░░░░░░] Blog da Brasa               ⏳ 0%
[░░░░░░░░] Sobre (Empresa)             ⏳ 0%
[░░░░░░░░] Suporte 24/7                ⏳ 0%
```

### 🔐 CAMADA 6: ADMIN & AUTENTICAÇÃO

```
[░░░░░░░░] Login Noir Style             ⏳ 0%
[░░░░░░░░] Middleware Auth              ⏳ 0%
[░░░░░░░░] Dashboard Editor (Mockup)    ⏳ 0%
[░░░░░░░░] NextAuth Setup               ⏳ 0%
```

### 💳 CAMADA 7: PAGAMENTO

```
[░░░░░░░░] Stripe Checkout API          ⏳ 0%
[░░░░░░░░] Webhook Stripe               ⏳ 0%
[░░░░░░░░] Página Sucesso (Confetti)   ⏳ 0%
[░░░░░░░░] Integração com Prisma        ⏳ 0%
```

### 🗄️ CAMADA 8: BANCO DE DADOS

```
[░░░░░░░░] Prisma Setup                 ⏳ 0%
[░░░░░░░░] Schema.prisma (Models)       ⏳ 0%
[░░░░░░░░] Migrations                   ⏳ 0%
[░░░░░░░░] Server Actions               ⏳ 0%
```

### 🚀 CAMADA 9: INFRAESTRUTURA & DEPLOY

```
[░░░░░░░░] Vercel Deploy                ⏳ 0%
[░░░░░░░░] Supabase Setup               ⏳ 0%
[░░░░░░░░] Environment Variables        ⏳ 0%
[░░░░░░░░] Lighthouse Audit (100)       ⏳ 0%
[░░░░░░░░] Testes Stripe (Real)         ⏳ 0%
[░░░░░░░░] Responsividade Mobile        ⏳ 0%
[░░░░░░░░] SEO Final + Sitemap          ⏳ 0%
```

---

## TIMELINE SUGERIDA

### 📅 SESSÃO 1 (3 horas) - Foundation ✅

```
✅ 09:00 - 12:00: Phases 1-4 (Design + Landing)
  - Design System (Tailwind)
  - Components (Metal system)
  - Landing page (Hero + Sections)
  
Status: COMPLETE ✅
Remaining: 80% ⏳
```

### 📅 SESSÃO 2 (2 horas) - Navigation & Layout

```
⏳ Phases 5-7 (Header + Pages)
  - Header responsivo com hambúrguer
  - Root layout com metadata
  - Sistema dinâmico [slug]/

Est. Time: 2h
Status: READY TO START 🚀
Priority: HIGH
```

### 📅 SESSÃO 3 (2 horas) - Admin & Auth

```
⏳ Phases 8-9 (Login + Middleware)
  - Login Noir style
  - Middleware de proteção
  
Est. Time: 2h
Status: QUEUED
Priority: MEDIUM
```

### 📅 SESSÃO 4 (2 horas) - Internal Pages

```
⏳ Phases 10-17 (Páginas internas)
  - Bem Brasil
  - IA, Analytics, Blog, Sobre, Suporte
  - Página de Sucesso
  
Est. Time: 2h
Status: QUEUED
Priority: MEDIUM
```

### 📅 SESSÃO 5 (2 horas) - Payment & DB

```
⏳ Phases 18-20 (Stripe + Prisma)
  - Integração Stripe
  - Prisma schema
  - NextAuth
  
Est. Time: 2h
Status: QUEUED
Priority: HIGH
```

### 📅 SESSÃO 6 (2 horas) - Deploy & Testing

```
⏳ Phases 21-28 (Config + Production)
  - Env vars
  - Prisma migrations
  - Vercel deploy
  - Lighthouse audit
  - Testes Stripe
  - Responsividade
  - SEO final
  
Est. Time: 2h
Status: QUEUED
Priority: CRITICAL
```

---

## ⚡ QUICK START - PRÓXIMA AÇÃO

### Começar AGORA

```bash
# 1. Criar Header.tsx
# Path: src/components/layout/Header.tsx
# Duration: 45 min
# Include: Menu desktop, hambúrguer mobile, scroll detection

# 2. Atualizar layout.tsx
# Path: src/app/layout.tsx  
# Duration: 30 min
# Include: Header + Footer, metadata SEO, fontes Geist

# 3. Criar [slug] dinâmico
# Path: app/(system)/[slug]/page.tsx
# Duration: 45 min
# Include: pageData{}, grid features, CTA
```

**Total: 2 horas → Progresso: 20% → 40%**

---

**Última Atualização:** 2026-01-27  
**Status:** READY TO BUILD 🚀
