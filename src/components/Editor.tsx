import React from 'react';
import Editor from '@monaco-editor/react';

interface MermaidEditorProps {
    value: string;
    onChange: (value: string) => void;
    theme: string;
}

const MermaidEditor: React.FC<MermaidEditorProps> = ({ value, onChange, theme }) => {
    return (
        <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Editor</span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage="markdown"
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={value}
                    onChange={(val) => onChange(val || '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'Fira Code', monospace",
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                        wordWrap: 'on',
                    }}
                />
            </div>
        </div>
    );
};

export default MermaidEditor;
