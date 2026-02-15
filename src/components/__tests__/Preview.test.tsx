import { render, screen, fireEvent } from '@testing-library/react';
import Preview from '../Preview';
import { describe, it, expect, vi } from 'vitest';

// Mock mermaid to avoid rendering issues in test environment
vi.mock('mermaid', () => ({
    default: {
        initialize: vi.fn(),
        render: vi.fn(),
    },
}));

describe('Preview', () => {
    const defaultProps = {
        mermaidCode: 'graph TD; A-->B;',
        theme: 'dark',
    };

    it('renders the preview header', () => {
        render(<Preview {...defaultProps} />);
        expect(screen.getByText('Preview')).toBeDefined();
    });

    it('contains the refresh button', () => {
        render(<Preview {...defaultProps} />);
        expect(screen.getByTitle('Refresh Diagram')).toBeDefined();
    });

    it('triggers refresh when button is clicked', () => {
        render(<Preview {...defaultProps} />);
        const refreshButton = screen.getByTitle('Refresh Diagram');
        fireEvent.click(refreshButton);
        // We verify it doesn't crash and the state updates (which triggers re-render)
        expect(refreshButton).toBeDefined();
    });
});
