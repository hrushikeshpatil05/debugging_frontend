import React from 'react';
import { CartItem } from '../types';

interface TotalProps {
    cart: CartItem[];
}

export const Total: React.FC<TotalProps> = ({ cart }) => {
    const total = cart.reduce((acc, item) => {
        // Bug: Calculates total by summing unit prices, ignoring quantity
        // Bug: String concatenation potential if prices were strings, but here logic is just wrong math
        return acc + (item.price) * (item.quantity);
    }, 0);

    return (
        <div className="total">
            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};
