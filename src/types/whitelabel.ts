/**
 * 🎨 FASE 6: White-Label - Tipos de Tema e Personalização
 */

export interface ThemeConfig {
    // Cores principais
    primary_color: string // #d97706 (padrão)
    secondary_color: string // #1a1a1a (padrão)
    accent_color: string // #25d366 (padrão)
    background_dark: string // #0a0a0a (padrão)
    text_primary: string // #ffffff (padrão)
    text_secondary: string // #9ca3af (padrão)
    border_color: string // #374151 (padrão)
    success_color: string // #10b981
    warning_color: string // #f59e0b
    error_color: string // #ef4444

    // Tipografia
    font_family: string // 'Inter' (padrão)
    font_size_base: number // 16
    line_height_base: number // 1.5

    // Espaçamento
    border_radius: string // 'rounded-lg' (padrão)
    spacing_unit: number // 4px (padrão)

    // Logo e Branding
    logo_url?: string
    logo_dark_url?: string
    favicon_url?: string
    brand_name: string
    brand_tagline?: string

    // Customizações avançadas
    enable_animations: boolean // true (padrão)
    enable_dark_mode: boolean // true (padrão)
    primary_font_weight: number // 600
    button_style: 'rounded' | 'square' | 'pill' // 'rounded'

    // Redes sociais
    social_links?: {
        whatsapp?: string
        instagram?: string
        facebook?: string
        twitter?: string
        tiktok?: string
    }

    // Configurações de página
    show_header_logo: boolean // true
    show_footer: boolean // true
    header_sticky: boolean // true
    enable_search: boolean // true
}

export interface ThemePreset {
    id: string
    name: string
    description: string
    colors: {
        primary: string
        secondary: string
        accent: string
    }
    preview_image?: string
}

export interface ThemeUpdatePayload {
    primary_color?: string
    secondary_color?: string
    accent_color?: string
    logo_url?: string
    brand_name?: string
    font_family?: string
    button_style?: 'rounded' | 'square' | 'pill'
    [key: string]: string | number | boolean | undefined
}

export interface ThemeVariable {
    name: string
    label: string
    type: 'color' | 'text' | 'number' | 'select'
    value: string | number
    options?: Array<{ label: string; value: string }>
}
