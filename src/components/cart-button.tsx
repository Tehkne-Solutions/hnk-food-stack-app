'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartSheet } from '@/components/cart-sheet'

export function CartButton() {
    const [isOpen, setIsOpen] = useState(false)
    const { getItemCount } = useCart()
    const itemCount = getItemCount()

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-3 rounded-lg bg-[#d97706]/10 hover:bg-[#d97706]/20 transition-colors border border-[#d97706]/30"
            >
                <ShoppingCart className="w-6 h-6 text-[#d97706]" />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                        {itemCount > 9 ? '9+' : itemCount}
                    </span>
                )}
            </button>

            <CartSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
