'use client'

import { useEffect } from 'react'
import { initializeGA4, initializeMetaPixel, ANALYTICS_CONFIG } from '@/lib/analytics'
import { initializeDataLayer } from '@/lib/data-layer'

/**
 * AnalyticsProvider
 * Inicializa GA4, Meta Pixel e DataLayer (GTM) globalmente
 * HNK-GIP Pattern: Analytics com LGPD compliance + Mock Mode para desenvolvimento
 * 
 * Suporta:
 * 1. Google Analytics 4 (com mock mode)
 * 2. Meta Pixel (com mock mode)
 * 3. GTM DataLayer (com mock mode)
 * 4. Cookie consent LGPD
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Inicializar sistemas de tracking
        initializeGA4()
        initializeMetaPixel()
        initializeDataLayer()

        // Log status em desenvolvimento
        if (ANALYTICS_CONFIG.isDevelopment) {
            console.log('📊 Analytics initialized:')
            console.log('  • GA4:', ANALYTICS_CONFIG.ga4Id)
            console.log('  • Meta Pixel:', ANALYTICS_CONFIG.metaPixelId)
            console.log('  • Mock Mode:', ANALYTICS_CONFIG.isMockMode)
            console.log('  💡 Tip: Use printAnalyticsStatus() to see debug info')
        }
    }, [])

    return <>{children}</>
}
