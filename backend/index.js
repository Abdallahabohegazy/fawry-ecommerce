import { Product } from './models/Product.js';
import { Customer } from './models/Customer.js';
import { Cart } from './models/Cart.js';
import { checkout } from './services/CheckoutService.js';

// Create products
const cheese = new Product({
  name: 'Cheese',
  price: 200,
  quantity: 10,
  isExpirable: true,
  expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires tomorrow
  isShippable: true,
  weight: 200
});

const biscuits = new Product({
  name: 'Biscuits',
  price: 150,
  quantity: 5,
  isExpirable: false,
  isShippable: true,
  weight: 700
});

const scratchCard = new Product({
  name: 'ScratchCard',
  price: 50,
  quantity: 100,
  isExpirable: false,
  isShippable: false,
  weight: 0
});

// Create customer
const customer = new Customer({ name: 'Alice', balance: 500 });

// Create cart and add items
const cart = new Cart();
cart.addItem(cheese, 2);
cart.addItem(biscuits, 1);
cart.addItem(scratchCard, 3);

// Checkout
try {
  checkout(cart, customer);
} catch (err) {
  console.error('Checkout failed:', err.message);
} 