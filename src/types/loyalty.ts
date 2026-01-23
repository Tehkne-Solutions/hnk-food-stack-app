// 🎁 PHASE 7: Loyalty System Types

export interface LoyaltyCard {
    id: string
    org_id: string
    customer_id: string
    customer_name: string

    // Points
    total_points: number
    available_points: number
    redeemed_points: number

    // Statistics
    lifetime_spending: number
    total_purchases: number
    membership_tier: 'bronze' | 'silver' | 'gold' | 'platinum'

    // Metadata
    join_date: string
    last_purchase_date?: string | null
    created_at: string
    updated_at: string
}

export interface PointsTransaction {
    id: string
    org_id: string
    loyalty_card_id: string
    type: 'earn' | 'redeem' | 'bonus' | 'expire'
    amount: number
    description: string
    reference_id?: string | null
    multiplier?: number | null
    expires_at?: string | null
    created_at: string
}

export interface PointsRedemption {
    id: string
    org_id: string
    loyalty_card_id: string
    points_redeemed: number
    cashback_amount: number
    status: 'pending' | 'approved' | 'cancelled'
    redemption_date: string
    approval_date?: string | null
    created_at: string
    updated_at: string
}

export interface LoyaltyLeaderboardEntry {
    rank: number
    loyalty_card_id: string
    customer_name: string
    total_points: number
    lifetime_spending: number
    membership_tier: string
    last_purchase_date?: string | null
}

export interface LoyaltyTier {
    name: 'bronze' | 'silver' | 'gold' | 'platinum'
    min_spending: number
    multiplier: number
    bonus_points: number
    benefits: string[]
}

export interface LoyaltyBadge {
    id: string
    name: string
    description: string
    icon: string
    unlock_condition: string
}

// Request/Response types
export interface AddPointsPayload {
    loyalty_card_id: string
    amount: number
    description: string
    reference_id?: string
    multiplier?: number
}

export interface RedeemPointsPayload {
    loyalty_card_id: string
    points_to_redeem: number
}

export interface UpdateLoyaltyCardPayload {
    customer_name?: string
    total_purchases?: number
    lifetime_spending?: number
}

export interface CreateRewardPayload {
    org_id: string
    points_required: number
    reward_name: string
    reward_value: number
}
