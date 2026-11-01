// 420000 -> "420 000 so'm"
export function formatPrice(n) {
  return n.toLocaleString('ru-RU') + " so'm";
}

// "2026-10-24" -> "24.10.2026"
export function formatDate(iso) {
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}
// "90 123 45 67" yoki "+998901234567" -> "+998 90 123 45 67"
// Noto'g'ri bo'lsa null qaytaradi
export function normalizePhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 9) digits = '998' + digits;
  if (digits.length !== 12 || !digits.startsWith('998')) return null;

  return `+998 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}

// Date obyektini "2026-10-24" ko'rinishiga o'giradi (mahalliy vaqt bo'yicha)
export function dateToISO(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

// Bugungi sana
export function todayISO() {
  return dateToISO(new Date());
}
// "Ali Valiyev" -> "AV"
export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}