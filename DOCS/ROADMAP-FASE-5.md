# 📊 FASE 5: Dashboard BI - Implementação

## 🎯 Objetivo

Criar `/admin/dashboard` com visualização de dados de conversão, revenue e ROI do Recovery Brain.

---

## 📋 Arquivos a Criar

### 1. **Tipos de Dashboard** (`src/types/dashboard.ts`)

```typescript
interface DashboardMetrics {
  revenue_total: number
  revenue_today: number
  orders_total: number
  orders_today: number
  conversion_rate: number
  average_order_value: number
  recovery_brain_roi: number
  top_products: Product[]
  sales_trend: SalesTrendData[]
}

interface SalesTrendData {
  date: string
  revenue: number
  orders: number
  recovery_orders: number
}
```

### 2. **Serviço de Dashboard** (`src/services/dashboard.ts`)

```typescript
export async function getDashboardMetrics(orgId: string, days: number)
export async function getSalesTrend(orgId: string, days: number)
export async function getTopProducts(orgId: string, limit: number)
export async function getConversionFunnel(orgId: string)
```

### 3. **Componente Dashboard** (`src/app/admin/dashboard/page.tsx`)

- Card de Revenue (hoje + total)
- Card de Conversão
- Chart de Vendas (linha)
- Chart de Top 5 Produtos (barra)
- Chart de Recovery Brain ROI (pizza)
- Filtros de data (today, 7d, 30d)

### 4. **Componentes de Chart**

- `RecoveryRoiChart.tsx` - Comparar antes/depois recovery
- `SalesTrendChart.tsx` - Linha de vendas x tempo
- `ProductChart.tsx` - Barra de top produtos

---

## 📦 Bibliotecas

```bash
npm install recharts tremor
```

- **Recharts**: Charts responsivos (linha, barra, pizza)
- **Tremor**: Cards e layouts premium

---

## 🏗️ Estrutura

```
/admin/dashboard/
├── page.tsx (Layout principal)
├── cards/
│  ├── MetricCard.tsx
│  ├── RevenueCard.tsx
│  └── ConversionCard.tsx
└── charts/
   ├── SalesTrendChart.tsx
   ├── ProductChart.tsx
   └── RecoveryRoiChart.tsx
```

---

## 💰 SQL para Métricas

```sql
-- Total Revenue
SELECT 
  SUM(total_amount) as revenue_total,
  COUNT(*) as orders_total
FROM pedidos
WHERE org_id = $1;

-- Sales Trend (últimos 30 dias)
SELECT 
  DATE(created_at) as date,
  SUM(total_amount) as revenue,
  COUNT(*) as orders,
  COUNT(CASE WHEN recovery_cart_id IS NOT NULL THEN 1 END) as recovery_orders
FROM pedidos
WHERE org_id = $1 
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date;

-- Top 5 Produtos
SELECT 
  p.name,
  COUNT(pd.id) as quantity_sold,
  SUM(pd.price * pd.quantity) as revenue
FROM produtos p
JOIN pedidos_items pd ON p.id = pd.product_id
JOIN pedidos ped ON pd.order_id = ped.id
WHERE ped.org_id = $1
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 5;

-- Recovery Brain ROI
SELECT 
  COUNT(CASE WHEN recovery_status = 'recovered' THEN 1 END) as recovered_carts,
  SUM(CASE WHEN recovery_status = 'recovered' THEN cart_total ELSE 0 END) as recovery_revenue,
  COUNT(*) as total_abandoned
FROM abandoned_carts
WHERE org_id = $1
  AND created_at > NOW() - INTERVAL '30 days';
```

---

## 🎨 Design do Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Dashboard HNK Food Stack                                │
│  Período: [Hoje] [7 dias] [30 dias]                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┬──────────────────┬──────────────────┐ │
│  │ 💰 Revenue Hoje  │ 📈 Conversão    │ 🧠 Recovery ROI  │ │
│  │ R$ 1.250,00      │ 3,4% (15/440)   │ +R$ 3.000        │ │
│  │ (+5% vs ontem)   │ (+0,2% vs 7d)   │ 31,6% conversion │ │
│  └──────────────────┴──────────────────┴──────────────────┘ │
│                                                             │
│  ┌──────────────────────┬────────────────────────────────┐ │
│  │ Vendas (últimos 30d) │ Top 5 Produtos                 │ │
│  │ [LINHA CHART]        │ [BARRA CHART]                  │ │
│  │  5k                  │ Picanha         R$ 2.500      │ │
│  │  4k                  │ Alcatra         R$ 2.200      │ │
│  │  3k                  │ Contra-filé     R$ 1.800      │ │
│  │  2k                  │ Cupim           R$ 1.500      │ │
│  │  1k                  │ Linguado        R$ 1.200      │ │
│  └──────────────────────┴────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────┬────────────────────────────────┐ │
│  │ Recovery Brain ROI   │ Funil de Conversão             │ │
│  │ [PIZZA CHART]        │ Visitantes: 1.500              │ │
│  │ Recuperados 31,6%    │ Carrinho:     440 (29%)         │ │
│  │ Falhados   68,4%     │ Checkout:     165 (37%)         │ │
│  │                      │ Compra:       142 (86%)         │ │
│  └──────────────────────┴────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Status: 🚀 Próxima Fase
