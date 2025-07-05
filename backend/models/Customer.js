export class Customer {
  constructor({ name, balance }) {
    this.name = name;
    this.balance = balance;
  }

  deductAmount(amount) {
    if (this.balance < amount) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
  }
} 