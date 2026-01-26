/**
 * Lightweight Mercado Pago service wrapper.
 * Requires installation: npm install @mercadopago/sdk-nodejs
 */
import MercadoPago from '@mercadopago/sdk-nodejs'

const accessToken = process.env.MP_ACCESS_TOKEN || ''

if (!accessToken) {
    console.warn('MP_ACCESS_TOKEN not set — Mercado Pago features will be disabled')
}

MercadoPago.configurations.setAccessToken(accessToken)

export async function createPreference(items: Array<{ title: string; quantity: number; unit_price: number }>) {
    const preference = {
        items: items.map((i) => ({
            title: i.title,
            quantity: i.quantity,
            unit_price: i.unit_price,
        })),
    }

    const response = await MercadoPago.preferences.create(preference)
    return response.body
}

export function getPublicKey() {
    return process.env.MP_PUBLIC_KEY || ''
}
