// Uses native fetch to call Mercado Pago REST API to create a preference
// Requires Node 18+ (global fetch) and MP_ACCESS_TOKEN in environment
const API = 'https://api.mercadopago.com/checkout/preferences'

async function main() {
    const token = process.env.MP_ACCESS_TOKEN
    if (!token) {
        console.error('MP_ACCESS_TOKEN not set.');
        process.exit(1)
    }

    const payload = {
        items: [
            { title: 'Churrasco Bem Brasil - Teste (raw)', quantity: 1, unit_price: 49.9 }
        ]
    }

    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        const data = await res.json()
        if (!res.ok) {
            console.error('API error', res.status, data)
            process.exitCode = 2
        } else {
            console.log('Preference created (raw):')
            console.log(JSON.stringify(data, null, 2))
        }
    } catch (err) {
        console.error('Request failed', err)
        process.exitCode = 2
    }
}

main()
