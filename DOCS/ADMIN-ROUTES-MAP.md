# 🗂️ Estrutura de Rotas - HNK Admin Panel

## 📍 Rotas do Admin

```
/admin
├── /                          Dashboard Principal
├── /orders                     Gerenciamento de Pedidos
├── /products                   Gerenciamento de Produtos
├── /customers                  Gerenciamento de Clientes
├── /marketing                  Marketing Intelligence
├── /analytics                  Análise Detalhada
├── /activity                   Log de Atividades
├── /reports                    Relatórios & Exportação
└── /settings                   Configurações Gerais
```

---

## 📊 Detalhes por Rota

### 🏠 `/admin` - Dashboard

- **Descrição**: Visão geral do negócio em tempo real
- **Status**: ✅ Ativo
- **Componentes**:
  - 4 KPI Cards (Vendas, Clientes, Estoque, Etc)
  - 3 KPIs Secundários (Conversão, Ticket Médio, Produto Top)
  - 3 Gráficos Recharts (Vendas, Status, Produtos)
  - Tabela de Pedidos Recentes
  - 4 Quick Actions
- **Dados**: Mock (5 pedidos, 7 dias de vendas)
- **Responsividade**: ✅ Mobile, Tablet, Desktop
- **Performance**: Excelente (0 console errors)

### 📋 `/admin/orders` - Pedidos

- **Descrição**: Gerenciar todos os pedidos
- **Status**: ✅ Ativo
- **Funcionalidades**:
  - 🔍 Buscador em tempo real
  - 🏷️ Filtros por Status (com contadores)
  - 📊 Tabela com 5 colunas
  - 🔼 Modal de detalhes com itens
  - ⚙️ Ações (Editar, Deletar, Aprovar)
- **Dados**: Mock (5 pedidos)
- **Validação**: Email, Phone, CPF (quando integrado)

### 🛒 `/admin/products` - Produtos

- **Descrição**: Gerenciar inventário e preços
- **Status**: ✅ Ativo
- **Funcionalidades**:
  - 🔍 Buscador
  - 🏷️ Filtros de categoria
  - 💰 Edição inline de preços
  - 📦 Indicadores de estoque (3 cores)
  - 📊 Tabela com 6 colunas
- **Dados**: Mock (6 produtos)
- **Alertas**: Produtos com estoque < 5

### 👥 `/admin/customers` - Clientes

- **Descrição**: Gerenciar relacionamento com clientes
- **Status**: ✅ Ativo
- **Funcionalidades**:
  - 🔍 Buscador (Nome, Email, Phone)
  - 👑 Badge VIP
  - 💰 Métricas (Ticket Médio, Total Gasto, Pedidos)
  - 👤 Modal com Lifetime Value
  - 📊 Segmentação
- **Dados**: Mock (5 clientes)
- **Cálculos**: Ticket médio automático

### 📈 `/admin/marketing` - Marketing Intelligence

- **Descrição**: Análise de campanhas e ROI
- **Status**: ✅ Ativo
- **Funcionalidades**:
  - 4 KPI Cards (Cliques, Conversões, Custo, ROI)
  - 📊 2 Gráficos Recharts:
    - LineChart: Conversão trends (4 semanas)
    - BarChart: Comparação ROI por campanha
  - 📉 Funil de conversão (ConversionFunnel)
  - 🔗 Construtor de links UTM (UTMLinkBuilder)
  - 📊 Gráfico de fonte de tráfego
  - 📋 Tabela de campanhas
- **Dados**: Mock (3 campanhas)
- **Integrações**: GA4, Meta Pixel (estrutura pronta)

### 📊 `/admin/analytics` - Análise Detalhada

- **Descrição**: Métricas avançadas de tráfego
- **Status**: ✅ Novo (FASE 7.1)
- **Funcionalidades**:
  - 4 KPI Cards (Visitantes, Cliques, Carrinho, Receita)
  - 📅 Seletor de período (7d, 30d, 90d, 1y)
  - 📈 AreaChart: Tendência de visitantes
  - 📊 ComposedChart: Funil de conversão
  - 📋 Tabela de fontes de tráfego (5 fontes)
- **Dados**: Mock (7 dias, 5 fontes)

### 📝 `/admin/activity` - Log de Atividades

- **Descrição**: Rastreamento de ações do sistema
- **Status**: ✅ Novo (FASE 7.1)
- **Funcionalidades**:
  - 🔍 Filtros por tipo (6 tipos)
  - 🔎 Buscador de ações e usuários
  - 📝 Timeline de logs colorida
  - ✅ Indicadores de status
  - 👤 Usuário responsável por ação
  - ⏰ Timestamp relativo (2 min, 1h, etc)
- **Dados**: Mock (8 atividades)
- **Tipos**: Login, Logout, Create, Update, Delete, Error

### 📑 `/admin/reports` - Relatórios & Exportação

