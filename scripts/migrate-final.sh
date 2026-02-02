#!/bin/bash

echo "🔥 HNK FOOD STACK - MIGRAÇÃO FINAL"
echo "=================================="

# 1. Gera o cliente Prisma com os novos modelos
echo "📦 Gerando cliente Prisma..."
npx prisma generate

# 2. Cria a migração e atualiza o banco
echo "🗄️ Criando migração SaaS..."
npx prisma migrate dev --name add_saas_tiers_and_bi

# 3. Seed inicial dos planos
echo "🌱 Populando planos iniciais..."
npx prisma db seed

echo "✅ Migração concluída com sucesso!"
echo "🚀 Sistema pronto para produção!"