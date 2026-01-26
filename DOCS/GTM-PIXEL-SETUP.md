# 📊 Guia de Configuração: Google Tag Manager & Meta Pixel

## 🎯 Overview

O sistema está preparado para rastrear:

- **Visualizações de produto** (`view_item`)
- **Adições ao carrinho** (`add_to_cart`)
- **Conversões de pagamento** (quando implementado)
- **UTM parameters** para campanha do Meta Ads e Google Ads

---

## 📋 Checklist de Configuração

### 1️⃣ Google Tag Manager (GTM)

**Passo 1: Criar uma conta GTM**

1. Acesse: <https://tagmanager.google.com/>
2. Clique em "Criar conta"
3. Nome: "HNK Food Stack - Bem Estar"
4. Contêiner: "Web"
5. Copie o **GTM-XXXXXXX** ID

**Passo 2: Atualizar variáveis de ambiente**

```bash
# No arquivo .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Cole seu ID aqui
```

**Passo 3: Configurar tags no GTM**

Tag: **Google Analytics Event**

- Tipo: Google Analytics: GA4 Event
- Event Name: {{Event}}
- Parameters: Use dataLayer
- Trigger: All Events

Tag: **Google Ads Conversion**

- Tipo: Google Ads: Event
- Event: {{Event}}
- Trigger: All Events (quando implementado)

**Passo 4: Publicar container**

- Clique em "Submeter"
- Aguarde revisão e aprovação

---

### 2️⃣ Meta Pixel (Facebook Pixel)

**Passo 1: Criar/Acessar Meta Pixel**

1. Acesse: <https://business.facebook.com/>
2. Vá para "Eventos" → "Conversões"
3. Crie um novo Pixel "HNK Food Stack"
4. Copie o **Pixel ID** (número)

**Passo 2: Atualizar variáveis de ambiente**

```bash
# No arquivo .env.local
NEXT_PUBLIC_PIXEL_ID=123456789  # Cole seu ID aqui
```

**Passo 3: Configurar eventos no Meta Pixel**

Eventos rastreados automaticamente:

- `PageView` - Cada carregamento de página
- `ViewContent` - Quando usuário visualiza produto
- `AddToCart` - Quando clica em "Adicionar ao carrinho"
- `Purchase` - Quando completa pedido

**Passo 4: Criar conversões customizadas**

1. Em "Eventos", defina conversões:
   - "view_item" → View Product
   - "add_to_cart" → Add to Cart
   - "purchase" → Purchase

---

## 🔗 Estrutura de Rastreamento

### ProductCard.tsx

```typescript
// Eventos disparados automaticamente:
- trackAddToCart() → GA4 + Meta Pixel
- trackViewContent() → GA4 + Meta Pixel
- buildUtmLink() → Constrói URLs com parâmetros
```

### UTM Parameters Automáticos

Cada clique em produto inclui:

- `utm_source=hnk_food_stack`
- `utm_medium=mobile_app`
- `utm_campaign=churrascaria_bem_estar`
- `utm_content={product_name}`

---

## 🧪 Teste de Implementação

### Verificar GTM funcionando

1. Abra DevTools (F12)
2. Vá para Console
3. Execute:

```javascript
// Deve existir e conter eventos
console.log(window.dataLayer);

// Deve disparar evento
gtag('event', 'test_event', { test: true });
```

### Verificar Meta Pixel funcionando

1. Abra DevTools (F12)
2. Vá para Console
3. Execute:

```javascript
// Deve existir
console.log(window.fbq);

// Deve disparar evento
fbq('track', 'ViewContent', { content_name: 'test' });
```

### No navegador, use extensão

- **Meta Pixel Helper**: <https://chrome.google.com/webstore> (buscar "Meta Pixel Helper")
- **Google Tag Manager Debugger**: <https://chrome.google.com/webstore>
- Abra localhost:3000/bem-estar
- Clique em um produto
- Veja os eventos no debugger

---

## 📊 Dashboard & Relatórios

### Google Analytics 4

- Acesse: <https://analytics.google.com/>
- Vá para "Relatórios" → "Ciclo de vida"
- Monitore: Aquisição, Envolvimento, Monetização

### Meta Ads Manager

- Acesse: <https://business.facebook.com/>
- Vá para "Ads Manager"
- Crie campanhas com conversão "Add to Cart"

---

## 🚀 Próximas Implementações

- [ ] Rastreamento de Checkout
- [ ] Rastreamento de Pagamento (Mercado Pago)
- [ ] Lead Forms (WhatsApp, Email)
- [ ] Retargeting com Meta Ads
- [ ] Google Shopping Feed
- [ ] Event Matching (Supabase + Facebook Conversions API)

---

## 💡 Dicas

1. **Use Google Tag Manager Debugger** para testar antes de publicar
2. **Aguarde 24h** para dados aparecerem em relatórios
3. **Pixel ID deve estar no Meta Business Settings** com domínio verificado
4. **Teste em incógnito** para evitar filtros de desenvolvimento
5. **Configure conversões de valor** para Meta Ads otimizar gasto

---

## ❓ Troubleshooting

**Q: Eventos não aparecem em GA4**
A: 1) Verifique GTM_ID no .env.local
   2) Abra DevTools e veja se dataLayer tem eventos
   3) Aguarde 24h para sincronização

**Q: Meta Pixel não registra eventos**
A: 1) Verificar NEXT_PUBLIC_PIXEL_ID no .env.local
   2) Usar Meta Pixel Helper para confirmar tracking
   3) Verificar se Pixel está associado corretamente no Business Settings

**Q: UTM links não funcionam**
A: 1) Verificar console.log em analytics.ts
   2) Confirmar buildUtmLink() está sendo chamado
   3) Ver URL construída em DevTools Network

---

**Data de Criação**: 2024
**Versão**: 1.0
**Responsável**: HNK Labs
