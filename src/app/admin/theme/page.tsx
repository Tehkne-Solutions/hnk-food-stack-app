'use client'

/**
 * 🎨 FASE 6: White-Label - Admin Theme Editor
 */

import { useState, useEffect } from 'react'
import { useTenant } from '@/providers/tenant-provider'
import { useTheme } from '@/providers/theme-provider'
import { updateTheme, uploadLogo, applyPreset } from '@/services/whitelabel'
import { getThemePresets } from '@/lib/theme-utils'
import { ThemeUpdatePayload } from '@/types/whitelabel'
import { Palette, Upload, RotateCcw } from 'lucide-react'

export default function ThemeEditorPage() {
    const tenant = useTenant()
    const { theme } = useTheme()
    const [formData, setFormData] = useState<ThemeUpdatePayload>({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [presets] = useState(getThemePresets())

    useEffect(() => {
        if (theme) {
            setFormData({
                primary_color: theme.primary_color,
                secondary_color: theme.secondary_color,
                accent_color: theme.accent_color,
                brand_name: theme.brand_name,
                font_family: theme.font_family,
                button_style: theme.button_style,
            })
        }
    }, [theme])

    const handleColorChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        if (!tenant.organization) return

        setLoading(true)
        try {
            const result = await updateTheme(tenant.organization.id, formData)

            if (result.success) {
                setMessage({ type: 'success', text: 'Tema atualizado com sucesso!' })
                setTimeout(() => setMessage(null), 3000)
            } else {
                setMessage({ type: 'error', text: result.error || 'Erro ao salvar' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao salvar tema' })
        } finally {
            setLoading(false)
        }
    }

    const handlePresetApply = async (presetId: string) => {
        if (!tenant.organization) return

        setLoading(true)
        try {
            const result = await applyPreset(tenant.organization.id, presetId)

            if (result.success && result.theme) {
                setFormData({
                    primary_color: result.theme.primary_color,
                    secondary_color: result.theme.secondary_color,
                    accent_color: result.theme.accent_color,
                })
                setMessage({ type: 'success', text: 'Preset aplicado com sucesso!' })
                setTimeout(() => setMessage(null), 3000)
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao aplicar preset' })
        } finally {
            setLoading(false)
        }
    }

    const handleLogoUpload = async (file: File, isDark: boolean) => {
        if (!tenant.organization) return

        setLoading(true)
        try {
            const result = await uploadLogo(tenant.organization.id, file, isDark)

            if (result.success) {
                setMessage({ type: 'success', text: 'Logo enviada com sucesso!' })
                setTimeout(() => setMessage(null), 3000)
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao enviar logo' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-gray-800 p-8 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-8 h-8 text-[#d97706]" />
                    <h1 className="text-3xl font-bold">🎨 Editor de Tema</h1>
                </div>
                <p className="text-gray-400">Personalize a aparência do seu site</p>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-8 max-w-6xl">
                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-900/20 border border-green-500/30 text-green-300'
                            : 'bg-red-900/20 border border-red-500/30 text-red-300'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Color Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Presets */}
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                            <h2 className="text-xl font-bold mb-4">📦 Temas Presets</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => handlePresetApply(preset.id)}
                                        className="p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-[#d97706]/50 transition text-left"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex gap-1">
                                                {Object.values(preset.colors).map((color, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-5 h-5 rounded"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-semibold">{preset.name}</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{preset.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                            <h2 className="text-xl font-bold mb-6">🎨 Cores Customizadas</h2>

                            <div className="space-y-6">
                                {/* Primary Color */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3">Cor Primária</label>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <input
                                                type="color"
                                                value={formData.primary_color || '#d97706'}
                                                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                                                className="w-full h-12 rounded cursor-pointer border border-gray-700"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.primary_color || '#d97706'}
                                            onChange={(e) => handleColorChange('primary_color', e.target.value)}
                                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Usado em botões, links e destaque</p>
                                </div>

                                {/* Secondary Color */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3">Cor Secundária</label>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <input
                                                type="color"
                                                value={formData.secondary_color || '#1a1a1a'}
                                                onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                                                className="w-full h-12 rounded cursor-pointer border border-gray-700"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.secondary_color || '#1a1a1a'}
                                            onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Usado em backgrounds e cards</p>
                                </div>

                                {/* Accent Color */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3">Cor de Destaque</label>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <input
                                                type="color"
                                                value={formData.accent_color || '#25d366'}
                                                onChange={(e) => handleColorChange('accent_color', e.target.value)}
                                                className="w-full h-12 rounded cursor-pointer border border-gray-700"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.accent_color || '#25d366'}
                                            onChange={(e) => handleColorChange('accent_color', e.target.value)}
                                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Usado em ações secundárias (WhatsApp)</p>
                                </div>
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                            <h2 className="text-xl font-bold mb-6">✍️ Tipografia</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Font Family</label>
                                    <select
                                        value={formData.font_family || 'Inter'}
                                        onChange={(e) => handleColorChange('font_family', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                                    >
                                        <option value="Inter">Inter</option>
                                        <option value="Poppins">Poppins</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Georgia">Georgia</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Estilo de Botões</label>
                                    <select
                                        value={formData.button_style || 'rounded'}
                                        onChange={(e) => handleColorChange('button_style', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                                    >
                                        <option value="rounded">Arredondado (padrão)</option>
                                        <option value="square">Quadrado</option>
                                        <option value="pill">Pílula</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                            <h2 className="text-xl font-bold mb-6">🏢 Branding</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Nome da Marca</label>
                                    <input
                                        type="text"
                                        value={formData.brand_name || ''}
                                        onChange={(e) => handleColorChange('brand_name', e.target.value)}
                                        placeholder="Ex: Churrascaria Premium"
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Logo (Claro)</label>
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                                        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                                        <p className="text-sm text-gray-400 mb-3">Arraste ou clique para fazer upload</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    handleLogoUpload(e.target.files[0], false)
                                                }
                                            }}
                                            className="hidden"
                                            id="logo-light"
                                        />
                                        <label
                                            htmlFor="logo-light"
                                            className="bg-[#d97706] text-white px-4 py-2 rounded cursor-pointer inline-block hover:bg-[#b8860b] transition"
                                        >
                                            Selecionar arquivo
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Logo (Escuro)</label>
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                                        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                                        <p className="text-sm text-gray-400 mb-3">Para backgrounds escuros</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    handleLogoUpload(e.target.files[0], true)
                                                }
                                            }}
                                            className="hidden"
                                            id="logo-dark"
                                        />
                                        <label
                                            htmlFor="logo-dark"
                                            className="bg-[#d97706] text-white px-4 py-2 rounded cursor-pointer inline-block hover:bg-[#b8860b] transition"
                                        >
                                            Selecionar arquivo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 h-fit sticky top-8">
                        <h2 className="text-xl font-bold mb-6">👁️ Preview</h2>

                        {/* Color Preview */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 mb-2">Cor Primária</p>
                                <div
                                    className="h-12 rounded border border-gray-700"
                                    style={{ backgroundColor: formData.primary_color || '#d97706' }}
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-2">Cor Secundária</p>
                                <div
                                    className="h-12 rounded border border-gray-700"
                                    style={{ backgroundColor: formData.secondary_color || '#1a1a1a' }}
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-2">Cor de Destaque</p>
                                <div
                                    className="h-12 rounded border border-gray-700"
                                    style={{ backgroundColor: formData.accent_color || '#25d366' }}
                                />
                            </div>
                        </div>

                        {/* Button Preview */}
                        <div className="space-y-3 mb-6">
                            <button
                                style={{ backgroundColor: formData.primary_color || '#d97706' }}
                                className={`w-full text-white font-bold py-2 px-4 ${formData.button_style === 'pill'
                                    ? 'rounded-full'
                                    : formData.button_style === 'square'
                                        ? 'rounded-none'
                                        : 'rounded-lg'
                                    }`}
                            >
                                Botão Primário
                            </button>

                            <button
                                style={{ borderColor: formData.primary_color || '#d97706', color: formData.primary_color || '#d97706' }}
                                className={`w-full border-2 font-bold py-2 px-4 ${formData.button_style === 'pill'
                                    ? 'rounded-full'
                                    : formData.button_style === 'square'
                                        ? 'rounded-none'
                                        : 'rounded-lg'
                                    }`}
                            >
                                Botão Secundário
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="w-full bg-[#d97706] hover:bg-[#b8860b] disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                {loading ? 'Salvando...' : '💾 Salvar Alterações'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
