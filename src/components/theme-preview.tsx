'use client'

/**
 * 🎨 FASE 6: White-Label - Theme Preview Component
 */

import { useTheme } from '@/providers/theme-provider'
import { ThemeConfig } from '@/types/whitelabel'

export function ThemePreview({ theme }: { theme?: ThemeConfig }) {
    const { theme: currentTheme } = useTheme()
    const displayTheme = theme || currentTheme

    if (!displayTheme) return null

    return (
        <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-4">Preview do Tema</h3>

            <div className="space-y-4">
                {/* Color Palette */}
                <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Paleta de Cores</p>
                    <div className="grid grid-cols-3 gap-2">
                        <div
                            className="h-12 rounded border-2 border-gray-200"
                            style={{ backgroundColor: displayTheme.primary_color }}
                            title="Primária"
                        />
                        <div
                            className="h-12 rounded border-2 border-gray-200"
                            style={{ backgroundColor: displayTheme.secondary_color }}
                            title="Secundária"
                        />
                        <div
                            className="h-12 rounded border-2 border-gray-200"
                            style={{ backgroundColor: displayTheme.accent_color }}
                            title="Destaque"
                        />
                    </div>
                </div>

                {/* Button Preview */}
                <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Botões</p>
                    <div className="space-y-2">
                        <button
                            style={{ backgroundColor: displayTheme.primary_color }}
                            className="w-full text-white font-bold py-2 px-4 rounded"
                        >
                            Botão Primário
                        </button>
                        <button
                            style={{
                                borderColor: displayTheme.primary_color,
                                color: displayTheme.primary_color,
                            }}
                            className="w-full border-2 font-bold py-2 px-4 rounded"
                        >
                            Botão Secundário
                        </button>
                    </div>
                </div>

                {/* Branding */}
                <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Branding</p>
                    <p className="text-lg font-bold" style={{ color: displayTheme.primary_color }}>
                        {displayTheme.brand_name}
                    </p>
                    {displayTheme.brand_tagline && (
                        <p className="text-sm text-gray-600">{displayTheme.brand_tagline}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
