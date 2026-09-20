import { PembiayaanData, GoogleSheetsConfig } from '../types';
import { ambilAngka, formatNoHp } from '../utils/formatters';

const DEFAULT_CONFIG_KEY = 'bmt_sheets_config';
const LOCAL_STORAGE_DATA_KEY = 'bmt_pembiayaan_records';

export const SHEET_NAMES = {
  lengkap: 'DATA_LENGKAP',
  debitur: 'DATA_DEBITUR',
  penjamin: 'DATA_PENJAMIN',
  realisasi: 'DATA_REALISASI',
  agunan: 'DATA_AGUNAN',
  kapasitas: 'KAPASITAS_USAHA',
  analisa: 'ANALISA_USAHA',
};

// Default headers matching the user's Apps Script specification
export const HEADERS_DEBITUR = [
  'NO_REGISTER', 'TIMESTAMP', 'NAMA', 'BIN_BINTI', 'NOMOR_KTP', 'JENIS_KELAMIN',
  'TEMPAT_LAHIR', 'TANGGAL_LAHIR', 'ALAMAT_KTP_DUSUN', 'RT_KTP', 'RW_KTP',
  'DESA_KTP', 'KECAMATAN_KTP', 'KABUPATEN_KTP', 'PROPINSI_KTP', 'KODE_POS',
  'ALAMAT_DOMISILI_DUSUN', 'RT_DOMISILI', 'RW_DOMISILI', 'DESA_DOMISILI',
  'KECAMATAN_DOMISILI', 'KABUPATEN_DOMISILI', 'PROPINSI_DOMISILI', 'STATUS_PERKAWINAN',
  'LAMA_PERKAWINAN', 'NAMA_ORGANISASI', 'JABATAN_ORGANISASI', 'PEKERJAAN',
  'JABATAN_PERUSAHAAN', 'STATUS_TEMPAT_TINGGAL', 'PENDIDIKAN', 'TAHUN_LULUS',
  'HP_PRIBADI', 'JML_PASANGAN', 'JML_ANAK', 'JML_ORANG_TUA', 'JML_LAINNYA',
  'PENDAPATAN_RATA2', 'SUMBER_PENDAPATAN', 'LAMA_PEKERJAAN', 'JUMLAH_PENGAJUAN',
  'KEPERLUAN_PINJAMAN', 'PINJAMAN_PIHAK_LAIN'
];

export const HEADERS_PENJAMIN = [
  'NO_REGISTER', 'NAMA_DEBITUR', 'NAMA_PENJAMIN', 'KTP_PENJAMIN',
  'TEMPAT_LAHIR_PENJAMIN', 'TGL_LAHIR_PENJAMIN', 'ALAMAT_PENJAMIN',
  'HUBUNGAN_PENJAMIN', 'PEKERJAAN_PENJAMIN', 'HP_PENJAMIN'
];

export const HEADERS_REALISASI = [
  'NO_REGISTER', 'NAMA_DEBITUR', 'REK_TABUNGAN', 'REK_PEMBIAYAAN',
  'TGL_PERMOHONAN', 'TGL_SURVEY', 'TGL_REALISASI', 'TGL_JATUH_TEMPO',
  'JUMLAH_REALISASI', 'JANGKA_WAKTU', 'MARGIN_PERSEN', 'MARGIN_NOMINAL',
  'TOTAL_MARGIN', 'HARGA_JUAL', 'ANGSURAN_PERBULAN', 'AKAD_PEMBIAYAAN',
  'SKEMA_ANGSURAN', 'KEPALA_CABANG', 'WAKIL_PENGURUS', 'WAKIL_KOMITE',
  'KEPALA_CAPEM', 'PETUGAS_AOA', 'PETUGAS_AOP', 'PETUGAS_AOSP'
];

