export class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    if (product.quantity < quantity) {
      throw new Error('Not enough stock');
    }
    const existing = this.items.find(item => item.product.name === product.name);
    if (existing) {
      if (product.quantity < existing.quantity + quantity) {
        throw new Error('Not enough stock');
      }
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  getItems() {
    return this.items;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getShippableItems() {
    return this.items.filter(item => item.product.isShippable);
  }

  validate() {
    if (this.items.length === 0) {
      throw new Error('Cart is empty');
    }
    for (const item of this.items) {
      if (item.product.isExpired()) {
        throw new Error(`Product ${item.product.name} is expired`);
      }
      if (item.product.quantity < item.quantity) {
        throw new Error(`Product ${item.product.name} is out of stock`);
      }
    }
  }
} 