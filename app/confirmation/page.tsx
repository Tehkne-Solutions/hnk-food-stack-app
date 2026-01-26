/**
 * @name Order Confirmation Page
 * @description Exibe confirmação de pedido após pagamento bem-sucedido
 */

import { Suspense } from 'react'
import ConfirmationClient from './client'

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<ConfirmationLoading />}>
            <ConfirmationClient />
        </Suspense>
    )
}

function ConfirmationLoading() {
    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-ember-accent border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-zinc-400">Processando seu pedido...</p>
            </div>
        </div>
    )
}

