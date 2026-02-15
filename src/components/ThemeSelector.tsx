import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
    theme: string;
    onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onThemeChange }) => {
    const themes = [
        { id: 'default', name: 'Default', color: 'bg-blue-500' },
        { id: 'dark', name: 'Dark', color: 'bg-slate-800' },
        { id: 'forest', name: 'Forest', color: 'bg-emerald-600' },
        { id: 'neutral', name: 'Neutral', color: 'bg-gray-400' },
        { id: 'base', name: 'Base', color: 'bg-indigo-500' },
    ];

    return (
        <div className="flex items-center gap-3 bg-slate-800/40 p-1.5 rounded-xl border border-slate-700/50">
            <div className="pl-2 pr-1 text-slate-400">
                <Palette className="w-4 h-4" />
            </div>
            <div className="flex gap-1">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onThemeChange(t.id)}
                        className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${theme === t.id
                                ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}
            `}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
