import { render, screen, fireEvent, within } from '@testing-library/react';
import { ShoppingCartApp } from './ShoppingCartApp';
import { describe, it, expect } from 'vitest';

describe('ShoppingCartApp', () => {
    it('adds item to cart', () => {
        render(<ShoppingCartApp />);
        const addButton = screen.getAllByText('Add to Cart')[0]; // Add Apple
        fireEvent.click(addButton);

        const cartContainer = screen.getByTestId('cart-container');
        expect(within(cartContainer).getByText('Apple - $0.5')).toBeInTheDocument();
    });

    it('increments quantity if item exists', () => {
        render(<ShoppingCartApp />);
        const addButton = screen.getAllByText('Add to Cart')[0]; // Add Apple

        // Add Apple twice
        fireEvent.click(addButton);
        fireEvent.click(addButton);

        const cartContainer = screen.getByTestId('cart-container');
        const cartItems = within(cartContainer).getAllByText(/Apple/);
        // Should be 1 row with quantity 2
        expect(cartItems).toHaveLength(1);

        // Check quantity input
        const inputs = within(cartContainer).getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(2);
    });

    it('calculates total correctly', () => {
        render(<ShoppingCartApp />);
        const addApple = screen.getAllByText('Add to Cart')[0]; // $0.5
        const addBanana = screen.getAllByText('Add to Cart')[1]; // $0.3

        fireEvent.click(addApple);
        fireEvent.click(addApple); // 2 Apples = $1.0
        fireEvent.click(addBanana); // 1 Banana = $0.3

        // Total should be $1.30
        expect(screen.getByText('Total: $1.30')).toBeInTheDocument();
    });

    it('removes item from cart', () => {
        render(<ShoppingCartApp />);
        const addButton = screen.getAllByText('Add to Cart')[0]; // Add Apple
        fireEvent.click(addButton);

        const cartContainer = screen.getByTestId('cart-container');
        const removeButton = within(cartContainer).getByText('Remove');
        fireEvent.click(removeButton);

        // Should be empty
        expect(within(cartContainer).queryByText('Apple - $0.5')).not.toBeInTheDocument();
    });

    it('prevents negative quantity', () => {
        render(<ShoppingCartApp />);
        const addButton = screen.getAllByText('Add to Cart')[0]; // Add Apple
        fireEvent.click(addButton);

        const cartContainer = screen.getByTestId('cart-container');
        const input = within(cartContainer).getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '-1' } });

        // Should ideally not allow negative, or clamp to 0 or 1. 
        // Here we expect it to stay at 1 or become 0, but definitely not -1 if validated.
        // If the requirement is "prevents negative", we expect the value to not be -1.
        expect(input).not.toHaveValue(-1);
    });
});
