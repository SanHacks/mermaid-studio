import { renderHook, act } from '@testing-library/react-hooks';
import { useDiagram } from '../useDiagram';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useDiagram', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useDiagram());
        expect(result.current.theme).toBe('dark');
        expect(result.current.appMode).toBe('dark');
    });

    it('should update and persist appMode', () => {
        const { result } = renderHook(() => useDiagram());

        act(() => {
            result.current.setAppMode('light');
        });

        expect(result.current.appMode).toBe('light');
        expect(localStorage.getItem('diagram-studio-app-mode')).toBe('light');
    });

    it('should apply dark class to document element when appMode is dark', () => {
        const { result } = renderHook(() => useDiagram());

        act(() => {
            result.current.setAppMode('dark');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
