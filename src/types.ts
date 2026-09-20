export interface PembiayaanData {
  // Toolbar / Meta
  noRegister: string;

  // Data Pemohon Debitur - Left Column
  nama?: string;
  nomorKtp?: string;
  tempatLahir?: string;
  alamatKtpDusun?: string;
  rtKtp?: string;
  rwKtp?: string;
  desaKtp?: string;
  kecamatanKtp?: string;
  kabupatenKtp?: string;
  propinsiKtp?: string;
  kodePos?: string;
  statusPerkawinan?: string;
  lamaPerkawinan?: string;
  namaOrganisasi?: string;
  jabatanOrganisasi?: string;
  jmlPasangan?: string | number;
  jmlAnak?: string | number;
  jmlOrangTua?: string | number;
  jmlLainnya?: string | number;
  pendapatanRata2?: string;
  jumlahPengajuan?: string;
  keperluanPinjaman?: string;

  // Data Pemohon Debitur - Right Column
  binBinti?: string;
  jenisKelamin?: string;
  tanggalLahir?: string;
  alamatDomisiliDusun?: string;
  rtDomisili?: string;
  rwDomisili?: string;
  desaDomisili?: string;
  kecamatanDomisili?: string;
  kabupatenDomisili?: string;
  propinsiDomisili?: string;
  pekerjaan?: string;
  jabatanPerusahaan?: string;
  statusTempatTinggal?: string;
  pendidikan?: string;
  tahunLulus?: string;
  hpPribadi?: string;
  sumberPendapatan?: string;
  lamaPekerjaan?: string;
  pinjamanPihakLain?: string;

  // Data Penjamin - Left Column
  namaPenjamin?: string;
  ktpPenjamin?: string;
  tempatLahirPenjamin?: string;
  tglLahirPenjamin?: string;
  alamatPenjamin?: string;

  // Data Penjamin - Right Column
  hubunganPenjamin?: string;
  pekerjaanPenjamin?: string;
  hpPenjamin?: string;

  // Realisasi Pembiayaan - Left Column
  rekTabungan?: string;
  rekPembiayaan?: string;
  tglPermohonan?: string;
  tglSurvey?: string;
  tglRealisasi?: string;
  tglJatuhTempo?: string;
  jumlahRealisasi?: string;
  jangkaWaktu?: string | number;
  marginPersen?: string | number;
  akadPembiayaan?: string;

  // Realisasi Pembiayaan - Right Column
  skemaAngsuran?: string;
  marginNominal?: string;
  totalMargin?: string;
  hargaJual?: string;
  angsuranPerbulan?: string;
  terbilangAngsuran?: string;
  kepalaCabang?: string;
  wakilPengurus?: string;
  wakilKomite?: string;
  kepalaCapem?: string;
  petugasAoa?: string;
  petugasAop?: string;
  petugasAosp?: string;

  // Agunan / Jaminan
  agunanBerupa?: string;
  statusKepemilikanAgunan?: string;

  // Pihak Ketiga (Milik Orang Lain)
  namaPemilikAgunan?: string;
  ktpPemilikAgunan?: string;
  tempatLahirPemilikAgunan?: string;
  tglLahirPemilikAgunan?: string;
  alamatPemilikAgunan?: string;
  pekerjaanPemilikAgunan?: string;
  hubunganPemilikAgunan?: string;
  hpPemilikAgunan?: string;

  // Agunan Simpanan/Tabungan/Deposito
  noAgunan?: string;
  anAgunan?: string;
  nominalAgunan?: string;
  lokasiAgunan?: string;
  pengikatanAgunan?: string;
  dasarNilaiAgunan?: string;

  // Agunan BPKB
  merekBpkb?: string;
  warnaBpkb?: string;
  tahunBpkb?: string | number;
  noPolisiBpkb?: string;
  noBpkb?: string;
  noRangkaBpkb?: string;
  noMesinBpkb?: string;
  anBpkb?: string;
  alamatBpkb?: string;
  hargaPasarBpkb?: string;

  // Agunan SHM Sertifikat
  anShm?: string;
  noSuratShm?: string;
  luasShm?: string | number;
  lokasiShm?: string;
  batasUtaraShm?: string;
  batasBaratShm?: string;
  batasTimurShm?: string;
  batasSelatanShm?: string;
  kondisiShm?: string;
  njopShm?: string;
  hargaPasarShm?: string;
  pengikatanShm?: string;
  dasarNilaiShm?: string;

  // Agunan Elektronik & Meubeller
  jenisElektronik?: string;
  merekElektronik?: string;
  produksiElektronik?: string | number;
  kondisiElektronik?: string;
  fakturElektronik?: string;
  hargaBeliElektronik?: string;
  posisiElektronik?: string;

  // Kapasitas Usaha (Barang 1-5)
  barang_1?: string;
  hp_1?: string;
  hj_1?: string;
  vh_1?: string;
  vp_1?: string;
  vb_1?: string;
  laba_1?: string;

  barang_2?: string;
  hp_2?: string;
  hj_2?: string;
  vh_2?: string;
  vp_2?: string;
  vb_2?: string;
  laba_2?: string;

  barang_3?: string;
  hp_3?: string;
  hj_3?: string;
  vh_3?: string;
  vp_3?: string;
  vb_3?: string;
  laba_3?: string;

  barang_4?: string;
  hp_4?: string;
  hj_4?: string;
  vh_4?: string;
  vp_4?: string;
  vb_4?: string;
  laba_4?: string;

  barang_5?: string;
  hp_5?: string;
  hj_5?: string;
  vh_5?: string;
  vp_5?: string;
  vb_5?: string;
  laba_5?: string;

  total_hp?: string;
  total_hj?: string;
  total_vb?: string;
  total_laba?: string;

  // Pendapatan Lain
  gaji_perhari?: string;
  gaji_perpekan?: string;
  gaji_perbulan?: string;

  pensiun_perhari?: string;
  pensiun_perpekan?: string;
  pensiun_perbulan?: string;

  pendapatanLain_perhari?: string;
  pendapatanLain_perpekan?: string;
  pendapatanLain_perbulan?: string;

  sumberPengembalian?: string;

  // Biaya Usaha
  biayaTransportasi_h?: string;
  biayaTransportasi_p?: string;
  biayaTransportasi_b?: string;

  biayaKonsumsi_h?: string;
  biayaKonsumsi_p?: string;
  biayaKonsumsi_b?: string;

  biayaUpah_h?: string;
  biayaUpah_p?: string;
  biayaUpah_b?: string;

  biayaPulsa_h?: string;
  biayaPulsa_p?: string;
  biayaPulsa_b?: string;

  biayaSewaAlat_h?: string;
  biayaSewaAlat_p?: string;
  biayaSewaAlat_b?: string;

  biayaListrik_h?: string;
  biayaListrik_p?: string;
  biayaListrik_b?: string;

  biayaHutangUsaha_h?: string;
  biayaHutangUsaha_p?: string;
  biayaHutangUsaha_b?: string;

  biayaPajak_h?: string;
  biayaPajak_p?: string;
  biayaPajak_b?: string;

  biayaLain_h?: string;
  biayaLain_p?: string;
  biayaLain_b?: string;

  totalBiayaUsaha_h?: string;
  totalBiayaUsaha_p?: string;
  totalBiayaUsaha_b?: string;

  // Beban Rumah Tangga
  rt_kebutuhanMakan?: string;
  rt_uangSaku?: string;
  rt_sppPendidikan?: string;
  rt_tagihanListrik?: string;
  rt_tagihanPdam?: string;
  rt_telpPulsa?: string;
  rt_transportasi?: string;
  rt_kesehatan?: string;
  rt_sewa?: string;
  rt_hutangArisan?: string;
  rt_pembantuLain?: string;
  rt_totalBeban?: string;

  // Informasi Pendidikan
  asumsiMakanPerHari?: string;

  saku_tksd?: string;
  hari_tksd?: string;
  jumlahSaku_tksd?: string;
  spp_tksd?: string;

  saku_smp?: string;
  hari_smp?: string;
  jumlahSaku_smp?: string;
  spp_smp?: string;

  saku_sma?: string;
  hari_sma?: string;
  jumlahSaku_sma?: string;
  spp_sma?: string;

  saku_kuliah?: string;
  hari_kuliah?: string;
  jumlahSaku_kuliah?: string;
  spp_kuliah?: string;

  anak_tksd?: string;
  anak_smp?: string;
  anak_sma?: string;
  anak_kuliah?: string;

  totalUangSakuAnak?: string;
  totalSppAnak?: string;

  // Nilai Akhir
  labaUsaha?: string;
  shuNetto?: string;

  [key: string]: any;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  spreadsheetUrl: string;
  spreadsheetTitle: string;
  appsScriptUrl?: string;
  syncMode?: 'direct' | 'appsScript';
}

export type OfficerRole = 'KCP' | 'AOAP' | 'AOSP' | 'AOP' | 'KC' | 'KOMITE' | 'PENGURUS' | 'LAINNYA';

export interface PetugasOffice {
  id: string;
  nama: string;
  role: OfficerRole;
  roleTitle: string;
  nip?: string;
  hp?: string;
  isDefault?: boolean;
}

export interface KantorBMT {
  id: string;
  nama: string;
  kode: string;
  tipe: 'Capem' | 'Cabang' | 'Kas';
  alamat?: string;
  kota?: string;
  telepon?: string;
  petugas: PetugasOffice[];
  isDefault?: boolean;
}

