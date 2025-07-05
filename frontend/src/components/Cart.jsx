import React from 'react';

export default function Cart({ cartItems, subtotal }) {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.product.name}>
              {item.quantity}x {item.product.name} - ${item.product.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <div>Subtotal: ${subtotal}</div>
    </div>
  );
} 