# 📋 ANÁLISE COMPLETA: prompt.identidadeVisual.md

## 📊 RESUMO EXECUTIVO

**Status Atual:** 20% Completo (Fases 1-4 ✅ / Fases 5-28 ⏳)

**Arquivo:** `DOCS/prompt.identidadeVisual.md` (2.528 linhas)
**Data:** Janeiro 27, 2026
**Objetivo:** Transformar HNK Food Stack de "dark tech" para "Industrial-Ember System"

---

## 🎨 DESIGN SYSTEM IMPLEMENTADO ✅

### Paleta de Cores

- **Steel Silver:** `zinc-100` a `zinc-400` (Platas escovadas)
- **Deep Charcoal:** `#050505` (Fundo absoluto)
- **Ember Core:** `amber-500` (Ações primárias)
- **Blood Orange:** `orange-700` (Sombras e erros)

### Animações Tailwind

- `fire-pulse`: Opacidade + Blur (2.5s)
- `ember-float`: Y-translate + Opacidade (4s)
- `metal-shine`: Background position (3s)

### Tipografia

- **Headings:** Geist Black Italic (Agressivo)
- **Body:** Geist Sans Regular (Legibilidade)

---

## 📍 PROGRESSO POR FASE

### ✅ FASES COMPLETADAS (1-4)

#### FASE 1: Setup Foundation

- [x] Tailwind config com cores Industrial-Ember
- [x] Fontes Geist configuradas
- [x] Animações customizadas
- [x] Arquivo: `tailwind.config.ts`

#### FASE 2: Core Components

- [x] MetalCard.tsx (efeito brilho, hover 3D)
- [x] MetalButton.tsx (4 variantes)
- [x] EmbersAnimation.tsx (3 variações)
- [x] MetalInput.tsx (inputs/textarea/select)
- [x] HeroSection.tsx (básico)
- [x] Diretório: `src/components/metal/`

#### FASE 3: Utilities

- [x] `src/lib/utils.ts` - Função `cn()` (clsx + tailwind-merge)

#### FASE 4: Landing Page

- [x] EmbersCanvas (sistema de partículas)
- [x] HeroIndustrial (com CTA duplo, reduced 40%)
- [x] FeaturePlates (8 cards metal)
- [x] BrickTestimonials (tijolos + parafusos)
- [x] IndustrialFooter (menu 4-coluna)
- [x] `app/page.tsx` + `app/page.css`

---

### ⏳ FASES PENDENTES (5-28)

#### FASE 5: Header Responsivo

**Status:** Not Started

- [ ] Header.tsx com menu hambúrguer
- [ ] Logo + Navigation links
- [ ] Scroll detection (background change)
- [ ] Mobile overlay com AnimatePresence
- **Deps:** Framer Motion, Lucide React
- **Output:** `src/components/layout/Header.tsx`

#### FASE 6: Root Layout

**Status:** Not Started

- [ ] Injetar Header + Footer em todas rotas
- [ ] EmbersCanvas global
- [ ] Metadata SEO (title.template, OG tags)
- [ ] Layout.tsx com Geist fonts
- **Output:** `src/app/layout.tsx`

#### FASE 7: Sistema de Páginas Dinâmicas

**Status:** Not Started

- [ ] `app/(system)/[slug]/page.tsx` para rotas dinâmicas
- [ ] pageData{} mockado com 7 páginas
- [ ] Grid de features em cada página
- [ ] CTA buttons dinâmicas
- **Pages:** cardapio, pedidos, ia, analytics, blog, sobre, suporte

#### FASE 8: Login Admin

**Status:** Not Started

- [ ] Glass-Noir design (bg-zinc-900/30)
- [ ] Inputs com ícones (User, Lock)
- [ ] Esquecer senha link
- [ ] Button com shadow glow
- **Output:** `src/app/admin/login/page.tsx`

#### FASE 9: Middleware de Proteção

**Status:** Not Started

- [ ] Verificar cookie nextauth.session-token
- [ ] Redirecionar para /admin/login se não autenticado
- [ ] Config matcher para otimização
- **Output:** `src/middleware.ts`

#### FASE 10: Página Bem Brasil

**Status:** Not Started

- [ ] Design Glass-Noir do anexo provided
- [ ] Header premium + navigation
- [ ] Seção Promoções (card grande)
- [ ] Grid Cortes Nobres (3 items)
- [ ] Floating cart button (laranja)
- [ ] Rounded-[2.5rem] cards
- **Output:** `app/bem-brasil/page.tsx`

#### FASE 11-15: Páginas de Sistema

**Status:** Not Started

