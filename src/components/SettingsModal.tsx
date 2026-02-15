import React, { useState } from 'react';
import { X, Settings, Key, Shield, Info } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    geminiApiKey: string;
    onSaveApiKey: (key: string) => void;
    geminiModel: string;
    onSaveModel: (model: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen, onClose, geminiApiKey, onSaveApiKey, geminiModel, onSaveModel
}) => {
    const [tempKey, setTempKey] = useState(geminiApiKey);
    const [tempModel, setTempModel] = useState(geminiModel);

    if (!isOpen) return null;

    const handleSave = () => {
        onSaveApiKey(tempKey);
        onSaveModel(tempModel);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                <Settings className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Settings</h2>
                                <p className="text-xs text-[var(--text-secondary)]">Manage your account and preferences</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--bg-primary)] rounded-full text-[var(--text-secondary)] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span>AI Configuration</span>
                            </div>
                            <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Gemini API Key</label>
                                        <a
                                            href="https://aistudio.google.com/app/apikey"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                                        >
                                            Get Key <Info className="w-2.5 h-2.5" />
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                                        <input
                                            type="password"
                                            placeholder="Enter your Google Gemini API key"
                                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-mono"
                                            value={tempKey}
                                            onChange={(e) => setTempKey(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Model Selection</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        </div>
                                        <select
                                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all appearance-none cursor-pointer"
                                            value={tempModel}
                                            onChange={(e) => setTempModel(e.target.value)}
                                        >
                                            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Free)</option>
                                            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                            <option value="gemini-robotics-er-1.5-preview">Robotics Preview (Thinking)</option>
                                            <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp</option>
                                        </select>
                                    </div>
                                    <p className="text-[10px] text-[var(--text-secondary)] mt-2 leading-relaxed px-1 italic">
                                        TIP: Models with 'preview' will enable Thinking Config.
                                    </p>
                                </div>

                                <p className="text-[10px] text-[var(--text-secondary)] mt-4 leading-relaxed px-1 border-t border-[var(--border-color)] pt-3">
                                    Your data is stored locally in your browser. Calls are made directly to Google's Generative AI API.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold py-3.5 rounded-2xl border border-[var(--border-color)] transition-all active:scale-[0.98]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
