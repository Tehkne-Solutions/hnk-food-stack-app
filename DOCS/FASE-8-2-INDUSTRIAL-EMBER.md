# FASE 8.2: Industrial-Ember Design System

## 📋 Status: IMPLEMENTAÇÃO INICIADA ✅

**Data de Início:** Sessão atual
**Componentes Criados:** 5 (MetalCard, MetalButton, EmbersAnimation, MetalInput, HeroSection)
**Tailwind Config:** ✅ Atualizado com cores, animações e gradientes
**Próximo:** Aplicação aos 9 admin pages

---

## 🎨 Cor System - Industrial-Ember

### Paleta de Cores

```
STEEL SILVER (Aço Polido)
├─ #d4d4d8 (zinc-300)     - Brightest
├─ #a1a1aa (zinc-400)     - Mid-tone
└─ #e4e4e7 (zinc-200)     - Accents

DEEP CHARCOAL (Fundo)
└─ #050505                 - Absolute black background

EMBER CORE (Chama Primária)
└─ #f59e0b (amber-500)     - Orange-yellow flame

BLOOD ORANGE (Sombra Fogo)
└─ #b45309 (orange-700)    - Deep orange shadows

GRADIENT COMBINATIONS:
├─ Steel Brushed: #e4e4e7 → #a1a1aa → #71717a
├─ Metal Plate: #e4e4e7 → #c4c4c8 → #a1a1aa
├─ Ember Fire: #f59e0b → #dc2626 → #7c2d12
└─ Charcoal Deep: #050505 → #1a1a1a
```

### CSS Classes Disponíveis

```css
/* Colors */
.text-steel-silver        /* #d4d4d8 */
.text-steel-brushed       /* #a1a1aa */
.text-deep-charcoal       /* #050505 */
.text-ember-core          /* #f59e0b */
.text-blood-orange        /* #b45309 */

/* Backgrounds */
.bg-steel-silver
.bg-steel-brushed
.bg-deep-charcoal
.bg-ember-core
.bg-blood-orange

/* Background Images (Gradients) */
.bg-steel-brushed-gradient
.bg-metal-plate
.bg-ember-fire
.bg-charcoal-deep

/* Shadows */
.shadow-ember-glow        /* Soft amber glow */
.shadow-ember-deep        /* Deep charcoal shadow */
.shadow-metal-inset       /* Inset metal effect */
.shadow-steel-shadow      /* Metal plate shadow */
.shadow-fire-glow         /* Intense fire glow */

/* Animations */
.animate-fire-pulse       /* Opacity + blur effect */
.animate-ember-float      /* Floating particles */
.animate-metal-shine      /* Brushed metal effect */
```

---

## 🎬 Animações

### fire-pulse

Animação de pulsação com efeito de fogo (opacity + blur)

```css
animation: fire-pulse 2.5s ease-in-out infinite;
/* 0%: opacity 0.3, blur 4px */
/* 50%: opacity 0.8, blur 8px */
/* 100%: opacity 0.3, blur 4px */
```

### ember-float

Movimento flutuante para partículas (translação Y + opacity)

```css
animation: ember-float 4s ease-in-out infinite;
/* 0%, 100%: translateY(0px), opacity 0.5 */
/* 50%: translateY(-20px), opacity 1 */
```

### metal-shine

Efeito de brilho em superfícies metálicas

```css
animation: metal-shine 3s ease-in-out infinite;
/* Movimento de backgroundPosition simulando luz */
```

---

## 🧩 Componentes Implementados

### 1. MetalCard

Cartão com estilo de aço polido e bordas de ouro

**Variants:**

- `primary`: Gradiente steel-silver → steel-brushed (padrão)
- `secondary`: Gradiente dark zinc
- `accent`: Gradiente com toque de ember
- `dark`: Charcoal profundo com glow

**Props:**

```tsx
<MetalCard
  variant="primary"        // 'primary' | 'secondary' | 'accent' | 'dark'
  hover={true}            // Ativar efeito hover
  glowing={false}         // Ativar fire-glow
  interactive={false}     // Ativar modo clicável
>
  Content
</MetalCard>
```

