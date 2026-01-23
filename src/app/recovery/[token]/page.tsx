'use client'

/**
 * 🧠 Página de Recuperação de Carrinho
 * Usuário clica no link do WhatsApp e volta ao carrinho
 * URL: /recovery/[token]
 */

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { trackRecoveryClick } from '@/actions/recovery-actions'
import Link from 'next/link'

export default function RecoveryPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [cartData, setCartData] = useState<{ cart_items: Array<{ product_name: string; quantity: number; price: number; total: number }>; cart_total: number } | null>(null)

    useEffect(() => {
        const decodeAndRecover = async () => {
            try {
                const token = params.token as string

                if (!token) {
                    throw new Error('Token inválido')
                }

                // Decodificar token: base64(cartId:orgId)
                const decoded = Buffer.from(token, 'base64').toString('utf-8')
                const [cartId, orgId] = decoded.split(':')

                if (!cartId || !orgId) {
                    throw new Error('Token corrompido')
                }

                // Rastrear clique
                const trackResult = await trackRecoveryClick(cartId, orgId)

                if (!trackResult.success) {
                    console.warn('⚠️ Falha ao rastrear clique:', trackResult.error)
                    // Não bloquear se rastreamento falhar
                }

                // Buscar dados do carrinho (via API)
                const response = await fetch(
                    `/api/recovery/cart?cartId=${cartId}&orgId=${orgId}`
                )

                if (!response.ok) {
                    throw new Error('Carrinho não encontrado')
                }

                const data = await response.json()
                setCartData(data.cart)

                // Restaurar carrinho (opcional - usuário pode ver resumo ou restaurar)
                // Para manter UX simples, apenas mostrar resumo

                console.log(`✅ Clique de recovery rastreado: ${cartId}`)
            } catch (err) {
                console.error('❌ Erro ao recuperar carrinho:', err)
                setError(err instanceof Error ? err.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        decodeAndRecover()
    }, [params.token])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-[#d97706]"></div>
                    <p className="text-gray-400 mt-4">Recuperando seu carrinho...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">❌ Erro</h1>
                    <p className="text-gray-400 mb-8">{error}</p>
                    <Link
                        href="/"
                        className="inline-block bg-[#d97706] text-white px-6 py-2 rounded-lg hover:bg-[#b8860b] transition"
                    >
                        Voltar ao Menu
                    </Link>
                </div>
            </div>
        )
    }

    if (!cartData) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">⚠️ Carrinho Vazio</h1>
                    <p className="text-gray-400 mb-8">
                        Este carrinho já foi processado ou expirou
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-[#d97706] text-white px-6 py-2 rounded-lg hover:bg-[#b8860b] transition"
                    >
                        Voltar ao Menu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-2">🎉 Bem-vindo de volta!</h1>
                    <p className="text-gray-400">
                        Seu carrinho foi recuperado. Finalize a compra agora!
                    </p>
                </div>

                {/* Carrinho Resumido */}
                <div className="max-w-2xl mx-auto bg-[#1a1a1a] rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-[#d97706]">
                        📦 Seu Carrinho
                    </h2>

                    {/* Itens */}
                    <div className="space-y-4 mb-6">
                        {cartData.cart_items.map((item: { product_name: string; quantity: number; price: number; total: number }, idx: number) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center border-b border-gray-700 pb-4"
                            >
                                <div>
                                    <p className="font-semibold">{item.product_name}</p>
                                    <p className="text-gray-400 text-sm">
                                        {item.quantity}x R$ {item.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="font-bold text-[#d97706]">
                                    R$ {item.total.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-[#0a0a0a] rounded p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-2xl font-bold text-[#d97706]">
                                R$ {cartData.cart_total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full bg-[#d97706] text-white py-3 rounded-lg font-bold hover:bg-[#b8860b] transition"
                        >
                            ✅ Finalizar Compra
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full border border-gray-600 text-gray-400 py-3 rounded-lg hover:border-gray-400 transition"
                        >
                            Continuar Comprando
                        </button>
                    </div>
                </div>

                {/* Info adicional */}
                <div className="max-w-2xl mx-auto text-center text-gray-400 text-sm">
                    <p>💚 Obrigado por confiar em nós!</p>
                    <p>Precisa de ajuda? Entre em contato via WhatsApp</p>
                </div>
            </div>
        </div>
    )
}
