import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Criar organização de exemplo
  const org = await prisma.organization.create({
    data: {
      name: 'Churrascaria Bem Brasil',
      slug: 'bem-brasil',
      domain: 'bembrasil.com.br'
    }
  })

  // Criar assinatura BRASA (Free)
  await prisma.subscription.create({
    data: {
      organizationId: org.id,
      plan: 'BRASA',
      status: 'active',
      commissionRate: 0.15,
      hasCustomDomain: false,
      hasAnalytics: false
    }
  })

  // Criar loja de exemplo
  const store = await prisma.store.create({
    data: {
      name: 'Churrascaria Bem Brasil',
      organizationId: org.id,
      rating: 4.8,
      totalOrders: 0
    }
  })

  // Criar produtos de exemplo
  const products = [
    {
      name: 'Picanha Premium',
      price: 89.90,
      imageUrl: '/images/picanha.jpg',
      storeId: store.id
    },
    {
      name: 'Costela Fogo de Chão',
      price: 79.90,
      imageUrl: '/images/costela.jpg',
      storeId: store.id
    },
    {
      name: 'Fraldinha Especial',
      price: 69.90,
      imageUrl: '/images/fraldinha.jpg',
      storeId: store.id
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })