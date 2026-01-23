'use client'

/**
 * 🎁 Customer Loyalty & Redemption Page
 */

import { useState, useEffect } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { getLoyaltyCard, redeemPoints, getPointsHistory } from '@/services/loyalty'
import { LoyaltyCardComponent } from '@/components/loyalty-card'
import { Gift, History, AlertCircle } from 'lucide-react'

export default function LoyaltyPage() {
    const tenant = useTenant()
    const [card, setCard] = useState<any>(null)
    const [history, setHistory] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [redeeming, setRedeeming] = useState(false)
    const [pointsToRedeem, setPointsToRedeem] = useState('')
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    // Get customer ID from URL or context (placeholder)
    const customerId = 'current-user' // TODO: Get from auth context

    useEffect(() => {
        loadData()
    }, [tenant.organization?.id])

    const loadData = async () => {
        if (!tenant.organization) return

        setLoading(true)
        try {
            // Buscar card
            const cardResult = await getLoyaltyCard(tenant.organization.id, customerId)
            if (cardResult.success && cardResult.card) {
                setCard(cardResult.card)

                // Buscar histórico
                const historyResult = await getPointsHistory(tenant.organization.id, cardResult.card.id, 10)
                if (historyResult.success) {
                    setHistory(historyResult.transactions || [])
                }
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao carregar dados' })
        } finally {
            setLoading(false)
        }
    }

    const handleRedeem = async () => {
        if (!card || !pointsToRedeem) {
            setMessage({ type: 'error', text: 'Selecione uma quantidade de pontos' })
            return
        }

        const points = parseInt(pointsToRedeem)

        if (points > card.available_points) {
            setMessage({ type: 'error', text: 'Você não tem pontos suficientes' })
            return
        }

        if (points < 100) {
            setMessage({ type: 'error', text: 'Mínimo 100 pontos para resgate (R$10)' })
            return
        }

        setRedeeming(true)
        try {
            const result = await redeemPoints(tenant.organization!.id, {
                org_id: tenant.organization!.id,
                loyalty_card_id: card.id,
                points_to_redeem: points,
            })

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `Resgate de ${points} pontos realizado! Você receberá R$${(points / 100) * 10} em crédito.`,
                })
                setPointsToRedeem('')
                await loadData()
                setTimeout(() => setMessage(null), 5000)
            } else {
                setMessage({ type: 'error', text: result.error || 'Erro ao processar resgate' })
            }
        } catch (error) {
            console.error('Redeem error:', error)
            setMessage({ type: 'error', text: 'Erro ao resgatar pontos' })
        } finally {
            setRedeeming(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Carregando...</p>
            </div>
        )
    }

    if (!card) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Cartão de fidelização não encontrado</p>
                </div>
            </div>
        )
    }

    const redeemableInCash = Math.floor(card.available_points / 100) * 10
    const maxRedeemablePoints = Math.floor(card.available_points / 100) * 100

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🎁 Minha Fidelização</h1>
                    <p className="text-gray-600">Acumule pontos e resgate cashback</p>
                </div>

                {/* Messages */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-100 border border-green-300 text-green-800'
                            : 'bg-red-100 border border-red-300 text-red-800'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Loyalty Card Display */}
                <div className="mb-8">
                    <LoyaltyCardComponent card={card} />
                </div>

                {/* Redemption Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Redemption */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Gift className="w-6 h-6 text-yellow-500" />
                                Resgatar Pontos
                            </h2>

                            <div className="space-y-6">
                                {/* Points Available */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pontos Disponíveis</label>
                                    <div className="text-3xl font-bold text-blue-600">{card.available_points}</div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Equivalente a R$ {redeemableInCash.toFixed(2)} em cashback
                                    </p>
                                </div>

                                {/* Redemption Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantos pontos você quer resgatar?</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            min="100"
                                            step="100"
                                            max={maxRedeemablePoints}
                                            value={pointsToRedeem}
                                            onChange={(e) => setPointsToRedeem(e.target.value)}
                                            placeholder="Ex: 100, 200, 300..."
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Mínimo 100 pontos (R$10 em cashback)</p>
                                </div>

                                {/* Quick Selection Buttons */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-3">Resgate rápido:</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {[100, 200, 300, 500].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => {
                                                    if (amount <= card.available_points) {
                                                        setPointsToRedeem(amount.toString())
                                                    }
                                                }}
                                                disabled={amount > card.available_points}
                                                className={`px-3 py-2 rounded border text-sm font-semibold transition ${amount > card.available_points
                                                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    : 'border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                                                    }`}
                                            >
                                                {amount}pts = R${(amount / 100) * 10}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Redemption Preview */}
                                {pointsToRedeem && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">
                                            Ao resgatar <span className="font-bold text-blue-600">{pointsToRedeem} pontos</span>, você receberá:
                                        </p>
                                        <p className="text-3xl font-bold text-green-600 mt-2">
                                            R$ {((parseInt(pointsToRedeem) || 0) / 100 * 10).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">em crédito para suas próximas compras</p>
                                    </div>
                                )}

                                {/* Redeem Button */}
                                <button
                                    onClick={handleRedeem}
                                    disabled={redeeming || !pointsToRedeem || parseInt(pointsToRedeem) < 100}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition"
                                >
                                    {redeeming ? 'Processando...' : '🎁 Resgatar Agora'}
                                </button>

                                {/* Info Box */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <p className="text-xs text-gray-700">
                                        <span className="font-semibold">ℹ️ Como funciona:</span> Os pontos são convertidos em crédito que pode ser usado em qualquer compra. Não há limite de resgate e o crédito não expira.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Panel - How it Works */}
                    <div>
                        <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                            <h3 className="font-bold text-lg mb-4">Como Funciona?</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">📊 Ganhe Pontos</p>
                                    <p className="text-xs text-gray-600">1 ponto a cada R$10 gasto (ou mais com tier premium)</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">🎁 Resgate Cashback</p>
                                    <p className="text-xs text-gray-600">100 pontos = R$10 em crédito</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">⬆️ Suba de Tier</p>
                                    <p className="text-xs text-gray-600">Quanto mais gasta, mais bônus recebe por ponto</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">🏆 Desbloqueie Benefícios</p>
                                    <p className="text-xs text-gray-600">Frete grátis, acesso exclusivo e mais</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs font-semibold text-gray-700 mb-3">Seus Benefícios Atuais:</p>
                                <div className="space-y-2">
                                    {card.membership_tier === 'bronze' && (
                                        <>
                                            <p className="text-xs text-gray-600">✓ 1 ponto por R$10</p>
                                            <p className="text-xs text-gray-600">✓ +50 pts no aniversário</p>
                                        </>
                                    )}
                                    {card.membership_tier === 'silver' && (
                                        <>
                                            <p className="text-xs text-gray-600">✓ 1.25 pontos por R$10</p>
                                            <p className="text-xs text-gray-600">✓ Frete grátis (R$50+)</p>
                                            <p className="text-xs text-gray-600">✓ +100 pts no aniversário</p>
                                        </>
                                    )}
                                    {card.membership_tier === 'gold' && (
                                        <>
                                            <p className="text-xs text-gray-600">✓ 1.5 pontos por R$10</p>
                                            <p className="text-xs text-gray-600">✓ Frete grátis sempre</p>
                                            <p className="text-xs text-gray-600">✓ Atendimento prioritário</p>
                                            <p className="text-xs text-gray-600">✓ +150 pts no aniversário</p>
                                        </>
                                    )}
                                    {card.membership_tier === 'platinum' && (
                                        <>
                                            <p className="text-xs text-gray-600">✓ 2 pontos por R$10</p>
                                            <p className="text-xs text-gray-600">✓ Frete grátis ilimitado</p>
                                            <p className="text-xs text-gray-600">✓ Atendimento VIP</p>
                                            <p className="text-xs text-gray-600">✓ Acesso 48h antes de launches</p>
                                            <p className="text-xs text-gray-600">✓ +250 pts no aniversário</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <History className="w-6 h-6 text-blue-500" />
                        Histórico de Transações
                    </h2>

                    {history.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Nenhuma transação ainda</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Descrição</th>
                                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Pontos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((tx) => (
                                        <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {new Date(tx.created_at).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${tx.type === 'earn'
                                                        ? 'bg-green-100 text-green-800'
                                                        : tx.type === 'redeem'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                        }`}
                                                >
                                                    {tx.type === 'earn' ? 'Ganho' : tx.type === 'redeem' ? 'Resgate' : 'Bônus'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-700">{tx.description}</td>
                                            <td className={`py-3 px-4 text-sm font-semibold text-right ${tx.type === 'redeem' ? 'text-red-600' : 'text-green-600'}`}>
                                                {tx.type === 'redeem' ? '-' : '+'}
                                                {tx.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
