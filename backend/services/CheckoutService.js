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
  for (const item of cart.getItems()) {
    console.log(`${item.quantity}x ${item.product.getName()}\t${item.product.price * item.quantity}`);
  }
  console.log('----------------------');
  console.log(`Subtotal\t${subtotal}`);
  if (shipping > 0) console.log(`Shipping\t${shipping}`);
  console.log(`Amount\t${total}\n`);
} 