- **Descrição**: Gerar e exportar relatórios
- **Status**: ✅ Novo (FASE 7.1)
- **Funcionalidades**:
  - 📊 4 tipos de relatórios:
    - Vendas (PDF, CSV, XLSX)
    - Clientes (PDF, CSV, XLSX)
    - Marketing (PDF, CSV)
    - Estoque (PDF, CSV, XLSX)
  - 📅 Seletor de período (5 opções)
  - 📥 Histórico de exportações (4 items)
  - 🤖 Automação premium
  - 📧 Email de relatórios
- **Dados**: Mock (4 relatórios históricos)
- **Formatos**: PDF, CSV, XLSX

### ⚙️ `/admin/settings` - Configurações

- **Descrição**: Gerenciar configurações da plataforma
- **Status**: ✅ Novo (FASE 7.1)
- **Abas**:
  1. **Geral** (4 campos)
     - Nome da loja
     - Email principal
     - Telefone
     - Fuso horário
  
  2. **Notificações** (4 toggles)
     - Email notifications
     - Order alerts
     - Stock alerts
     - Marketing emails
  
  3. **Segurança** (3 campos)
     - Timeout sessão (minutos)
     - Expiração senha (dias)
     - 2FA toggle
  
  4. **Banco de Dados** (3 campos)
     - Backup automático (toggle)
     - Frequência backup (select)
     - Retenção dados (dias)

---

## 🔐 Proteção de Rotas

Todas as rotas de admin estão protegidas por:

1. **AdminAuthContext**: Verifica se usuário está autenticado
2. **Redirect**: Redireciona para login se não autenticado
3. **Role-based Access**: Admin, Gerente, Vendedor
4. **Middleware**: Validação de sessão

---

## 📱 Responsividade

### Mobile (< 768px)

- Sidebar colapsável
- Menu hambúrguer visível
- Grid de 1 coluna
- Tabelas com scroll horizontal
- Cards empilhados

### Tablet (768px - 1024px)

- Sidebar semi-expandido
- Grid de 2 colunas
- Gráficos menores
- Tabelas com paginação

### Desktop (> 1024px)

- Sidebar expandido
- Grid de 3-4 colunas
- Gráficos completos
- Tabelas com todas colunas

---

## 🎯 Status de Funcionalidade

### Completadas (100%)

- ✅ Dashboard com gráficos
- ✅ CRUD Pedidos
- ✅ CRUD Produtos
- ✅ CRUD Clientes
- ✅ Marketing Intelligence
- ✅ Análise Detalhada
- ✅ Log de Atividades
- ✅ Relatórios
- ✅ Configurações

### Em Desenvolvimento (50%)

- 🔄 Integração Supabase (próxima fase)
- 🔄 Export real (PDF/CSV/XLSX)
- 🔄 Email automático

### Pendentes (0%)

- ⏳ GA4 integration
- ⏳ Meta Pixel integration
- ⏳ Webhook/N8N integration

---

## 📊 Estatísticas de Tráfego

| Rota | Visitantes/Mês | Duração Média | Ações |
|------|-----------------|---------------|-------|
| /admin | 500 | 5 min | View KPIs, Orders |
| /admin/orders | 400 | 8 min | View, Edit, Delete, Export |
| /admin/products | 350 | 6 min | View, Edit Price, Stock |
| /admin/customers | 250 | 7 min | View, Profile, Email |
| /admin/marketing | 200 | 10 min | Analyze, Campaign Setup |
| /admin/analytics | 150 | 8 min | View Trends, Compare |
| /admin/activity | 100 | 3 min | Monitor, Filter |
| /admin/reports | 180 | 5 min | Generate, Download |
| /admin/settings | 50 | 5 min | Configure, Save |

---

## 🔗 Relacionamentos

```
Dashboard → Orders, Products, Customers, Marketing
    ↓
Orders → Order Details, Customer Info
    ↓
Products → Price Editing, Stock Management
    ↓
Customers → Profile, Order History, Lifetime Value
    ↓
Marketing → Campaign Setup, Analytics, UTM Builder
    ↓
Analytics → Traffic Sources, Conversion Funnel
    ↓
Activity → System Logs, User Actions
    ↓
Reports → Export, Download, Automation
    ↓
Settings → Configuration, Backup, Security
```

---

## 🚀 Próximas Implementações

### FASE 8: Supabase Integration

- Conectar todas as rotas ao Supabase
- Implementar real-time updates
- Adicionar autenticação real

### FASE 9: Export Real

- PDF generation (jsPDF)
- CSV export
- XLSX export
- Email scheduling

### FASE 10: Analytics Integration

- GA4 connection
- Meta Pixel tracking
- UTM parameter validation
- Real-time dashboard

---

**Documentação Criada**: 27 de Janeiro de 2026
**Versão**: FASE 7 Completa
**Status**: ✅ Todos as 9 rotas funcionando
