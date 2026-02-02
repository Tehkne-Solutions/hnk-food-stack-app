# 🔗 FASE 8: Integração Supabase - Roteiro de Implementação

## 📋 Pré-Requisitos

1. **Conta Supabase** (já deve existir)
2. **Database URL** e **Anon Key** do Supabase
3. **Variáveis de ambiente** configuradas:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
   ```

---

## 🗄️ Tabelas a Criar no Supabase

### 1. Tabela: `users` (Clientes/Usuários)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  cpf TEXT UNIQUE,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Tabela: `products`

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2),
  category TEXT,
  stock INT DEFAULT 0,
  stock_min INT DEFAULT 5,
  sku TEXT UNIQUE,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Tabela: `orders`

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, preparing, delivered, cancelled
  payment_method TEXT,
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Tabela: `order_items`

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Tabela: `campaigns`

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  source TEXT, -- google_ads, meta, organic, etc
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,
  roi DECIMAL(5, 2) DEFAULT 0,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Tabela: `activity_logs`

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT, -- login, logout, create, update, delete, error
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'success', -- success, error, pending
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 7. Tabela: `reports`

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type TEXT, -- sales, customers, marketing, inventory
  period TEXT, -- today, week, month, year
  data JSONB,
  format TEXT, -- pdf, csv, xlsx
  file_url TEXT,
  downloaded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Passos de Implementação

### Passo 1: Instalar/Atualizar Supabase Client

```bash
npm install @supabase/supabase-js
```

### Passo 2: Criar Cliente Supabase

**Arquivo**: `src/lib/supabase-client.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Passo 3: Atualizar Dashboard com Dados Reais

**Arquivo**: `app/admin/page.tsx`

Substituir:

```typescript
// Mock data
const [recentOrders] = useState([...])
const dailySalesData = [...]
```

Por:

```typescript
const [orders, setOrders] = useState([])
const [salesData, setSalesData] = useState([])

useEffect(() => {
  // Buscar dados do Supabase
  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (data) setOrders(data)
  }

  fetchOrders()
}, [])
```

### Passo 4: Integrar Autenticação Real

**Arquivo**: `contexts/AdminAuthContext.tsx`

Substituir mock auth por Supabase Auth:

```typescript
import { supabase } from '@/lib/supabase-client'

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  // Atualizar context com dados reais
}
```

### Passo 5: Página de Pedidos com Dados Reais

**Arquivo**: `app/admin/orders/page.tsx`

```typescript
useEffect(() => {
  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, user_id(*)')
      .order('created_at', { ascending: false })
    
    setOrders(data || [])
  }

  fetchOrders()
}, [])
```

### Passo 6: Página de Produtos com Dados Reais

**Arquivo**: `app/admin/products/page.tsx`

```typescript
useEffect(() => {
  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('name')
    
    setProducts(data || [])
  }

  fetchProducts()
}, [])

// Edição de preço
const updatePrice = async (productId: string, newPrice: number) => {
  await supabase
    .from('products')
    .update({ price: newPrice })
    .eq('id', productId)
}
```

### Passo 7: Página de Clientes com Dados Reais

**Arquivo**: `app/admin/customers/page.tsx`

```typescript
useEffect(() => {
  const fetchCustomers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*, orders(total)')
      .order('name')
    
    setCustomers(data || [])
  }

  fetchCustomers()
}, [])
```

### Passo 8: Real-time Subscriptions (Opcional)

Para atualizações em tempo real, usar Realtime:

```typescript
useEffect(() => {
  const subscription = supabase
    .channel('orders')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'orders' },
      (payload) => {
        // Atualizar estado quando há mudanças
        console.log('Novo pedido:', payload.new)
      }
    )
    .subscribe()

  return () => supabase.removeChannel(subscription)
}, [])
```

---

## ✅ Checklist de Implementação

- [ ] Criar conta/projeto Supabase
- [ ] Gerar URL e chaves do Supabase
- [ ] Adicionar variáveis de ambiente
- [ ] Criar todas as 7 tabelas no Supabase
- [ ] Instalar @supabase/supabase-js
- [ ] Criar cliente Supabase (`supabase-client.ts`)
- [ ] Integrar Dashboard com dados reais
- [ ] Integrar Autenticação real
- [ ] Integrar Página de Pedidos
- [ ] Integrar Página de Produtos
- [ ] Integrar Página de Clientes
- [ ] Testar criar novo pedido
- [ ] Testar editar preço de produto
- [ ] Testar deletar cliente
- [ ] Configurar Real-time Subscriptions
- [ ] Testes finais em produção

---

## 🎯 Ordem de Prioridade

1. **Tabelas Base** (users, products, orders)
2. **Dashboard** (com dados reais)
3. **Autenticação Real**
4. **CRUD Pedidos**
5. **CRUD Produtos**
6. **CRUD Clientes**
7. **Campanhas/Marketing**
8. **Real-time Updates**

---

## 📚 Recursos Úteis

- [Supabase Docs](https://supabase.com/docs)
- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

---

**Próxima Ação**: Começar com Passo 1 quando pronto
