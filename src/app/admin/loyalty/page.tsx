'use client'

/**
 * 🎁 Admin Loyalty Management Page
 */

import { useState, useEffect } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { redeemPoints, getLeaderboard, getLoyaltyStats } from '@/services/loyalty'
import { LoyaltyLeaderboard } from '@/components/loyalty-leaderboard'
import { Gift, TrendingUp, Users, Award } from 'lucide-react'

export default function AdminLoyaltyPage() {
    const tenant = useTenant()
    const [stats, setStats] = useState<any>(null)
    const [leaderboard, setLeaderboard] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        loadData()
    }, [tenant.organization?.id])

    const loadData = async () => {
        if (!tenant.organization) return

        setLoading(true)
        try {
            const [statsResult, leaderboardResult] = await Promise.all([
                getLoyaltyStats(tenant.organization.id),
                getLeaderboard(tenant.organization.id, 10),
            ])

            if (statsResult.success) setStats(statsResult.stats)
            if (leaderboardResult.success) setLeaderboard(leaderboardResult.leaderboard || [])
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao carregar dados' })
        } finally {
            setLoading(false)
        }
    }

    if (loading || !stats) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-gray-800 p-8 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Gift className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold">🎁 Gestão de Fidelização</h1>
                </div>
                <p className="text-gray-400">Sistema de pontos loyalty e benefícios</p>
            </div>

            {/* Messages */}
            {message && (
                <div
                    className={`mx-8 mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-900/20 border border-green-500/30 text-green-300'
                            : 'bg-red-900/20 border border-red-500/30 text-red-300'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Stats Grid */}
            <div className="px-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Total Members */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-400">Total de Membros</h3>
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold">{stats.total_members}</p>
                        <p className="text-sm text-gray-500 mt-2">membros ativos</p>
                    </div>

                    {/* Total Points Issued */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-400">Pontos Emitidos</h3>
                            <TrendingUp className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold">{stats.total_points_issued.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">pontos totais</p>
                    </div>

                    {/* Total Redeemed */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-400">Pontos Resgatados</h3>
                            <Gift className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold">{stats.total_points_redeemed.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">pontos resgatados</p>
                    </div>

                    {/* Gold/Platinum Members */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-400">VIP (Gold+)</h3>
                            <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold">{stats.gold_silver_members}</p>
                        <p className="text-sm text-gray-500 mt-2">membros premium</p>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="px-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Avg Points */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-400 mb-4">Média de Pontos por Membro</h3>
                        <p className="text-4xl font-bold text-blue-400">{Math.round(stats.avg_points_per_member)}</p>
                        <p className="text-sm text-gray-500 mt-2">pontos/membro</p>
                    </div>

                    {/* Redemption Rate */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-400 mb-4">Taxa de Resgate</h3>
                        <p className="text-4xl font-bold text-green-400">
                            {stats.total_points_issued > 0
                                ? ((stats.total_points_redeemed / stats.total_points_issued) * 100).toFixed(1)
                                : '0'}
                            %
                        </p>
                        <p className="text-sm text-gray-500 mt-2">dos pontos resgatados</p>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="px-8 mb-8">
                <LoyaltyLeaderboard entries={leaderboard} />
            </div>

            {/* Actions */}
            <div className="px-8 mb-8">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-6">⚙️ Configurações de Fidelização</h2>

                    <div className="space-y-4">
                        <div className="bg-gray-900/50 rounded p-4">
                            <h3 className="font-semibold mb-2">Sistema de Pontos</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                • 1 ponto por R$10 gasto (padrão)
                                <br />• 100 pontos = R$10 em cashback
                                <br />• Multiplicadores por tier: Bronze (1x), Silver (1.25x), Gold (1.5x), Platinum (2x)
                            </p>
                        </div>

                        <div className="bg-gray-900/50 rounded p-4">
                            <h3 className="font-semibold mb-2">Tiers de Membership</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                • Bronze: padrão
                                <br />• Silver: R$500+ em gasto (Bônus: +50 pts)
                                <br />• Gold: R$2000+ em gasto (Bônus: +100 pts)
                                <br />• Platinum: R$5000+ em gasto (Bônus: +200 pts)
                            </p>
                        </div>

                        <div className="bg-gray-900/50 rounded p-4">
                            <h3 className="font-semibold mb-2">Próximas Features (v2)</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                • Referral program (compartilhe, ganhe bônus)
                                <br />• Seasonal multipliers (Black Friday 3x, etc)
                                <br />• Birthday bonus (+50 pts automático)
                                <br />• Social sharing rewards
                                <br />• Gamification badges
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="px-8 pb-8">
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/50 rounded-lg p-6">
                    <h3 className="font-bold mb-3">💡 Dicas para Aumentar Engajamento</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Promova os tiers e benefícios no email marketing</li>
                        <li>• Celebre milestones (primeiro purchase, 1000 pontos, etc)</li>
                        <li>• Envie notificações de pontos prestes a expirar</li>
                        <li>• Ofereça bônus sazonais (Natal, Ano Novo, etc)</li>
                        <li>• Crie challenges (gaste R$500 em 30 dias = bonus 50 pts)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
