/**
 * @name DataLayer Manager (GTM)
 * @description Gerencia a dataLayer do Google Tag Manager com estrutura padrão
 * @version 1.0
 * 
 * Estrutura padrão para GTM DataLayer:
 * - Informações de página (pageType, pageCategory, etc)
 * - Informações de usuário (userId, userSegment, etc)
 * - Informações de ecommerce (cart, products, transactions)
 */

/**
 * Tipo de página
 */
export enum PageType {
    HOME = 'home',
    PRODUCT = 'product',
    CATEGORY = 'category',
    CART = 'cart',
    CHECKOUT = 'checkout',
    CONFIRMATION = 'confirmation',
    SEARCH = 'search',
    ERROR = 'error',
    OTHER = 'other',
}

/**
 * Informações de página para dataLayer
 */
export interface PageInfo {
    pageType: PageType | string
    pageTitle: string
    pageUrl: string
    pageCategory?: string
    pagePath?: string
    referrer?: string
}

/**
 * Informações de usuário para dataLayer
 */
export interface UserInfo {
    userId?: string
    userSegment?: string
    userEmail?: string
    isNewUser?: boolean
    userType?: 'guest' | 'registered'
}

/**
 * Informações de produto para dataLayer
 */
export interface ProductInfo {
    id: string
    name: string
    price: number
    category?: string
    variant?: string
    quantity?: number
    position?: number
}

/**
 * Informações de carrinho para dataLayer
 */
export interface CartInfo {
    cartValue: number
    itemCount: number
    items?: ProductInfo[]
}

/**
 * Informações de transação/pedido
 */
export interface TransactionInfo {
    transactionId: string
    transactionValue: number
    currency?: string
    tax?: number
    shipping?: number
    coupon?: string
    items?: ProductInfo[]
}

/**
 * Estrutura completa de dataLayer
 */
export interface DataLayer {
    event?: string
    pageType?: PageType | string
    pageInfo?: PageInfo
    userInfo?: UserInfo
    ecommerce?: {
        currencyCode?: string
        value?: number
        items?: ProductInfo[]
        cart?: CartInfo
        transaction?: TransactionInfo
    }
    customData?: Record<string, unknown>
    timestamp?: string
}

/**
 * Inicializar dataLayer global
 */
export function initializeDataLayer(): void {
    if (typeof window === 'undefined') return

    if (!(window as unknown as { dataLayer?: unknown[] }).dataLayer) {
        ; (window as unknown as { dataLayer?: unknown[] }).dataLayer = []
    }

    console.log('✅ DataLayer initialized')
}

/**
 * Push dados para dataLayer
 */
export function pushToDataLayer(data: DataLayer): void {
    if (typeof window === 'undefined') return

    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || []

    dataLayer.push({
        ...data,
        timestamp: new Date().toISOString(),
    })

    console.debug('[DataLayer]', data)
}

/**
 * Registrar visualização de página
 */
export function trackPageView(pageInfo: PageInfo): void {
    pushToDataLayer({
        event: 'pageview',
        pageType: pageInfo.pageType,
        pageInfo,
    })
}

/**
 * Registrar visualização de produto
 */
export function trackProductView(product: ProductInfo): void {
    pushToDataLayer({
        event: 'view_item',
        ecommerce: {
            currencyCode: 'BRL',
            value: product.price,
            items: [product],
        },
    })
}

/**
 * Registrar adição ao carrinho
 */
export function trackAddToCart(product: ProductInfo): void {
    pushToDataLayer({
        event: 'add_to_cart',
        ecommerce: {
            currencyCode: 'BRL',
            value: product.price * (product.quantity || 1),
            items: [product],
        },
    })
}

/**
 * Registrar visualização do carrinho
 */
export function trackCartView(cart: CartInfo): void {
    pushToDataLayer({
        event: 'view_cart',
        ecommerce: {
            currencyCode: 'BRL',
            value: cart.cartValue,
            cart,
        },
    })
}

/**
 * Registrar início do checkout
 */
export function trackBeginCheckout(cart: CartInfo): void {
    pushToDataLayer({
        event: 'begin_checkout',
        ecommerce: {
            currencyCode: 'BRL',
            value: cart.cartValue,
            cart,
        },
    })
}

/**
 * Registrar compra/transação
 */
export function trackPurchase(transaction: TransactionInfo): void {
    pushToDataLayer({
        event: 'purchase',
        ecommerce: {
            currencyCode: transaction.currency || 'BRL',
            value: transaction.transactionValue,
            transaction,
        },
    })
}

/**
 * Registrar informações de usuário
 */
export function setUserInfo(userInfo: UserInfo): void {
    pushToDataLayer({
        event: 'user_update',
        userInfo,
    })
}

/**
 * Registrar dados customizados
 */
export function trackCustomData(
    eventName: string,
    customData: Record<string, unknown>
): void {
    pushToDataLayer({
        event: eventName,
        customData,
    })
}

/**
 * Obter dataLayer atual
 */
export function getDataLayer(): unknown[] {
    if (typeof window === 'undefined') return []
    return (window as unknown as { dataLayer?: unknown[] }).dataLayer || []
}

/**
 * Limpar dataLayer
 */
export function clearDataLayer(): void {
    if (typeof window === 'undefined') return

        ; (window as unknown as { dataLayer?: unknown[] }).dataLayer = []
    console.log('✅ DataLayer cleared')
}

/**
 * Exibir dataLayer no console
 */
export function printDataLayer(): void {
    console.group('📊 DataLayer Contents')
    console.table(getDataLayer())
    console.groupEnd()
}

export default {
    PageType,
    initializeDataLayer,
    pushToDataLayer,
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackCartView,
    trackBeginCheckout,
    trackPurchase,
    setUserInfo,
    trackCustomData,
    getDataLayer,
    clearDataLayer,
    printDataLayer,
}
