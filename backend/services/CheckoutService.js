import { ship } from './ShippingService.js';

export function checkout(cart, customer) {
  cart.validate();
  const subtotal = cart.getSubtotal();
  const shippingItems = cart.getShippableItems();
  const shipping = shippingItems.length > 0 ? 30 : 0;
  const total = subtotal + shipping;
  customer.deductAmount(total);

  if (shippingItems.length > 0) {
    ship(shippingItems);
  }

  console.log('** Checkout receipt **');
  console.log('Qty\tProduct\t\tPrice\tWeight(g)\tExpired');
  for (const item of cart.getItems()) {
    const name = item.product.getName();
    const price = item.product.price * item.quantity;
    const weight = item.product.getWeight() * item.quantity;
    const expired = item.product.isExpired() ? 'Yes' : 'No';
    console.log(`${item.quantity}\t${name}\t\t${price}\t${weight}\t${expired}`);
  }
  console.log('----------------------');
  console.log(`Subtotal\t${subtotal}`);
  if (shipping > 0) console.log(`Shipping\t${shipping}`);
  console.log(`Amount\t${total}\n`);
} 