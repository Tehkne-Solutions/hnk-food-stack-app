import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()
  const { cart, customer, storeId } = body

  try {
    const supabase = createClient()

    // 1. Persiste o pedido no Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        total: cart.total,
        status: 'PENDING',
        customer_id: customer.id,
        items: cart.items,
        store_id: storeId || 'default'
      })
      .select()
      .single()

    if (error) throw error

    // 2. DISPARO OMNICHANNEL (A Mágica)
    
    // Notifica o Lojista via WhatsApp (simulado)
    const ownerMessage = `🔥 *NOVO PEDIDO NO HNK!* 

*Cliente:* ${customer.name}
*Total:* R$ ${cart.total}

_Acesse o dashboard para aceitar._`

    // Notifica o Cliente (Confirmação Automática)
    const customerMessage = `Olá ${customer.name}! Recebemos seu pedido na *Churrascaria Bem Estar*. 🥩
Ele já está sendo preparado com todo carinho.`

    // Log das mensagens (em produção, integrar com Evolution API)
    console.log('📱 WhatsApp Owner:', ownerMessage)
    console.log('📱 WhatsApp Customer:', customerMessage)

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      message: 'Pedido processado com sucesso!'
    })

  } catch (error) {
    console.error('❌ Erro no checkout:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' }, 
      { status: 500 }
    )
  }
}