import React from 'react';

export default function Checkout({ cartItems, subtotal, balance, onCheckout, error, shipping }) {
  return (
    <div>
      <h2>Checkout</h2>
      <div>Balance: ${balance}</div>
      <div>Subtotal: ${subtotal}</div>
      {shipping > 0 && <div>Shipping: ${shipping}</div>}
      <div>Total: ${subtotal + shipping}</div>
      <button onClick={onCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
} 