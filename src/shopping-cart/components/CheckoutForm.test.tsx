import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutForm } from './CheckoutForm';
import { describe, it, expect, vi } from 'vitest';

describe('CheckoutForm', () => {
    it('validates required fields', () => {
        const handleSubmit = vi.fn();
        render(<CheckoutForm onSubmit={handleSubmit} onCancel={() => { }} />);

        fireEvent.click(screen.getByText('Place Order'));

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Address is required')).toBeInTheDocument();
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('validates email format correclty', () => {
        const handleSubmit = vi.fn();
        render(<CheckoutForm onSubmit={handleSubmit} onCancel={() => { }} />);

        const emailInput = screen.getByLabelText('Email');

        // Test valid email
        fireEvent.change(emailInput, { target: { value: 'test.user@example.com' } });
        fireEvent.click(screen.getByText('Place Order'));

        // This simple regex bug in component might fail complex emails or pass invalid ones
        // But let's check basic valid email is accepted.
        // If the regex is /^[a-zA-Z]+@[a-zA-Z]+\.[a-z]{2,3}$/, it fails on 'test.user' (dot) and 'example.com' (maybe).

        // The bug in component rejects 'test.user@example.com'.
        // So we expect this test to FAIL if we assertion that error is NOT present.
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    });

    it('submits form with valid data', () => {
        const handleSubmit = vi.fn();
        // Mock preventDefault to check if it was called (requires wrapping event or checking console/behavior, 
        // but in RTL often we just check if submit handler was called).
        // However, if preventDefault is missing, submitting a form might cause page reload/navigation which breaks tests or JSDOM behavior.
        // Let's just check if onSubmit is called with correct data.

        render(<CheckoutForm onSubmit={handleSubmit} onCancel={() => { }} />);

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });

        fireEvent.click(screen.getByText('Place Order'));

        expect(handleSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Main St'
        });
    });
});
