import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase genérico
 * Use este para operações que NÃO requerem isolamento de tenant
 * Para operações com tenant isolation, use src/lib/supabase-tenant.ts
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Variáveis de ambiente Supabase não configuradas. Operações de banco de dados desabilitadas.'
    )
}

export const createClientInstance = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        return null
    }
    return createClient(supabaseUrl, supabaseAnonKey)
}

export default supabaseUrl && supabaseAnonKey ? createClientInstance() : null
