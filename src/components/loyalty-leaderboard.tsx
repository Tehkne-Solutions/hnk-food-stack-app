'use client'

// 🏆 Loyalty Leaderboard Component

import { LoyaltyLeaderboardEntry } from '@/types/loyalty'
import { Medal } from 'lucide-react'

interface LoyaltyLeaderboardProps {
    entries: LoyaltyLeaderboardEntry[]
}

export function LoyaltyLeaderboard({ entries }: LoyaltyLeaderboardProps) {
    const tierEmojis: Record<string, string> = {
        bronze: '🥉',
        silver: '🥈',
        gold: '🥇',
        platinum: '👑',
    }

    const getMedalIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇'
            case 2:
                return '🥈'
            case 3:
                return '🥉'
            default:
                return `#${rank}`
        }
    }

    if (!entries || entries.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <Medal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum membro no leaderboard ainda</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 px-6 py-4 flex items-center gap-3">
                <Medal className="w-6 h-6 text-yellow-900" />
                <h3 className="font-bold text-lg text-yellow-900">Ranking de Pontos</h3>
            </div>

            {/* Table */}
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Posição</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Pontos</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                            Total Gasto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Tier</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr
                            key={entry.loyalty_card_id}
                            className="border-b hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-bold text-lg text-gray-900">
                                {getMedalIcon(entry.rank)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm"
                                    >
                                        {entry.customer_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {entry.customer_name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {entry.last_purchase_date
                                                ? new Date(entry.last_purchase_date).toLocaleDateString(
                                                    'pt-BR'
                                                )
                                                : 'Sem compras'}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-bold text-blue-600 text-lg">
                                    {entry.total_points.toLocaleString()}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                R$ {entry.lifetime_spending.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100">
                                    {tierEmojis[entry.membership_tier] || '🥉'}
                                    {entry.membership_tier.charAt(0).toUpperCase() +
                                        entry.membership_tier.slice(1)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-between text-sm text-gray-600">
                <span>
                    <strong className="text-gray-900">{entries.length}</strong> clientes no ranking
                </span>
                <span>
                    Top member:{' '}
                    <strong className="text-gray-900">{entries[0]?.customer_name}</strong>
                </span>
            </div>
        </div>
    )
}
