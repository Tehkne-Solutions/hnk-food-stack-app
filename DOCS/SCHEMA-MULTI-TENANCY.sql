-- ============================================================================
-- SCHEMA MULTI-TENANCY: HNK Food Stack SaaS
-- HNK-GIP Pattern: Isolamento lógico via org_id em todas as tabelas
-- ============================================================================

-- 1. TABELA ORGANIZATIONS (Tenants)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- ex: 'churrasco-bem-brasil'
  custom_domain TEXT UNIQUE, -- ex: 'pedidos.churrascobembrasil.com.br'
  brand_voice TEXT DEFAULT 'rústico e apaixonado', -- 'rústico e apaixonado' | 'elegante e sofisticado' | 'rápido e casual'
  keywords TEXT[] DEFAULT '{"churrasco", "parrilla"}',
  theme_config JSONB DEFAULT '{
    "primary_color": "#d97706",
    "secondary_color": "#0a0a0a",
    "font_family": "Inter",
    "border_radius": "0.5rem",
    "accent_color": "#25d366"
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_custom_domain ON organizations(custom_domain);

-- 2. TABELA PRODUTOS (Cardápio)
CREATE TABLE IF NOT EXISTS produtos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL, -- 'carnes' | 'acompanhamentos' | 'bebidas' | 'eventos'
  badge TEXT, -- 'Mais Pedido' | 'Promoção' etc
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_produtos_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE
);

CREATE INDEX idx_produtos_org_id ON produtos(org_id);
CREATE INDEX idx_produtos_category ON produtos(org_id, category);

-- 3. TABELA PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  items JSONB NOT NULL, -- Array de {product_id, quantity, price}
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid' | 'paid' | 'failed'
  payment_method TEXT, -- 'pix' | 'credit_card' | 'cash'
  payment_id TEXT, -- ID externo do Mercado Pago/Asaas
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_pedidos_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE
);

CREATE INDEX idx_pedidos_org_id ON pedidos(org_id);
CREATE INDEX idx_pedidos_customer_phone ON pedidos(org_id, customer_phone);
CREATE INDEX idx_pedidos_created_at ON pedidos(org_id, created_at DESC);

-- 4. TABELA ABANDONED_CARTS (Recuperação de vendas)
CREATE TABLE IF NOT EXISTS abandoned_carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  cart_items JSONB NOT NULL, -- Array de produtos
  subtotal DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'recovered' | 'expired'
  recovery_attempts INTEGER DEFAULT 0,
  last_reminder_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
  
  CONSTRAINT fk_abandoned_carts_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT unique_pending_cart UNIQUE(org_id, customer_phone) WHERE status = 'pending'
);

CREATE INDEX idx_abandoned_carts_org_id ON abandoned_carts(org_id);
CREATE INDEX idx_abandoned_carts_status ON abandoned_carts(org_id, status);
CREATE INDEX idx_abandoned_carts_expires_at ON abandoned_carts(expires_at);

-- 5. TABELA POSTS_BLOG (Instagram -> Blog)
CREATE TABLE IF NOT EXISTS posts_blog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  id_instagram TEXT, -- ID do post original do Instagram
  title TEXT NOT NULL,
  content_seo TEXT NOT NULL, -- Conteúdo refinado pela IA
  slug TEXT NOT NULL,
  image_url TEXT,
  meta_description TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'draft', -- 'draft' | 'published' | 'archived'
  seo_score INTEGER, -- 0-100
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_posts_blog_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT unique_blog_slug UNIQUE(org_id, slug)
);

CREATE INDEX idx_posts_blog_org_id ON posts_blog(org_id);
CREATE INDEX idx_posts_blog_status ON posts_blog(org_id, status);
CREATE INDEX idx_posts_blog_published_at ON posts_blog(org_id, published_at DESC);

-- 6. TABELA FAVORITOS & WISHLIST
CREATE TABLE IF NOT EXISTS favoritos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  tipo TEXT DEFAULT 'favorito', -- 'favorito' | 'wishlist'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_favoritos_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT unique_favorito UNIQUE(org_id, customer_phone, product_id, tipo)
);

CREATE INDEX idx_favoritos_org_customer ON favoritos(org_id, customer_phone);

-- 7. TABELA LOYALTY_CARDS (Fidelização)
CREATE TABLE IF NOT EXISTS loyalty_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  points_balance INTEGER DEFAULT 0,
  last_purchase TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_loyalty_cards_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT unique_loyalty_card UNIQUE(org_id, customer_phone)
);

CREATE INDEX idx_loyalty_cards_org_customer ON loyalty_cards(org_id, customer_phone);

-- 8. TABELA LEADS_EVENTOS
CREATE TABLE IF NOT EXISTS leads_eventos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  event_date DATE,
  guest_count INTEGER,
  event_type TEXT, -- 'casamento' | 'corporativo' | 'aniversario' | 'outro'
  budget_status TEXT DEFAULT 'pending', -- 'pending' | 'quoted' | 'approved' | 'rejected'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_leads_eventos_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE
);

CREATE INDEX idx_leads_eventos_org_id ON leads_eventos(org_id);
CREATE INDEX idx_leads_eventos_budget_status ON leads_eventos(org_id, budget_status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Garante que um tenant nunca consiga ver dados de outro
-- ============================================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads_eventos ENABLE ROW LEVEL SECURITY;

-- Policy para produtos (públicas para leitura, privadas para escrita)
CREATE POLICY "produtos_read" ON produtos
  FOR SELECT USING (TRUE);

CREATE POLICY "produtos_write" ON produtos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = org_id
    )
  );

-- Expandir com mais policies conforme necessário
