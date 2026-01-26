let MercadoPago
try {
    MercadoPago = require('@mercadopago/sdk-nodejs')
} catch (e) {
    try {
        MercadoPago = require('mercadopago')
    } catch (e2) {
        console.error('Could not require Mercado Pago SDK. Please install @mercadopago/sdk-nodejs or mercadopago')
        process.exit(1)
    }
}

async function main() {
    const accessToken = process.env.MP_ACCESS_TOKEN
    if (!accessToken) {
        console.error('MP_ACCESS_TOKEN not set in environment. Aborting.')
        process.exit(1)
    }

    MercadoPago.configurations.setAccessToken(accessToken)

    try {
        const preferencePayload = {
            items: [
                {
                    title: 'Churrasco Bem Brasil - Teste',
                    quantity: 1,
                    unit_price: 49.9,
                },
            ],
        }

        const response = await MercadoPago.preferences.create(preferencePayload)
        console.log('Preference created:')
        console.log(JSON.stringify(response.body, null, 2))
    } catch (err) {
        console.error('Error creating preference:', err.response ? err.response : err)
        process.exitCode = 2
    }
}

main()
