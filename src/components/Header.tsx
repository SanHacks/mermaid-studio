import React from 'react';
import { Share2, Save, History, Settings, LogIn, ChevronDown, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onLoginClick: () => void;
    appMode: 'light' | 'dark';
    onAppModeChange: (mode: 'light' | 'dark') => void;
    user: { name: string; email: string } | null;
    onLogout: () => void;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
    onLoginClick,
    appMode,
    onAppModeChange,
    user,
    onLogout,
    onSettingsClick
}) => {
    return (
        <header className="border-b border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center shadow-sm border border-[var(--border-color)]">
                        <Share2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[var(--text-primary)]">
                            Diagram Studio
                        </h1>
                        <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-semibold">
                            Professional Editor
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onAppModeChange(appMode === 'dark' ? 'light' : 'dark')}
                        className="p-2 mr-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95"
                        title={`Switch to ${appMode === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {appMode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2 pr-2">
                            <div className="flex flex-col items-end mr-2 hidden sm:flex">
                                <span className="text-xs font-bold text-[var(--text-primary)]">{user.name}</span>
                                <span className="text-[10px] text-[var(--text-secondary)]">Premium Plan</span>
                            </div>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] transition-all active:scale-95 group text-[var(--text-primary)]"
                            >
                                <div className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-[10px] font-bold">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <ChevronDown className="w-3 h-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl font-medium transition-all active:scale-95 border border-[var(--border-color)]"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Sign In</span>
                        </button>
                    )}

                    <div className="h-6 w-[1px] bg-[var(--border-color)] mx-2" />

                    <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="History">
                        <History className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onSettingsClick}
                        className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-[1px] bg-[var(--border-color)] mx-2" />
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all active:scale-95 shadow-sm">
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save Project</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
