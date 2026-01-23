'use server'

import supabase from '@/lib/supabase'
import { LoyaltyCard, PointsTransaction, LoyaltyLeaderboardEntry } from '@/types/loyalty'

const POINTS_PER_REAL = 0.1
const POINTS_PER_REDEMPTION = 100
const CASHBACK_PER_REDEMPTION = 10

const TIER_THRESHOLDS = {
    bronze: { min: 0, multiplier: 1, bonus: 0 },
    silver: { min: 500, multiplier: 1.25, bonus: 50 },
    gold: { min: 2000, multiplier: 1.5, bonus: 100 },
    platinum: { min: 5000, multiplier: 2, bonus: 200 },
}

export async function getOrCreateLoyaltyCard(
    orgId: string,
    customerId: string,
    customerData: { name: string; email?: string; phone?: string }
) {
    try {
        const { data: existingCard } = await supabase
            .from('loyalty_cards')
            .select('*')
            .eq('org_id', orgId)
            .eq('customer_id', customerId)
            .single()

        if (existingCard) {
            return { success: true, card: existingCard as LoyaltyCard }
        }

        const { data: newCard, error } = await supabase
            .from('loyalty_cards')
            .insert({
                org_id: orgId,
                customer_id: customerId,
                customer_name: customerData.name,
                total_points: 0,
                available_points: 0,
                redeemed_points: 0,
                lifetime_spending: 0,
                total_purchases: 0,
                membership_tier: 'bronze',
                join_date: new Date().toISOString(),
            })
            .select()
            .single()

        if (error) throw error
        return { success: true, card: newCard as LoyaltyCard }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getLoyaltyCard(orgId: string, cardId: string) {
    try {
        const { data, error } = await supabase
            .from('loyalty_cards')
            .select('*')
            .eq('org_id', orgId)
            .eq('id', cardId)
            .single()

        if (error) throw error
        return { success: true, card: data as LoyaltyCard }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function redeemPoints(
    orgId: string,
    payload: { org_id: string; loyalty_card_id: string; points_to_redeem: number }
) {
    try {
        if (payload.points_to_redeem < POINTS_PER_REDEMPTION) {
            throw new Error(`Mínimo de ${POINTS_PER_REDEMPTION} pontos`)
        }

        const { data: card, error: cardError } = await supabase
            .from('loyalty_cards')
            .select('*')
            .eq('org_id', orgId)
            .eq('id', payload.loyalty_card_id)
            .single()

        if (cardError) throw cardError
        if (card.available_points < payload.points_to_redeem) {
            throw new Error('Pontos insuficientes')
        }

        const cashbackAmount = (payload.points_to_redeem / POINTS_PER_REDEMPTION) * CASHBACK_PER_REDEMPTION

        const { data: redemption, error: redemptionError } = await supabase
            .from('points_redemptions')
            .insert({
                org_id: orgId,
                loyalty_card_id: payload.loyalty_card_id,
                points_redeemed: payload.points_to_redeem,
                cashback_amount: cashbackAmount,
                status: 'approved',
                redemption_date: new Date().toISOString(),
            })
            .select()
            .single()

        if (redemptionError) throw redemptionError

        await supabase.from('points_transactions').insert({
            org_id: orgId,
            loyalty_card_id: payload.loyalty_card_id,
            type: 'redeem',
            amount: -payload.points_to_redeem,
            description: `Resgate de ${payload.points_to_redeem} pontos`,
        })

        await supabase
            .from('loyalty_cards')
            .update({
                available_points: card.available_points - payload.points_to_redeem,
                redeemed_points: card.redeemed_points + payload.points_to_redeem,
            })
            .eq('id', payload.loyalty_card_id)
            .eq('org_id', orgId)

        return { success: true, redemption }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getLeaderboard(orgId: string, limit = 10) {
    try {
        const { data, error } = await supabase
            .from('loyalty_cards')
            .select('id, customer_name, total_points, lifetime_spending, membership_tier, last_purchase_date')
            .eq('org_id', orgId)
            .order('total_points', { ascending: false })
            .limit(limit)

        if (error) throw error

        const leaderboard: LoyaltyLeaderboardEntry[] = (data || []).map((entry: any, index: number) => ({
            rank: index + 1,
            loyalty_card_id: entry.id,
            customer_name: entry.customer_name,
            total_points: entry.total_points,
            lifetime_spending: entry.lifetime_spending,
            membership_tier: entry.membership_tier,
            last_purchase_date: entry.last_purchase_date,
        }))

        return { success: true, leaderboard }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getPointsHistory(orgId: string, cardId: string, limit = 20) {
    try {
        const { data, error } = await supabase
            .from('points_transactions')
            .select('*')
            .eq('org_id', orgId)
            .eq('loyalty_card_id', cardId)
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) throw error
        return { success: true, transactions: data as PointsTransaction[] }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getLoyaltyStats(orgId: string) {
    try {
        const { count: memberCount } = await supabase
            .from('loyalty_cards')
            .select('id', { count: 'exact' })
            .eq('org_id', orgId)

        const { data: pointsData } = await supabase
            .from('points_transactions')
            .select('type, amount')
            .eq('org_id', orgId)

        let totalIssued = 0
        let totalRedeemed = 0

        pointsData?.forEach((tx: any) => {
            if (tx.type === 'earn' || tx.type === 'bonus') {
                totalIssued += tx.amount
            } else if (tx.type === 'redeem') {
                totalRedeemed += Math.abs(tx.amount)
            }
        })

        const { count: vipCount } = await supabase
            .from('loyalty_cards')
            .select('id', { count: 'exact' })
            .eq('org_id', orgId)
            .or("membership_tier.eq.'gold',membership_tier.eq.'platinum'")

        const avgPoints = memberCount && memberCount > 0 ? totalIssued / memberCount : 0

        return {
            success: true,
            stats: {
                total_members: memberCount || 0,
                total_points_issued: totalIssued,
                total_points_redeemed: totalRedeemed,
                avg_points_per_member: avgPoints,
                gold_silver_members: vipCount || 0,
            },
        }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}
