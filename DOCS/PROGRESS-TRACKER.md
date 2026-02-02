# 📋 FASE 8.2 - Progress Tracker

## Pages do Admin Panel - Status de Redesign

### Completadas ✅

- [x] **Layout** (`/app/admin/layout.tsx`) - Sidebar com Metal design
- [x] **Dashboard** (`/app/admin/page.tsx`) - Completo com MetalCard + Charts

### Faltando 🔄 (8 pages)

- [ ] **Orders** (`/app/admin/orders/page.tsx`) - ~400 LOC
- [ ] **Products** (`/app/admin/products/page.tsx`) - ~350 LOC
- [ ] **Customers** (`/app/admin/customers/page.tsx`) - ~300 LOC
- [ ] **Marketing** (`/app/admin/marketing/page.tsx`) - ~315 LOC
- [ ] **Analytics** (`/app/admin/analytics/page.tsx`) - ~300 LOC
- [ ] **Activity** (`/app/admin/activity/page.tsx`) - ~300 LOC
- [ ] **Reports** (`/app/admin/reports/page.tsx`) - ~196 LOC
- [ ] **Settings** (`/app/admin/settings/page.tsx`) - ~350 LOC

---

## Estratégia de Redesign

### Passo 1: Importar Componentes

Cada página precisa adicionar no topo:

```tsx
import {
  MetalCard, MetalCardHeader, MetalCardContent, MetalCardFooter,
  MetalButton,
  CornerEmbers
} from '@/components/metal'
```

### Passo 2: Adicionar EmbersAnimation

Adicionar no final do return:

```tsx
<CornerEmbers corner="bottom-right" />
```

### Passo 3: Converter Cards/Headers

Substituir:

```tsx
// Antes
<div className="rounded-xl border border-zinc-800/50 bg-gradient-to-br from-amber-500/20 to-orange-500/10">

// Depois
<MetalCard variant="primary" hover>
```

### Passo 4: Converter Botões

Substituir:

```tsx
// Antes
<button className="px-4 py-2 text-white bg-amber-500 hover:bg-amber-600">

// Depois
<MetalButton variant="primary" size="md">
```

---

## Padrão de Substituição

### Título de Seção

```tsx
// Antes
<h2 className="text-2xl font-black text-white mb-6">
  Pedidos

// Depois
<h2 className="text-3xl font-geist-black text-steel-silver mb-6">
  Pedidos
</h2>
<p className="text-steel-brushed mb-4">Gerenciar todos os pedidos</p>
```

### Card Container

```tsx
// Antes
<div className="rounded-xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">

// Depois
<MetalCard variant="dark">
  <MetalCardHeader>
    <h3>Cabeçalho</h3>
  </MetalCardHeader>
  <MetalCardContent>
    Conteúdo...
  </MetalCardContent>
</MetalCard>
```

### Table Container

Tables podem manter estrutura, mas com classes Metal:

```tsx
<div className="bg-gradient-to-br from-deep-charcoal/50 to-zinc-900/30 border border-steel-brushed/20 rounded-lg p-6">
  <table>
    ...
  </table>
</div>
```

### Button Group

```tsx
// Antes
<div className="flex gap-2">
  <button className="px-4 py-2 bg-amber-500">Ação 1</button>
  <button className="px-4 py-2 border border-amber-500">Ação 2</button>
</div>

// Depois
<div className="flex gap-2">
  <MetalButton variant="primary" size="sm">Ação 1</MetalButton>
  <MetalButton variant="ghost" size="sm">Ação 2</MetalButton>
</div>
```

---

## Ordem Recomendada

1. **Orders** (prioridade alta - importante)
2. **Products** (prioridade alta - importante)
3. **Customers** (prioridade média)
4. **Marketing** (prioridade média)
5. **Analytics** (prioridade baixa - tabelas de dados)
6. **Activity** (prioridade baixa - logs)
7. **Reports** (prioridade baixa - simplinho)
8. **Settings** (prioridade baixa - forms)

---

## Checklist por Page

### Orders Page

- [ ] Importar componentes Metal
- [ ] Converter header
- [ ] Converter filter card
- [ ] Converter orders table container
- [ ] Converter action buttons
- [ ] Adicionar CornerEmbers
- [ ] Testar em browser
- [ ] Commit

### Products Page

- [ ] (mesmo processo)

### (E assim por diante...)

---

## Estimativa de Tempo

| Page | LOC | Tempo | Difficulty |
|------|-----|-------|-----------|
| Orders | 400 | 20 min | ⭐⭐⭐ |
| Products | 350 | 18 min | ⭐⭐⭐ |
| Customers | 300 | 15 min | ⭐⭐ |
| Marketing | 315 | 18 min | ⭐⭐⭐ |
| Analytics | 300 | 15 min | ⭐⭐ |
| Activity | 300 | 15 min | ⭐⭐ |
| Reports | 196 | 10 min | ⭐ |
| Settings | 350 | 20 min | ⭐⭐⭐⭐ |
| **TOTAL** | **~2500** | **~2 horas** | **Médio** |

---

## Cores por Context

```
📊 Dashboard/Analytics:      MetalCard variant="dark" (tabelas escuras)
🛍️ Orders/Products:         MetalCard variant="primary" (destaque)
👥 Customers:               MetalCard variant="primary"
📢 Marketing:               MetalCard variant="accent" (destaque colorido)
📈 Analytics:               MetalCard variant="dark"
📋 Activity:                MetalCard variant="secondary" (logs)
📄 Reports:                 MetalCard variant="primary"
⚙️ Settings:                MetalCard variant="primary" (inputs precisam de atenção)
```

---

## Next Steps

1. Escolher uma page para começar (recomendo Orders)
2. Fazer o redesign completo
3. Testar em browser
4. Commit com mensagem clara
5. Repetir para as próximas
6. Depois fazer Landing Page + Supabase

---

**Status:** Pronto para começar Fase 2
**Próxima ação:** Iniciar com Orders page redesign
