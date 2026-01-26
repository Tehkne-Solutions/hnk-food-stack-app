# ✅ CHECKLIST: PRÓXIMAS AÇÕES IMEDIATAS

**Gerado em**: 26 de Janeiro de 2026  
**Responsável**: Agente GIP TEHKNÉ (vCTO)  
**Prioridade**: 🔴 ALTA

---

## 🎯 HOJE (26 JAN)

### Verificações
- [x] Documentação de status criada
- [x] Roadmap de 12 semanas estruturado
- [x] 4 ciclos de desenvolvimento mapeados
- [x] Todos os commits git OK
- [x] Zero erros de build em FASE 3-4

### Ações do Desenvolvedor
- [ ] Ler `STATUS-ATUAL-E-PLANO-MICROFASES.md` completamente
- [ ] Revisar `ROADMAP-VISUAL.md` com timeline
- [ ] Preparar ambiente para FASE 4.5
- [ ] Contactar cliente (Seu Junior) sobre credenciais

---

## 📅 PRÓXIMAS 48 HORAS (27-28 JAN)

### TAREFA 1: Google Analytics 4 Setup (2h)
**Arquivo**: `src/lib/analytics.ts` (novo)
```
- [ ] Criar GA4 property no Google Analytics
- [ ] Obter Measurement ID (G-XXXXXXXXXX)
- [ ] Criar `src/lib/analytics.ts` com GoogleTagManager setup
- [ ] Integrar em `app/layout.tsx` com Google Analytics component
- [ ] Validar que eventos estão sendo enviados (devtools)
- [ ] Documentar GA4 ID no arquivo .env.local
```

**Dependências**: Nenhuma
**Output**: GA4 funcionando em produção

---

### TAREFA 2: Meta Pixel Integration (2h)
**Arquivo**: `src/lib/meta-pixel.ts` (novo)
```
- [ ] Obter Pixel ID do Meta Business Suite (cliente)
- [ ] Criar `src/lib/meta-pixel.ts` com Meta SDK
- [ ] Implementar eventos: ViewContent, AddToCart, Purchase
- [ ] Integrar em ProductCard.tsx para rastreio de cliques
- [ ] Testar no navegador (Facebook Pixel Helper)
- [ ] Documentar Pixel ID no .env.local
```

**Dependências**: GA4 completo
**Output**: Meta Pixel enviando eventos

---

### TAREFA 3: Estruturar Carrinho (4h)
**Arquivo**: Melhorar `src/stores/cartStore.ts`
```
- [ ] Expandir Zustand store com: addItem, removeItem, getTotal
- [ ] Adicionar persistência localStorage
- [ ] Criar `src/components/layout/Cart.tsx` (página do carrinho)
- [ ] Renderizar lista de itens com subtotal
- [ ] Adicionar botão "Ir para Checkout"
- [ ] Testes básicos no navegador
```

**Dependências**: Nenhuma
**Output**: Carrinho funcional com persistência

---

## 🗓️ SEMANA 1 (27 JAN - 02 FEV)

### Seg-Ter (27-28 JAN): Tasks acima
```
- GA4 Setup                   ✅ 2h
- Meta Pixel                  ✅ 2h
- Estruturar Carrinho         ✅ 4h
                           ─────────
                        TOTAL: 8h/dia
```

### Qua-Qui (29-30 JAN): Event Tracking
**TAREFA 4: Event Tracking Engine (3h)**
```
- [ ] Criar `src/lib/event-tracker.ts`
- [ ] Implementar: trackProductView, trackAddToCart, trackCheckout
- [ ] Enviar eventos para GA4 + Meta Pixel
- [ ] Adicionar logging no console (dev)
- [ ] Documentar todos os eventos
```

**TAREFA 5: DataLayer GTM (2h)**
```
- [ ] Criar `src/lib/data-layer.ts`
- [ ] Padronizar estrutura de eventos
- [ ] Integrar com Google Tag Manager
- [ ] Testar fluxo completo
```

### Sex-Sab (31 JAN - 01 FEV): Testes + Deploy
```
- [ ] Testes manuais em staging
- [ ] Fix de bugs encontrados
- [ ] Deploy em produção
- [ ] Monitoramento de erros
```

### Dom (02 FEV): Buffer + Revisão
```
- [ ] Revisão completa de FASE 4
- [ ] Documentação das mudanças
- [ ] Git commits bem-feitos
- [ ] Preparação para FASE 5
```

---

## 📋 CHECKLIST GERAL DE DEPENDÊNCIAS

### ✅ Já Temos
- [x] Vitrine Bem Estar completa
- [x] Design System (12 componentes)
- [x] Meta tags dinâmicas
- [x] Schema.org JSON-LD
- [x] Image optimization
- [x] Zustand carrinho base
- [x] TypeScript strict mode

