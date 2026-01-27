# 📱 Guia de Configuração - WhatsApp API (n8n + Twilio)

## Pré-requisitos
- Conta n8n (n8n.cloud ou self-hosted)
- Conta Twilio com WhatsApp Sandbox OU Meta Business Account
- Chave de API n8n

## Passo 1: Configurar n8n com Twilio/Meta

### Option A: Twilio WhatsApp Sandbox (RECOMENDADO - Teste)

1. Acesse [https://console.twilio.com/](https://console.twilio.com/)
2. Navegue para "Messaging" > "Sandbox"
3. Copie seu número de Sandbox (ex: +1234567890)
4. Ative o Sandbox e salve o código
5. Em n8n, crie um workflow com:

```json
{
  "trigger": "webhook",
  "nodes": [
    {
      "type": "Twilio",
      "action": "send_message",
      "fields": {
        "account_sid": "seu_account_sid",
        "auth_token": "seu_auth_token",
        "from": "+1234567890",
        "to": "{{body.phone}}",
        "body": "{{body.message}}"
      }
    }
  ]
}
```

### Option B: Meta WhatsApp Business (PRODUÇÃO)

1. Configure Meta Business Account em [https://business.facebook.com/](https://business.facebook.com/)
2. Adicione seu número de telefone
3. Configure webhooks em seu app
4. Em n8n, adicione integração Meta:

```json
{
  "type": "Http",
  "method": "POST",
  "url": "https://graph.instagram.com/v18.0/{{businessPhoneNumberId}}/messages",
  "headers": {
    "Authorization": "Bearer {{accessToken}}",
    "Content-Type": "application/json"
  },
  "body": {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "{{phone}}",
    "type": "template",
    "template": {
      "name": "{{template_name}}",
      "language": {
        "code": "pt_BR"
      },
      "components": [
        {
          "type": "body",
          "parameters": "{{params}}"
        }
      ]
    }
  }
}
```

## Passo 2: Criar Webhook em n8n

1. Em n8n, crie novo workflow
2. Adicione trigger "Webhook"
3. Configure para receber POST requests
4. Copie o URL do webhook (ex: https://n8n-instance.com/webhook/xyz123)
5. Teste com cURL:

```bash
curl -X POST https://seu-n8n-webhook.com/webhook/xyz123 \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999999",
    "template": "order_confirmation",
    "params": {
      "customer_name": "João",
      "order_id": "12345"
    }
  }'
```

## Passo 3: Configurar no .env.local

```env
N8N_WHATSAPP_WEBHOOK=https://seu-n8n-instance.com/webhook/abc123xyz
```

## Passo 4: Integrar no HNK Food Stack

### No Checkout (após confirmação de pagamento)

```typescript
import { notifyOrderCreated } from '@/hooks/useWhatsApp'

// Após pagamento bem-sucedido:
await notifyOrderCreated({
  customerId: user.id,
  customerName: user.name,
  customerPhone: cartData.phone,
  orderId: newOrder.id,
  items: cartData.items.map(i => i.name).join(', '),
  total: cartData.total.toFixed(2),
  paymentMethod: paymentMethod
})
```

### Para Atualizar Status de Pedido

```typescript
import { notifyOrderStatus } from '@/hooks/useWhatsApp'

// Quando status muda no admin:
await notifyOrderStatus(customer.phone, {
  customerName: customer.name,
  orderId: order.id,
  status: 'preparando',
  estimatedDate: 'Hoje, 19:00'
})
```

## Templates de Mensagem (n8n)

### order_confirmation
```
Oi {{customer_name}} 👋

Seu pedido foi confirmado! ✅

📦 Pedido: {{order_id}}
🛒 Items: {{order_items}}
💰 Total: R$ {{order_total}}
📅 Entrega: {{delivery_date}}
🔐 Código: {{confirmation_code}}

Acompanhe aqui: https://hnkfood.com.br/track/{{order_id}}

Obrigado! 🙏
```

### order_status_update
```
Oi {{customer_name}}! 

Seu pedido {{order_id}} está: {{status}} 👨‍🍳

📅 Entrega prevista: {{delivery_date}}

Acompanhe aqui: {{tracking_link}}
```

## Testes Localmente

```bash
# Test WhatsApp API endpoint
curl -X POST http://localhost:3000/api/notifications/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "event": "order_created",
    "phone": "11999999999",
    "order": {
      "customerId": "123",
      "customerName": "João Silva",
      "orderId": "ORDER001",
      "items": "Picanha + Arroz",
      "total": "89.90",
      "estimatedDate": "Hoje, 19:00"
    }
  }'

# Health check
curl http://localhost:3000/api/notifications/whatsapp
```

## Troubleshooting

### "N8N_WHATSAPP_WEBHOOK não configurado"
- Adicione `N8N_WHATSAPP_WEBHOOK` ao `.env.local`
- Reinicie o servidor Next.js

### Mensagens não chegando
1. Verifique o webhook em n8n (aba "Logs")
2. Confirme o formato do telefone: `55 + DDD + 9 + NNNN-NNNN`
3. Teste o número de Twilio/Meta sandbox

### Rate Limiting
- n8n: máx 60 req/min por padrão
- Twilio: máx 1000 msgs/dia no sandbox
- Meta: limite de 1000 msgs/dia para novos números

## Produção

Para produção, recomenda-se:
- [ ] Usar Meta Business WhatsApp (não Twilio sandbox)
- [ ] Configurar templates de mensagem aprovados
- [ ] Implementar fila de mensagens (Bull/Bee-Queue)
- [ ] Monitorar logs e erros
- [ ] Implementar retry automático
- [ ] Criptografar números de telefone no DB
- [ ] Rate limiting por customer

---

**Suporte**: Consulte docs de [n8n](https://docs.n8n.io/), [Twilio](https://www.twilio.com/docs/whatsapp), ou [Meta](https://developers.facebook.com/docs/whatsapp)
