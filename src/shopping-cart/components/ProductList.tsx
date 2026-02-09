import React from 'react';
import { Product } from '../types';

interface ProductListProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
