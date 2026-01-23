'use server'

/**
 * 🎨 FASE 6: White-Label - Serviço de Temas
 */

import { createClientInstance } from '@/lib/supabase'
import { ThemeConfig, ThemeUpdatePayload } from '@/types/whitelabel'
import { isValidColor, getThemePresets } from '@/lib/theme-utils'

const supabase = createClientInstance()

const DEFAULT_THEME: ThemeConfig = {
    primary_color: '#d97706',
    secondary_color: '#1a1a1a',
    accent_color: '#25d366',
    background_dark: '#0a0a0a',
    text_primary: '#ffffff',
    text_secondary: '#9ca3af',
    border_color: '#374151',
    success_color: '#10b981',
    warning_color: '#f59e0b',
    error_color: '#ef4444',
    font_family: 'Inter',
    font_size_base: 16,
    line_height_base: 1.5,
    border_radius: 'rounded-lg',
    spacing_unit: 4,
    brand_name: 'HNK Food Stack',
    enable_animations: true,
    enable_dark_mode: true,
    primary_font_weight: 600,
    button_style: 'rounded',
    show_header_logo: true,
    show_footer: true,
    header_sticky: true,
    enable_search: true,
}

/**
 * Obter tema da organização (com fallback para padrão)
 */
export async function getTheme(
    orgId: string
): Promise<{ success: boolean; theme?: ThemeConfig; error?: string }> {
    try {
        const { data: organization, error } = await supabase
            .from('organizations')
            .select('theme_config')
            .eq('id', orgId)
            .single()

        if (error) throw error

        // Merge com default theme
        const theme: ThemeConfig = {
            ...DEFAULT_THEME,
            ...(organization.theme_config || {}),
        }

        return { success: true, theme }
    } catch (error) {
        console.error('❌ Erro ao obter tema:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Atualizar tema da organização
 */
export async function updateTheme(
    orgId: string,
    updates: ThemeUpdatePayload
): Promise<{ success: boolean; theme?: ThemeConfig; error?: string }> {
    try {
        // Validar cores se fornecidas
        if (updates.primary_color && !isValidColor(updates.primary_color)) {
            throw new Error('primary_color inválida')
        }
        if (updates.secondary_color && !isValidColor(updates.secondary_color)) {
            throw new Error('secondary_color inválida')
        }
        if (updates.accent_color && !isValidColor(updates.accent_color)) {
            throw new Error('accent_color inválida')
        }

        // Buscar tema atual
        const current = await getTheme(orgId)
        if (!current.success || !current.theme) {
            throw new Error('Não foi possível carregar tema atual')
        }

        // Merge updates
        const updated: ThemeConfig = {
            ...current.theme,
            ...updates,
        }

        // Atualizar no banco
        const { error } = await supabase
            .from('organizations')
            .update({ theme_config: updated, updated_at: new Date().toISOString() })
            .eq('id', orgId)

        if (error) throw error

        return { success: true, theme: updated }
    } catch (error) {
        console.error('❌ Erro ao atualizar tema:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Upload de logo
 */
export async function uploadLogo(
    orgId: string,
    file: File,
    isDark: boolean = false
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const fileName = `${orgId}/logo${isDark ? '-dark' : ''}.${file.name.split('.').pop()}`

        const { error } = await supabase.storage
            .from('logos')
            .upload(fileName, file, { upsert: true })

        if (error) throw error

        // Gerar URL pública
        const { data: publicData } = supabase.storage
            .from('logos')
            .getPublicUrl(fileName)

        const logoUrl = publicData.publicUrl

        // Atualizar tema com URL
        const fieldName = isDark ? 'logo_dark_url' : 'logo_url'
        await updateTheme(orgId, { [fieldName]: logoUrl })

        return { success: true, url: logoUrl }
    } catch (error) {
        console.error('❌ Erro ao fazer upload de logo:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}



/**
 * Resetar tema para padrão
 */
export async function resetTheme(orgId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('organizations')
            .update({
                theme_config: DEFAULT_THEME,
                updated_at: new Date().toISOString(),
            })
            .eq('id', orgId)

        if (error) throw error

        return { success: true }
    } catch (error) {
        console.error('❌ Erro ao resetar tema:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}


/**
 * Aplicar tema preset
 */
export async function applyPreset(
    orgId: string,
    presetId: string
): Promise<{ success: boolean; theme?: ThemeConfig; error?: string }> {
    try {
        const presets = getThemePresets()
        const preset = presets.find((p) => p.id === presetId)

        if (!preset) {
            throw new Error(`Preset não encontrado: ${presetId}`)
        }

        const updates: ThemeUpdatePayload = {
            primary_color: preset.colors.primary,
            secondary_color: preset.colors.secondary,
            accent_color: preset.colors.accent,
        }

        return await updateTheme(orgId, updates)
    } catch (error) {
        console.error('❌ Erro ao aplicar preset:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}
