import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { PembiayaanData } from '../types';
import { formatInputNominal, formatNoRekening } from '../utils/formatters';

interface AgunanSectionProps {
  data: PembiayaanData;
  onChange: (field: keyof PembiayaanData, value: any) => void;
}

export const AgunanSection: React.FC<AgunanSectionProps> = ({ data, onChange }) => {
  const handleFormattedInput = (field: keyof PembiayaanData, raw: string) => {
    const formatted = formatInputNominal(raw);
    onChange(field, formatted);
  };

  const handleRekeningInput = (field: keyof PembiayaanData, raw: string) => {
    // If it's simpanan/tabungan/deposito, format as account number 000.00.000000.00
    if (isSimpanan) {
      onChange(field, formatNoRekening(raw));
    } else {
      onChange(field, raw);
    }
  };

  const isBpkb = data.agunanBerupa === 'BPKB MOTOR' || data.agunanBerupa === 'BPKB MOBIL';
  const isShm = data.agunanBerupa === 'SHM SERTIFIKAT';
  const isElektronik = data.agunanBerupa === 'ELEKTRONIK & MEUBELLER';
  const isSimpanan = !isBpkb && !isShm && !isElektronik;
  const isMilikOrangLain = data.statusKepemilikanAgunan === 'AGUNAN MILIK ORANG LAIN';

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#005a36] via-[#00683f] to-[#004d2e] text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>JAMINAN / AGUNAN</span>
        </div>
        <span className="text-[10px] font-normal lowercase tracking-normal text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline">
          data agunan &amp; status kepemilikan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px]">
        <div className="flex items-center">
          <label className="w-2/5 font-semibold text-slate-700">Agunan Berupa / Jenis</label>
          <span className="w-4 font-bold text-slate-400 text-center">:</span>
          <div className="w-[58%]">
            <select
              id="agunanBerupa"
              name="agunanBerupa"
              value={data.agunanBerupa || 'SIMPANAN'}
              onChange={(e) => onChange('agunanBerupa', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
            >
              <option value="SIMPANAN">SIMPANAN</option>
              <option value="TABUNGAN">TABUNGAN</option>
              <option value="DEPOSITO">DEPOSITO</option>
              <option value="SERTIFIKAT ANGGOTA">SERTIFIKAT ANGGOTA</option>
              <option value="BPKB MOTOR">BPKB MOTOR</option>
              <option value="BPKB MOBIL">BPKB MOBIL</option>
              <option value="SHM SERTIFIKAT">SHM SERTIFIKAT</option>
              <option value="ELEKTRONIK & MEUBELLER">ELEKTRONIK & MEUBELLER</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-2/5 font-semibold text-slate-700">Kepemilikan Agunan</label>
          <span className="w-4 font-bold text-slate-400 text-center">:</span>
          <div className="w-[58%]">
            <select
              id="statusKepemilikanAgunan"
              name="statusKepemilikanAgunan"
              value={data.statusKepemilikanAgunan || 'AGUNAN MILIK SENDIRI'}
              onChange={(e) => onChange('statusKepemilikanAgunan', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
            >
              <option value="AGUNAN MILIK SENDIRI">AGUNAN MILIK SENDIRI</option>
              <option value="AGUNAN MILIK ORANG LAIN">AGUNAN MILIK ORANG LAIN</option>
            </select>
          </div>
        </div>
      </div>

      {/* KHUSUS AGUNAN MILIK ORANG LAIN */}
      {isMilikOrangLain && (
        <div className="mx-3 sm:mx-5 mb-4 bg-amber-50/70 border border-amber-300/80 rounded-lg p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide mb-3">
            <UserCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Data Pemilik Agunan (Pihak Lain)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-[13px]">
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Nama Pemilik Agunan</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="namaPemilikAgunan"
                    placeholder="Nama pemilik agunan"
                    value={data.namaPemilikAgunan || ''}
                    onChange={(e) => onChange('namaPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">No. KTP Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="ktpPemilikAgunan"
                    maxLength={16}
                    placeholder="16 digit NIK"
                    value={data.ktpPemilikAgunan || ''}
                    onChange={(e) => onChange('ktpPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Tempat Lahir Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="tempatLahirPemilikAgunan"
                    placeholder="Tempat lahir"
                    value={data.tempatLahirPemilikAgunan || ''}
                    onChange={(e) => onChange('tempatLahirPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Tgl Lahir Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="date"
                    name="tglLahirPemilikAgunan"
                    value={data.tglLahirPemilikAgunan || ''}
                    onChange={(e) => onChange('tglLahirPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Alamat Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="alamatPemilikAgunan"
                    placeholder="Alamat lengkap pemilik"
                    value={data.alamatPemilikAgunan || ''}
                    onChange={(e) => onChange('alamatPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Pekerjaan Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="pekerjaanPemilikAgunan"
                    placeholder="Pekerjaan"
                    value={data.pekerjaanPemilikAgunan || ''}
                    onChange={(e) => onChange('pekerjaanPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">Hubungan Dgn Debitur</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="hubunganPemilikAgunan"
                    placeholder="Orang tua / Saudara / Kerabat"
                    value={data.hubunganPemilikAgunan || ''}
                    onChange={(e) => onChange('hubunganPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 font-semibold text-slate-700">No. HP Pemilik</label>
                <span className="w-4 font-bold text-slate-400 text-center">:</span>
                <div className="w-[58%]">
                  <input
                    type="text"
                    name="hpPemilikAgunan"
                    inputMode="numeric"
                    placeholder="Contoh: 08123456789"
                    value={data.hpPemilikAgunan || ''}
                    onChange={(e) => onChange('hpPemilikAgunan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. SUBFORM SIMPANAN / TABUNGAN / DEPOSITO */}
      {isSimpanan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px] border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700 flex items-center justify-between pr-1">
                <span>No. Rekening / Bukti</span>
                <span className="text-[9px] font-mono text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded border border-emerald-200 no-print">
                  000.00.000000.00
                </span>
              </label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noAgunan"
                  placeholder="000.00.000000.00"
                  value={data.noAgunan || ''}
                  onChange={(e) => handleRekeningInput('noAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide font-semibold text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Atas Nama Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="anAgunan"
                  placeholder="Atas nama pada rekening / bukti"
                  value={data.anAgunan || ''}
                  onChange={(e) => onChange('anAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Jumlah (Nominal)</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="nominalAgunan"
                  placeholder="0"
                  value={data.nominalAgunan || ''}
                  onChange={(e) => handleFormattedInput('nominalAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Lokasi Agunan / Cabang</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="lokasiAgunan"
                  placeholder="Cabang BMT / Lokasi"
                  value={data.lokasiAgunan || ''}
                  onChange={(e) => onChange('lokasiAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Jenis Pengikatan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <select
                  name="pengikatanAgunan"
                  value={data.pengikatanAgunan || 'Bawah tangan'}
                  onChange={(e) => onChange('pengikatanAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                >
                  <option value="Bawah tangan">Bawah tangan</option>
                  <option value="Notariil">Notariil</option>
                  <option value="APHT">APHT</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Dasar Nilai Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="dasarNilaiAgunan"
                  value={data.dasarNilaiAgunan || 'KOMITE CABANG / BUKTI SIMPANAN'}
                  onChange={(e) => onChange('dasarNilaiAgunan', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-300 rounded-md bg-emerald-50/80 text-emerald-950 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUBFORM BPKB */}
      {isBpkb && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px] border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Merek</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="merekBpkb"
                  placeholder="Contoh: Honda / Toyota"
                  value={data.merekBpkb || ''}
                  onChange={(e) => onChange('merekBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Warna</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="warnaBpkb"
                  placeholder="Warna kendaraan"
                  value={data.warnaBpkb || ''}
                  onChange={(e) => onChange('warnaBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Tahun</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="number"
                  name="tahunBpkb"
                  placeholder="Tahun pembuatan"
                  value={data.tahunBpkb ?? ''}
                  onChange={(e) => onChange('tahunBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">No. Polisi</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noPolisiBpkb"
                  placeholder="Contoh: AB 1234 CD"
                  value={data.noPolisiBpkb || ''}
                  onChange={(e) => onChange('noPolisiBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm uppercase font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">No. BPKB</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noBpkb"
                  placeholder="Nomor BPKB"
                  value={data.noBpkb || ''}
                  onChange={(e) => onChange('noBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">No. Rangka</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noRangkaBpkb"
                  placeholder="Nomor rangka"
                  value={data.noRangkaBpkb || ''}
                  onChange={(e) => onChange('noRangkaBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">No. Mesin</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noMesinBpkb"
                  placeholder="Nomor mesin"
                  value={data.noMesinBpkb || ''}
                  onChange={(e) => onChange('noMesinBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Atas Nama BPKB</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="anBpkb"
                  placeholder="Nama tertera di BPKB"
                  value={data.anBpkb || ''}
                  onChange={(e) => onChange('anBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Alamat BPKB</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="alamatBpkb"
                  placeholder="Alamat tertera di BPKB"
                  value={data.alamatBpkb || ''}
                  onChange={(e) => onChange('alamatBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Harga Pasar</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="hargaPasarBpkb"
                  placeholder="0"
                  value={data.hargaPasarBpkb || ''}
                  onChange={(e) => handleFormattedInput('hargaPasarBpkb', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBFORM SHM */}
      {isShm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px] border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Atas Nama Sertifikat</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="anShm"
                  placeholder="Nama pemilik sertifikat"
                  value={data.anShm || ''}
                  onChange={(e) => onChange('anShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">No. Surat / Sertifikat</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="noSuratShm"
                  placeholder="Nomor SHM / Surat Ukur"
                  value={data.noSuratShm || ''}
                  onChange={(e) => onChange('noSuratShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Luas (M²)</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="number"
                  name="luasShm"
                  placeholder="Luas tanah m²"
                  value={data.luasShm ?? ''}
                  onChange={(e) => onChange('luasShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Lokasi Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="lokasiShm"
                  placeholder="Lokasi tanah / bangunan"
                  value={data.lokasiShm || ''}
                  onChange={(e) => onChange('lokasiShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Batas Utara</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="batasUtaraShm"
                  placeholder="Batas utara"
                  value={data.batasUtaraShm || ''}
                  onChange={(e) => onChange('batasUtaraShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Batas Barat</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="batasBaratShm"
                  placeholder="Batas barat"
                  value={data.batasBaratShm || ''}
                  onChange={(e) => onChange('batasBaratShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Batas Timur</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="batasTimurShm"
                  placeholder="Batas timur"
                  value={data.batasTimurShm || ''}
                  onChange={(e) => onChange('batasTimurShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Batas Selatan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="batasSelatanShm"
                  placeholder="Batas selatan"
                  value={data.batasSelatanShm || ''}
                  onChange={(e) => onChange('batasSelatanShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Kondisi Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="kondisiShm"
                  placeholder="Misal: Tanah & Bangunan"
                  value={data.kondisiShm || ''}
                  onChange={(e) => onChange('kondisiShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Harga NJOP</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="njopShm"
                  placeholder="0"
                  value={data.njopShm || ''}
                  onChange={(e) => handleFormattedInput('njopShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Harga Pasar</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="hargaPasarShm"
                  placeholder="0"
                  value={data.hargaPasarShm || ''}
                  onChange={(e) => handleFormattedInput('hargaPasarShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Jenis Pengikatan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <select
                  name="pengikatanShm"
                  value={data.pengikatanShm || 'Bawah tangan'}
                  onChange={(e) => onChange('pengikatanShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                >
                  <option value="Bawah tangan">Bawah tangan</option>
                  <option value="Notariil">Notariil</option>
                  <option value="APHT">APHT</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Dasar Nilai Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="dasarNilaiShm"
                  value={data.dasarNilaiShm || 'KOMITE CABANG / JUAL BELI'}
                  onChange={(e) => onChange('dasarNilaiShm', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-300 rounded-md bg-emerald-50/80 text-emerald-950 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBFORM ELEKTRONIK & MEUBELLER */}
      {isElektronik && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px] border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Jenis Barang</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="jenisElektronik"
                  placeholder="Misal: Kulkas, Laptop, Sofa"
                  value={data.jenisElektronik || ''}
                  onChange={(e) => onChange('jenisElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Merek</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="merekElektronik"
                  placeholder="Merek"
                  value={data.merekElektronik || ''}
                  onChange={(e) => onChange('merekElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Tahun Produksi</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="number"
                  name="produksiElektronik"
                  placeholder="Tahun produksi"
                  value={data.produksiElektronik ?? ''}
                  onChange={(e) => onChange('produksiElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Kondisi Agunan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="kondisiElektronik"
                  placeholder="Baik / Mulus / Perlu Perbaikan"
                  value={data.kondisiElektronik || ''}
                  onChange={(e) => onChange('kondisiElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Faktur Pembelian</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="fakturElektronik"
                  placeholder="Ada / Tidak Ada / No. Faktur"
                  value={data.fakturElektronik || ''}
                  onChange={(e) => onChange('fakturElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Harga Pembelian</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="hargaBeliElektronik"
                  placeholder="0"
                  value={data.hargaBeliElektronik || ''}
                  onChange={(e) => handleFormattedInput('hargaBeliElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Posisi Barang Di</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  name="posisiElektronik"
                  placeholder="Rumah Debitur / Toko / Dll"
                  value={data.posisiElektronik || ''}
                  onChange={(e) => onChange('posisiElektronik', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
