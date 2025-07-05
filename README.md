# Fawry E-Commerce

A full-stack e-commerce system for the Fawry Quantum Internship Challenge.

## Project Structure

```
fawry-ecommerce/
  backend/
    models/
    services/
    index.js
  frontend/
    src/
      components/
      App.jsx
      main.jsx
```

## Backend (Node.js, ES Modules)
- Plain Node.js (no frameworks)
- In-memory data (no database)
- OOP models for Product, Customer, Cart, etc.
- Console prints shipment and receipt

### Run Backend
```sh
cd fawry-ecommerce/backend
npm install # (if needed)
npm start
```

## Frontend (React, Vite)
- In-memory product/cart logic
- No backend/API required
- Console prints shipment and receipt

### Run Frontend
```sh
cd fawry-ecommerce/frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features
- Add products to cart
- Validate stock, expiry, and balance
- Checkout prints summary and shipment to console

---

**Note:** All data is in-memory and resets on reload. 