'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Cookie Consent Banner
 * HNK-GIP Pattern: LGPD Compliance
 * 
 * Permite usuário aceitar/rejeitar cookies de tracking
 * Respeita preferência no localStorage
 */
export function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasConsent, setHasConsent] = useState<boolean | null>(null)

    useEffect(() => {
        // Verificar se já tem consentimento
        const stored = localStorage.getItem('cookie-consent')
        if (stored) {
            setHasConsent(JSON.parse(stored))
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(true))
        setHasConsent(true)
        setIsVisible(false)

            // Habilitar tracking
            ; (window as any).fbq?.('consent', 'grant')
            ; (window as any).gtag?.('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
            })
    }

    const handleReject = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(false))
        setHasConsent(false)
        setIsVisible(false)

            // Bloquear tracking
            ; (window as any).fbq?.('consent', 'deny')
            ; (window as any).gtag?.('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
            })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#d97706]/50 p-4 max-w-4xl mx-auto"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <h3 className="text-white font-bold mb-2">🍪 Consentimento de Cookies</h3>
                            <p className="text-sm text-gray-400">
                                Nós usamos cookies e ferramentas de rastreamento para melhorar sua experiência,
                                analisar tráfego e personalizar anúncios. Você pode aceitar ou rejeitar. Sua
                                privacidade é importante para nós.
                            </p>
                            <a
                                href="/privacidade"
                                className="text-xs text-[#d97706] hover:underline mt-2 inline-block"
                            >
                                Leia nossa Política de Privacidade
                            </a>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:border-gray-400 transition-colors text-sm"
                            >
                                Rejeitar
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d97706] to-[#b45309] text-white hover:from-[#d97706]/80 hover:to-[#b45309]/80 transition-all text-sm font-medium"
                            >
                                Aceitar
                            </button>
                        </div>

                        <button
                            onClick={handleReject}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
