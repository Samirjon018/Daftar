import { dateToISO } from '../utils/format';

// n kun oldingi sana
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dateToISO(d);
}

export const STATUS_LABELS = {
  new: 'Yangi',
  preparing: 'Tayyorlanmoqda',
  shipping: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi',
};

export const initialOrders = [
  { id: 1, customer: 'Ali Valiyev', phone: '+998 90 111 22 33', product: 'Sport krossovka', amount: 420000, source: 'Telegram', status: 'delivered', date: daysAgo(6) },
  { id: 2, customer: 'Dilnoza Karimova', phone: '+998 91 222 33 44', product: 'Ayollar sumkasi', amount: 285000, source: 'Instagram', status: 'delivered', date: daysAgo(5) },
  { id: 3, customer: 'Jasur Toshmatov', phone: '+998 93 333 44 55', product: 'Simsiz quloqchin', amount: 350000, source: 'Telegram', status: 'shipping', date: daysAgo(3) },
  { id: 4, customer: 'Malika Yusupova', phone: '+998 94 444 55 66', product: "Atir to'plami", amount: 510000, source: 'Instagram', status: 'preparing', date: daysAgo(2) },
  { id: 5, customer: 'Bekzod Rahimov', phone: '+998 97 555 66 77', product: 'Aqlli soat', amount: 690000, source: 'Boshqa', status: 'cancelled', date: daysAgo(2) },
  { id: 6, customer: 'Nigora Ergasheva', phone: '+998 88 666 77 88', product: 'Bolalar kiyimi', amount: 195000, source: 'Telegram', status: 'new', date: daysAgo(1) },
  { id: 7, customer: 'Sardor Aliyev', phone: '+998 99 777 88 99', product: "Telefon g'ilofi", amount: 65000, source: 'Instagram', status: 'new', date: daysAgo(0) },
  { id: 8, customer: 'Zarina Abdullayeva', phone: '+998 90 888 99 00', product: "Dasturxon to'plami", amount: 240000, source: 'Telegram', status: 'new', date: daysAgo(0) },
];