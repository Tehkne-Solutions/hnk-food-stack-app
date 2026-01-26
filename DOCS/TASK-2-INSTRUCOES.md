# 📋 TASK 2 - CRIAR TABELAS SUPABASE

**Duração Estimada**: 5-10 minutos  
**Dificuldade**: ⭐ Muito fácil  

---

## 🚀 PASSO A PASSO

### PASSO 1: Acessar Supabase Console

1. Abra <https://supabase.com>
2. Faça login com sua conta
3. Clique no seu projeto
4. No menu esquerdo, clique em **SQL Editor**

---

### PASSO 2: Executar SQL

1. Clique em **+ New Query** (botão azul)
2. Abra o arquivo: `DOCS/SCHEMA-FASE-10.sql`
3. **Copie TUDO** do arquivo
4. **Cole** no Supabase SQL Editor
5. Clique em **▶️ RUN** (botão azul executar)

Deve aparecer uma mensagem verde: `Success`

---

### PASSO 3: Configurar .env.local

1. Abra seu projeto no editor
2. Encontre ou crie o arquivo `.env.local`
3. Adicione:

```env
# Supabase (já deve estar lá, senão adicione)
NEXT_PUBLIC_SUPABASE_URL=https://seu-id-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Como obter as credenciais?**

1. No Supabase, vá para **Settings > API**
2. Cópie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role secret → `NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY`

---

### PASSO 4: Restart Dev Server

1. No terminal, mate o dev server (Ctrl+C)
2. Execute: `npm run dev`
3. Dev server deve iniciar sem erros

---

### PASSO 5: Testar Auth

1. Abra <http://localhost:3000/auth/login>
2. Digite seu email (ex: <teste@email.com>)
3. Clique "Enviar Link de Acesso"
4. Aguarde mensagem de sucesso ✅

**Onde ver o email?**

- **No Supabase**: Settings > Authentication > Email Templates > Visualizar preview
- **Com MailHog** (se instalado): <http://localhost:1025>
- **Email real**: Checar inbox + spam folder

---

## ✅ VALIDAR SUCESSO

### Tabelas criadas?

1. No Supabase, vá para **Database > Tables**
2. Você deve ver:
   - ✅ `pedidos`
   - ✅ `pedido_itens`
   - ✅ `payment_webhooks`
   - ✅ `user_profiles`

### .env.local configurado?

1. No editor, abra `.env.local`
2. Deve conter:
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - ✅ `NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY`

### Dev server rodando?

1. Terminal deve mostrar:

   ```
   ✓ Ready in 3.6s
   - Local: http://localhost:3000
   ```

### Auth funcionando?

1. Abra <http://localhost:3000/auth/login>
2. Preencha email
3. Clique "Enviar Link"
4. Mensagem verde deve aparecer: ✅ Link enviado

---

## 🆘 TROUBLESHOOTING

**Erro: "Cannot find database"**

- [ ] Verificar NEXT_PUBLIC_SUPABASE_URL está correto
- [ ] Verificar projeto Supabase existe
- [ ] Restart dev server

**Erro: "Invalid API key"**

- [ ] Copiar chave exata (sem espaços)
- [ ] Verificar se é anon_key (não service_role)
- [ ] Restart dev server

**Email não chega**

- [ ] Verificar pasta Spam/Lixo
- [ ] Supabase > Authentication > Email Templates > "Edit" para ver template
- [ ] Testar com email diferentes

**Tabelas não foram criadas**

- [ ] Verificar se aparece mensagem de erro no Supabase
- [ ] Copy-paste SQL novamente com cuidado
- [ ] Executar cada parte separada (CREATE TABLE 1, depois 2, etc)

---

## 📊 CHECKLIST TASK 2

- [ ] SQL executado no Supabase
- [ ] 4 tabelas criadas (pedidos, itens, webhooks, profiles)
- [ ] .env.local configurado com credenciais
- [ ] Dev server rodando sem erros
- [ ] Login testado em /auth/login
- [ ] Email de confirmação recebido

---

## 🎯 PRÓXIMO APÓS CONCLUIR TASK 2

1. ✅ Task 2 concluída (Tabelas criadas)
2. ➡️ **Task 3**: Setup Mercado Pago SDK
   - Instalar pacote
   - Criar arquivo `src/services/payment.ts`
   - Criar rotas de API

---

## 💡 DICA

Se achar que demora muito, pode pular para Task 3 e continuar.
Task 2 é principalmente setup de BD - pode fazer mesmo depois!

Quer que eu continue com Task 3? 🚀
