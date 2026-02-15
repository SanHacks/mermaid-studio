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
        <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-1.5 rounded-xl border border-[var(--border-color)]">
            <div className="pl-2 pr-1 text-[var(--text-secondary)]">
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
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}
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
