import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface PreviewProps {
    mermaidCode: string;
    theme: string;
}

const Preview: React.FC<PreviewProps> = ({ mermaidCode, theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

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
    }, [mermaidCode]);

    return (
        <div className="h-full flex flex-col bg-slate-900 border-l border-slate-700/50">
            <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preview</span>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-slate-700 rounded text-slate-400">
                        <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:bg-slate-700 rounded text-slate-400">
                        <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:bg-slate-700 rounded text-slate-400 ml-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] p-8 flex items-center justify-center min-h-0">
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