### ⏳ PRECISA FAZER (ORDEM)
1. [ ] **GA4 + Meta Pixel** (inicio HOJE)
2. [ ] **Event Tracking** (inicio amanhã)
3. [ ] **Carrinho completo** (inicio Qua)
4. [ ] **Checkout** (inicio segunda-feira)
5. [ ] **Stripe + PIX** (semana 2)
6. [ ] **Dashboard Admin** (semana 3)
7. [ ] **Otimização final** (semana 4)

### ⚠️ BLOQUEANTES COM CLIENTE
- [ ] Stripe Account Setup (com Seu Junior)
- [ ] PIX Receiver Keys (com Seu Junior)
- [ ] WhatsApp Business Account (com Seu Junior)
- [ ] Meta Business ID (com Seu Junior)

---

## 💻 COMANDOS GIT

```bash
# Ao terminar cada tarefa:
git add src/lib/analytics.ts
git commit -m "FEAT 4.5: Google Analytics 4 Setup - Measurement ID integrado"

git add src/lib/meta-pixel.ts
git commit -m "FEAT 4.6: Meta Pixel Integration - Events (ViewContent, AddToCart)"

git add -A
git commit -m "FEAT 4.8-4.9: Event Tracking Engine + DataLayer GTM"

# Review de logs:
git log --oneline | head -20
```

---

## 📊 MÉTRICAS DE SUCESSO

### Após FASE 4.5 (GA4 Setup)
```
✅ GA4 Property criada
✅ Eventos começam a aparecer em 24-48h
✅ Dashboard Google Analytics mostrando tráfego
✅ Realtime ativo
```

### Após FASE 4.6 (Meta Pixel)
```
✅ Meta Business Suite mostrando eventos
✅ Facebook Pixel Helper validando
✅ Conversões sendo rastreadas
✅ Pronto para campanhas de remarketing
```

### Após FASE 4.8-4.9 (Event Tracking)
```
✅ Todos os cliques rastreados
✅ E-commerce data fluindo
✅ Conversão visível
✅ Pronto para Stripe + PIX
```

---

## 🚀 DEPLOY STRATEGY

### Staging
```
Ambiente: staging.hnk-food-stack.dev
Deploy: main branch (automático com GitHub Actions)
Testing: Manual + Automated
```

### Produção
```
Ambiente: bem-estar.hnk-food-stack.app
Deploy: Release tags (manual)
Alertas: Sentry + LogRocket
Monitoring: Google Analytics + Meta Pixel
```

---

## 📞 COMUNICAÇÃO COM CLIENTE

### Email para Seu Junior
```
Assunto: HNK Food Stack - Próximas Etapas (Documentação)

Seu Junior,

Encostamos a vitrine digital da Churrascaria Bem Estar!
Agora começamos a integração com Analytics e Checkout.

Para começar, precisamos de alguns dados:
1. Stripe Account (para pagamento)
2. PIX Receiver Keys
3. WhatsApp Business Account
4. Meta Business ID (para ads)

Você pode ter tudo isso em ~1 hora seguindo os links:
- Stripe: [link]
- Meta: [link]
- Whatsapp: [link]

Aguardamos seus contatos!

Abraços,
Tim Técnico HNK
```
```

---

## 📁 ARQUIVOS A CRIAR/MODIFICAR

```
CRIAR:
├── src/lib/analytics.ts                    (GA4 setup)
├── src/lib/meta-pixel.ts                   (Meta Pixel)
├── src/lib/event-tracker.ts                (Event tracking)
├── src/lib/data-layer.ts                   (DataLayer GTM)
├── src/components/layout/Cart.tsx          (Página carrinho)
├── src/components/layout/Checkout.tsx      (Página checkout - próxima)
└── DOCS/FASE-4.5-ANALYTICS.md             (Documentação)

MODIFICAR:
├── app/layout.tsx                          (+ GA4 Script)
├── src/components/ui/ProductCard.tsx       (+ evento de clique)
├── .env.local                              (+ GA4_ID, PIXEL_ID)
└── tailwind.config.ts                      (se precisar novos estilos)
```

---

## ⏰ ESTIMATIVA FINAL

| Tarefa | Horas | Dias | Status |
|--------|-------|------|--------|
| GA4 Setup | 2 | 0.5 | ⏳ |
| Meta Pixel | 2 | 0.5 | ⏳ |
| Carrinho | 4 | 1 | ⏳ |
| Event Tracking | 3 | 1 | ⏳ |
| DataLayer GTM | 2 | 0.5 | ⏳ |
| **TOTAL SEMANA 1** | **13** | **3-4 dias** | ⏳ |

---

## 🎯 OBJETIVO FINAL

Ter **FASE 4 completa** até **06 de Fevereiro** e começar **FASE 5** segunda-feira.

Isso nos coloca no cronograma perfeito para entregar **tudo em Abril de 2026**.

---

**Próximo Checkpoint**: Terça-feira 28 JAN (GA4 + Meta Pixel funcionando)

**Agente Responsável**: GIP TEHKNÉ - Automático  
**Última Atualização**: 26 JAN 2026
