'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Product, CartItem } from '@/types'

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product, quantity: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = useCallback((product: Product, quantity: number) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                )
            }

            return [...prevItems, { product, quantity }]
        })
    }, [])

    const removeItem = useCallback((productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    }, [])

    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            if (quantity <= 0) {
                removeItem(productId)
                return
            }

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item,
                ),
            )
        },
        [removeItem],
    )

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const getTotal = useCallback(() => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }, [items])

    const getItemCount = useCallback(() => {
        return items.reduce((count, item) => count + item.quantity, 0)
    }, [items])

    const value: CartContextType = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de um CartProvider')
    }
    return context
}
