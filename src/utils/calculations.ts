import { PembiayaanData } from '../types';
import { ambilAngka, formatRupiahAngka, TERBILANG } from './formatters';

export function calculateAutoFields(data: PembiayaanData): Partial<PembiayaanData> {
  const updates: Partial<PembiayaanData> = {};

  // 1. HITUNG JATUH TEMPO OTOMATIS
  if (data.tglRealisasi && data.jangkaWaktu) {
    const bulan = parseInt(String(data.jangkaWaktu), 10);
    if (!isNaN(bulan) && bulan > 0) {
      const parts = String(data.tglRealisasi).split('-').map(Number);
      if (parts.length === 3 && parts.every((x) => isFinite(x))) {
        const [year, month, day] = parts;
        const targetMonthIndex = month - 1 + bulan;
        const lastDay = new Date(year, targetMonthIndex + 1, 0).getDate();
        const targetDay = Math.min(day, lastDay);
        const target = new Date(year, targetMonthIndex, targetDay);

        const yyyy = target.getFullYear();
        const mm = String(target.getMonth() + 1).padStart(2, '0');
        const dd = String(target.getDate()).padStart(2, '0');
        updates.tglJatuhTempo = `${yyyy}-${mm}-${dd}`;
      }
    }
  }

  // 2. HITUNG REALISASI PEMBIAYAAN
  const jumlahRealisasi = ambilAngka(data.jumlahRealisasi);
  const marginStr = String(data.marginPersen || '').replace(',', '.').replace('%', '').trim();
  const marginPersen = parseFloat(marginStr) || 0;
  const jangkaWaktu = parseInt(String(data.jangkaWaktu || '0'), 10) || 0;
  const skema = String(data.skemaAngsuran || '').trim();

  if (jumlahRealisasi > 0 && marginPersen > 0 && jangkaWaktu > 0) {
    const marginBulan = Math.round((jumlahRealisasi * marginPersen) / 100);
    const total = Math.round(marginBulan * jangkaWaktu);
    const harga = Math.round(jumlahRealisasi + total);
    const cicilan = skema === 'Margin Saja' ? marginBulan : Math.round(harga / jangkaWaktu);

    updates.marginNominal = formatRupiahAngka(marginBulan);
    updates.totalMargin = formatRupiahAngka(total);
    updates.hargaJual = formatRupiahAngka(harga);
    updates.angsuranPerbulan = formatRupiahAngka(cicilan);
    updates.terbilangAngsuran = TERBILANG(cicilan);
  } else {
    updates.marginNominal = '';
    updates.totalMargin = '';
    updates.hargaJual = '';
    updates.angsuranPerbulan = '';
    updates.terbilangAngsuran = '';
  }

  // 3. TABEL KAPASITAS USAHA
  let totalHp = 0;
  let totalHj = 0;
  let totalVb = 0;
  let totalLabaKotor = 0;

  for (let i = 1; i <= 5; i++) {
    const hp = ambilAngka(data[`hp_${i}`]);
    const hj = ambilAngka(data[`hj_${i}`]);
    const vh = ambilAngka(data[`vh_${i}`]);
    const vp = ambilAngka(data[`vp_${i}`]);
    const vb = ambilAngka(data[`vb_${i}`]);

    let volBulan = vb;
    if (volBulan === 0) {
      if (vp > 0) volBulan = vp * 4;
      else if (vh > 0) volBulan = vh * 25;
    }

    const labaSatuan = (hj > 0 || hp > 0) ? (hj - hp) : 0;
    const labaTotalItem = labaSatuan * volBulan;

    updates[`laba_${i}`] = labaSatuan ? formatRupiahAngka(labaSatuan) : '';

    totalHp += hp;
    totalHj += hj;
    totalVb += volBulan;
    totalLabaKotor += labaTotalItem;
  }

  updates.total_hp = totalHp ? formatRupiahAngka(totalHp) : '';
  updates.total_hj = totalHj ? formatRupiahAngka(totalHj) : '';
  updates.total_vb = totalVb ? formatRupiahAngka(totalVb) : '';
  updates.total_laba = totalLabaKotor ? formatRupiahAngka(totalLabaKotor) : '';

  // 4. BIAYA USAHA
  const biayaList = [
    'biayaTransportasi', 'biayaKonsumsi', 'biayaUpah',
    'biayaPulsa', 'biayaSewaAlat', 'biayaListrik',
    'biayaHutangUsaha', 'biayaPajak', 'biayaLain'
  ];

  let totalBiayaH = 0;
  let totalBiayaP = 0;
  let totalBiayaB = 0;

  biayaList.forEach((key) => {
    totalBiayaH += ambilAngka(data[`${key}_h`]);
    totalBiayaP += ambilAngka(data[`${key}_p`]);
    totalBiayaB += ambilAngka(data[`${key}_b`]);
  });

  updates.totalBiayaUsaha_h = totalBiayaH ? formatRupiahAngka(totalBiayaH) : '';
  updates.totalBiayaUsaha_p = totalBiayaP ? formatRupiahAngka(totalBiayaP) : '';
  updates.totalBiayaUsaha_b = totalBiayaB ? formatRupiahAngka(totalBiayaB) : '';

  // 5. INFORMASI PENDIDIKAN & UANG SAKU
  const tingkatan = ['tksd', 'smp', 'sma', 'kuliah'] as const;
  let totalSakuAnak = 0;
  let totalSppAnak = 0;

  tingkatan.forEach((t) => {
    const saku = ambilAngka(data[`saku_${t}`]);
    const hari = ambilAngka(data[`hari_${t}`]) || 24;
    const spp = ambilAngka(data[`spp_${t}`]);
    const jmlAnak = ambilAngka(data[`anak_${t}`]);

    const jumlahSaku = saku * hari;
    updates[`jumlahSaku_${t}`] = jumlahSaku ? formatRupiahAngka(jumlahSaku) : '';

    totalSakuAnak += jumlahSaku * jmlAnak;
    totalSppAnak += spp * jmlAnak;
  });

  updates.totalUangSakuAnak = totalSakuAnak ? formatRupiahAngka(totalSakuAnak) : '';
  updates.totalSppAnak = totalSppAnak ? formatRupiahAngka(totalSppAnak) : '';

  // 6. BEBAN RUMAH TANGGA
  const jmlPasangan = ambilAngka(data.jmlPasangan);
  const jmlAnak = ambilAngka(data.jmlAnak);
  const jmlOrangTua = ambilAngka(data.jmlOrangTua);
  const asumsiMakan = ambilAngka(data.asumsiMakanPerHari) || 15000;

  const totalKebutuhanMakan = (1 + jmlPasangan + jmlAnak + jmlOrangTua) * asumsiMakan * 30;

  updates.rt_kebutuhanMakan = totalKebutuhanMakan ? formatRupiahAngka(totalKebutuhanMakan) : '';
  updates.rt_uangSaku = totalSakuAnak ? formatRupiahAngka(totalSakuAnak) : '';
  updates.rt_sppPendidikan = totalSppAnak ? formatRupiahAngka(totalSppAnak) : '';

  const bebanRT = [
    'rt_tagihanListrik', 'rt_tagihanPdam', 'rt_telpPulsa',
    'rt_transportasi', 'rt_kesehatan', 'rt_sewa',
    'rt_hutangArisan', 'rt_pembantuLain'
  ];

  let totalRT = totalKebutuhanMakan + totalSakuAnak + totalSppAnak;
  bebanRT.forEach((name) => {
    totalRT += ambilAngka(data[name]);
  });
  updates.rt_totalBeban = totalRT ? formatRupiahAngka(totalRT) : '';

  // 7. LABA USAHA & SHU NETTO
  const pendLain = ambilAngka(data.pendapatanLain_perbulan || data.pendapatanLain);
  const labaUsaha = (totalLabaKotor + pendLain) - totalBiayaB;
  const shuNetto = labaUsaha - totalRT;

  updates.labaUsaha = formatRupiahAngka(labaUsaha);
  updates.shuNetto = formatRupiahAngka(shuNetto);

  return updates;
}

