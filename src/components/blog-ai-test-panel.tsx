'use client'

import { useState } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { refineAndSaveBlogPost, listDraftPosts } from '@/actions/blog-actions'

/**
 * Componente de teste para FASE 2: IA Gastronômica
 * Permite testar o refino de conteúdo sem precisar do Instagram
 */
export function BlogAITestPanel() {
    const { organization, isLoading } = useTenant()
    const [caption, setCaption] = useState('Costela saindo agora da brasa! 🔥 Perfeita para reunir a galera no fim de semana.')
    const [result, setResult] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [draftPosts, setDraftPosts] = useState<any[]>([])

    const handleRefine = async () => {
        if (!organization || !caption.trim()) return

        setIsProcessing(true)
        try {
            const res = await refineAndSaveBlogPost(
                organization.id,
                caption,
                undefined,
                organization
            )
            setResult(res)

            // Carregar drafts
            if (res.success) {
                const draftsRes = await listDraftPosts(organization.id)
                if (draftsRes.success && draftsRes.posts) {
                    setDraftPosts(draftsRes.posts)
                }
            }
        } catch (error) {
            setResult({ success: false, error: String(error) })
        } finally {
            setIsProcessing(false)
        }
    }

    if (isLoading) return <div>Carregando tenant...</div>
    if (!organization) return <div>Sem organização</div>

    return (
        <div className="bg-[#1a1a1a] border border-[#d97706]/30 rounded-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">🧠 FASE 2: IA Gastronômica</h2>

            <div className="space-y-4">
                {/* Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Legenda do Instagram
                    </label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#d97706]/40 rounded-lg p-3 text-white placeholder-gray-500 focus:border-[#d97706] focus:outline-none"
                        rows={3}
                        placeholder="Cole a legenda do seu último post..."
                    />
                </div>

                {/* Brand Info */}
                <div className="bg-[#0a0a0a] rounded-lg p-4">
                    <p className="text-sm text-gray-400">
                        <strong>Voz da Marca:</strong> {organization.brand_voice}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        <strong>Keywords:</strong> {organization.keywords.join(', ')}
                    </p>
                </div>

                {/* Botão */}
                <button
                    onClick={handleRefine}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#d97706]/80 hover:to-[#b45309]/80 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                    {isProcessing ? 'Refinando... 🧠' : 'Refinar com IA'}
                </button>

                {/* Resultados */}
                {result && (
                    <div
                        className={`rounded-lg p-4 ${result.success
                            ? 'bg-green-900/20 border border-green-500/50'
                            : 'bg-red-900/20 border border-red-500/50'
                            }`}
                    >
                        {result.success ? (
                            <div>
                                <p className="text-green-400 font-bold mb-2">✅ Sucesso!</p>
                                <p className="text-gray-300 text-sm">{result.message}</p>
                                {result.post && (
                                    <div className="mt-3 bg-[#0a0a0a] rounded p-3">
                                        <h3 className="text-white font-bold">{result.post.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">
                                            SEO Score: {result.post.seo_score}/100
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p className="text-red-400 font-bold mb-2">❌ Erro</p>
                                <p className="text-gray-300 text-sm">{result.error}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Draft Posts */}
                {draftPosts.length > 0 && (
                    <div className="bg-[#0a0a0a] rounded-lg p-4">
                        <h3 className="text-white font-bold mb-3">📝 Posts em Draft</h3>
                        <div className="space-y-2">
                            {draftPosts.map((post) => (
                                <div key={post.id} className="border border-[#d97706]/30 rounded p-2">
                                    <p className="text-white text-sm font-medium">{post.title}</p>
                                    <p className="text-gray-400 text-xs">Score: {post.seo_score}/100</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
