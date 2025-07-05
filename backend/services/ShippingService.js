export function ship(items) {
  console.log('** Shipment notice **');
  let totalWeight = 0;
  for (const item of items) {
    const product = item.product || item;
    if (!product.isShippable) continue; // تجاهل المنتجات غير القابلة للشحن
    const name = product.getName();
    const weight = product.getWeight() * (item.quantity || 1);
    totalWeight += weight;
    console.log(`${item.quantity || 1}x ${name}\t${weight}g`);
  }
  console.log(`Total package weight ${(totalWeight / 1000).toFixed(1)}kg\n`);
} 
