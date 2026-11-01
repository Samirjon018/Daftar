// Excel ko'p mintaqalarda (jumladan bizda) ustunlarni ";" bilan ajratadi.
// Excel hammasini bitta ustunga yozib qo'ysa, ";" ni "," ga almashtiring.
const SEPARATOR = ';';

function escapeCell(value) {
  const text = String(value ?? '');
  if (text.includes(SEPARATOR) || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function downloadCsv(filename, headers, rows) {
  const lines = [headers, ...rows].map((row) =>
    row.map(escapeCell).join(SEPARATOR)
  );

  // \uFEFF: Excel o'zbekcha harflarni (o', g', sh) to'g'ri o'qishi uchun
  const csv = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}