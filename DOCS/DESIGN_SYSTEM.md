# The Ember System — Design System Reference

## 🔥 Design Tokens

### Color Palette

```
Primary Background:    #09090b (Zinc-950)
Primary Accent:        #f59e0b (Amber-500)
Secondary Text:        #a1a1aa (Zinc-400)
Tertiary:              #3f3f46 (Zinc-700)
Glass Border:          #27272a (Zinc-800) @ 50% opacity
Danger/Alert:          #ef4444 (Red-500)
Success:               #10b981 (Emerald-500)
```

### Typography

```
Headings (h1-h4):     Black Italic (Google Fonts weight: 900, style: italic)
Body/Paragraph:       Inter 400, 500, 600 (Google Fonts)
Prices/Numbers:       JetBrains Mono 600, 700 (Monospace, Google Fonts)
```

### Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

## 🎨 Component Patterns

### Glassmorphism (Cards/Modals)

```css
bg-zinc-900/40
backdrop-blur-md
border 1px border-zinc-800/50
```

### Buttons

- **FireButton (Primary):** Amber-500 bg, hover: glow shadow, text-white
- **Secondary:** Zinc-700 bg, hover: Zinc-600
- **Ghost:** transparent, text-amber-500, hover: bg-zinc-900

### Shadows

- **Depth 1:** shadow-lg (cards)
- **Depth 2:** shadow-2xl (modals, overlays)
- **Glow:** shadow-[0_0_20px_rgba(245,158,11,0.3)] (fire effect)

### Borders

- **Active:** border-amber-500/50
- **Inactive:** border-zinc-800/30
- **Hover:** border-amber-500/30

## 📱 Responsive Breakpoints

```
sm: 640px   (mobile phones)
md: 768px   (tablets)
lg: 1024px  (desktops)
xl: 1280px  (large screens)
```

## ⚡ Animation Presets

```
Fade In:       0.3s ease-out
Scale In:      0.2s cubic-bezier(0.34, 1.56, 0.64, 1)
Slide Up:      0.4s ease-out
Pulse:         2s ease-in-out infinite
Glow Pulse:    3s ease-in-out infinite (opacity)
```

## 🔗 Component Library Location

- All components: `src/components/`
- Base UI: `src/components/ui/`
- Design tokens: `tailwind.config.ts` (extend section)
- Utilities: `src/utils/` (formatters, helpers)

---

Generated: 2026-01-26
Version: 1.0 — The Ember System
