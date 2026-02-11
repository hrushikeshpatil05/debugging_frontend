import { render, screen } from '@testing-library/react';
import { CartSummary } from './CartSummary';
import { describe, it, expect } from 'vitest';

describe('CartSummary', () => {
    it('calculates subtotal correctly', () => {
        const items = [
            { id: 1, name: 'Apple', price: 10, quantity: 2 }, // 20
            { id: 2, name: 'Banana', price: 5, quantity: 3 }, // 15
        ];
        // Total should be 35

        render(<CartSummary items={items} />);

        // Due to the bug, it might be "02015" or something similar because of string concatenation starting with "0"
        expect(screen.getByTestId('subtotal')).toHaveTextContent('$35');
    });
});
