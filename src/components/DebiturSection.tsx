import React from 'react';
import { UserCheck } from 'lucide-react';
import { PembiayaanData } from '../types';
import { formatInputNominal } from '../utils/formatters';

interface DebiturSectionProps {
  data: PembiayaanData;
  onChange: (field: keyof PembiayaanData, value: any) => void;
}

export const DebiturSection: React.FC<DebiturSectionProps> = ({ data, onChange }) => {
  const handleFormattedInput = (field: keyof PembiayaanData, raw: string) => {
    const formatted = formatInputNominal(raw);
    onChange(field, formatted);
  };

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#005a36] via-[#00683f] to-[#004d2e] text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-300" />
          <span>DATA DEBITUR PEMOHON</span>
        </div>
        <span className="text-[10px] font-normal lowercase tracking-normal text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline">
          identitas pribadi, alamat &amp; profil pemohon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px]">
        {/* Kolom Kiri */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">
              Nama <span className="text-rose-500 font-bold">*</span>
            </label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="nama"
                value={data.nama || ''}
                onChange={(e) => onChange('nama', e.target.value)}
                required
                placeholder="Nama lengkap debitur"
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">
              Nomor KTP <span className="text-rose-500 font-bold">*</span>
            </label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="nomorKtp"
                maxLength={16}
                placeholder="16 digit NIK"
                value={data.nomorKtp || ''}
                onChange={(e) => onChange('nomorKtp', e.target.value)}
                required
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tempat Lahir</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="tempatLahir"
                placeholder="Kota/Kabupaten kelahiran"
                value={data.tempatLahir || ''}
                onChange={(e) => onChange('tempatLahir', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Alamat (KTP) (Dusun)</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="alamatKtpDusun"
                placeholder="Dusun / Jalan / No Rumah"
                value={data.alamatKtpDusun || ''}
                onChange={(e) => onChange('alamatKtpDusun', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700 pl-3">Rt / Rw</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%] flex items-center gap-2">
              <input
                type="text"
                name="rtKtp"
                placeholder="RT"
                value={data.rtKtp || ''}
                onChange={(e) => onChange('rtKtp', e.target.value)}
                className="w-1/2 px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
              <span className="text-slate-400 font-bold">/</span>
              <input
                type="text"
                name="rwKtp"
                placeholder="RW"
                value={data.rwKtp || ''}
                onChange={(e) => onChange('rwKtp', e.target.value)}
                className="w-1/2 px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kelurahan / Desa</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="desaKtp"
                placeholder="Nama Desa / Kelurahan"
                value={data.desaKtp || ''}
                onChange={(e) => onChange('desaKtp', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kecamatan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="kecamatanKtp"
                placeholder="Kecamatan"
                value={data.kecamatanKtp || ''}
                onChange={(e) => onChange('kecamatanKtp', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kabupaten</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="kabupatenKtp"
                placeholder="Kabupaten / Kota"
                value={data.kabupatenKtp || ''}
                onChange={(e) => onChange('kabupatenKtp', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Propinsi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="propinsiKtp"
                placeholder="Provinsi"
                value={data.propinsiKtp || ''}
                onChange={(e) => onChange('propinsiKtp', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kode Pos</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="kodePos"
                placeholder="Kode Pos"
                value={data.kodePos || ''}
                onChange={(e) => onChange('kodePos', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Status Perkawinan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="statusPerkawinan"
                value={data.statusPerkawinan || 'Kawin'}
                onChange={(e) => onChange('statusPerkawinan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Kawin">Kawin</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Duda/Janda">Duda / Janda</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Lama Perkawinan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="lamaPerkawinan"
                placeholder="Contoh: 5 Tahun"
                value={data.lamaPerkawinan || ''}
                onChange={(e) => onChange('lamaPerkawinan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Nama Organisasi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="namaOrganisasi"
                placeholder="Organisasi kemasyarakatan / keagamaan"
                value={data.namaOrganisasi || ''}
                onChange={(e) => onChange('namaOrganisasi', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jabatan Dalam Organisasi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="jabatanOrganisasi"
                placeholder="Ketua / Anggota / Pengurus"
                value={data.jabatanOrganisasi || ''}
                onChange={(e) => onChange('jabatanOrganisasi', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jumlah Istri / Suami</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="number"
                name="jmlPasangan"
                min="0"
                value={data.jmlPasangan ?? ''}
                onChange={(e) => onChange('jmlPasangan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tanggungan: Anak / Ortu</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%] flex items-center gap-1.5">
              <input
                type="number"
                name="jmlAnak"
                placeholder="Anak"
                min="0"
                value={data.jmlAnak ?? ''}
                onChange={(e) => onChange('jmlAnak', e.target.value)}
                className="w-1/3 px-2 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
              <input
                type="number"
                name="jmlOrangTua"
                placeholder="Ortu"
                min="0"
                value={data.jmlOrangTua ?? ''}
                onChange={(e) => onChange('jmlOrangTua', e.target.value)}
                className="w-1/3 px-2 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
              <input
                type="number"
                name="jmlLainnya"
                placeholder="Lain"
                min="0"
                value={data.jmlLainnya ?? ''}
                onChange={(e) => onChange('jmlLainnya', e.target.value)}
                className="w-1/3 px-2 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Ket. Pendapatan Rata2</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="pendapatanRata2"
                placeholder="0"
                value={data.pendapatanRata2 || ''}
                onChange={(e) => handleFormattedInput('pendapatanRata2', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-right font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jumlah Pengajuan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="jumlahPengajuan"
                placeholder="0"
                value={data.jumlahPengajuan || ''}
                onChange={(e) => handleFormattedInput('jumlahPengajuan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/80 text-emerald-950 font-bold text-right focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Keperluan Pinjaman</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="keperluanPinjaman"
                placeholder="Contoh: Tambahan Modal Usaha Dagang"
                value={data.keperluanPinjaman || ''}
                onChange={(e) => onChange('keperluanPinjaman', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Bin / Binti</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="binBinti"
                placeholder="Nama ayah kandung"
                value={data.binBinti || ''}
                onChange={(e) => onChange('binBinti', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jenis Kelamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="jenisKelamin"
                value={data.jenisKelamin || 'Laki - Laki'}
                onChange={(e) => onChange('jenisKelamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Laki - Laki">Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tanggal Lahir</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="date"
                name="tanggalLahir"
                value={data.tanggalLahir || ''}
                onChange={(e) => onChange('tanggalLahir', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Alamat Domisili (Dusun)</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="alamatDomisiliDusun"
                placeholder="Dusun tempat tinggal saat ini"
                value={data.alamatDomisiliDusun || ''}
                onChange={(e) => onChange('alamatDomisiliDusun', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700 pl-3">Rt / Rw</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%] flex items-center gap-2">
              <input
                type="text"
                name="rtDomisili"
                placeholder="RT"
                value={data.rtDomisili || ''}
                onChange={(e) => onChange('rtDomisili', e.target.value)}
                className="w-1/2 px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
              <span className="text-slate-400 font-bold">/</span>
              <input
                type="text"
                name="rwDomisili"
                placeholder="RW"
                value={data.rwDomisili || ''}
                onChange={(e) => onChange('rwDomisili', e.target.value)}
                className="w-1/2 px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kelurahan / Desa</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="desaDomisili"
                placeholder="Nama Desa / Kelurahan domisili"
                value={data.desaDomisili || ''}
                onChange={(e) => onChange('desaDomisili', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kecamatan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="kecamatanDomisili"
                placeholder="Kecamatan domisili"
                value={data.kecamatanDomisili || ''}
                onChange={(e) => onChange('kecamatanDomisili', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Kabupaten</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="kabupatenDomisili"
                placeholder="Kabupaten domisili"
                value={data.kabupatenDomisili || ''}
                onChange={(e) => onChange('kabupatenDomisili', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Propinsi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="propinsiDomisili"
                placeholder="Provinsi domisili"
                value={data.propinsiDomisili || ''}
                onChange={(e) => onChange('propinsiDomisili', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Pekerjaan / Instansi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="pekerjaan"
                value={data.pekerjaan || 'Pedagang'}
                onChange={(e) => onChange('pekerjaan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Pedagang">Pedagang</option>
                <option value="Wiraswasta">Wiraswasta</option>
                <option value="Petani">Petani</option>
                <option value="Pegawai / PNS">Pegawai / PNS</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jabatan Perusahaan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="jabatanPerusahaan"
                placeholder="Jabatan / Posisi"
                value={data.jabatanPerusahaan || ''}
                onChange={(e) => onChange('jabatanPerusahaan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Status Tempat Tinggal</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="statusTempatTinggal"
                value={data.statusTempatTinggal || 'Hak Milik'}
                onChange={(e) => onChange('statusTempatTinggal', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Hak Milik">Hak Milik</option>
                <option value="Kontrak">Kontrak</option>
                <option value="Menumpang wali">Menumpang wali</option>
                <option value="Rumah Dinas">Rumah Dinas</option>
                <option value="Kos">Kos</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Pendidikan Terakhir</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="pendidikan"
                value={data.pendidikan || 'MI / SD'}
                onChange={(e) => onChange('pendidikan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="MI / SD">MI / SD</option>
                <option value="SLTP">SLTP</option>
                <option value="SLTA">SLTA</option>
                <option value="D1">D1</option>
                <option value="D2">D2</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tahun Lulus</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="tahunLulus"
                placeholder="Tahun"
                value={data.tahunLulus || ''}
                onChange={(e) => onChange('tahunLulus', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">HP Pribadi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="hpPribadi"
                inputMode="numeric"
                placeholder="Contoh: 08123456789"
                value={data.hpPribadi || ''}
                onChange={(e) => onChange('hpPribadi', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Sumber Pendapatan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="sumberPendapatan"
                value={data.sumberPendapatan || 'Tani'}
                onChange={(e) => onChange('sumberPendapatan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Tani">Tani</option>
                <option value="Dagang">Dagang</option>
                <option value="PNS">PNS</option>
                <option value="Swasta">Swasta</option>
                <option value="Buruh">Buruh</option>
                <option value="Tidak Bekerja">Tidak Bekerja</option>
                <option value="Wiraswasta">Wiraswasta</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Lama Pekerjaan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="lamaPekerjaan"
                placeholder="Contoh: 3 Tahun"
                value={data.lamaPekerjaan || ''}
                onChange={(e) => onChange('lamaPekerjaan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Pinjaman Pihak Lain</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="pinjamanPihakLain"
                value={data.pinjamanPihakLain || 'Perorangan'}
                onChange={(e) => onChange('pinjamanPihakLain', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Perorangan">Perorangan</option>
                <option value="Bank/BPR">Bank/BPR</option>
                <option value="Koperasi">Koperasi</option>
                <option value="Pegadaian">Pegadaian</option>
                <option value="Leasing">Leasing</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
