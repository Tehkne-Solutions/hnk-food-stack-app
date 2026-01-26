# 🧪 FASE 8 - TESTING GUIDE

**Data**: 23 de Janeiro de 2026  
**Status**: ✅ READY FOR TESTING  

---

## 🚀 COMO TESTAR

### 1. Verificar se o servidor está rodando

```bash
# Terminal já deve ter o servidor rodando
# Se não, execute:
cd t:\HNK-LABS\PROJETO-APP-HNK-FOOD-STACK\hnk-food-stack-app
npm run dev

# Esperado:
# ▲ Next.js 16.1.4 (Turbopack)
# - Local: http://localhost:3000
# ✓ Ready in 2.8s
```

### 2. Abrir no navegador

```
http://localhost:3000
```

Você verá:

- Home page com features
- Button "Ver Cardápio"
- Button "Agendar Evento"

### 3. Clicar em "Ver Cardápio"

```
Será redirecionado para /menu
Verá:
- Header com localização (São Paulo, SP)
- 🛒 CartButton no topo direito (novo!)
- Barra de busca
- Categorias (Carnes, Acompanhamentos, etc)
- Lista de produtos
```

---

## ✅ FLUXO DE TESTES PASSO A PASSO

### ⭐ TESTE 1: Abrir Modal de Produto

**Passo 1**: Na página /menu, clique em qualquer card de produto
**Esperado**:

- ✅ Modal abre com animação suave
- ✅ Mostra imagem do produto
- ✅ Mostra nome, descrição, preço
- ✅ Botão ❤️ favoritos (vazio)
- ✅ Seletor de quantidade [−] 1 [+]
- ✅ Botão "Adicionar" destacado

**Teste alternativo**: Clique no botão "+" do card
**Esperado**: Modal também abre

---

### ⭐ TESTE 2: Selecionar Quantidade

**Passo 1**: Modal aberto, clique no botão [+] várias vezes
**Esperado**:

- ✅ Número incrementa (1 → 2 → 3...)
- ✅ Subtotal atualiza em tempo real
- ✅ Exemplo: R$ 85.90 → R$ 171.80

**Passo 2**: Clique no botão [−]
**Esperado**:

- ✅ Número decrementa
- ✅ Não pode ir abaixo de 1

**Teste**: Clique [−] quando está em 1
**Esperado**: Permanece em 1 (não vai para 0)

---

### ⭐ TESTE 3: Adicionar ao Carrinho

**Passo 1**: Com quantidade selecionada (ex: 2), clique [Adicionar 🛒]
**Esperado**:

- ✅ Modal fecha com animação
- ✅ Item é adicionado ao carrinho
- ✅ CartButton mostra badge "2"

**Passo 2**: Adicione outro produto

- Clique em outro card
- Selecione quantidade (ex: 1)
- Clique [Adicionar]

**Esperado**:

- ✅ Modal fecha
- ✅ CartButton agora mostra badge "3" (2 + 1)

---

### ⭐ TESTE 4: Abrir CartSheet

**Passo 1**: Clique no CartButton (🛒 com badge)
**Esperado**:

- ✅ CartSheet abre da direita para esquerda
- ✅ Mostra lista de itens adicionados
- ✅ Cada item tem:
  - Imagem pequena
  - Nome do produto
  - Preço
  - Contador de quantidade [− ] x [+]
  - Botão remover ❌
  - Subtotal

**Visual esperado**:

```
┌──────────────────────┐
│ 🛒 Seu Carrinho  [X] │
├──────────────────────┤
│ 🍖 Churrasco x2  ❌ │
│ R$ 45.00             │
│ [−] 2 [+]            │
│ Subtotal: R$ 90.00   │
│                      │
│ 🥤 Refrigerante x1   │
│ R$ 12.00             │
│ [−] 1 [+]            │
│ Subtotal: R$ 12.00   │
│                      │
│ Total: R$ 107.00     │
│ [Checkout]           │
└──────────────────────┘
```

---

### ⭐ TESTE 5: Editar Quantidade no Carrinho

**Passo 1**: No CartSheet, clique [+] de um item
**Esperado**:

