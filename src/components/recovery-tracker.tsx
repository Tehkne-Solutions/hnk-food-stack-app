'use client'

/**
 * 🧠 Recovery Tracker Component
 * Monitora carrinhos abandonados quando usuário sai do site
 */

import { useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'
import { useTenant } from '@/context/TenantContext'
import { trackAbandonedCart } from '@/actions/recovery-actions'

export function RecoveryTracker() {
    const cart = useCart()
    const tenant = useTenant()

    /**
     * Rastrear abandono ao desmontar componente ou sair da aba
     */
    useEffect(() => {
        const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
            // Só rastrear se houver itens no carrinho
            if (cart.items && cart.items.length > 0 && tenant.organization) {
                // Enviar dados como beacon (funciona mesmo se página recarregar)
                const data = JSON.stringify({
                    org_id: tenant.organization.id,
                    items: cart.items,
                    total: cart.getTotal(),
                    timestamp: new Date().toISOString(),
                })

                navigator.sendBeacon(
                    '/api/recovery/track-abandon',
                    new Blob([data], { type: 'application/json' })
                )
            }
        }

        const handlePageHide = () => {
            if (cart.items && cart.items.length > 0 && tenant.organization) {
                const data = JSON.stringify({
                    org_id: tenant.organization.id,
                    items: cart.items,
                    total: cart.getTotal(),
                    timestamp: new Date().toISOString(),
                })

                navigator.sendBeacon(
                    '/api/recovery/track-abandon',
                    new Blob([data], { type: 'application/json' })
                )
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('pagehide', handlePageHide)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('pagehide', handlePageHide)
        }
    }, [cart, tenant.organization])

    // Componente invisível
    return null
}
