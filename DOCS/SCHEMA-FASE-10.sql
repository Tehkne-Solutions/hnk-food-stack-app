/**
 * SQL SCRIPT - FASE 10
 * Executar no Supabase > SQL Editor
 * 
 * Cria as tabelas necessárias para o sistema de pedidos e pagamentos
 */

-- ============================================
-- 1. TABELA DE PEDIDOS (orders)
-- ============================================

CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Dados cliente
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  
  -- Endereço entrega
  endereco VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(255),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  
  -- Valores
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  taxa_entrega DECIMAL(10, 2) DEFAULT 5.00,
  desconto DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Pagamento
  payment_method VARCHAR(50), -- 'pix' | 'card' | 'cash'
  payment_id VARCHAR(255), -- Mercado Pago payment ID
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, approved, denied, refunded
  
  -- Pedido
  status VARCHAR(50) DEFAULT 'pending', 
  -- pending, confirmed, preparing, on_way, delivered, cancelled
  
  observacoes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  CONSTRAINT unique_payment_id UNIQUE(payment_id) DEFERRABLE INITIALLY DEFERRED
);

-- Índices para performance
CREATE INDEX idx_pedidos_user_id ON pedidos(user_id);
CREATE INDEX idx_pedidos_payment_id ON pedidos(payment_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_created_at ON pedidos(created_at DESC);

-- Habilitar RLS
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view their own orders" 
  ON pedidos FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" 
  ON pedidos FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
  ON pedidos FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own orders" 
  ON pedidos FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- 2. TABELA DE ITENS DO PEDIDO (order items)
-- ============================================

CREATE TABLE IF NOT EXISTS pedido_itens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  
  -- Produto
  product_id VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(100),
  
  -- Valores
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 1,
  subtotal DECIMAL(10, 2) NOT NULL, -- preco * quantidade
  
  -- Customizações (opcional)
  observacoes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices
CREATE INDEX idx_pedido_itens_pedido_id ON pedido_itens(pedido_id);

-- Habilitar RLS
ALTER TABLE pedido_itens ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view their order items" 
  ON pedido_itens FOR SELECT 
  USING (pedido_id IN (
    SELECT id FROM pedidos WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items" 
  ON pedido_itens FOR INSERT 
  WITH CHECK (pedido_id IN (
    SELECT id FROM pedidos WHERE user_id = auth.uid()
  ));

-- ============================================
-- 3. TABELA DE WEBHOOKS (para debug/retry)
-- ============================================

CREATE TABLE IF NOT EXISTS payment_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Informações do webhook
  event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100), -- payment.created, payment.updated, etc
  payment_id VARCHAR(255),
  
  -- Dados
  payload JSONB NOT NULL,
  
  -- Processamento
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices
CREATE INDEX idx_payment_webhooks_event_id ON payment_webhooks(event_id);
CREATE INDEX idx_payment_webhooks_payment_id ON payment_webhooks(payment_id);
CREATE INDEX idx_payment_webhooks_processed ON payment_webhooks(processed);

-- ============================================
-- 4. FUNÇÃO PARA ATUALIZAR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para pedidos
CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. TABELA DE USER PROFILES (opcional)
-- ============================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(20),
  
  -- Endereço padrão
  default_endereco VARCHAR(255),
  default_numero VARCHAR(10),
  default_complemento VARCHAR(255),
  default_bairro VARCHAR(100),
  default_cidade VARCHAR(100),
  default_estado VARCHAR(2),
  default_cep VARCHAR(10),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS para user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Trigger para updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View: Pedidos com total de itens
CREATE OR REPLACE VIEW pedidos_com_resumo AS
SELECT 
  p.id,
  p.user_id,
  p.nome,
  p.email,
  p.total,
  p.status,
  p.payment_status,
  COUNT(pi.id) as quantidade_itens,
  p.created_at,
  p.updated_at
FROM pedidos p
LEFT JOIN pedido_itens pi ON p.id = pi.pedido_id
GROUP BY p.id;

-- ============================================
-- DADOS DE TESTE (opcional)
-- ============================================

-- Remova esta seção em produção!
-- INSERT INTO pedidos (user_id, nome, email, endereco, numero, bairro, cidade, estado, cep, subtotal, total)
-- VALUES (
--   'seu-uuid-aqui',
--   'João Silva',
--   'joao@example.com',
--   'Rua das Flores',
--   '123',
--   'Centro',
--   'São Paulo',
--   'SP',
--   '01234567',
--   50.00,
--   55.00
-- );
