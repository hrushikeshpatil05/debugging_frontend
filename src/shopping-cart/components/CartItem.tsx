import React from 'react';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <div className="cart-item">
            <span>{item.name} - ${item.price}</span>
            <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
};
