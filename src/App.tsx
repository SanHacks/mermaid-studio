import { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ExportPanel from './components/ExportPanel';
import ThemeSelector from './components/ThemeSelector';
import Header from './components/Header';
import ExampleGallery from './components/ExampleGallery';
import AuthModal from './components/AuthModal';
import { useDiagram } from './hooks/useDiagram';

function App() {
  const { mermaidCode, setMermaidCode, theme, setTheme } = useDiagram();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Handle resize if needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-inter">
      <Header onLoginClick={() => setIsAuthOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Workspace</h2>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">Live Sync Active</span>
              </div>
            </div>
            <ThemeSelector theme={theme} onThemeChange={setTheme} />
          </div>
          <ExportPanel
            theme={theme}
          />
        </div>

        <div className="mb-8">
          <ExampleGallery onSelect={setMermaidCode} />
        </div>

        <div className="h-[75vh] flex flex-col bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-blue-900/10">
          <SplitPane
            split="vertical"
            minSize={300}
            defaultSize="45%"
            className="flex-1"
          >
            <div className="h-full overflow-hidden">
              <Editor
                value={mermaidCode}
                onChange={setMermaidCode}
                theme={theme}
              />
            </div>
            <div className="h-full overflow-hidden">
              <Preview
                mermaidCode={mermaidCode}
                theme={theme}
              />
            </div>
          </SplitPane>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-colors group">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Write Code</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use standard Mermaid syntax to define your diagrams. Support for flowcharts, sequence diagrams, and more.
            </p>
          </div>

          <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-colors group">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Preview</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              See your changes instantly as you type. Our high-performance engine renders diagrams in milliseconds.
            </p>
          </div>

          <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-colors group">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-emerald-400 font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Export & Share</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Export your diagrams as high-resolution PNG, SVG, or vector PDF files for your documentation.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Diagram Studio Premium MVP • Crafted for visual excellence
          </p>
          <div className="mt-4 flex justify-center gap-6 text-slate-600">
            <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Examples</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          console.log('User signed in:', user);
          // Header handles user sync via storage/interval
        }}
      />
    </div>
  );
}

export default App;