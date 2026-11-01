import { dateToISO, todayISO } from './format';

// Asosiy ko'rsatkichlar
export function computeStats(orders) {
  const today = todayISO();
  const active = orders.filter((o) => o.status !== 'cancelled'); // bekor qilinmaganlar
  const revenue = active.reduce((sum, o) => sum + o.amount, 0);

  return {
    todayCount: orders.filter((o) => o.date === today).length,
    revenue,
    newCount: orders.filter((o) => o.status === 'new').length,
    avgOrder: active.length ? Math.round(revenue / active.length) : 0,
  };
}

// Oxirgi N kunning sanalari (eskisidan yangisiga qarab)
function lastDays(count) {
  const days = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(dateToISO(d));
  }
  return days;
}

// Grafik uchun: har bir kun bo'yicha savdo summasi
export function revenueByDay(orders, count = 7) {
  return lastDays(count).map((date) => ({
    date,
    label: `${date.slice(8, 10)}.${date.slice(5, 7)}`, // "24.10"
    revenue: orders
      .filter((o) => o.date === date && o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.amount, 0),
  }));
}