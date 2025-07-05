export function ship(items) {
  console.log('** Shipment notice **');
  let totalWeight = 0;
  for (const item of items) {
    const name = item.product ? item.product.getName() : item.getName();
    const weight = item.product ? item.product.getWeight() * item.quantity : item.getWeight();
    totalWeight += weight;
    console.log(`${item.quantity || 1}x ${name}\t${weight}g`);
  }
  console.log(`Total package weight ${(totalWeight / 1000).toFixed(1)}kg\n`);
} 