import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { describe, it, expect, vi } from 'vitest';

describe('Header', () => {
    const defaultProps = {
        onLoginClick: vi.fn(),
        appMode: 'dark' as const,
        onAppModeChange: vi.fn(),
        user: null,
        onLogout: vi.fn(),
        onSettingsClick: vi.fn(),
    };

    it('renders the title', () => {
        render(<Header {...defaultProps} />);
        expect(screen.getByText('Diagram Studio')).toBeDefined();
    });

    it('calls onAppModeChange when theme toggle is clicked', () => {
        render(<Header {...defaultProps} />);
        const toggleButton = screen.getByTitle('Switch to light mode');
        fireEvent.click(toggleButton);
        expect(defaultProps.onAppModeChange).toHaveBeenCalledWith('light');
    });

    it('shows the correct icon for light mode', () => {
        render(<Header {...defaultProps} appMode="light" />);
        expect(screen.getByTitle('Switch to dark mode')).toBeDefined();
    });

    it('shows user name when logged in', () => {
        const user = { name: 'Alice', email: 'alice@example.com' };
        render(<Header {...defaultProps} user={user} />);
        expect(screen.getByText('Alice')).toBeDefined();
        expect(screen.getByText('Premium Plan')).toBeDefined();
    });
});
