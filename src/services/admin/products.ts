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

export async function getAllProducts(): Promise<Product[]> {
    return []
}

export async function updateProductStock(
    productId: string,
    newStock: number
): Promise<Product | null> {
    return null
}

export async function toggleProductAvailability(
    productId: string,
    isAvailable: boolean
): Promise<Product | null> {
    return null
}

export async function updateProductPrice(
    productId: string,
    newPrice: number
): Promise<Product | null> {
    return null
}

export async function createPromotion(
    productId: string,
    promoPrice: number,
    startDate: string,
    endDate: string
): Promise<Product | null> {
    return null
}

export async function removePromotion(productId: string): Promise<Product | null> {
    return null
}

export async function getLowStockProducts(threshold: number = 5): Promise<Product[]> {
    return []
}
