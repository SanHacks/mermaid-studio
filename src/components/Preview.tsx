import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface PreviewProps {
    mermaidCode: string;
    theme: string;
}

const Preview: React.FC<PreviewProps> = ({ mermaidCode, theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: (['default', 'dark', 'forest', 'neutral', 'base'].includes(theme)) ? theme as any : 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, sans-serif',
        });
    }, [theme]);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current || !mermaidCode) return;

            try {
                setError(null);
                containerRef.current.innerHTML = '';
                const id = `mermaid-${Date.now()}`;
                const { svg } = await mermaid.render(id, mermaidCode);
                containerRef.current.innerHTML = svg;
            } catch (err: any) {
                console.error('Mermaid rendering error:', err);
                setError('Invalid Mermaid syntax. Please check your code.');
            }
        };

        const timeoutId = setTimeout(renderDiagram, 300);
        return () => clearTimeout(timeoutId);
    }, [mermaidCode, refreshKey]);

    return (
        <div className="h-full flex flex-col bg-[var(--bg-primary)] border-l border-[var(--border-color)] transition-colors duration-300">
            <div className="px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Preview</span>
                <div className="flex gap-1">
                    <button
                        onClick={handleRefresh}
                        className="p-1 hover:bg-[var(--bg-primary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mr-1"
                        title="Refresh Diagram"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${refreshKey > 0 ? 'animate-spin' : ''}`} style={{ animationIterationCount: 1, animationDuration: '0.5s' }} />
                    </button>
                    <button className="p-1 hover:bg-[var(--bg-primary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:bg-[var(--bg-primary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:bg-[var(--bg-primary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ml-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-[var(--bg-secondary)] bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:20px_20px] p-8 flex items-center justify-center min-h-0">
                {error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-start gap-3 max-w-md animate-in fade-in slide-in-from-top-2">
                        <div className="mt-0.5">⚠️</div>
                        <div>
                            <p className="text-sm font-medium">Syntax Error</p>
                            <p className="text-xs opacity-70 mt-1">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div
                        id="mermaid-preview"
                        ref={containerRef}
                        className="w-full h-full flex items-center justify-center"
                    />
                )}
            </div>
        </div>
    );
};

export default Preview;