export const HEADERS_AGUNAN = [
  'NO_REGISTER', 'NAMA_DEBITUR', 'AGUNAN_BERUPA', 'STATUS_KEPEMILIKAN',
  'PENGIKATAN', 'DASAR_NILAI', 'NO_AGUNAN', 'AN_AGUNAN', 'HARGA_PASAR',
  'NOMINAL_AGUNAN', 'MEREK', 'WARNA', 'TAHUN', 'NO_POLISI', 'NO_RANGKA',
  'NO_MESIN', 'ALAMAT_BPKB', 'LUAS_SHM', 'LOKASI', 'BATAS_UTARA',
  'BATAS_BARAT', 'BATAS_TIMUR', 'BATAS_SELATAN', 'KONDISI', 'NJOP',
  'JENIS_ELEKTRONIK', 'FAKTUR', 'NAMA_PEMILIK_LAIN', 'KTP_PEMILIK_LAIN',
  'TEMPAT_LAHIR_PEMILIK_LAIN', 'TGL_LAHIR_PEMILIK_LAIN', 'ALAMAT_PEMILIK_LAIN',
  'PEKERJAAN_PEMILIK_LAIN', 'HUBUNGAN_PEMILIK_LAIN', 'HP_PEMILIK_LAIN'
];

export const HEADERS_KAPASITAS = [
  'NO_REGISTER', 'NAMA_DEBITUR', 'NO_ITEM', 'JENIS_BARANG',
  'HARGA_POKOK', 'HARGA_JUAL', 'VOL_HARI', 'VOL_PEKAN', 'VOL_BULAN', 'LABA'
];

export const HEADERS_ANALISA = [
  'NO_REGISTER', 'NAMA_DEBITUR', 'JENIS_USAHA', 'PENDAPATAN_KOTOR', 'PENDAPATAN_LAIN',
  'BIAYA_TRANSPORTASI', 'BIAYA_KONSUMSI', 'BIAYA_UPAH', 'BIAYA_PULSA', 'BIAYA_SEWA_ALAT',
  'BIAYA_LISTRIK_PDAM', 'BIAYA_HUTANG_USAHA', 'BIAYA_PAJAK', 'BIAYA_LAIN_LAIN',
  'TOTAL_BIAYA_USAHA', 'LABA_USAHA', 'UANG_SAKU_ANAK', 'SPP_PENDIDIKAN',
  'BEBAN_KEBUTUHAN_MAKAN', 'BEBAN_TAGIHAN_LISTRIK_RT', 'BEBAN_TAGIHAN_PDAM_RT',
  'BEBAN_TELEPON_PULSA_RT', 'BEBAN_TRANSPORTASI_RT', 'BEBAN_KESEHATAN_RT',
  'BEBAN_SEWA_RUMAH_RT', 'BEBAN_HUTANG_ARISAN_RT', 'BEBAN_PEMBANTU_LAIN_RT',
  'TOTAL_BEBAN_RT', 'SISA_HASIL_USAHA_SHU'
];

