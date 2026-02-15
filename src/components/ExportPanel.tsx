import React from 'react';
import { FileDown, ImageIcon, FileCode } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ExportPanelProps {
    theme: string;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ theme }) => {
    const exportAsImage = async () => {
        const preview = document.getElementById('mermaid-preview');
        if (!preview) return;

        const canvas = await html2canvas(preview, {
            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
            scale: 2,
        });

        const link = document.createElement('a');
        link.download = `diagram-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const exportAsPDF = async () => {
        const preview = document.getElementById('mermaid-preview');
        if (!preview) return;

        const canvas = await html2canvas(preview, {
            scale: 2,
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`diagram-${Date.now()}.pdf`);
    };

    const exportAsSVG = () => {
        const svg = document.querySelector('#mermaid-preview svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = `diagram-${Date.now()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex h-10 items-center gap-1 bg-slate-800/40 p-1 rounded-xl border border-slate-700/50">
                <button
                    onClick={exportAsImage}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                    title="Export as PNG"
                >
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">PNG</span>
                </button>
                <button
                    onClick={exportAsSVG}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                    title="Export as SVG"
                >
                    <FileCode className="w-4 h-4" />
                    <span className="hidden sm:inline">SVG</span>
                </button>
                <button
                    onClick={exportAsPDF}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                    title="Export as PDF"
                >
                    <FileDown className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                </button>
            </div>
        </div>
    );
};

export default ExportPanel;
