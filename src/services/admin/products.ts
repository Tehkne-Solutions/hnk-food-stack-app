/**
 * @name Products Service (Admin)
 * @description Serviço para gerenciamento de produtos e estoque
 * @author HNK Labs
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    stock: number
    is_available: boolean
    is_promo?: boolean
    promo_price?: number
    created_at?: string
    updated_at?: string
}

/**
 * Busca todos os produtos
 */
export async function getAllProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erro ao buscar produtos:', error.message)
            return []
        }

        return data || []
    } catch (err) {
        console.error('Erro na função getAllProducts:', err)
        return []
    }
}

/**
 * Atualiza o estoque de um produto
 */
export async function updateProductStock(productId: string, newStock: number) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                stock: newStock,
                is_available: newStock > 0,
                updated_at: new Date().toISOString()
            })
            .eq('id', productId)
            .select()

        if (error) {
            console.error('Erro ao atualizar estoque:', error.message)
            return null
        }

        return data?.[0] || null
    } catch (err) {
        console.error('Erro na função updateProductStock:', err)
        return null
    }
}

/**
 * Marca produto como esgotado/disponível
 */
export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                is_available: isAvailable,
                updated_at: new Date().toISOString()
            })
            .eq('id', productId)
            .select()

        if (error) {
            console.error('Erro ao atualizar disponibilidade:', error.message)
            return null
        }

        return data?.[0] || null
    } catch (err) {
        console.error('Erro na função toggleProductAvailability:', err)
        return null
    }
}

/**
 * Atualiza preço do produto
 */
export async function updateProductPrice(productId: string, newPrice: number) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                price: newPrice,
                updated_at: new Date().toISOString()
            })
            .eq('id', productId)
            .select()

        if (error) {
            console.error('Erro ao atualizar preço:', error.message)
            return null
        }

        return data?.[0] || null
    } catch (err) {
        console.error('Erro na função updateProductPrice:', err)
        return null
    }
}

/**
 * Cria promoção para um produto
 */
export async function createPromotion(
    productId: string,
    promoPrice: number,
    startDate: string,
    endDate: string
) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                is_promo: true,
                promo_price: promoPrice,
                promo_start: startDate,
                promo_end: endDate,
                updated_at: new Date().toISOString()
            })
            .eq('id', productId)
            .select()

        if (error) {
            console.error('Erro ao criar promoção:', error.message)
            return null
        }

        return data?.[0] || null
    } catch (err) {
        console.error('Erro na função createPromotion:', err)
        return null
    }
}

/**
 * Remove promoção de um produto
 */
export async function removePromotion(productId: string) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                is_promo: false,
                promo_price: null,
                promo_start: null,
                promo_end: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', productId)
            .select()

        if (error) {
            console.error('Erro ao remover promoção:', error.message)
            return null
        }

        return data?.[0] || null
    } catch (err) {
        console.error('Erro na função removePromotion:', err)
        return null
    }
}

/**
 * Busca produtos com estoque baixo
 */
export async function getLowStockProducts(threshold: number = 5) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .lte('stock', threshold)
            .order('stock', { ascending: true })

        if (error) {
            console.error('Erro ao buscar produtos com estoque baixo:', error.message)
            return []
        }

        return data || []
    } catch (err) {
        console.error('Erro na função getLowStockProducts:', err)
        return []
    }
}
