export class Product {
  constructor({ name, price, quantity, isExpirable = false, expiryDate = null, isShippable = false, weight = 0 }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.isExpirable = isExpirable;
    this.expiryDate = expiryDate ? new Date(expiryDate) : null;
    this.isShippable = isShippable;
    this.weight = weight;
  }

  isExpired() {
    if (!this.isExpirable || !this.expiryDate) return false;
    return new Date() > this.expiryDate;
  }

  getName() {
    return this.name;
  }

  getWeight() {
    return this.weight;
  }
} 