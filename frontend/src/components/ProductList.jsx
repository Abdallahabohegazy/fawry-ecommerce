import React, { useState } from 'react';

export default function ProductList({ products, onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const handleChange = (name, value) => {
    setQuantities({ ...quantities, [name]: value });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.name}>
            {product.name} - ${product.price} ({product.quantity} in stock)
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={quantities[product.name] || ''}
              onChange={e => handleChange(product.name, e.target.value)}
              style={{ width: 50, marginLeft: 8 }}
            />
            <button
              onClick={() => onAddToCart(product, Number(quantities[product.name] || 1))}
              disabled={product.quantity < 1}
              style={{ marginLeft: 8 }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 