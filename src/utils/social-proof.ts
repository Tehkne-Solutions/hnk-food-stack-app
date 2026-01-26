/**
 * @name Social Proof Generator
 * @description Gera números de "prova social" para criar urgência nos cortes
 * @author HNK Labs
 */

/**
 * Gera número randômico de pessoas que "pediram este corte hoje"
 * Em produção, isso viria do Supabase (contador real de orders)
 * 
 * @param productId - ID do produto
 * @param baseCount - Número base de clientes
 * @returns Número aleatório entre baseCount e baseCount + 30
 */
export function generateSocialProof(productId: string, baseCount: number = 5): number {
    // Em dev, gera número aleatório
    // Em produção, isso seria um valor real do Supabase
    const randomVariance = Math.floor(Math.random() * 30)
    return baseCount + randomVariance
}

/**
 * Determine o nível de "urgência" baseado no número de vendas
 */
export function getUrgencyLevel(
    salesCount: number
): 'low' | 'medium' | 'high' | 'burning' {
    if (salesCount >= 50) return 'burning'
    if (salesCount >= 30) return 'high'
    if (salesCount >= 15) return 'medium'
    return 'low'
}

/**
 * Retorna emoji + texto de urgência
 */
export function getUrgencyBadge(urgency: 'low' | 'medium' | 'high' | 'burning'): string {
    const badges = {
        low: '📊 Alguns já pediram',
        medium: '🔥 Bastante procurado',
        high: '🌡️ Muito pedido hoje',
        burning: '🚀 Bomba do dia!',
    }
    return badges[urgency]
}
