/**
 * Formatting and Conversion Utilities
 * Matching exact logic from BMT UGT Nusantara Form script
 */

export function formatRupiahAngka(angka: number | string | null | undefined): string {
  if (angka === null || angka === undefined || angka === '') return '';
  const num = Math.round(Number(angka));
  if (!isFinite(num)) return '';
  return new Intl.NumberFormat('id-ID').format(num);
}

export function ambilAngka(nilai: number | string | null | undefined): number {
  if (nilai === null || nilai === undefined || nilai === '') return 0;
  let s = String(nilai).trim();
  if (!s) return 0;

  // Format Indonesia: 1.500.000
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, '');
  } else {
    s = s.replace(/[^\d,-]/g, '').replace(',', '.');
  }

  const n = parseFloat(s);
  return isFinite(n) ? Math.round(n) : 0;
}

export function formatInputNominal(raw: string): string {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  return new Intl.NumberFormat('id-ID').format(parseInt(digits, 10));
}

/**
 * Format nomor rekening BMT UGT Nusantara: 000.00.000000.00
 * Segment 1 (3 digit): Kode Kantor/Cabang
 * Segment 2 (2 digit): Kode Produk/Jenis
 * Segment 3 (6 digit): Nomor Rekening CIF
 * Segment 4 (2 digit): Sub Urut / Tipe
 */
export function formatNoRekening(value: string | null | undefined): string {
  if (!value) return '';
  const digits = String(value).replace(/\D/g, '').slice(0, 13);
  if (!digits) return '';

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 5);
  const p3 = digits.slice(5, 11);
  const p4 = digits.slice(11, 13);

  let result = p1;
  if (p2) result += '.' + p2;
  if (p3) result += '.' + p3;
  if (p4) result += '.' + p4;

  return result;
}

export function formatNoHp(value: string | null | undefined): string {
  if (!value) return '';
  let s = String(value).trim().replace(/^['=]+/, '');
  if (s.indexOf('8') === 0 && s.length >= 9) {
    s = '0' + s;
  }
  return s;
}

export function quoteText(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  let s = String(value).trim().replace(/^['=]+/, '');
  if (s.indexOf('8') === 0 && s.length >= 9 && !s.startsWith('0')) {
    s = '0' + s;
  }
  return "'" + s;
}

export function TERBILANG(angkaInput: number | string): string {
  const angka = Number(angkaInput);
  if (isNaN(angka) || angka === 0) return '';

  const bilangan = [
    '', 'satu', 'dua', 'tiga', 'empat', 'lima',
    'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
  ];

  function konversi(n: number): string {
    if (n === 0) return '';
    if (n < 12) return bilangan[n];
    if (n < 20) return konversi(n - 10) + ' belas';
    if (n < 100) return konversi(Math.floor(n / 10)) + ' puluh ' + konversi(n % 10);
    if (n < 200) return 'seratus ' + konversi(n - 100);
    if (n < 1000) return konversi(Math.floor(n / 100)) + ' ratus ' + konversi(n % 100);
    if (n < 2000) return 'seribu ' + konversi(n - 1000);
    if (n < 1000000) return konversi(Math.floor(n / 1000)) + ' ribu ' + konversi(n % 1000);
    if (n < 1000000000) return konversi(Math.floor(n / 1000000)) + ' juta ' + konversi(n % 1000000);
    if (n < 1000000000000) return konversi(Math.floor(n / 1000000000)) + ' milyar ' + konversi(n % 1000000000);
    if (n < 1000000000000000) return konversi(Math.floor(n / 1000000000000)) + ' triliun ' + konversi(n % 1000000000000);
    return '';
  }

  const hasil = konversi(Math.floor(angka))
    .replace(/\s+/g, ' ')
    .trim();

  if (!hasil) return '';

  const capital = hasil.replace(/\b\w/g, (char) => char.toUpperCase());
  return capital + ' Rupiah';
}
