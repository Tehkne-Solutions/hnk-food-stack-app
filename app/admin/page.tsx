'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Users, AlertCircle, TrendingUp, Zap, ChevronRight, BarChart3, Flame } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  MetalCard,
  MetalCardHeader,
  MetalCardContent,
  MetalCardFooter,
  MetalButton,
  CornerEmbers,
} from '@/components/metal'

export default function AdminDashboard() {
  const [stats] = useState({
    salesToday: 1250.50,
    salesWeek: 8750.00,
    activeCustomers: 342,
    lowStockProducts: 8,
    conversionRate: 3.2,
    avgOrderValue: 156.75,
    topProduct: 'Churrasco Misto',
  })

  const [recentOrders] = useState([
    { id: '#001', customer: 'João Silva', total: 245.50, status: 'pendente', time: '5 min' },
    { id: '#002', customer: 'Maria Santos', total: 189.00, status: 'preparando', time: '15 min' },
    { id: '#003', customer: 'Pedro Costa', total: 312.00, status: 'entregue', time: '1h' },
    { id: '#004', customer: 'Ana Oliveira', total: 156.75, status: 'pendente', time: '2h' },
    { id: '#005', customer: 'Carlos Mendes', total: 201.50, status: 'preparando', time: '3h' },
  ])

  const dailySalesData = [
    { day: 'Seg', sales: 2400, orders: 8 },
    { day: 'Ter', sales: 3210, orders: 11 },
    { day: 'Qua', sales: 2290, orders: 7 },
    { day: 'Qui', sales: 2000, orders: 6 },
    { day: 'Sex', sales: 2181, orders: 9 },
    { day: 'Sab', sales: 2500, orders: 12 },
    { day: 'Dom', sales: 2100, orders: 8 },
  ]

  const orderStatusData = [
    { name: 'Pendentes', value: 5, fill: '#f59e0b' },
    { name: 'Preparando', value: 8, fill: '#3b82f6' },
    { name: 'Entregues', value: 45, fill: '#10b981' },
  ]

  const topProductsData = [
    { name: 'Churrasco Misto', sales: 45, revenue: 3825 },
    { name: 'Picanha Angus', sales: 38, revenue: 4937 },
    { name: 'Costela Bovina', sales: 32, revenue: 3520 },
    { name: 'Espetinho Misto', sales: 28, revenue: 1820 },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      pendente: { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: '⏳' },
      preparando: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '👨‍🍳' },
      entregue: { bg: 'bg-green-500/20', text: 'text-green-400', icon: '✅' },
    }
    return colors[status] || colors.pendente
  }

  return (
    <div className="space-y-8 relative">
      {/* Background Effects - Subtle */}
      <CornerEmbers corner="bottom-right" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-geist-black text-steel-silver">
            Dashboard <span className="text-ember-core">Admin</span>
          </h1>
          <p className="text-steel-brushed mt-2">Bem-vindo! Aqui está um resumo do seu negócio.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-steel-brushed">Atualizado em:</p>
          <p className="text-steel-silver font-semibold">{new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Today */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <MetalCard variant="accent" hover glowing>
            <MetalCardContent>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-geist-black uppercase tracking-wider text-steel-brushed">
                  Vendas Hoje
                </h3>
                <div className="rounded-lg bg-ember-core/20 p-2 text-ember-core">
                  <TrendingUp size={18} />
                </div>
              </div>
              <div className="text-3xl font-geist-black text-steel-silver mb-1">
                R$ {stats.salesToday.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-ember-core">+15% vs. ontem</p>
            </MetalCardContent>
          </MetalCard>
        </motion.div>

        {/* Sales Week */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <MetalCard variant="primary" hover>
            <MetalCardContent>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-geist-black uppercase tracking-wider text-steel-brushed">
                  Vendas Semana
                </h3>
                <div className="rounded-lg bg-steel-brushed/20 p-2 text-steel-silver">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="text-3xl font-geist-black text-steel-silver mb-1">
                R$ {stats.salesWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-steel-brushed">+8% vs. semana anterior</p>
            </MetalCardContent>
          </MetalCard>
        </motion.div>

        {/* Active Customers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetalCard variant="primary" hover>
            <MetalCardContent>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-geist-black uppercase tracking-wider text-steel-brushed">
                  Clientes Ativos
                </h3>
                <div className="rounded-lg bg-steel-brushed/20 p-2 text-steel-silver">
                  <Users size={18} />
                </div>
              </div>
              <div className="text-3xl font-geist-black text-steel-silver mb-1">{stats.activeCustomers}</div>
              <p className="text-xs text-steel-brushed">+12 novos esta semana</p>
            </MetalCardContent>
          </MetalCard>
        </motion.div>

        {/* Low Stock */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <MetalCard variant="primary" hover>
            <MetalCardContent>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-geist-black uppercase tracking-wider text-steel-brushed">
                  Estoque Baixo
                </h3>
                <div className="rounded-lg bg-blood-orange/20 p-2 text-blood-orange">
                  <AlertCircle size={18} />
                </div>
              </div>
              <div className="text-3xl font-geist-black text-blood-orange mb-1">{stats.lowStockProducts}</div>
              <p className="text-xs text-steel-brushed">Requer atenção</p>
            </MetalCardContent>
          </MetalCard>
        </motion.div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetalCard variant="secondary">
          <MetalCardContent>
            <h3 className="text-sm font-geist-black text-steel-silver mb-2">Taxa de Conversão</h3>
            <div className="text-2xl font-geist-black text-ember-core">{stats.conversionRate}%</div>
            <p className="text-xs text-steel-brushed mt-2">Proporção de vendas</p>
          </MetalCardContent>
        </MetalCard>

        <MetalCard variant="secondary">
          <MetalCardContent>
            <h3 className="text-sm font-geist-black text-steel-silver mb-2">Valor Médio Pedido</h3>
            <div className="text-2xl font-geist-black text-ember-core">
              R$ {stats.avgOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-steel-brushed mt-2">Por transação</p>
          </MetalCardContent>
        </MetalCard>

        <MetalCard variant="secondary">
          <MetalCardContent>
            <h3 className="text-sm font-geist-black text-steel-silver mb-2">Produto Top</h3>
            <div className="text-lg font-geist-black text-ember-core truncate">{stats.topProduct}</div>
            <p className="text-xs text-steel-brushed mt-2">Mais vendido esta semana</p>
          </MetalCardContent>
        </MetalCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <MetalCard variant="dark" className="lg:col-span-2">
          <MetalCardHeader>
            <h3 className="text-lg font-geist-black text-steel-silver">Vendas Diárias (7 dias)</h3>
          </MetalCardHeader>
          <MetalCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
                <XAxis dataKey="day" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '0.5rem' }} />
                <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </MetalCardContent>
        </MetalCard>

        {/* Order Status Pie */}
        <MetalCard variant="dark">
          <MetalCardHeader>
            <h3 className="text-lg font-geist-black text-steel-silver">Status dos Pedidos</h3>
          </MetalCardHeader>
          <MetalCardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </MetalCardContent>
        </MetalCard>
      </div>

      {/* Products Chart */}
      <MetalCard variant="dark">
        <MetalCardHeader>
          <h3 className="text-lg font-geist-black text-steel-silver">Top Produtos</h3>
        </MetalCardHeader>
        <MetalCardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '0.5rem' }} />
              <Legend />
              <Bar dataKey="sales" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              <Bar dataKey="revenue" fill="#d97706" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </MetalCardContent>
      </MetalCard>

      {/* Recent Orders */}
      <MetalCard variant="dark">
        <MetalCardHeader>
          <h3 className="text-lg font-geist-black text-steel-silver">Pedidos Recentes</h3>
        </MetalCardHeader>
        <MetalCardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const colors = getStatusColor(order.status)
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-deep-charcoal/50 to-zinc-800/30 border border-steel-brushed/20 hover:border-ember-core/30 transition-all group cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-geist-black text-steel-silver">{order.id}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                        {colors.icon} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-xs text-steel-brushed ml-auto">{order.time}</span>
                    </div>
                    <p className="text-sm text-steel-silver group-hover:text-ember-core transition-colors">{order.customer}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-geist-black text-ember-core">R$ {order.total.toFixed(2)}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </MetalCardContent>
        <MetalCardFooter>
          <Link href="/admin/orders" className="flex items-center gap-2 text-sm text-ember-core hover:text-amber-400 transition-colors group">
            Ver todos os pedidos
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </MetalCardFooter>
      </MetalCard>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products">
          <MetalCard variant="primary" hover interactive className="h-full cursor-pointer">
            <MetalCardContent>
              <div className="text-4xl mb-3">🛍️</div>
              <h3 className="text-lg font-geist-black text-steel-silver mb-2">Gerenciar Produtos</h3>
              <p className="text-sm text-steel-brushed">Adicione, edite ou remova produtos</p>
            </MetalCardContent>
          </MetalCard>
        </Link>

        <Link href="/admin/customers">
          <MetalCard variant="primary" hover interactive className="h-full cursor-pointer">
            <MetalCardContent>
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-lg font-geist-black text-steel-silver mb-2">Clientes</h3>
              <p className="text-sm text-steel-brushed">Visualize dados dos clientes</p>
            </MetalCardContent>
          </MetalCard>
        </Link>

        <Link href="/admin/analytics">
          <MetalCard variant="primary" hover interactive className="h-full cursor-pointer">
            <MetalCardContent>
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-geist-black text-steel-silver mb-2">Análise</h3>
              <p className="text-sm text-steel-brushed">Relatórios detalhados e insights</p>
            </MetalCardContent>
          </MetalCard>
        </Link>
      </div>
    </div>
  )
}