**Sub-componentes:**

- `MetalCardHeader` - Cabeçalho com borda
- `MetalCardContent` - Conteúdo com espaçamento
- `MetalCardFooter` - Rodapé com borda

---

### 2. MetalButton

Botão com efeito de chama (amber glow)

**Variants:**

- `primary`: Gradiente ember + glow (padrão)
- `secondary`: Steel-silver com efeito metal
- `ghost`: Transparent com borda de ember
- `danger`: Red + orange fire effect

**Sizes:**

- `sm`: 12px padding
- `md`: 16px padding (padrão)
- `lg`: 24px padding
- `xl`: 32px padding

**Props:**

```tsx
<MetalButton
  variant="primary"       // 'primary' | 'secondary' | 'ghost' | 'danger'
  size="md"              // 'sm' | 'md' | 'lg' | 'xl'
  glowing={true}         // Ativar fire-glow (padrão true)
  pulsing={false}        // Ativar fire-pulse
  icon={<Icon />}        // Ícone
  iconPosition="right"   // 'left' | 'right'
>
  Clique aqui
</MetalButton>
```

---

### 3. EmbersAnimation

Partículas de fogo flutuantes com múltiplas variações

**Variants:**

- `EmbersAnimation` - Embers distribuídos aleatoriamente (full screen)
- `ScrollEmbers` - Embers que acompanham scroll
- `CornerEmbers` - Embers concentrados em cantos

**Props:**

```tsx
// EmbersAnimation
<EmbersAnimation
  count={12}              // Número de partículas
  intensity="medium"      // 'low' | 'medium' | 'high'
  color="amber"          // 'amber' | 'orange' | 'red'
/>

// ScrollEmbers
<ScrollEmbers
  count={8}              // Número de partículas
/>

// CornerEmbers
<CornerEmbers
  corner="top-left"      // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
/>
```

---

### 4. MetalInput (+ MetalTextarea, MetalSelect)

Campos de formulário com estilo industrial

**MetalInput:**

```tsx
<MetalInput
  label="Email"
  placeholder="seu@email.com"
  error="Email inválido"    // Mostra erro
  helper="Use um email válido" // Mensagem de ajuda
  icon={<EnvelopeIcon />}   // Ícone
  variant="primary"         // 'primary' | 'secondary'
  glowing={false}          // Ativar fire-glow
/>
```

**MetalTextarea:**

```tsx
<MetalTextarea
  label="Comentário"
  placeholder="Digite seu comentário..."
  error="Campo obrigatório"
  variant="primary"
/>
```

**MetalSelect:**

```tsx
<MetalSelect
  label="Categoria"
  options={[
    { value: '1', label: 'Eletrônicos' },
    { value: '2', label: 'Alimentos' },
  ]}
  placeholder="Selecione..."
  variant="primary"
/>
```

---

### 5. HeroSection

Seção de landing page com efeitos dramáticos

**Features:**

- Background com gradiente deep-charcoal
- 15 ember particles em alta intensidade
- Corner embers nos cantos
- Título em 7xl com gradient text
- Subtitle em steel-brushed
- Metal divider
- Dual CTA buttons (ENTRAR + CADASTRAR)
- Features grid com 3 colunas

**Exemplo:**

```tsx
<HeroSection />
```

---

## 📦 Tailwind Config - Novo

