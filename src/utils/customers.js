// Buyurtmalar ro'yxatidan mijozlar ro'yxatini yig'adi (telefon raqam bo'yicha guruhlaydi)
export function buildCustomers(orders) {
  const map = new Map();

  for (const order of orders) {
    const customer = map.get(order.phone) ?? {
      phone: order.phone,
      name: order.customer,
      ordersCount: 0,
      totalSpent: 0,
      lastDate: order.date,
      sources: new Set(),
    };

    customer.ordersCount += 1;

    // Bekor qilingan buyurtma summasi jami xaridga qo'shilmaydi
    if (order.status !== 'cancelled') {
      customer.totalSpent += order.amount;
    }

    // Eng oxirgi buyurtmadagi ism va sanani saqlaymiz
    if (order.date >= customer.lastDate) {
      customer.lastDate = order.date;
      customer.name = order.customer;
    }

    customer.sources.add(order.source);
    map.set(order.phone, customer);
  }

  return [...map.values()]
    .map((c) => ({ ...c, sources: [...c.sources] }))
    .sort((a, b) => b.totalSpent - a.totalSpent); // eng ko'p xarid qilgan birinchi
}