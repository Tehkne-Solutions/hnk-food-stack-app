# 🔧 FASE 2.2: Supabase + Carrinho de Compras

## 📋 Objetivo

Conectar o aplicativo a um banco de dados PostgreSQL (Supabase) e implementar a funcionalidade completa do carrinho com checkout via WhatsApp.

## 🎯 Etapas

### ETAPA 1: Configurar Supabase

```bash
# 1. Visite https://supabase.com
# 2. Crie uma conta (gratuita)
# 3. Crie um novo projeto (nome: hnk-food-stack)
# 4. Aguarde inicialização (~2 min)
```

### ETAPA 2: Criar Tabelas no Supabase

**Tabela: products**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  badge TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir dados iniciais
INSERT INTO products (name, description, price, category, image_url, badge) VALUES
('Picanha Premium', 'Corte suculento...', 89.90, 'carnes', '/placeholder.jpg', 'mais-pedido'),
-- ...mais produtos
```

**Tabela: orders**

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pendente',
  order_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Tabela: event_leads**

```sql
CREATE TABLE event_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  event_date DATE,
  guest_count INTEGER,
  budget_status TEXT DEFAULT 'oramento-solicitado',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### ETAPA 3: Conectar Supabase ao Next.js

```bash
npm install @supabase/supabase-js
```

**Criar arquivo: src/lib/supabase.ts**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Criar arquivo: .env.local**

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### ETAPA 4: Implementar Carrinho Visual

**Criar: src/components/cardapio/cart-drawer.tsx**

- Drawer que desliza da direita
- Lista itens do carrinho
- Botão de checkout
- Integração com useCart hook

**Atualizar: menu-main.tsx**

- Mostrar badge com quantidade no carrinho
- Botão flutuante do carrinho (além do WhatsApp)
- Trigger para abrir CartDrawer

### ETAPA 5: Checkout com WhatsApp

**Criar: src/services/whatsapp.ts**

```typescript
export async function sendOrderViaWhatsApp(
  cartItems: CartItem[],
  total: number,
  clientPhone: string
) {
  const message = formatOrderMessage(cartItems, total)
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURI(message)}`
  window.open(whatsappUrl, '_blank')
}
```

**Adicionar dados de contato à Supabase:**

```typescript
await supabase.from('orders').insert([{
  client_name: name,
  client_phone: phone,
  items: cartItems,
  total: total,
  status: 'pendente'
}])
```

### ETAPA 6: Fetch Dinâmico de Produtos

**Atualizar: menu-main.tsx**

```typescript
useEffect(() => {
  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
    setProducts(data)
  }
  fetchProducts()
}, [])
```

## 📦 Dependências a Instalar

```bash
npm install @supabase/supabase-js zustand
```

## 🎨 Componentes a Criar

1. `CartDrawer` - Drawer com itens do carrinho
2. `CartBadge` - Badge mostrando quantidade
3. `CheckoutForm` - Form de dados para WhatsApp

## ✅ Testes a Realizar

- [ ] Produtos carregam do banco
- [ ] Adicionar item ao carrinho persiste
- [ ] Remover item funciona
- [ ] Calcular total está correto
- [ ] Enviar via WhatsApp funciona
- [ ] Dados salvos no Supabase

## 🚀 Tempo Estimado

- Supabase setup: 10 min
- Criar tabelas: 10 min
- Integração Next.js: 15 min
- Componentes UI: 20 min
- Testes: 10 min
**Total: 65 minutos**

## ⚠️ Pontos de Atenção

1. Verificar se Supabase está respondendo
2. CORS pode precisar de ajustes
3. Validar dados antes de enviar WhatsApp
4. Testar em mobile (o principal use case)

## 📝 Checklist de Conclusão

- [ ] Supabase conectado
- [ ] Tabelas criadas e com dados
- [ ] Produtos carregam dinamicamente
- [ ] Carrinho funciona totalmente
- [ ] Checkout via WhatsApp enviando dados
- [ ] Dados persisten em localStorage
- [ ] Responsividade mantida
- [ ] Sem erros no console

---

**Status**: Pronto para começar  
**Próxima Etapa**: Execução de ETAPA 1 (Supabase Setup)

Deseja que eu comece agora?
