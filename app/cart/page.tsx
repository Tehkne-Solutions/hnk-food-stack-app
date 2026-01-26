/**
 * @name Cart Page
 * @description Página principal do carrinho com suporte multi-tenant
 */

import { CartView } from '@/components/cart/CartView'

export const metadata = {
    title: 'Carrinho - HNK Food Stack',
    description: 'Visualize seu carrinho de compras',
}

export default function CartPage() {
    return <CartView />
}
