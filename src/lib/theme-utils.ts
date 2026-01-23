/**
 * 🎨 Theme Utilities - Funções puras para tema
 */

import { ThemeConfig, ThemePreset } from '@/types/whitelabel'

/**
 * Gerar CSS variables string a partir do tema
 */
export function generateCSSVariables(theme: ThemeConfig): string {
    return `
    :root {
      --color-primary: ${theme.primary_color};
      --color-secondary: ${theme.secondary_color};
      --color-accent: ${theme.accent_color};
      --color-background: ${theme.background_dark};
      --color-text-primary: ${theme.text_primary};
      --color-text-secondary: ${theme.text_secondary};
      --color-border: ${theme.border_color};
      --color-success: ${theme.success_color};
      --color-warning: ${theme.warning_color};
      --color-error: ${theme.error_color};
      
      --font-family: '${theme.font_family}', sans-serif;
      --font-size-base: ${theme.font_size_base}px;
      --line-height-base: ${theme.line_height_base};
      --spacing-unit: ${theme.spacing_unit}px;
      --border-radius: ${theme.border_radius};
    }
  `
}

/**
 * Validar color hex
 */
export function isValidColor(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color)
}

/**
 * Obter temas presets disponíveis
 */
export function getThemePresets(): ThemePreset[] {
    return [
        {
            id: 'hnk-gold',
            name: 'HNK Gold (Padrão)',
            description: 'Tema premium com destaque em ouro',
            colors: {
                primary: '#d97706',
                secondary: '#1a1a1a',
                accent: '#25d366',
            },
        },
        {
            id: 'elegant-dark',
            name: 'Elegant Dark',
            description: 'Tema sofisticado em tons escuros',
            colors: {
                primary: '#6366f1',
                secondary: '#0f172a',
                accent: '#ec4899',
            },
        },
        {
            id: 'vibrant-red',
            name: 'Vibrant Red',
            description: 'Tema energético em vermelho',
            colors: {
                primary: '#ef4444',
                secondary: '#fef2f2',
                accent: '#f59e0b',
            },
        },
        {
            id: 'ocean-blue',
            name: 'Ocean Blue',
            description: 'Tema fresco em azul oceano',
            colors: {
                primary: '#0284c7',
                secondary: '#f0f9ff',
                accent: '#10b981',
            },
        },
    ]
}
