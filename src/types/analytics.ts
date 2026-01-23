export interface AnalyticsEvent {
    event_name: string
    value?: number
    currency?: string
    items?: Array<{
        id: string
        name: string
        price: number
        quantity: number
    }>
    user_id?: string
    customer_email?: string
    phone?: string
}

export interface AnalyticsConfig {
    facebookPixelId: string
    googleAnalyticsId: string
    googleConversionId: string
    environment: 'development' | 'production'
}

export type AnalyticsEventType =
    | 'PageView'
    | 'ViewContent'
    | 'Search'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'AddPaymentInfo'
    | 'Purchase'
    | 'Lead'
    | 'Subscribe'
    | 'CompleteRegistration'
