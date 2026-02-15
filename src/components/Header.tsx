import React, { useState, useEffect } from 'react';
import { Share2, Save, History, Settings, LogIn, ChevronDown } from 'lucide-react';

interface HeaderProps {
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('diagram-studio-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Listen for storage changes (e.g. from the AuthModal)
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem('diagram-studio-user');
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        // Also listen for custom events if needed, but storage event works across tabs
        // For local tab changes, we might need a custom event or a shared state.
        // Let's add a small interval check as a fallback for the same tab
        const interval = setInterval(() => {
            const currentUser = localStorage.getItem('diagram-studio-user');
            const parsedUser = currentUser ? JSON.parse(currentUser) : null;
            if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
                setUser(parsedUser);
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('diagram-studio-user');
        setUser(null);
    };

    return (
        <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Diagram Studio
                        </h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                            Professional Mermaid Editor
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="flex items-center gap-2 pr-2">
                            <div className="flex flex-col items-end mr-2 hidden sm:flex">
                                <span className="text-xs font-bold text-white">{user.name}</span>
                                <span className="text-[10px] text-slate-500">Premium Plan</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all active:scale-95 group"
                            >
                                <div className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-[10px] font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-all active:scale-95 border border-slate-700"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Sign In</span>
                        </button>
                    )}

                    <div className="h-6 w-[1px] bg-slate-800 mx-2" />

                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors" title="History">
                        <History className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors" title="Settings">
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-[1px] bg-slate-800 mx-2" />
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save Project</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
