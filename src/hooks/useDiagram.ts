import { useState, useCallback, useEffect } from 'react';

// Browser SQLite wrapper using IndexedDB/localStorage
export function useSQLite() {
  const STORAGE_KEY = 'diagram-studio-history';

  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-${key}`, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save to SQLite wrapper:', error);
    }
  };

  const loadFromStorage = (key: string) => {
    try {
      const item = localStorage.getItem(`${STORAGE_KEY}-${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('Failed to load from SQLite wrapper:', error);
      return null;
    }
  };

  const clearStorage = (key: string) => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}-${key}`);
    } catch (error) {
      console.warn('Failed to clear from SQLite wrapper:', error);
    }
  };

  return { saveToStorage, loadFromStorage, clearStorage };
}

export function useDiagram() {
  const [mermaidCode, setMermaidCode] = useState(
    localStorage.getItem('diagram-studio-current') ||
    `graph TD\n    A[Start] --> B{Is it working?}\n    B -->|Yes| C[Great!]\n    B -->|No| D[Debug]\n    C --> E[Finish]\n    D --> E`
  );

  const [theme, setTheme] = useState(
    localStorage.getItem('diagram-studio-theme') || 'dark'
  );

  const [appMode, setAppMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('diagram-studio-app-mode') as 'light' | 'dark') || 'dark'
  );

  const [aiProvider, setAiProvider] = useState<'ollama' | 'gemini'>(
    (localStorage.getItem('diagram-studio-ai-provider') as 'ollama' | 'gemini') || 'ollama'
  );

  const [geminiApiKey, setGeminiApiKey] = useState(
    localStorage.getItem('diagram-studio-gemini-key') || ''
  );

  const [geminiModel, setGeminiModel] = useState(
    localStorage.getItem('diagram-studio-gemini-model') || 'gemini-1.5-flash'
  );

  const [ollamaUrl, setOllamaUrl] = useState(
    localStorage.getItem('diagram-studio-ollama-url') || 'http://localhost:11434'
  );

  const [ollamaModel, setOllamaModel] = useState(
    localStorage.getItem('diagram-studio-ollama-model') || 'minimax-m2.7:cloud'
  );

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem('diagram-studio-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { saveToStorage, loadFromStorage } = useSQLite();

  // Listen for storage changes
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem('diagram-studio-user');
      setUser(storedUser ? JSON.parse(storedUser) : null);

      const storedKey = localStorage.getItem('diagram-studio-gemini-key');
      setGeminiApiKey(storedKey || '');

      const storedModel = localStorage.getItem('diagram-studio-gemini-model');
      if (storedModel) setGeminiModel(storedModel);

      const storedProvider = localStorage.getItem('diagram-studio-ai-provider') as 'ollama' | 'gemini';
      if (storedProvider) setAiProvider(storedProvider);

      const storedOllamaUrl = localStorage.getItem('diagram-studio-ollama-url');
      if (storedOllamaUrl) setOllamaUrl(storedOllamaUrl);

      const storedOllamaModel = localStorage.getItem('diagram-studio-ollama-model');
      if (storedOllamaModel) setOllamaModel(storedOllamaModel);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Persist current diagram
  useEffect(() => {
    localStorage.setItem('diagram-studio-current', mermaidCode);
  }, [mermaidCode]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('diagram-studio-theme', theme);
  }, [theme]);

  // Persist API key
  useEffect(() => {
    localStorage.setItem('diagram-studio-gemini-key', geminiApiKey);
  }, [geminiApiKey]);

  // Persist Model
  useEffect(() => {
    localStorage.setItem('diagram-studio-gemini-model', geminiModel);
  }, [geminiModel]);

  // Persist AI provider
  useEffect(() => {
    localStorage.setItem('diagram-studio-ai-provider', aiProvider);
  }, [aiProvider]);

  // Persist Ollama URL
  useEffect(() => {
    localStorage.setItem('diagram-studio-ollama-url', ollamaUrl);
  }, [ollamaUrl]);

  // Persist Ollama Model
  useEffect(() => {
    localStorage.setItem('diagram-studio-ollama-model', ollamaModel);
  }, [ollamaModel]);

  // Link Mermaid theme with App Mode
  useEffect(() => {
    if (appMode === 'dark' && theme !== 'dark') {
      setTheme('dark');
    } else if (appMode === 'light' && theme === 'dark') {
      setTheme('default');
    }
  }, [appMode, theme]);

  // Persist app mode
  useEffect(() => {
    localStorage.setItem('diagram-studio-app-mode', appMode);
    if (appMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appMode]);

  // AI Generation
  const generateAI = useCallback(async (prompt: string) => {
    if (aiProvider === 'ollama') {
      if (!ollamaUrl) throw new Error('Ollama URL is required');

      try {
        const response = await fetch(`${ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaModel,
            prompt: `Generate only valid Mermaid diagram code for the following request. Do not include markdown formatting or explanations. Just the mermaid code. Request: ${prompt}`,
            stream: false
          })
        });

        if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);

        const data = await response.json();
        if (!data.response) throw new Error('AI returned an empty response');

        let code = data.response.trim();
        code = code.replace(/^```mermaid\n?/, '').replace(/\n?```$/, '');

        setMermaidCode(code);
        return code;
      } catch (error: any) {
        console.error('AI Generation failed:', error);
        throw error;
      }
    } else {
      if (!geminiApiKey) throw new Error('Gemini API key is required');

      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });

        const contents = [
          {
            role: 'user',
            parts: [{ text: `Generate only valid Mermaid diagram code for the following request. Do not include markdown formatting or explanations. Just the mermaid code. Request: ${prompt}` }]
          }
        ];

        const config: any = {
          tools: [{ googleSearch: {} }]
        };

        if (geminiModel.includes('preview')) {
          config.thinkingConfig = { thinkingBudget: -1 };
        }

        const result = await ai.models.generateContent({
          model: geminiModel,
          contents,
          config
        });

        if (!result.text) throw new Error('AI returned an empty response');
        let code = result.text.trim();
        code = code.replace(/^```mermaid\n?/, '').replace(/\n?```$/, '');

        setMermaidCode(code);
        return code;
      } catch (error: any) {
        console.error('AI Generation failed:', error);
        throw error;
      }
    }
  }, [aiProvider, geminiApiKey, geminiModel, ollamaUrl, ollamaModel]);

  // Save diagram to history
  const saveToHistory = useCallback((name: string, code: string, theme: string) => {
    const timestamp = Date.now();
    const entry = {
      id: timestamp,
      name,
      code,
      theme,
      createdAt: new Date().toISOString(),
    };

    saveToStorage(`history-${timestamp}`, entry);

    // Update recent list
    const recentKey = 'diagram-studio-history-recent';
    const recentRaw = localStorage.getItem(recentKey);
    const recent: any[] = recentRaw ? JSON.parse(recentRaw) : [];
    recent.unshift({ id: timestamp, name, createdAt: entry.createdAt });

    // Keep only last 20
    const trimmed = recent.slice(0, 20);
    localStorage.setItem(recentKey, JSON.stringify(trimmed));
  }, [saveToStorage]);

  // Load from history
  const loadFromHistory = useCallback((id: number) => {
    const entry = loadFromStorage(`history-${id}`);
    if (entry) {
      setMermaidCode(entry.code);
      setTheme(entry.theme);
      return entry;
    }
    return null;
  }, [loadFromStorage]);

  // Get history list
  const getHistoryList = useCallback(() => {
    const recentRaw = localStorage.getItem('diagram-studio-history-recent');
    if (!recentRaw) return [];

    try {
      const recent: Array<{ id: number, name: string, createdAt: string }> = JSON.parse(recentRaw);
      return recent;
    } catch {
      return [];
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('diagram-studio-user');
    setUser(null);
  }, []);

  return {
    mermaidCode,
    setMermaidCode,
    theme,
    setTheme,
    appMode,
    setAppMode,
    aiProvider,
    setAiProvider,
    geminiApiKey,
    setGeminiApiKey,
    geminiModel,
    setGeminiModel,
    ollamaUrl,
    setOllamaUrl,
    ollamaModel,
    setOllamaModel,
    generateAI,
    user,
    logout,
    saveToHistory,
    loadFromHistory,
    getHistoryList,
  };
}