- [ ] IA para WhatsApp (Bot animado)
- [ ] Analytics Pro (Stats grid + charts placeholder)
- [ ] Blog da Brasa (Posts list com categoria)
- [ ] Sobre (Missão/Valores)
- [ ] Suporte 24/7 (Canais de contato)
- **Design:** Glass-Noir, rounded-[2.5rem], amber glows

#### FASE 16: Admin Dashboard Editor

**Status:** Not Started

- [ ] Sidebar com ícones (Type, Image, Layout, Eye)
- [ ] Área de edição WYSIWYG mockada
- [ ] Button "Salvar Alterações"
- [ ] Status: Visual mockup (sem funcionalidade real)
- **Output:** `src/app/admin/edit/page.tsx`

#### FASE 17: Página de Sucesso

**Status:** Not Started

- [ ] Canvas confetti com cores brasa
- [ ] Ícone Flame animado + CheckCircle overlay
- [ ] Card status "Enviado para Cozinha"
- [ ] Botões Acompanhar Pedido + Voltar
- **Deps:** canvas-confetti
- **Output:** `app/sucesso/page.tsx`

#### FASE 18: Integração Stripe

**Status:** Not Started

- [ ] `/api/checkout/route.ts` - Cria session Stripe
- [ ] `/api/webhooks/stripe/route.ts` - Webhook eventos
- [ ] Atualiza Prisma quando checkout.session.completed
- [ ] Suporta Pix + Cartão
- **Env Vars:** STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

#### FASE 19: Server Actions

**Status:** Not Started

- [ ] `actions/products.ts` - createProduct()
- [ ] `actions/orders.ts` - createOrder()
- [ ] Integração com Prisma
- [ ] revalidatePath() para cache invalidation

#### FASE 20: NextAuth (Opcional)

**Status:** Not Started

- [ ] NextAuth v5 setup
- [ ] Provider credentials para admin
- [ ] Validação de sessão no middleware
- [ ] JWT alternatives se não usar NextAuth

#### FASES 21-28: Configuração e Deploy

**Status:** Not Started

- 21.1: Instalar Stripe, canvas-confetti, etc
- 21.2: Configurar `.env.local`
- 21.3: Setup Prisma + Schema (models: Product, Order, User)
- 21.4: Build testing local
- 22: Deploy na Vercel
- 23: Lighthouse audit (metas: Perf 95+, Accessibility 95+, SEO 100)
- 24: Teste checkout Stripe (pix + cartão real)
- 25: Responsividade mobile final
- 26: SEO final (sitemap, robots.txt, Google Search Console)
- 27: Documentação + README
- 28: Lançamento oficial + monitoramento

---

## 🏗️ ARQUITETURA FINAL

```
HNK-FOOD-STACK-V2/
├── app/
│   ├── page.tsx                    [DONE] Landing page
│   ├── layout.tsx                  [TODO] Root layout + metadata
│   ├── page.css                    [DONE] Brick pattern CSS
│   ├── bem-brasil/
│   │   └── page.tsx               [TODO] Estilo Glass-Noir anexo
│   ├── sucesso/
│   │   └── page.tsx               [TODO] Confetti + status
│   ├── (system)/
│   │   ├── [slug]/page.tsx        [TODO] Dinâmico para cardápio, pedidos, etc
│   │   ├── ia/page.tsx            [TODO] IA WhatsApp
│   │   ├── analytics/page.tsx     [TODO] Stats + charts
│   │   ├── blog/page.tsx          [TODO] Blog da Brasa
│   │   ├── sobre/page.tsx         [TODO] Sobre empresa
│   │   └── suporte/page.tsx       [TODO] Suporte 24/7
│   ├── admin/
│   │   ├── login/page.tsx         [TODO] Glass-Noir login
│   │   ├── edit/page.tsx          [TODO] Editor mockup
│   │   └── page.tsx               [EXISTING] Dashboard
│   ├── api/
│   │   ├── checkout/route.ts      [TODO] Stripe checkout
│   │   └── webhooks/stripe/route.ts [TODO] Webhook events
│   └── actions/
│       ├── products.ts             [TODO] Server actions
│       └── orders.ts               [TODO] Server actions
│
├── src/
│   ├── components/
│   │   ├── metal/
│   │   │   ├── MetalCard.tsx      [DONE]
│   │   │   ├── MetalButton.tsx    [DONE]
│   │   │   ├── EmbersAnimation.tsx [DONE]
│   │   │   ├── MetalInput.tsx     [DONE]
│   │   │   ├── HeroSection.tsx    [DONE]
│   │   │   └── index.ts           [DONE]
│   │   └── layout/
│   │       ├── Header.tsx         [TODO] Menu hambúrguer
│   │       └── IndustrialFooter.tsx [DONE - inline em page.tsx]
│   │
│   ├── lib/
│   │   ├── utils.ts               [DONE] cn() function
│   │   ├── prisma.ts              [TODO] Prisma instance
│   │   └── auth.ts                [TODO] NextAuth (optional)
│   │
│   └── globals.css                [DONE] Global styles
│
├── prisma/
│   ├── schema.prisma              [TODO] DB models
│   └── migrations/                [TODO] Migrations
│
├── middleware.ts                  [TODO] Auth middleware
├── tailwind.config.ts             [DONE] Industrial-Ember
├── .env.local                     [TODO] Env vars
├── README.md                      [TODO] Documentation
└── package.json                   [EXISTING] Dependencies

```

