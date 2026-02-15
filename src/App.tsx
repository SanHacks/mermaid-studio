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
  const { mermaidCode, setMermaidCode, theme, setTheme, appMode, setAppMode } = useDiagram();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Handle resize if needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500/30 font-inter transition-colors duration-300`}>
      <Header
        onLoginClick={() => setIsAuthOpen(true)}
        appMode={appMode}
        onAppModeChange={setAppMode}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold tracking-tight">Workspace</h2>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Sync Active</span>
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

        <div className="h-[75vh] flex flex-col bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-2xl shadow-blue-900/10">
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
          <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-blue-500 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="text-blue-500 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Write Code</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Use standard Mermaid syntax to define your diagrams. Support for flowcharts, sequence diagrams, and more.
            </p>
          </div>

          <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-slate-400 dark:hover:border-slate-500 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="text-slate-600 dark:text-slate-400 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Real-time Preview</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              See your changes instantly as you type. Our high-performance engine renders diagrams in milliseconds.
            </p>
          </div>

          <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-emerald-500 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="text-emerald-500 font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Export & Share</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Export your diagrams as high-resolution PNG, SVG, or vector PDF files for your documentation.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--text-secondary)] text-sm">
            Diagram Studio Premium MVP • Crafted for visual excellence
          </p>
          <div className="mt-4 flex justify-center gap-6 text-[var(--text-secondary)] opacity-70">
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