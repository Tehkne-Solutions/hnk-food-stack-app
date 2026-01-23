import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com isolamento de tenant
 * HNK-GIP Pattern: Filtro automático de org_id em todas as queries
 * 
 * Função: Garantir que cada tenant só consiga ver seus próprios dados
 * mesmo se tentasse manipular a query diretamente
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️  Variáveis de ambiente Supabase não configuradas. Multi-tenancy desabilitado.')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Wrapper para buscar dados com filtro de org_id automático
 * 
 * @param tableName Nome da tabela no Supabase
 * @param orgId ID da organização (tenant)
 * @param filters Filtros adicionais (RLS já filtra por org_id)
 * 
 * @example
 * const products = await getTenantData('produtos', 'org-123')
 * // Já retorna apenas produtos de org-123
 */
export async function getTenantData(
    tableName: string,
    orgId: string,
    filters?: Record<string, any>
) {
    let query = supabase.from(tableName).select('*').eq('org_id', orgId)

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value)
            }
        })
    }

    const { data, error } = await query

    if (error) {
        console.error(`Erro ao buscar dados de ${tableName}:`, error)
        return null
    }

    return data
}

/**
 * Wrapper para inserir dados com org_id automático
 * 
 * @param tableName Nome da tabela
 * @param orgId ID da organização
 * @param record Dados a inserir
 */
export async function insertTenantData(
    tableName: string,
    orgId: string,
    record: any
) {
    const { data, error } = await supabase
        .from(tableName)
        .insert([{ ...record, org_id: orgId }])
        .select()

    if (error) {
        console.error(`Erro ao inserir em ${tableName}:`, error)
        return null
    }

    return data
}

/**
 * Wrapper para atualizar dados com proteção de org_id
 */
export async function updateTenantData(
    tableName: string,
    orgId: string,
    recordId: string,
    updates: any
) {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', recordId)
        .eq('org_id', orgId)
        .select()

    if (error) {
        console.error(`Erro ao atualizar ${tableName}:`, error)
        return null
    }

    return data
}

/**
 * Wrapper para deletar dados com proteção de org_id
 */
export async function deleteTenantData(
    tableName: string,
    orgId: string,
    recordId: string
) {
    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', recordId)
        .eq('org_id', orgId)

    if (error) {
        console.error(`Erro ao deletar em ${tableName}:`, error)
        return false
    }

    return true
}

export default supabase