---

## 💾 DEPENDÊNCIAS NECESSÁRIAS

```bash
# Instaladas
npm install next react framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer

# A instalar
npm install stripe @stripe/stripe-js
npm install canvas-confetti
npm install @types/canvas-confetti --save-dev
npm install prisma @prisma/client
npm install next-auth           # [Optional]
npm install clsx tailwind-merge   # [Já em utils.ts]
```

---

## 🔧 CHECKLIST DE CONFIGURAÇÃO

- [x] Tailwind colors e fonts
- [x] Core components (Metal system)
- [x] Landing page sections
- [ ] Root layout com header/footer
- [ ] Middleware de autenticação
- [ ] Páginas internas (7+)
- [ ] Admin login page
- [ ] Editor dashboard
- [ ] Página sucesso
- [ ] API Stripe
- [ ] Prisma schema + migrations
- [ ] NextAuth (se usar)
- [ ] Deploy Vercel
- [ ] Lighthouse 100
- [ ] Testes Stripe (real)
- [ ] Mobile responsiveness
- [ ] SEO final
- [ ] Documentação

---

## ⏱️ ESTIMATIVA DE TEMPO

| Fase | Descrição | Est. Tempo |
|------|-----------|-----------|
| 1-4 | Foundation + Landing | ✅ 3h (DONE) |
| 5-7 | Header + Dinâmicas | 1.5h |
| 8-9 | Login + Middleware | 1h |
| 10-17 | Páginas + Sucesso | 2h |
| 18-20 | Stripe + Auth | 2h |
| 21-28 | Config + Deploy | 2h |
| **TOTAL** | | **~11.5h** |

---

## 🎯 PRÓXIMAS AÇÕES (RECOMENDADAS)

### Hoje (Imediato)

1. ✅ Leitura do prompt (DONE)
2. ⏳ Criar Header.tsx com menu hambúrguer
3. ⏳ Atualizar layout.tsx root com metadata

### Próxima Sessão

4. Criar página dinâmica `/[slug]/`
2. Implementar páginas Bem Brasil, IA, Analytics
3. Setup Prisma + schema

### Terceira Sessão

7. Integração Stripe checkout
2. NextAuth setup
3. Deploy Vercel

### Final

10. Testes + Otimizações (Lighthouse)
2. Monitoramento + Iterações

---

## 📝 NOTAS IMPORTANTES

### Design Decisions

- **Glass-Noir:** Background `#0a0a0a` ou `#050505`, border `zinc-800`, rounded `[2.5rem]` a `[3rem]`
- **Botões:** `amber-600` com shadow glow, uppercase + italic + tracking-widest
- **Cards:** `bg-zinc-900/30` backdrop-blur, border-zinc-800, hover effects com transição suave
- **Animações:** Framer Motion para scale, opacity, rotation (preferable ao CSS puro para performance)

### Performance

- Usar `Next/Image` para todas imagens
- EmbersCanvas como Canvas (não DOM-heavy)
- Server Actions ao invés de API routes quando possível
- revalidatePath() para cache invalidation

### SEO

- Metadata dinâmica com title.template
- Sitemap.xml em public/
- Robots.txt configurado
- Keywords focadas em gastronomia/restaurante

### Segurança

- Middleware protege /admin, /dashboard
- Stripe webhooks com signature verification
- NextAuth para sessões (ou JWT)
- .env.local nunca em git (use .env.example)

---

## 🏁 CONCLUSÃO

O **prompt.identidadeVisual.md** é um documento arquitetural completo com:

- ✅ Design system definido
- ✅ Componentes base criados
- ✅ Landing page implementada
- ⏳ Sistema de páginas dinâmicas descrito
- ⏳ Integração Stripe especificada
- ⏳ Deploy workflow documentado

**Estimativa: 11.5 horas de trabalho para 100% completo**

O projeto está em **20% de conclusão** (Fases 1-4 ✅).
Próximo milestone: **50% com Header + Layout + Páginas internas** (próximas 2-3 horas).

---

**Gerado:** 2026-01-27 | **Versão:** v2.0 Noir Edition