```typescript
// tailwind.config.ts - Adições

colors: {
  'steel-silver': '#d4d4d8',
  'steel-brushed': '#a1a1aa',
  'deep-charcoal': '#050505',
  'ember-core': '#f59e0b',
  'blood-orange': '#b45309',
  // ... mais cores
}

fontFamily: {
  'geist-black': 'var(--font-geist-black, sans-serif)',
  'sans': 'var(--font-geist-sans, var(--font-inter, sans-serif))',
  'mono': 'var(--font-jetbrains-mono, monospace)',
}

backgroundImage: {
  'steel-brushed-gradient': '...',
  'metal-plate': '...',
  'ember-fire': '...',
  'charcoal-deep': '...',
}

animation: {
  'fire-pulse': 'fire-pulse 2.5s ease-in-out infinite',
  'ember-float': 'ember-float 4s ease-in-out infinite',
  'metal-shine': 'metal-shine 3s ease-in-out infinite',
}

keyframes: {
  'fire-pulse': { /* ... */ },
  'ember-float': { /* ... */ },
  'metal-shine': { /* ... */ },
}

boxShadow: {
  'metal-inset': 'inset 0 1px 2px rgba(255, 255, 255, 0.2), ...',
  'steel-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
  'fire-glow': '0 0 30px rgba(220, 38, 38, 0.4), ...',
}
```

---

## 🗂️ Estrutura de Componentes

```
src/components/metal/
├── index.ts                 # Exports
├── MetalCard.tsx           # Cartão base
├── MetalButton.tsx         # Botão com glow
├── MetalInput.tsx          # Inputs + Textarea + Select
├── EmbersAnimation.tsx      # Partículas de fogo
└── HeroSection.tsx         # Seção de landing
```

---

## 🎯 Próximos Passos

### Phase 1: Aplicação ao Dashboard

1. [ ] Atualizar `/app/admin/layout.tsx` com novo tema
2. [ ] Aplicar MetalCard ao Dashboard
3. [ ] Testar em browser
4. [ ] Ajustar cores conforme necessário

### Phase 2: Aplicação a Todas as 9 Pages

1. [ ] Orders page
2. [ ] Products page
3. [ ] Customers page
4. [ ] Marketing page
5. [ ] Analytics page
6. [ ] Activity page
7. [ ] Reports page
8. [ ] Settings page

### Phase 3: Landing Page

1. [ ] Criar `/app/page.tsx` com HeroSection
2. [ ] Adicionar ScrollEmbers
3. [ ] Implementar CTAs funcionais

### Phase 4: Supabase Integration (FASE 8.1)

Após conclusão do design visual

---

## 🚀 Uso Rápido

**Importar componentes:**

```tsx
import { 
  MetalCard, 
  MetalButton, 
  MetalInput,
  EmbersAnimation,
  HeroSection 
} from '@/components/metal';
```

**Componentes já incluem:**

- ✅ Tailwind CSS classes
- ✅ TypeScript tipos
- ✅ Animações precis
as
- ✅ Responsivo
- ✅ Acessível
- ✅ Sem dependências extras

---

## 📝 Notas de Design

**Filosofia:**
"Aço frio dos utensílios + calor orgânico da brasa = contraste que exala autoridade e desejo"

**Contraste Visual:**

- Steel Silver (✨ polido) vs Deep Charcoal (⚫ fundo)
- Ember Core (🔥 ação) vs Blood Orange (🌶️ sombra)

**Aplicação:**

- **Headers/Titles:** Steel Silver + Geist Black Italic
- **Body Text:** Steel Brushed + Geist Sans Regular
- **CTAs:** Ember Core + Blood Orange gradient
- **Backgrounds:** Deep Charcoal + Metal Plate gradient
- **Accents:** Ember Core com fire-glow shadow

---

## ✅ Checklist

- [x] Atualizar tailwind.config.ts
- [x] Criar MetalCard component
- [x] Criar MetalButton component
- [x] Criar EmbersAnimation component
- [x] Criar MetalInput component
- [x] Criar HeroSection component
- [x] Criar export index.ts
- [ ] Aplicar ao admin/layout.tsx
- [ ] Aplicar ao admin/page.tsx (Dashboard)
- [ ] Aplicar aos 8 pages restantes
- [ ] Criar landing page com HeroSection
- [ ] Testar em browser (mobile + desktop)

---

## 📚 Referências

- **Tailwind Config:** `tailwind.config.ts` (50 linhas)
- **Componentes:** `src/components/metal/` (4 arquivos)
- **Admin Pages:** `/app/admin/` (9 pages, 3,300+ LOC)
