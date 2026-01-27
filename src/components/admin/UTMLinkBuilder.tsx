'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Link as LinkIcon } from 'lucide-react'

interface UTMParams {
    source: string
    medium: string
    campaign: string
}

export function UTMLinkBuilder() {
    const baseUrl = 'https://hnkfood.com.br'
    const [params, setParams] = useState<UTMParams>({
        source: 'google_ads',
        medium: 'cpc',
        campaign: 'promocao_picanha'
    })
    const [copied, setCopied] = useState(false)

    const buildLink = () => {
        const url = new URL(baseUrl)
        url.searchParams.append('utm_source', params.source)
        url.searchParams.append('utm_medium', params.medium)
        url.searchParams.append('utm_campaign', params.campaign)
        return url.toString()
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(buildLink())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const utmLink = buildLink()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Source (origem)</label>
                    <input
                        type="text"
                        value={params.source}
                        onChange={(e) => setParams({ ...params, source: e.target.value })}
                        placeholder="google_ads, meta, organic..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Medium (meio)</label>
                    <input
                        type="text"
                        value={params.medium}
                        onChange={(e) => setParams({ ...params, medium: e.target.value })}
                        placeholder="cpc, cpm, email..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Campaign (campanha)</label>
                    <input
                        type="text"
                        value={params.campaign}
                        onChange={(e) => setParams({ ...params, campaign: e.target.value })}
                        placeholder="promocao_picanha..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 backdrop-blur"
            >
                <div className="flex items-center gap-2 mb-3">
                    <LinkIcon size={16} className="text-amber-500" />
                    <p className="text-xs font-bold uppercase text-zinc-400">Link com UTM</p>
                </div>
                <div className="space-y-3">
                    <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 break-all">
                        <p className="text-sm text-zinc-300 font-mono">{utmLink}</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-bold text-amber-400 transition-all hover:bg-amber-500/30"
                    >
                        {copied ? (
                            <>
                                <Check size={18} />
                                Copiado!
                            </>
                        ) : (
                            <>
                                <Copy size={18} />
                                Copiar Link
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400">
                <div className="rounded-lg border border-zinc-800/30 bg-zinc-900/20 p-3">
                    <p className="font-semibold text-zinc-300 mb-2">Valores comuns:</p>
                    <ul className="space-y-1">
                        <li><span className="text-amber-400">Source:</span> google_ads, meta, organic, direct</li>
                        <li><span className="text-amber-400">Medium:</span> cpc, cpm, organic, email</li>
                    </ul>
                </div>
                <div className="rounded-lg border border-zinc-800/30 bg-zinc-900/20 p-3">
                    <p className="font-semibold text-zinc-300 mb-2">Exemplo de campanha:</p>
                    <ul className="space-y-1">
                        <li>promocao_picanha</li>
                        <li>lancamento_novo_produto</li>
                        <li>black_friday_2024</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
