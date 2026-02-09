import React from 'react';
import { CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';

interface CartProps {
    cart: CartItemType[];
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
}

export const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart }) => {
    return (
        <div className="cart" data-testid="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                ))
            )}
        </div>
    );
};
