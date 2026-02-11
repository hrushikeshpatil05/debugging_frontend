import React from 'react';
import { CartItem } from '../types';

interface CartSummaryProps {
    items: CartItem[];
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {

    const total = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    const tax = total * 0.1;

    return (
        <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
                <span>Subtotal:</span>
                <span data-testid="subtotal">${total}</span>
            </div>
            <div className="summary-item">
                <span>Tax (10%):</span>
                <span>${isNaN(tax) ? '0.00' : tax.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
                <strong>Total:</strong>
                <strong>${isNaN(Number(total) + tax) ? '0.00' : (Number(total) + tax).toFixed(2)}</strong>
            </div>
        </div>
    );
};