export function getStoredConfig(): GoogleSheetsConfig | null {
  try {
    const raw = localStorage.getItem(DEFAULT_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredConfig(config: GoogleSheetsConfig) {
  localStorage.setItem(DEFAULT_CONFIG_KEY, JSON.stringify(config));
}

// Local Storage Mirror helper
export function getLocalRecords(): PembiayaanData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalRecord(data: PembiayaanData) {
  const records = getLocalRecords();
  const index = records.findIndex((r) => String(r.noRegister).trim().toLowerCase() === String(data.noRegister).trim().toLowerCase());
  if (index >= 0) {
    records[index] = data;
  } else {
    records.unshift(data);
  }
  localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(records));
}

export function deleteLocalRecord(noReg: string): boolean {
  const records = getLocalRecords();
  const target = String(noReg).trim().toLowerCase();
  const filtered = records.filter((r) => String(r.noRegister).trim().toLowerCase() !== target);
  if (filtered.length !== records.length) {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
}

export function findLocalRecord(keyword: string): PembiayaanData | null {
  const records = getLocalRecords();
  const q = String(keyword).trim().toLowerCase();
  if (!q) return null;
  return (
    records.find((r) => {
      const reg = String(r.noRegister || '').toLowerCase();
      const nama = String(r.nama || '').toLowerCase();
      const ktp = String(r.nomorKtp || '').toLowerCase();
      return reg === q || reg.includes(q) || nama.includes(q) || ktp === q;
    }) || null
  );
}

// Generate Next Registration Number
export async function getNextRegisterNumber(accessToken?: string | null, spreadsheetId?: string): Promise<string> {
  if (accessToken && spreadsheetId) {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAMES.debitur}!A2:A`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.ok) {
        const json = await res.json();
        const rows: string[][] = json.values || [];
        let maxNum = 0;
        rows.forEach(([val]) => {
          if (!val) return;
          const match = String(val).match(/REG-(\d+)/i) || String(val).match(/^(\d+)$/);
          if (match) {
            const n = parseInt(match[1], 10);
            if (n > maxNum) maxNum = n;
          }
        });
        if (maxNum > 0) {
          return String(maxNum + 1);
        }
      }
    } catch (e) {
      console.warn('Could not fetch next reg number from remote sheet:', e);
    }
  }

  // Fallback to local storage
  const records = getLocalRecords();
  let max = 2139; // default starter
  records.forEach((r) => {
    const match = String(r.noRegister).match(/REG-(\d+)/i) || String(r.noRegister).match(/^(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > max) max = n;
    }
  });
  return String(max + 1);
}

// Create new Google Spreadsheet with all required sheets and headers
export async function createBMTSpreadsheet(
  accessToken: string,
  title = 'Form Pembiayaan BMT UGT Nusantara'
): Promise<GoogleSheetsConfig> {
  const sheetsPayload = [
    { properties: { title: SHEET_NAMES.lengkap } },
    { properties: { title: SHEET_NAMES.debitur } },
    { properties: { title: SHEET_NAMES.penjamin } },
    { properties: { title: SHEET_NAMES.realisasi } },
    { properties: { title: SHEET_NAMES.agunan } },
    { properties: { title: SHEET_NAMES.kapasitas } },
    { properties: { title: SHEET_NAMES.analisa } },
  ];

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { title },
      sheets: sheetsPayload,
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Gagal membuat Google Spreadsheet: ${err}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl;

  // Now seed initial headers for all sheets
  const headerUpdates = [
    {
      range: `${SHEET_NAMES.debitur}!A1:${String.fromCharCode(64 + Math.min(26, HEADERS_DEBITUR.length))}1`,
      values: [HEADERS_DEBITUR],
    },
    {
      range: `${SHEET_NAMES.penjamin}!A1:J1`,
      values: [HEADERS_PENJAMIN],
    },
    {
      range: `${SHEET_NAMES.realisasi}!A1:X1`,
      values: [HEADERS_REALISASI],
    },
    {
      range: `${SHEET_NAMES.agunan}!A1:AI1`,
      values: [HEADERS_AGUNAN],
    },
    {
      range: `${SHEET_NAMES.kapasitas}!A1:J1`,
      values: [HEADERS_KAPASITAS],
    },
    {
      range: `${SHEET_NAMES.analisa}!A1:AC1`,
      values: [HEADERS_ANALISA],
    },
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: headerUpdates,
    }),
  });

  const config: GoogleSheetsConfig = {
    spreadsheetId,
    spreadsheetUrl,
    spreadsheetTitle: title,
    syncMode: 'direct',
  };

  saveStoredConfig(config);
  return config;
}

// Check and ensure all 7 sheets exist in an existing Google Sheet
export async function ensureSheetsExist(accessToken: string, spreadsheetId: string) {
  const getRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets(properties(sheetId,title))`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!getRes.ok) {
    throw new Error('Gagal mengakses Spreadsheet. Pastikan Spreadsheet ID benar dan dapat diakses.');
  }

  const json = await getRes.json();
  const existingTitles = (json.sheets || []).map((s: any) => s.properties?.title);

  const missing = Object.values(SHEET_NAMES).filter((name) => !existingTitles.includes(name));

  if (missing.length > 0) {
    const requests = missing.map((name) => ({
      addSheet: { properties: { title: name } },
    }));

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });
  }
}

// Find existing row index by No Register
async function findRowByNoReg(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  noReg: string,
  colLetter = 'A'
): Promise<number> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${colLetter}2:${colLetter}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) return -1;
  const json = await res.json();
  const rows: string[][] = json.values || [];
  const target = String(noReg).trim().toLowerCase();

  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0] || '').trim().toLowerCase() === target) {
      return i + 2; // 1-based, skipping header row 1
    }
  }

  return -1;
}

// Save or Update a single sheet
async function saveOrUpdateSheet(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  noReg: string,
  rowData: any[],
  regColLetter = 'A'
) {
  const rowIndex = await findRowByNoReg(accessToken, spreadsheetId, sheetName, noReg, regColLetter);

  if (rowIndex > 0) {
    // Update existing row
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A${rowIndex}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [rowData] }),
      }
    );
  } else {
    // Append to sheet
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [rowData] }),
      }
    );
  }
}

