import React, { useState } from "react";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Total } from "./components/Total";
import { Product, CartItem } from "./types";

const PRODUCTS: Product[] = [
  { id: 1, name: "Apple", price: 0.5 },
  { id: 2, name: "Banana", price: 0.3 },
  { id: 3, name: "Orange", price: 0.6 },
  { id: 4, name: "Milk", price: 2.5 },
];

export const ShoppingCartApp: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const itemId = cart.find((item) => item.id === product.id)?.id;
    const newQuantity = cart.find((item) => product.id === item.id)?.quantity;
    if (newQuantity && newQuantity > 0) {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 0 }
          : item,
      ),
    );
  };

  return (
    <div className="shopping-cart-app">
      <h1>Shopping Cart Debugging</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <ProductList products={PRODUCTS} addToCart={addToCart} />
        <div>
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          <Total cart={cart} />
        </div>
      </div>
    </div>
  );
};