- ✅ Quantidade incrementa
- ✅ Subtotal atualiza
- ✅ Total geral atualiza

**Passo 2**: Clique [−] de um item
**Esperado**:

- ✅ Quantidade decrementa
- ✅ Subtotal atualiza
- ✅ Total geral atualiza

**Teste especial**: Se quantidade ficar 1 e clicar [−]
**Esperado**:

- ✅ Item é removido completamente
- ✅ CartSheet atualiza
- ✅ Badge do CartButton atualiza

---

### ⭐ TESTE 6: Remover Item

**Passo 1**: No CartSheet, clique no botão ❌ de um item
**Esperado**:

- ✅ Item desaparece com animação
- ✅ Total atualiza
- ✅ Badge do CartButton atualiza

**Teste**: Remova todos os itens
**Esperado**:

- ✅ CartSheet mostra mensagem vazia: "Seu carrinho está vazio"
- ✅ Badge do CartButton desaparece
- ✅ Botão [Ir para Checkout] não aparece

---

### ⭐ TESTE 7: Total Calculation

**Passo 1**: Adicione vários produtos ao carrinho:

- Produto A: 2x R$ 50.00 = R$ 100.00
- Produto B: 1x R$ 30.00 = R$ 30.00
- Subtotal esperado: R$ 130.00

**Passo 2**: Abra CartSheet
**Esperado**:

```
Subtotal (3 itens)    R$ 130.00
Taxa de entrega       R$ 5.00
─────────────────────────────
TOTAL:                R$ 135.00
```

**Teste**: Edite quantidade

- Mude Produto A para 3x
- Subtotal novo: R$ 150.00 + R$ 30.00 = R$ 180.00
- Total novo: R$ 185.00

**Esperado**: Cálculo atualiza em tempo real ✅

---

### ⭐ TESTE 8: Modal Favoritos

**Passo 1**: Abra modal de um produto
**Passo 2**: Clique no botão ❤️ (coração vazio)
**Esperado**:

- ✅ Coração fica cheio (vermelho)
- ✅ Cor muda de cinza para vermelho

**Passo 3**: Clique novamente
**Esperado**:

- ✅ Coração fica vazio de novo
- ✅ Cor volta para cinza

**Nota**: Favoritos ainda não são salvos no Supabase (FASE 8.5)

---

### ⭐ TESTE 9: Responsividade Mobile

**Desktop (1920px)**

```
Esperado:
├─ Menu completo
├─ Modal centrado
├─ CartSheet full height (direita)
└─ Tudo visível
```

**Tablet (768px)**

```
Abra DevTools (F12)
└─ Set device: iPad
```

Esperado:

```
├─ Menu adaptado
├─ Modal um pouco menor
├─ CartSheet full height
└─ Tudo acessível
```

**Mobile (375px)**

```
Abra DevTools (F12)
└─ Set device: iPhone 12
```

Esperado:

```
├─ Menu otimizado
├─ Modal responsivo (max-width 90%)
├─ CartSheet toma tela inteira
├─ Botões grandes (toque)
└─ Tudo acessível
```

**Teste específico**:

- Scroll em menu mobile
- Abra modal em mobile
- CartSheet ajusta altura
- Não tem scroll duplicado

---

### ⭐ TESTE 10: Animações

**Modal Entrada**:

```
Esperado:
├─ Fade in suave
├─ Scale pequeno → normal
├─ Duração: ~300ms
└─ Sem stutters/lag
```

**CartSheet Entrada**:

```
Esperado:
├─ Slide from right
├─ Overlay fade in
├─ Duração: ~300ms
├─ Smooth spring animation
└─ Sem blinks
```

**Item Hover**:

```
No CartSheet, hover em item
Esperado:
├─ Border mais visível
├─ Fundo leve claro
├─ Transição suave (~200ms)
└─ Sem jump/resize
```

**Teste Performance**:

```
Abra DevTools → Performance tab
Abra modal, edite quantidade, feche
Esperado:
├─ FPS 60 (smooth)
├─ CPU usage baixo
├─ Sem memory leaks
└─ Responsive
```

---

## 🐛 BUGS CONHECIDOS

✅ Nenhum bug conhecido atualmente!

---

