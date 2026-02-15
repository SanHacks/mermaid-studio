import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, Settings } from 'lucide-react';

interface AIPromptProps {
    onGenerate: (prompt: string) => Promise<string>;
    hasApiKey: boolean;
    onOpenSettings: () => void;
}

const AIPrompt: React.FC<AIPromptProps> = ({ onGenerate, hasApiKey, onOpenSettings }) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        setLoading(true);
        setError(null);
        try {
            await onGenerate(prompt);
            setPrompt('');
        } catch (err: any) {
            setError(err.message || 'Failed to generate diagram');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 mb-6 transition-all shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight">AI Assistant</span>
                </div>
                {!hasApiKey && (
                    <button
                        onClick={onOpenSettings}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 transition-all border-dashed"
                    >
                        <Settings className="w-3 h-3" />
                        Setup API Key
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={hasApiKey ? "Describe the diagram you want to create..." : "Please set your Gemini API key in settings first"}
                    disabled={!hasApiKey || loading}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl py-3 pl-4 pr-12 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!hasApiKey || loading || !prompt.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-700 transition-all active:scale-90"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                </button>
            </form>

            {error && (
                <div className="mt-3 flex items-center gap-2 text-xs text-red-500 bg-red-500/10 p-2 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default AIPrompt;
