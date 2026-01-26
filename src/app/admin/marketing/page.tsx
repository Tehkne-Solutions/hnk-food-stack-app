'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react'
import { ConversionFunnel } from '@/components/admin/ConversionFunnel'
import { UTMLinkBuilder } from '@/components/admin/UTMLinkBuilder'

interface Campaign {
  id: string
  name: string
  source: string
  clicks: number
  conversions: number
  revenue: number
  roi: number
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Google Ads - Picanha',
    source: 'google_ads',
    clicks: 1250,
    conversions: 45,
    revenue: 4500.00,
    roi: 320
  },
  {
    id: '2',
    name: 'Meta Ads - Brand',
    source: 'meta',
    clicks: 2100,
    conversions: 78,
    revenue: 7800.00,
    roi: 280
  },
  {
    id: '3',
    name: 'Instagram Organico',
    source: 'organic',
    clicks: 890,
    conversions: 32,
    revenue: 3200.00,
    roi: 150
  }
]

export default function MarketingPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns)

  const funnelData = {
    views: 12500,
    addToCart: 1250,
    purchases: 155
  }

  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgRoi = Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black italic text-white">Marketing Intelligence</h1>
        <p className="text-zinc-400">Analytics, UTM tracking, ROI de campanhas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Receita Total</h3>
            <div className="rounded-lg bg-zinc-900/50 p-2 text-amber-500">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Conversoes</h3>
            <div className="rounded-lg bg-zinc-900/50 p-2 text-blue-500">
              <Target size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalConversions}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-emerald-500/20 to-green-500/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">ROI Medio</h3>
            <div className="rounded-lg bg-zinc-900/50 p-2 text-emerald-500">
              <BarChart3 size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{avgRoi}%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Campanhas Ativas</h3>
            <div className="rounded-lg bg-zinc-900/50 p-2 text-purple-500">
              <Users size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{campaigns.length}</div>
        </motion.div>
      </div>

      <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-black italic text-white">
            Funil de <span className="text-amber-500">Conversao</span>
          </h2>
        </div>
        <div className="p-6">
          <ConversionFunnel data={funnelData} />
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-black italic text-white">
            Construtor de Links <span className="text-amber-500">UTM</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-2">Crie links rastreáveis para suas campanhas</p>
        </div>
        <div className="p-6">
          <UTMLinkBuilder />
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-black italic text-white">
            Desempenho das <span className="text-amber-500">Campanhas</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-900/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">Campanha</th>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">Fonte</th>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">Cliques</th>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">Conversoes</th>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">Receita</th>
                <th className="px-6 py-4 text-left font-bold text-zinc-300">ROI</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => {
                const conversionRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2)
                return (
                  <tr key={campaign.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{campaign.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-800/50 text-xs font-bold text-zinc-300">
                        {campaign.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{campaign.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-white">{campaign.conversions}</p>
                        <p className="text-xs text-zinc-500">{conversionRate}% CTR</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                      R$ {campaign.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                        {campaign.roi}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