// Save entire Pembiayaan data to Google Sheets
export async function savePembiayaanToGoogleSheet(
  data: PembiayaanData,
  config: GoogleSheetsConfig,
  accessToken?: string | null
): Promise<{ success: boolean; noRegister: string; message: string }> {
  // Always mirror to local storage
  saveLocalRecord(data);

  // If using Google Apps Script Web App URL
  if (config.syncMode === 'appsScript' && config.appsScriptUrl) {
    try {
      const resp = await fetch(config.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'simpan', data }),
      });
      const resJson = await resp.json();
      return {
        success: true,
        noRegister: resJson.noRegister || data.noRegister,
        message: resJson.message || `Data ${data.noRegister} (${data.nama}) berhasil disimpan ke Google Sheet via Apps Script.`,
      };
    } catch (e: any) {
      console.warn('Apps Script Web App request failed:', e);
      throw new Error(`Gagal mengirim ke Apps Script Web App: ${e.message}`);
    }
  }

  // Direct Google Sheets API
  if (!accessToken) {
    return {
      success: true,
      noRegister: data.noRegister,
      message: `Data disimpan secara lokal (No Reg: ${data.noRegister}). Silakan Masuk dengan Google untuk langsung menyelaraskan ke Google Sheet online.`,
    };
  }

  if (!config.spreadsheetId) {
    throw new Error('Spreadsheet ID belum dikonfigurasi. Silakan buat atau pilih Google Sheet terlebih dahulu.');
  }

  await ensureSheetsExist(accessToken, config.spreadsheetId);

  const noReg = data.noRegister;
  const namaDebitur = data.nama || '';
  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  // 1. DATA_LENGKAP
  // Get existing headers or create dynamic headers
  const getFullRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.lengkap}!1:1`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  let fullHeaders: string[] = [];
  if (getFullRes.ok) {
    const fullJson = await getFullRes.json();
    fullHeaders = (fullJson.values && fullJson.values[0]) || [];
  }

  if (fullHeaders.length === 0) {
    const keys = Object.keys(data).filter((k) => k !== 'noRegister');
    fullHeaders = ['TIMESTAMP', 'NO_REGISTER', ...keys];
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.lengkap}!A1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [fullHeaders] }),
      }
    );
  }

  const fullRow = fullHeaders.map((header) => {
    if (header === 'TIMESTAMP') return now;
    if (header === 'NO_REGISTER') return noReg;
    const v = data[header];
    return v !== undefined && v !== null ? v : '';
  });

  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.lengkap, noReg, fullRow, 'B');

  // 2. DATA_DEBITUR
  const debiturRow = [
    noReg,
    now,
    data.nama || '',
    data.binBinti || '',
    data.nomorKtp ? `'${data.nomorKtp}` : '',
    data.jenisKelamin || '',
    data.tempatLahir || '',
    data.tanggalLahir || '',
    data.alamatKtpDusun || '',
    data.rtKtp || '',
    data.rwKtp || '',
    data.desaKtp || '',
    data.kecamatanKtp || '',
    data.kabupatenKtp || '',
    data.propinsiKtp || '',
    data.kodePos || '',
    data.alamatDomisiliDusun || '',
    data.rtDomisili || '',
    data.rwDomisili || '',
    data.desaDomisili || '',
    data.kecamatanDomisili || '',
    data.kabupatenDomisili || '',
    data.propinsiDomisili || '',
    data.statusPerkawinan || '',
    data.lamaPerkawinan || '',
    data.namaOrganisasi || '',
    data.jabatanOrganisasi || '',
    data.pekerjaan || '',
    data.jabatanPerusahaan || '',
    data.statusTempatTinggal || '',
    data.pendidikan || '',
    data.tahunLulus || '',
    formatNoHp(data.hpPribadi) ? `'${formatNoHp(data.hpPribadi)}` : '',
    data.jmlPasangan || 0,
    data.jmlAnak || 0,
    data.jmlOrangTua || 0,
    data.jmlLainnya || 0,
    ambilAngka(data.pendapatanRata2),
    data.sumberPendapatan || '',
    data.lamaPekerjaan || '',
    ambilAngka(data.jumlahPengajuan),
    data.keperluanPinjaman || '',
    data.pinjamanPihakLain || '',
  ];
  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.debitur, noReg, debiturRow, 'A');

  // 3. DATA_PENJAMIN
  const penjaminRow = [
    noReg,
    namaDebitur,
    data.namaPenjamin || '',
    data.ktpPenjamin ? `'${data.ktpPenjamin}` : '',
    data.tempatLahirPenjamin || '',
    data.tglLahirPenjamin || '',
    data.alamatPenjamin || '',
    data.hubunganPenjamin || '',
    data.pekerjaanPenjamin || '',
    formatNoHp(data.hpPenjamin) ? `'${formatNoHp(data.hpPenjamin)}` : '',
  ];
  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.penjamin, noReg, penjaminRow, 'A');

  // 4. DATA_REALISASI
  const realisasiRow = [
    noReg,
    namaDebitur,
    data.rekTabungan ? `'${data.rekTabungan}` : '',
    data.rekPembiayaan ? `'${data.rekPembiayaan}` : '',
    data.tglPermohonan || '',
    data.tglSurvey || '',
    data.tglRealisasi || '',
    data.tglJatuhTempo || '',
    ambilAngka(data.jumlahRealisasi),
    data.jangkaWaktu || 0,
    data.marginPersen || 0,
    ambilAngka(data.marginNominal),
    ambilAngka(data.totalMargin),
    ambilAngka(data.hargaJual),
    ambilAngka(data.angsuranPerbulan),
    data.akadPembiayaan || '',
    data.skemaAngsuran || '',
    data.kepalaCabang || '',
    data.wakilPengurus || '',
    data.wakilKomite || '',
    data.kepalaCapem || '',
    data.petugasAoa || '',
    data.petugasAop || '',
    data.petugasAosp || '',
  ];
  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.realisasi, noReg, realisasiRow, 'A');

  // 5. DATA_AGUNAN
  const noAgunan = data.noAgunan || data.noBpkb || data.noSuratShm || '';
  const anAgunan = data.anAgunan || data.anBpkb || data.anShm || '';
  const hargaPasar =
    ambilAngka(data.hargaPasarAgunan) ||
    ambilAngka(data.hargaPasarBpkb) ||
    ambilAngka(data.hargaPasarShm) ||
    ambilAngka(data.hargaBeliElektronik) ||
    0;
  const nominalAgunan = ambilAngka(data.nominalAgunan) || 0;
  const lokasi = data.lokasiAgunan || data.lokasiShm || data.posisiElektronik || '';
  const pengikatan = data.pengikatanAgunan || data.pengikatanShm || '';
  const dasarNilai = data.dasarNilaiAgunan || data.dasarNilaiShm || '';

  const agunanRow = [
    noReg,
    namaDebitur,
    data.agunanBerupa || '',
    data.statusKepemilikanAgunan || '',
    pengikatan,
    dasarNilai,
    noAgunan,
    anAgunan,
    hargaPasar,
    nominalAgunan,
    data.merekBpkb || data.merekElektronik || '',
    data.warnaBpkb || '',
    data.tahunBpkb || data.produksiElektronik || '',
    data.noPolisiBpkb || '',
    data.noRangkaBpkb || '',
    data.noMesinBpkb || '',
    data.alamatBpkb || '',
    data.luasShm || '',
    lokasi,
    data.batasUtaraShm || '',
    data.batasBaratShm || '',
    data.batasTimurShm || '',
    data.batasSelatanShm || '',
    data.kondisiShm || data.kondisiElektronik || '',
    ambilAngka(data.njopShm),
    data.jenisElektronik || '',
    data.fakturElektronik || '',
    data.namaPemilikAgunan || '',
    data.ktpPemilikAgunan ? `'${data.ktpPemilikAgunan}` : '',
    data.tempatLahirPemilikAgunan || '',
    data.tglLahirPemilikAgunan || '',
    data.alamatPemilikAgunan || '',
    data.pekerjaanPemilikAgunan || '',
    data.hubunganPemilikAgunan || '',
    formatNoHp(data.hpPemilikAgunan) ? `'${formatNoHp(data.hpPemilikAgunan)}` : '',
  ];
  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.agunan, noReg, agunanRow, 'A');

  // 6. KAPASITAS_USAHA (Multi-rows 1 to 5)
  // Delete old capacity rows for this reg
  const kapRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.kapasitas}!A2:A`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (kapRes.ok) {
    const kapJson = await kapRes.json();
    const rows = kapJson.values || [];
    const deleteIndexes: number[] = [];
    rows.forEach((r: string[], idx: number) => {
      if (String(r[0] || '').trim().toLowerCase() === String(noReg).trim().toLowerCase()) {
        deleteIndexes.push(idx + 2);
      }
    });

    // If there are existing capacity rows, update or clear
    if (deleteIndexes.length > 0) {
      // Clear rows
      for (const rowIdx of deleteIndexes) {
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.kapasitas}!A${rowIdx}:J${rowIdx}:clear`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }
    }
  }

  // Append new capacity items
  const capacityItemsToAppend: any[][] = [];
  for (let i = 1; i <= 5; i++) {
    const namaBarang = data[`barang_${i}`];
    if (namaBarang && String(namaBarang).trim() !== '') {
      const hp = ambilAngka(data[`hp_${i}`]);
      const hj = ambilAngka(data[`hj_${i}`]);
      const vh = ambilAngka(data[`vh_${i}`]);
      const vp = ambilAngka(data[`vp_${i}`]);
      const vb = ambilAngka(data[`vb_${i}`]);
      const vol = vb || vp || vh || 0;
      const labaCalc = (hj - hp) * vol;
      capacityItemsToAppend.push([
        noReg,
        namaDebitur,
        i,
        namaBarang,
        hp,
        hj,
        vh,
        vp,
        vb,
        labaCalc,
      ]);
    }
  }

  if (capacityItemsToAppend.length > 0) {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.kapasitas}!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: capacityItemsToAppend }),
      }
    );
  }

  // 7. ANALISA_USAHA
  const bTrans = ambilAngka(data.biayaTransportasi_b);
  const bKons = ambilAngka(data.biayaKonsumsi_b);
  const bUpah = ambilAngka(data.biayaUpah_b);
  const bPulsa = ambilAngka(data.biayaPulsa_b);
  const bSewaAlat = ambilAngka(data.biayaSewaAlat_b);
  const bListrik = ambilAngka(data.biayaListrik_b);
  const bHutangUsaha = ambilAngka(data.biayaHutangUsaha_b);
  const bPajak = ambilAngka(data.biayaPajak_b);
  const bLainUsaha = ambilAngka(data.biayaLain_b);
  const totalBiayaUsaha = bTrans + bKons + bUpah + bPulsa + bSewaAlat + bListrik + bHutangUsaha + bPajak + bLainUsaha;
  const pendKotor = ambilAngka(data.total_laba || data.pendapatanRata2);
  const pendLain = ambilAngka(data.pendapatanLain_perbulan);
  const labaUsaha = pendKotor + pendLain - totalBiayaUsaha;

  const bSakuAnak = ambilAngka(data.rt_uangSaku || data.totalUangSakuAnak);
  const bSpp = ambilAngka(data.rt_sppPendidikan || data.totalSppAnak);
  const bMakan = ambilAngka(data.rt_kebutuhanMakan);
  const bListrikRt = ambilAngka(data.rt_tagihanListrik);
  const bPdamRt = ambilAngka(data.rt_tagihanPdam);
  const bPulsaRt = ambilAngka(data.rt_telpPulsa);
  const bTransRt = ambilAngka(data.rt_transportasi);
  const bSehatRt = ambilAngka(data.rt_kesehatan);
  const bSewaRt = ambilAngka(data.rt_sewa);
  const bHutangRt = ambilAngka(data.rt_hutangArisan);
  const bPembantuRt = ambilAngka(data.rt_pembantuLain);
  const totalBebanRt = ambilAngka(data.rt_totalBeban) || (bSakuAnak + bSpp + bMakan + bListrikRt + bPdamRt + bPulsaRt + bTransRt + bSehatRt + bSewaRt + bHutangRt + bPembantuRt);
  const shuNetto = labaUsaha - totalBebanRt;

  const analisaRow = [
    noReg,
    namaDebitur,
    data.barang_1 || data.jenisUsaha || '',
    pendKotor,
    pendLain,
    bTrans,
    bKons,
    bUpah,
    bPulsa,
    bSewaAlat,
    bListrik,
    bHutangUsaha,
    bPajak,
    bLainUsaha,
    totalBiayaUsaha,
    labaUsaha,
    bSakuAnak,
    bSpp,
    bMakan,
    bListrikRt,
    bPdamRt,
    bPulsaRt,
    bTransRt,
    bSehatRt,
    bSewaRt,
    bHutangRt,
    bPembantuRt,
    totalBebanRt,
    shuNetto,
  ];
  await saveOrUpdateSheet(accessToken, config.spreadsheetId, SHEET_NAMES.analisa, noReg, analisaRow, 'A');

  return {
    success: true,
    noRegister: noReg,
    message: `Data Pembiayaan No Register ${noReg} (${namaDebitur}) berhasil disimpan ke Google Sheets.`,
  };
}

