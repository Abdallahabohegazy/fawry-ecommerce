import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

const initialProducts = [
  {
    name: 'Cheese',
    price: 200,
    quantity: 10,
    isExpirable: true,
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isShippable: true,
    weight: 200,
  },
  {
    name: 'Biscuits',
    price: 150,
    quantity: 5,
    isExpirable: false,
    isShippable: true,
    weight: 700,
  },
  {
    name: 'ScratchCard',
    price: 50,
    quantity: 100,
    isExpirable: false,
    isShippable: false,
    weight: 0,
  },
];

const initialBalance = 500;

function isExpired(product) {
  if (!product.isExpirable || !product.expiryDate) return false;
  return new Date() > new Date(product.expiryDate);
}

function getShipping(cartItems) {
  return cartItems.some(item => item.product.isShippable) ? 30 : 0;
}

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [balance, setBalance] = useState(initialBalance);
  const [error, setError] = useState('');

  const handleAddToCart = (product, quantity) => {
    setError('');
    if (quantity < 1 || isNaN(quantity)) return;
    if (isExpired(product)) {
      setError(`Product ${product.name} is expired.`);
      return;
    }
    if (product.quantity < quantity) {
      setError(`Not enough stock for ${product.name}.`);
      return;
    }
    const existing = cartItems.find(item => item.product.name === product.name);
    if (existing) {
      if (product.quantity < existing.quantity + quantity) {
        setError(`Not enough stock for ${product.name}.`);
        return;
      }
      setCartItems(
        cartItems.map(item =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
    setProducts(
      products.map(p =>
        p.name === product.name ? { ...p, quantity: p.quantity - quantity } : p
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = getShipping(cartItems);
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setError('');
    if (cartItems.length === 0) {
      setError('Cart is empty.');
      return;
    }
    for (const item of cartItems) {
      if (isExpired(item.product)) {
        setError(`Product ${item.product.name} is expired.`);
        return;
      }
      if (item.product.quantity < item.quantity) {
        setError(`Product ${item.product.name} is out of stock.`);
        return;
      }
    }
    if (balance < total) {
      setError('Insufficient balance.');
      return;
    }
    // Print shipment notice
    if (shipping > 0) {
      let totalWeight = 0;
      console.log('** Shipment notice **');
      cartItems.forEach(item => {
        if (item.product.isShippable) {
          const weight = item.product.weight * item.quantity;
          totalWeight += weight;
          console.log(`${item.quantity}x ${item.product.name}\t${weight}g`);
        }
      });
      console.log(`Total package weight ${(totalWeight / 1000).toFixed(1)}kg`);
    }
    // Print receipt
    console.log('** Checkout receipt **');
    cartItems.forEach(item => {
      console.log(`${item.quantity}x ${item.product.name}\t${item.product.price * item.quantity}`);
    });
    console.log('----------------------');
    console.log(`Subtotal\t${subtotal}`);
    if (shipping > 0) console.log(`Shipping\t${shipping}`);
    console.log(`Amount\t${total}`);
    setBalance(balance - total);
    setCartItems([]);
  };

  return (
    <div className="app-container">
      <h1>Modern E-Commerce</h1>
      <div className="balance-bar">
        <div className="balance-box">Total Balance: <span style={{color:'#2193b0', fontWeight:800}}>${initialBalance}</span></div>
        <div className="balance-box">Remaining: <span style={{color:'#2d3a8c', fontWeight:800}}>${balance}</span></div>
      </div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart cartItems={cartItems} subtotal={subtotal} />
      <Checkout
        cartItems={cartItems}
        subtotal={subtotal}
        balance={balance}
        onCheckout={handleCheckout}
        error={error}
        shipping={shipping}
      />
    </div>
  );
} 