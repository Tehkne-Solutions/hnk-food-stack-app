'use client'

// 🎁 Loyalty Card Display Component

import { LoyaltyCard } from '@/types/loyalty'
import { Gift, TrendingUp, Award } from 'lucide-react'

interface LoyaltyCardComponentProps {
    card: LoyaltyCard
}

export function LoyaltyCardComponent({ card }: LoyaltyCardComponentProps) {
    // Determine tier colors
    const tierColors: Record<string, string> = {
        bronze: 'from-amber-700 to-amber-600',
        silver: 'from-gray-400 to-gray-300',
        gold: 'from-yellow-500 to-yellow-400',
        platinum: 'from-blue-200 to-purple-200',
    }

    const tierEmojis: Record<string, string> = {
        bronze: '🥉',
        silver: '🥈',
        gold: '🥇',
        platinum: '👑',
    }

    const tierNames: Record<string, string> = {
        bronze: 'Bronze',
        silver: 'Silver',
        gold: 'Gold',
        platinum: 'Platinum',
    }

    // Calculate progress to next tier
    const tierThresholds = {
        bronze: { min: 0, next: 500 },
        silver: { min: 500, next: 2000 },
        gold: { min: 2000, next: 5000 },
        platinum: { min: 5000, next: Infinity },
    }

    const currentThreshold = tierThresholds[card.membership_tier as keyof typeof tierThresholds]
    const progress =
        card.membership_tier === 'platinum'
            ? 100
            : ((card.lifetime_spending - currentThreshold.min) /
                (currentThreshold.next - currentThreshold.min)) *
            100

    // Tier benefits
    const benefits: Record<string, string[]> = {
        bronze: ['1 ponto por R$10', '+50 pontos no aniversário'],
        silver: [
            '1.25x pontos',
            'Frete grátis em compras acima de R$50',
            '+100 pontos no aniversário',
        ],
        gold: [
            '1.5x pontos',
            'Frete grátis em todos os pedidos',
            'Atendimento prioritário',
            '+150 pontos no aniversário',
        ],
        platinum: [
            '2x pontos',
            'Frete grátis ilimitado',
            'Atendimento VIP 24/7',
            'Acesso 48h antes dos lançamentos',
            'Convite para eventos exclusivos',
        ],
    }

    const redeemableInCash = (card.available_points / 100) * 10

    return (
        <div
            className={`bg-gradient-to-br ${tierColors[card.membership_tier]} rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden`}
        >
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-sm font-semibold opacity-90">HNK Fidelização</h3>
                        <p className="text-2xl font-bold mt-1">{card.customer_name}</p>
                    </div>
                    <div className="text-4xl">{tierEmojis[card.membership_tier]}</div>
                </div>

                {/* Points Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/20 rounded-lg p-4">
                        <p className="text-xs opacity-90">Pontos Disponíveis</p>
                        <p className="text-2xl font-bold mt-1">{card.available_points}</p>
                        <p className="text-xs opacity-75 mt-2">≈ R$ {redeemableInCash.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                        <p className="text-xs opacity-90">Total Investido</p>
                        <p className="text-2xl font-bold mt-1">
                            R$ {card.lifetime_spending.toFixed(0)}
                        </p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                        <p className="text-xs opacity-90">Compras</p>
                        <p className="text-2xl font-bold mt-1">{card.total_purchases}</p>
                    </div>
                </div>

                {/* Tier Info */}
                <div className="mb-6 bg-white/15 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold">Progress para próximo tier</p>
                        <p className="text-sm font-bold">{Math.min(Math.round(progress), 100)}%</p>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    {card.membership_tier !== 'platinum' && (
                        <p className="text-xs mt-2 opacity-90">
                            R${
                                tierThresholds[card.membership_tier as keyof typeof tierThresholds].next -
                                card.lifetime_spending
                            } para o próximo tier
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
                    <div className="text-center bg-white/10 rounded p-2">
                        <Gift className="w-4 h-4 mx-auto mb-1" />
                        <p className="opacity-90">Resgatados</p>
                        <p className="font-bold">{card.redeemed_points}</p>
                    </div>
                    <div className="text-center bg-white/10 rounded p-2">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                        <p className="opacity-90">Investido</p>
                        <p className="font-bold">R$ {card.lifetime_spending.toFixed(0)}</p>
                    </div>
                    <div className="text-center bg-white/10 rounded p-2">
                        <Award className="w-4 h-4 mx-auto mb-1" />
                        <p className="opacity-90">Membro Desde</p>
                        <p className="font-bold">{new Date(card.join_date).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>

                {/* Tier Benefits */}
                <div className="bg-white/15 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Benefícios do {tierNames[card.membership_tier]}
                    </p>
                    <ul className="space-y-2">
                        {benefits[card.membership_tier]?.map((benefit, idx) => (
                            <li key={idx} className="text-sm opacity-90 flex items-start gap-2">
                                <span className="mt-1">✓</span>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