// Search Pembiayaan by Keyword (No Register or Debitur Name)
export async function searchPembiayaan(
  keyword: string,
  config?: GoogleSheetsConfig | null,
  accessToken?: string | null
): Promise<PembiayaanData | null> {
  const q = String(keyword).trim().toLowerCase();
  if (!q) return null;

  // 1. If Google Sheets API is connected, search in DATA_LENGKAP
  if (accessToken && config?.spreadsheetId) {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${SHEET_NAMES.lengkap}!A1:ZZ`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.ok) {
        const json = await res.json();
        const rows: any[][] = json.values || [];
        if (rows.length >= 2) {
          const headers: string[] = rows[0];
          const namaCol = headers.indexOf('nama');
          const noRegCol = headers.indexOf('NO_REGISTER') >= 0 ? headers.indexOf('NO_REGISTER') : 1;

          for (let r = 1; r < rows.length; r++) {
            const row = rows[r];
            const noReg = String(row[noRegCol] || '').toLowerCase();
            const nama = namaCol >= 0 ? String(row[namaCol] || '').toLowerCase() : '';

            if (noReg === q || noReg.includes(q) || nama.includes(q)) {
              const result: any = {};
              headers.forEach((h, c) => {
                if (!h || h === 'TIMESTAMP') return;
                result[h] = row[c] !== undefined && row[c] !== null ? String(row[c]) : '';
              });
              result.noRegister = row[noRegCol] || result.noRegister;
              return result as PembiayaanData;
            }
          }
        }
      }
    } catch (e) {
      console.warn('Google Sheets search error:', e);
    }
  }

  // 2. Fallback to Local Storage Mirror
  return findLocalRecord(keyword);
}

// Delete Pembiayaan by No Register
export async function deletePembiayaan(
  noReg: string,
  config?: GoogleSheetsConfig | null,
  accessToken?: string | null
): Promise<{ success: boolean; message: string }> {
  const target = String(noReg).trim();
  if (!target) {
    throw new Error('No Register harus diisi untuk menghapus data.');
  }

  // Delete from local cache
  const localDeleted = deleteLocalRecord(target);

  // If Google Sheets API is connected, clear or delete rows across all 7 sheets
  if (accessToken && config?.spreadsheetId) {
    try {
      const sheetList = Object.values(SHEET_NAMES);
      for (const sName of sheetList) {
        const colLetter = sName === SHEET_NAMES.lengkap ? 'B' : 'A';
        const rowIndex = await findRowByNoReg(accessToken, config.spreadsheetId, sName, target, colLetter);
        if (rowIndex > 0) {
          await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${sName}!A${rowIndex}:ZZ${rowIndex}:clear`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
        }
      }
      return {
        success: true,
        message: `Data No Register ${target} berhasil dihapus dari Google Sheets.`,
      };
    } catch (e: any) {
      return {
        success: localDeleted,
        message: `Data lokal dihapus, namun terjadi kendala pada Google Sheet: ${e.message}`,
      };
    }
  }

  return {
    success: localDeleted,
    message: localDeleted
      ? `Data No Register ${target} berhasil dihapus dari penyimpanan lokal.`
      : `Data No Register ${target} tidak ditemukan.`,
  };
}

export async function syncDataToGoogleSheets(
  data: PembiayaanData,
  accessToken?: string | null,
  config?: GoogleSheetsConfig | null
): Promise<{ success: boolean; message: string; noRegister?: string }> {
  const effectiveConfig = config || getStoredConfig() || {
    spreadsheetId: '',
    spreadsheetUrl: '',
    spreadsheetTitle: '',
    syncMode: 'direct',
  };

  return savePembiayaanToGoogleSheet(data, effectiveConfig, accessToken);
}

export async function deleteRecordFromGoogleSheets(
  noRegister: string,
  accessToken: string,
  spreadsheetId: string
): Promise<{ success: boolean; message: string }> {
  return deletePembiayaan(
    noRegister,
    { spreadsheetId, spreadsheetUrl: '', spreadsheetTitle: '', syncMode: 'direct' },
    accessToken
  );
}

