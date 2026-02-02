'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Settings, Bell, Lock, Database, User, Shield, Mail } from 'lucide-react'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general')
    const [saved, setSaved] = useState(false)

    const [settings, setSettings] = useState({
        // General
        storeName: 'HNK Churrascaria',
        storeEmail: 'contato@hnk.com.br',
        phone: '(11) 99999-9999',
        timezone: 'America/Sao_Paulo',

        // Notifications
        emailNotifications: true,
        orderAlerts: true,
        lowStockAlerts: true,
        marketingEmails: false,

        // Security
        requireTwoFactor: false,
        sessionTimeout: 30,
        passwordExpiry: 90,

        // Database
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetention: 365,
    })

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const tabs = [
        { id: 'general', name: 'Geral', icon: Settings },
        { id: 'notifications', name: 'Notificações', icon: Bell },
        { id: 'security', name: 'Segurança', icon: Lock },
        { id: 'database', name: 'Banco de Dados', icon: Database },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Configurações</h1>
                    <p className="mt-1 text-zinc-400">Gerencie as configurações da sua plataforma</p>
                </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 border-b border-zinc-800 overflow-x-auto"
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-b-2 border-amber-500 text-amber-500'
                                    : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    )
                })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* General Settings */}
                {activeTab === 'general' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Nome da Loja
                                </label>
                                <input
                                    type="text"
                                    value={settings.storeName}
                                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Email Principal
                                </label>
                                <input
                                    type="email"
                                    value={settings.storeEmail}
                                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Fuso Horário
                                </label>
                                <select
                                    value={settings.timezone}
                                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option>America/Sao_Paulo</option>
                                    <option>America/Brasilia</option>
                                    <option>America/Manaus</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                    <div className="space-y-4">
                        {[
                            { key: 'emailNotifications', label: 'Notificações por Email' },
                            { key: 'orderAlerts', label: 'Alertas de Novos Pedidos' },
                            { key: 'lowStockAlerts', label: 'Alertas de Estoque Baixo' },
                            { key: 'marketingEmails', label: 'Emails de Marketing' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                <label className="font-semibold text-zinc-200">{item.label}</label>
                                <input
                                    type="checkbox"
                                    checked={settings[item.key as keyof typeof settings] as boolean}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        [item.key]: e.target.checked
                                    })}
                                    className="w-5 h-5 accent-amber-500 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Timeout da Sessão (minutos)
                                </label>
                                <input
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Expiração de Senha (dias)
                                </label>
                                <input
                                    type="number"
                                    value={settings.passwordExpiry}
                                    onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                            <label className="font-semibold text-zinc-200">Autenticação de Dois Fatores</label>
                            <input
                                type="checkbox"
                                checked={settings.requireTwoFactor}
                                onChange={(e) => setSettings({ ...settings, requireTwoFactor: e.target.checked })}
                                className="w-5 h-5 accent-amber-500 cursor-pointer"
                            />
                        </div>
                    </div>
                )}

                {/* Database Settings */}
                {activeTab === 'database' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Frequência de Backup
                                </label>
                                <select
                                    value={settings.backupFrequency}
                                    onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option value="daily">Diariamente</option>
                                    <option value="weekly">Semanalmente</option>
                                    <option value="monthly">Mensalmente</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                                    Retenção de Dados (dias)
                                </label>
                                <input
                                    type="number"
                                    value={settings.dataRetention}
                                    onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                            <label className="font-semibold text-zinc-200">Backup Automático</label>
                            <input
                                type="checkbox"
                                checked={settings.autoBackup}
                                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                                className="w-5 h-5 accent-amber-500 cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Save Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-semibold text-white transition-all"
            >
                <Save size={20} />
                Salvar Configurações
            </motion.button>

            {/* Save Confirmation */}
            {saved && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 font-semibold"
                >
                    ✓ Configurações salvas com sucesso!
                </motion.div>
            )}
        </div>
    )
}
