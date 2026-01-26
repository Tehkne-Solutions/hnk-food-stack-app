/**
 * Lightweight Mercado Pago service wrapper.
 * Requires installation: npm install @mercadopago/sdk-nodejs
 * 
 * NOTA: Em modo mock (sem pacote), retorna dados de teste
 */

const accessToken = process.env.MP_ACCESS_TOKEN || ''
const isMockMode = !accessToken

if (!accessToken) {
    console.warn('⚠️ MP_ACCESS_TOKEN not configured - Mercado Pago em MOCK MODE')
}

// Tentar import apenas se tiver token
let MercadoPago: unknown = null
if (!isMockMode) {
    try {
        // Lazy import para evitar erro em build
        MercadoPago = require('@mercadopago/sdk-nodejs')
    } catch (error) {
        console.warn('⚠️ @mercadopago/sdk-nodejs não instalado')
    }
}

export async function createPreference(items: Array<{ title: string; quantity: number; unit_price: number }>) {
    if (isMockMode || !MercadoPago) {
        console.warn('⚠️ MercadoPago em MOCK MODE - retornando dados de teste')
        return {
            id: 'MOCK-PREF-' + Date.now(),
            items: items.map((i) => ({
                title: i.title,
                quantity: i.quantity,
                unit_price: i.unit_price,
            })),
            init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=MOCK-PREF-' + Date.now(),
        }
    }

    try {
        const mpClient = MercadoPago as { preferences?: { create?: (data: unknown) => Promise<{ body: unknown }> } }
        const preference = {
            items: items.map((i) => ({
                title: i.title,
                quantity: i.quantity,
                unit_price: i.unit_price,
            })),
        }

        const response = await mpClient.preferences?.create?.(preference)
        return response?.body
    } catch (error) {
        console.error('Erro ao criar preferência MercadoPago:', error)
        throw error
    }
}

export function getPublicKey() {
    return process.env.MP_PUBLIC_KEY || 'MOCK-PUBLIC-KEY'
}
