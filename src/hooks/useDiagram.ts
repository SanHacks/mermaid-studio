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

  const { saveToStorage, loadFromStorage } = useSQLite();

  // Persist current diagram
  useEffect(() => {
    localStorage.setItem('diagram-studio-current', mermaidCode);
  }, [mermaidCode]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('diagram-studio-theme', theme);
  }, [theme]);

  // Persist app mode
  useEffect(() => {
    localStorage.setItem('diagram-studio-app-mode', appMode);
    if (appMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appMode]);

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

  return {
    mermaidCode,
    setMermaidCode,
    theme,
    setTheme,
    appMode,
    setAppMode,
    saveToHistory,
    loadFromHistory,
    getHistoryList,
  };
}