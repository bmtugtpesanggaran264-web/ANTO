import React from 'react';
import { Users } from 'lucide-react';
import { PembiayaanData } from '../types';

interface PenjaminSectionProps {
  data: PembiayaanData;
  onChange: (field: keyof PembiayaanData, value: any) => void;
}

export const PenjaminSection: React.FC<PenjaminSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#005a36] via-[#00683f] to-[#004d2e] text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-300" />
          <span>DATA PENJAMIN</span>
        </div>
        <span className="text-[10px] font-normal lowercase tracking-normal text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline">
          informasi &amp; kontak penjamin pembiayaan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px]">
        {/* Kolom Kiri */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Nama Penjamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="namaPenjamin"
                placeholder="Nama lengkap penjamin"
                value={data.namaPenjamin || ''}
                onChange={(e) => onChange('namaPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Nomor KTP Penjamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="ktpPenjamin"
                maxLength={16}
                placeholder="16 digit NIK"
                value={data.ktpPenjamin || ''}
                onChange={(e) => onChange('ktpPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tempat / Tgl Lahir</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%] flex items-center gap-1.5">
              <input
                type="text"
                name="tempatLahirPenjamin"
                placeholder="Kota Kelahiran"
                value={data.tempatLahirPenjamin || ''}
                onChange={(e) => onChange('tempatLahirPenjamin', e.target.value)}
                className="w-1/2 px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
              <input
                type="date"
                name="tglLahirPenjamin"
                value={data.tglLahirPenjamin || ''}
                onChange={(e) => onChange('tglLahirPenjamin', e.target.value)}
                className="w-1/2 px-2 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Alamat Penjamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="alamatPenjamin"
                placeholder="Alamat domisili penjamin"
                value={data.alamatPenjamin || ''}
                onChange={(e) => onChange('alamatPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Hubungan dgn Debitur</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="hubunganPenjamin"
                value={data.hubunganPenjamin || 'Istri'}
                onChange={(e) => onChange('hubunganPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Istri">Istri</option>
                <option value="Suami">Suami</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Anak">Anak</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Pekerjaan Penjamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="pekerjaanPenjamin"
                placeholder="Pekerjaan saat ini"
                value={data.pekerjaanPenjamin || ''}
                onChange={(e) => onChange('pekerjaanPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">No HP Aktif Penjamin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="hpPenjamin"
                inputMode="numeric"
                placeholder="Contoh: 08123456789"
                value={data.hpPenjamin || ''}
                onChange={(e) => onChange('hpPenjamin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