export function getDefaultPembiayaanData(): PembiayaanData {
  const today = new Date().toISOString().split('T')[0];
  const randomReg = Math.floor(1000 + Math.random() * 9000).toString();

  return {
    noRegister: randomReg,
    nama: '',
    binBinti: '',
    nomorKtp: '',
    jenisKelamin: 'LAKI - LAKI',
    tempatLahir: '',
    tanggalLahir: '',
    alamatKtp_dusun: '',
    alamatKtp_rt: '',
    alamatKtp_rw: '',
    alamatKtp_desa: '',
    alamatKtp_kecamatan: '',
    alamatKtp_kabupaten: '',
    alamatKtp_propinsi: 'Jawa Timur',
    kodePos: '',
    domisili_dusun: '',
    domisili_rt: '',
    domisili_rw: '',
    domisili_desa: '',
    domisili_kecamatan: '',
    domisili_kabupaten: '',
    domisili_propinsi: 'Jawa Timur',
    statusPerkawinan: 'KAWIN',
    lamaPerkawinan: '',
    namaOrganisasi: 'NU',
    jabatanOrganisasi: 'Anggota',
    pekerjaan: 'Wiraswasta',
    jabatanPerusahaan: 'Pemilik',
    statusTempatTinggal: 'Milik Sendiri',
    pendidikan: 'SMA / Sederajat',
    tahunLulus: '',
    hpPribadi: '',
    jmlPasangan: '1',
    jmlAnak: '1',
    jmlOrangTua: '0',
    jmlLainnya: '0',
    pendapatanRata2: '',
    sumberPendapatan: 'Hasil Usaha',
    lamaPekerjaan: '',
    jumlahPengajuan: '',
    keperluanPinjaman: 'Modal Usaha',
    pinjamanPihakLain: 'Tidak Ada',

    namaPenjamin: '',
    ktpPenjamin: '',
    tempatLahirPenjamin: '',
    tglLahirPenjamin: '',
    alamatPenjamin: '',
    hubunganPenjamin: 'Istri',
    pekerjaanPenjamin: 'Mengurus Rumah Tangga',
    hpPenjamin: '',

    rekTabungan: '',
    rekPembiayaan: '',
    tglPermohonan: today,
    tglSurvey: today,
    tglRealisasi: today,
    tglJatuhTempo: '',
    jumlahRealisasi: '',
    jangkaWaktu: '12',
    marginPersen: '1.2',
    akadPembiayaan: 'MURABAHAH',
    skemaAngsuran: 'Pokok dan Margin',
    marginNominal: '',
    totalMargin: '',
    hargaJual: '',
    angsuranPerbulan: '',
    terbilangAngsuran: '',
    kepalaCabang: 'H. Abdul Wahid, M.M.',
    wakilPengurus: 'Drs. H. M. Sholeh',
    wakilKomite: 'KH. Syamsul Arifin',
    kepalaCapem: 'Ahmad Fauzi, S.E.I.',
    petugasAoa: 'M. Nurul Huda',
    petugasAop: 'Bambang Irawan',
    petugasAosp: 'Siti Rohmah, S.Akun.',

    agunanBerupa: 'SIMPANAN',
    statusKepemilikanAgunan: 'AGUNAN MILIK SENDIRI',
    pengikatanAgunan: 'Bawah tangan',
    dasarNilaiAgunan: 'KOMITE CABANG / BUKTI SIMPANAN',
    noAgunan: '',
    anAgunan: '',
    nominalAgunan: '',
    lokasiAgunan: '',

    barang_1: '',
    hp_1: '',
    hj_1: '',
    vh_1: '',
    vp_1: '',
    vb_1: '',
    laba_1: '',

    asumsiMakanPerHari: '15.000',
    hari_tksd: '24',
    hari_smp: '24',
    hari_sma: '24',
    hari_kuliah: '24',

    anak_tksd: '0',
    anak_smp: '0',
    anak_sma: '0',
    anak_kuliah: '0',
  };
}

export function recalculateAll(data: PembiayaanData): PembiayaanData {
  const autoFields = calculateAutoFields(data);
  return {
    ...data,
    ...autoFields,
  };
}