## ⚠️ COMPORTAMENTOS ESPERADOS

| Ação | Esperado |
|------|----------|
| Click fora modal | Fecha |
| Click [X] modal | Fecha |
| Quantidade 0 | Remove item |
| CartSheet vazio | "Seu carrinho está vazio" |
| Badge 9+ | Mostra "9+" (não "10") |
| Total com entrega | Subtotal + R$ 5,00 |
| Modal modal duplo | Não abre modal duplo |
| Favorito salvo? | Apenas UI (DB depois) |
| Recomendações | Placeholder (DB depois) |

---

## 🎯 CHECKLIST DE TESTES

Imprima e marque conforme testa:

```
MODAL
☐ Abre ao clicar em produto
☐ Abre ao clicar em botão +
☐ Mostra imagem grande
☐ Mostra descrição completa
☐ Mostra preço
☐ Botão favoritos funciona
☐ Quantidade incrementa/decrementa
☐ Subtotal atualiza
☐ Botão "Adicionar" funciona
☐ Modal fecha com [X]
☐ Modal fecha ao adicionar
☐ Animações suaves

CARTSHEET
☐ Abre ao clicar CartButton
☐ Fecha com [X]
☐ Fecha ao clicar fora
☐ Lista itens corretamente
☐ Imagens visíveis
☐ Quantidade editável
☐ Remover funciona
☐ Total calcula correto
☐ Badge atualiza
☐ Estado vazio funciona
☐ Animação suave

RESPONSIVIDADE
☐ Desktop funciona
☐ Tablet funciona
☐ Mobile funciona
☐ Sem scroll duplo
☐ Sem elementos cortados

PERFORMANCE
☐ Sem lag nas animações
☐ Sem memory leaks
☐ 60 FPS smooth
☐ Carregamento rápido
```

---

## 📱 TESTE EM DIFERENTES NAVEGADORES

```
Chrome        ✅ Testar
Firefox       ✅ Testar
Safari        ✅ Testar (se Mac)
Edge          ✅ Testar
Mobile Chrome ✅ Testar
Mobile Safari ✅ Testar (se iOS)
```

---

## 🎬 TESTE DE FLUXO COMPLETO

**Cenário**: Cliente quer 2 churrascos e 1 refrigerante

1. ✅ Abra menu → Clique churrasco
2. ✅ Selecione quantidade 2
3. ✅ Clique [Adicionar]
4. ✅ Abra menu de novo → Clique refrigerante
5. ✅ Quantidade 1
6. ✅ Clique [Adicionar]
7. ✅ Clique CartButton
8. ✅ Veja: 3 itens, total com entrega
9. ✅ Edite churrasco para 3
10. ✅ Veja total atualizar
11. ✅ Remova refrigerante
12. ✅ Veja total recalcular
13. ✅ Feche CartSheet

**Resultado esperado**: ✅ TUDO FUNCIONA!

---

## 📊 REPORT TEMPLATE

```
Data: __________
Navegador: _________________
Dispositivo: _______________
Resolução: _________________

TESTES REALIZADOS:
☐ Modal
☐ CartSheet
☐ Quantidade
☐ Total
☐ Animações
☐ Responsividade

BUGS ENCONTRADOS:
[Descreva aqui]

PERFORMANCE:
FPS: ___ / 60
Lag: Sim ☐ Não ☐
Memory: ____ MB

NOTAS:
[Adicione comentários]

Resultado: ✅ PASSED ☐ FAILED ☐
```

---

## 🎓 O QUE VOCÊ APRENDEU

Ao testar FASE 8, você viu:
✅ Modal elegante (Radix UI)
✅ Gerenciamento de state (Context)
✅ Animações suaves (Framer Motion)
✅ UX responsivo
✅ Cálculos automáticos
✅ Componentes reutilizáveis

---

## ✅ CONCLUSÃO

Todos os testes devem passar!

Se encontrar bug:

1. Documente o passo para reproduzir
2. Descreva o esperado vs atual
3. Print/video se possível
4. Report ao desenvolvedor

---

**Happy Testing! 🚀**

*Nota: Este guide é para testes manuais. Testes automatizados virão em próximas fases.*
