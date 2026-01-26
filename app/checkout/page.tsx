/**
 * @name Checkout Page
 * @description Página de checkout com suporte multi-tenant
 */

import { CheckoutComponent } from '@/components/checkout/CheckoutComponent'

export const metadata = {
    title: 'Checkout - HNK Food Stack',
    description: 'Complete seu pedido',
}

export default function CheckoutPage() {
    return <CheckoutComponent />
}
