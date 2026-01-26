/**
 * @name Cart Store - Zustand Implementation
 * @description Sistema completo de carrinho com Zustand, persistência e rastreamento
 * @version 2.0
 * 
 * Features:
 * - Add/Remove/Update items
 * - Persistência em localStorage
 * - Cálculo automático de totais
 * - Rastreamento de eventos (GA4 + Meta Pixel)
 * - TypeScript strict mode
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { trackProductAddToCart, trackProductRemoveFromCart, trackCartView } from '@/lib/event-tracker'
import { trackAddToCart as trackGAAddToCart, trackRemoveFromCart as trackGARemoveFromCart } from '@/lib/analytics'

/**
 * Interface de item do carrinho
 */
export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    category?: string
    image?: string
    originalPrice?: number
}

/**
 * Estado do carrinho
 */
export interface CartState {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
    getItems: () => CartItem[]
}

/**
 * Zustand Cart Store
 */
export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            /**
             * Adicionar item ao carrinho
             */
            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id)

                    if (existingItem) {
                        // Se produto já existe, incrementar quantidade
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        }
                    }

                    // Novo item
                    const newItem: CartItem = { ...item, quantity: 1 }

                    // Rastrear evento
                    trackProductAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        category: item.category,
                    })

                    trackGAAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        category: item.category,
                    })

                    return {
                        items: [...state.items, newItem],
                    }
                })
            },

            /**
             * Remover item do carrinho
             */
            removeItem: (itemId: string) => {
                set((state) => {
                    const item = state.items.find((i) => i.id === itemId)

                    if (item) {
                        // Rastrear evento
                        trackProductRemoveFromCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                        })

                        trackGARemoveFromCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                        })
                    }

                    return {
                        items: state.items.filter((i) => i.id !== itemId),
                    }
                })
            },

            /**
             * Atualizar quantidade de item
             */
            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(itemId)
                    return
                }

                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === itemId ? { ...i, quantity } : i
                    ),
                }))

                // Rastrear view do carrinho atualizado
                const state = get()
                trackCartView(state.getTotal(), state.getItemCount())
            },

            /**
             * Limpar carrinho
             */
            clearCart: () => {
                set({ items: [] })
            },

            /**
             * Calcular total do carrinho
             */
            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },

            /**
             * Obter contagem de itens
             */
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },

            /**
             * Obter itens do carrinho
             */
            getItems: () => {
                return get().items
            },
        }),
        {
            name: 'hnk-cart-store',
            version: 1,
        }
    )
)

export default useCart
