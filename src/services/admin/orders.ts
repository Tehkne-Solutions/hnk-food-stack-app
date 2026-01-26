export interface Order {
    id: string
    customer_name: string
    customer_phone: string
    total_price: number
    status: 'pendente' | 'preparando' | 'entregue' | 'cancelado'
    created_at: string
}

export async function getAllOrders(status?: string): Promise<Order[]> {
    return []
}

export async function updateOrderStatus(
    orderId: string,
    newStatus: Order['status']
): Promise<Order | null> {
    return null
}

export async function getOrdersByPeriod(
    period: 'today' | 'week' | 'month'
): Promise<Order[]> {
    return []
}

export async function calculateSalesTotal(
    period: 'today' | 'week' | 'month'
): Promise<number> {
    return 0
}

export async function getPendingOrders(): Promise<Order[]> {
    return []
}
