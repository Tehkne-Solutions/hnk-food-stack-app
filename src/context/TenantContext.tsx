"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Organization, TenantContextType } from '@/types/tenant';

// Criando o contexto com um valor padrão
export const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Hook customizado para usar o contexto do Tenant
export function useTenant(): TenantContextType {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant deve ser usado dentro de um TenantProvider');
  }
  return context;
}

// Componente Provedor do lado do cliente - com carregamento de dados
export function TenantContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        setIsLoading(true);

        // Buscar informações do tenant do servidor (middleware)
        const tenantHeader = document.documentElement.getAttribute('data-tenant-id');

        if (!tenantHeader) {
          // Fallback para 'churrasco-bem-brasil' (cliente padrão durante desenvolvimento)
          setOrganization({
            id: '0000-0000-0000-0001',
            name: 'Churrasco Bem Brasil',
            slug: 'churrasco-bem-brasil',
            brand_voice: 'rústico e apaixonado',
            keywords: ['churrasco', 'parrilla', 'eventos'],
            theme_config: {
              primary_color: '#d97706',
              secondary_color: '#0a0a0a',
              font_family: 'Inter',
              border_radius: '0.5rem',
              accent_color: '#25d366',
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          setError(null);
          return;
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar tenant');
        console.error('Erro ao carregar tenant:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ organization, isLoading, error }}>
      {children}
    </TenantContext.Provider>
  );
}
