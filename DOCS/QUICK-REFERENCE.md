# 🚀 QUICK REFERENCE - HNK Food Stack App

Guia rápido para consultas frequentes. Salve este arquivo nos favoritos!

---

## ⚡ Comandos Essenciais

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar servidor em produção
npm start

# Verificar erros TypeScript
npx tsc --noEmit

# Rodar ESLint
npm run lint

# Formatar código (se configurado)
npm run format

# Instalar nova dependência
npm install nome-do-pacote
```

---

## 📁 Arquivos Principais

| Arquivo | Propósito |
|---------|-----------|
| `app/page.tsx` | Home page |
| `src/components/cardapio/menu-main.tsx` | Componente principal |
| `src/hooks/use-cart.ts` | Gerenciador de carrinho |
| `src/lib/mock-data.ts` | Dados de exemplo |
| `tailwind.config.ts` | Configuração Tailwind |
| `tsconfig.json` | Configuração TypeScript |

---

## 🎨 Cores do Design System

```tsx
// Dark Mode
bg-[#0a0a0a]  // Fundo principal
bg-[#1a1a1a]  // Cards/Secundário
text-[#ffffff] // Texto branco
text-[#9ca3af] // Texto cinza

// Acentos
bg-[#d97706]  // Ouro/Destaque
bg-[#25d366]  // WhatsApp verde
```

---

## 📦 Estrutura de Pastas

```
src/
├── components/
│   └── cardapio/        ← Componentes do menu
├── hooks/
│   └── use-cart.ts      ← State do carrinho
├── lib/
│   └── mock-data.ts     ← Dados temporários
├── types/
│   └── index.ts         ← Interfaces TypeScript
└── utils/               ← Funções auxiliares
```

---

## 🔗 Imports Principais

```typescript
// Componentes
import { MenuMain } from '@/components/cardapio'

// Hooks
import { useCart } from '@/hooks/use-cart'

// Tipos
import type { Product, CartItem } from '@/types'

// Dados
import { mockProducts, categories } from '@/lib/mock-data'

// Framer Motion
import { motion } from 'framer-motion'

// Lucide Icons
import { Search, Plus, MessageCircle } from 'lucide-react'
```

---

## 🎯 Adicionar Nova Funcionalidade

### 1. Criar novo componente

```bash
# Criar arquivo em src/components/cardapio/
nano src/components/cardapio/novo-componente.tsx
```

### 2. Usar componente

```typescript
import { NovoComponente } from '@/components/cardapio'

export default function Page() {
  return <NovoComponente />
}
```

### 3. Adicionar tipos

```typescript
// Em src/types/index.ts
export interface NovaInterface {
  id: string
  nome: string
}
```

---

## 🐛 Debugging

### Ver logs no console

```typescript
console.log('Debug:', value)
console.error('Erro:', error)
console.warn('Aviso:', warning)
```

### Verificar tipos

```bash
npx tsc --noEmit
```

### Verificar linting

```bash
npm run lint
```

---

## 🔐 Variáveis de Ambiente

Criar arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
```

Usar no código:

```typescript
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

## 🎬 Animações Framer Motion

### Fade-in simples

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Conteúdo
</motion.div>
```

### Slide-up

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Conteúdo
</motion.div>
```

### Stagger (sequencial)

```jsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
  >
    {item}
  </motion.div>
))}
```

---

## 🛒 Usar Hook useCart

```typescript
import { useCart } from '@/hooks/use-cart'

export function MeuComponente() {
  const { items, addItem, removeItem, getTotal } = useCart()
  
  return (
    <>
      <p>Total: R$ {getTotal().toFixed(2)}</p>
      <button onClick={() => addItem(produto)}>
        Adicionar
      </button>
    </>
  )
}
```

---

## 📱 Testar Mobile

1. Abra DevTools (F12)
2. Clique "Toggle device toolbar" (Ctrl+Shift+M)
3. Escolha um dispositivo
4. Teste o comportamento

---

## 🚀 Deploy Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

---

## 📚 Documentação

| Documento | Uso |
|-----------|-----|
| [README.md](../README.md) | Overview geral |
| [DOCS/INDEX.md](./INDEX.md) | Índice completo |
| [DOCS/RESUMO-EXECUTIVO.md](./RESUMO-EXECUTIVO.md) | Resumo executivo |
| [DOCS/GUIA-FASE-2.2.md](./GUIA-FASE-2.2.md) | Próximas etapas |

---

## ❓ Problemas Comuns

### "Module not found"

- Verificar path em tsconfig.json
- Verificar se arquivo existe
- Limpar `rm -rf .next` e rodar `npm run dev`

### "Port 3000 already in use"

```bash
# Matar processo node
pkill -f node

# Ou usar outra porta
npm run dev -- -p 3001
```

### "TypeScript error"

```bash
# Verificar erros
npx tsc --noEmit

# Limpar cache
rm -rf .next tsconfig.tsbuildinfo
```

---

## 📞 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🎯 Performance Tips

### Optimize Images

```jsx
import Image from 'next/image'

<Image
  src="/img.jpg"
  alt="Descrição"
  width={300}
  height={300}
  priority={false}
/>
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'))
```

### Memoization

```typescript
import { memo } from 'react'

const MemoComponent = memo(function Component() {
  return <div>Conteúdo</div>
})
```

---

## 🔐 Security Checklist

- [ ] Validar inputs do usuário
- [ ] Usar HTTPS em produção
- [ ] Never hardcode secrets
- [ ] Use `.env.local` para secrets
- [ ] Sanitizar HTML dinâmico
- [ ] CORS configurado corretamente

---

## 📊 Monitoramento

### Adicionar Google Analytics

```typescript
// Em app/layout.tsx
<Script strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
/>
```

### Adicionar Sentry (error tracking)

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
})
```

---

## ✨ Convenções

### Nomeação de Arquivos

- Components: `PascalCase.tsx`
- Hooks: `useNome.ts`
- Utils: `camelCase.ts`
- Types: `PascalCase.ts`

### Nomeação de Variáveis

- Constants: `UPPER_CASE`
- Variables: `camelCase`
- Interfaces: `PascalCase`

---

## 🎓 Recursos de Aprendizado

- [Next.js Learn](https://nextjs.org/learn)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind Tutorial](https://tailwindcss.com/docs/installation)

---

**Última atualização**: 23 de Janeiro de 2026  
**Versão**: 1.0.0  
**Manutenção**: TEHKNÉ SOLUTIONS
