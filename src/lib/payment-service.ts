/**
 * @name Payment Service - Stripe + PIX Mock
 * @description Sistema de pagamentos com Stripe e PIX em modo mock
 * @version 1.0
 */

/**
 * Tipos de pagamento
 */
export type PaymentMethod = 'card' | 'pix'

/**
 * Interface de transação
 */
export interface PaymentTransaction {
    id: string
    orderId: string
    amount: number
    currency: string
    method: PaymentMethod
    status: 'pending' | 'processing' | 'succeeded' | 'failed'
    createdAt: Date
    expiresAt?: Date
}

/**
 * Dados do cartão
 */
export interface CardData {
    number: string
    name: string
    expiryMonth: number
    expiryYear: number
    cvc: string
}

/**
 * Resposta de pagamento
 */
export interface PaymentResponse {
    success: boolean
    transaction: PaymentTransaction
    pixData?: {
        qrCode: string
        copyPaste: string
        expiresIn: number
    }
    error?: string
}

/**
 * Configuração de pagamentos
 */
export const PAYMENT_CONFIG = {
    stripe: {
        enabled: !!process.env.NEXT_PUBLIC_STRIPE_KEY,
        publicKey: process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_mock_key',
        isMockMode: !process.env.NEXT_PUBLIC_STRIPE_KEY,
    },
    pix: {
        enabled: true,
        isMockMode: true, // PIX sempre em mock por enquanto
    },
}

/**
 * Processar pagamento com cartão (Stripe)
 */
export async function processCardPayment(
    orderId: string,
    amount: number,
    cardData: CardData
): Promise<PaymentResponse> {
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    if (PAYMENT_CONFIG.stripe.isMockMode) {
        console.log('[STRIPE-MOCK] Processing card payment:', {
            orderId,
            amount,
            cardLast4: cardData.number.slice(-4),
        })

        // Simular processamento
        return {
            success: true,
            transaction: {
                id: transactionId,
                orderId,
                amount,
                currency: 'BRL',
                method: 'card',
                status: 'succeeded',
                createdAt: new Date(),
            },
        }
    }

    // Implementação real com Stripe viria aqui
    try {
        const response = await fetch('/api/payments/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                amount: Math.round(amount * 100), // Stripe usa centavos
                cardData,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                transaction: {
                    id: transactionId,
                    orderId,
                    amount,
                    currency: 'BRL',
                    method: 'card',
                    status: 'failed',
                    createdAt: new Date(),
                },
                error: data.error || 'Erro ao processar pagamento',
            }
        }

        return {
            success: true,
            transaction: {
                id: data.transactionId || transactionId,
                orderId,
                amount,
                currency: 'BRL',
                method: 'card',
                status: 'succeeded',
                createdAt: new Date(),
            },
        }
    } catch (error) {
        console.error('Erro ao processar pagamento:', error)
        return {
            success: false,
            transaction: {
                id: transactionId,
                orderId,
                amount,
                currency: 'BRL',
                method: 'card',
                status: 'failed',
                createdAt: new Date(),
            },
            error: 'Erro ao processar pagamento',
        }
    }
}

/**
 * Gerar QR Code PIX (Mock)
 */
export async function generatePixQRCode(
    orderId: string,
    amount: number
): Promise<PaymentResponse> {
    const transactionId = `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log('[PIX-MOCK] Generating QR Code:', { orderId, amount })

    // Mock QR Code (em produção seria gerado pelo Banco)
    const mockQRCode =
        '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540512.005802BR5913Fulano de Tal6009Sao Paulo62280503***63047D8D'

    // Expiração em 60 minutos
    const expiresIn = 3600

    return {
        success: true,
        transaction: {
            id: transactionId,
            orderId,
            amount,
            currency: 'BRL',
            method: 'pix',
            status: 'pending',
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + expiresIn * 1000),
        },
        pixData: {
            qrCode: mockQRCode,
            copyPaste: mockQRCode,
            expiresIn,
        },
    }
}

/**
 * Verificar status do pagamento PIX
 */
export async function checkPixPaymentStatus(transactionId: string): Promise<boolean> {
    // Em produção, consultaria o banco
    console.log('[PIX-MOCK] Checking payment status:', transactionId)

    // Simulação: 30% chance de sucesso após alguns segundos
    return Math.random() > 0.7
}

/**
 * Validar dados do cartão
 */
export function validateCardData(cardData: CardData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validar número (Luhn algorithm simplificado)
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
        errors.push('Número do cartão inválido')
    }

    // Validar nome
    if (!cardData.name || cardData.name.trim().length < 3) {
        errors.push('Nome inválido')
    }

    // Validar data de expiração
    const now = new Date()
    const expiry = new Date(cardData.expiryYear, cardData.expiryMonth - 1)
    if (expiry < now) {
        errors.push('Cartão expirado')
    }

    // Validar CVC
    if (!/^\d{3,4}$/.test(cardData.cvc)) {
        errors.push('CVC inválido')
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

export default {
    PAYMENT_CONFIG,
    processCardPayment,
    generatePixQRCode,
    checkPixPaymentStatus,
    validateCardData,
}
