import React from 'react';
import { Calculator, Coins, TrendingUp, WalletCards } from 'lucide-react';
import { PembiayaanData } from '../types';
import { formatInputNominal } from '../utils/formatters';

interface AnalisaSectionProps {
  data: PembiayaanData;
  onChange: (field: keyof PembiayaanData, value: any) => void;
}

export const AnalisaSection: React.FC<AnalisaSectionProps> = ({ data, onChange }) => {
  const handleFormattedInput = (field: keyof PembiayaanData, raw: string) => {
    const formatted = formatInputNominal(raw);
    onChange(field, formatted);
  };

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden pb-4">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#005a36] via-[#00683f] to-[#004d2e] text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-300" />
          <span>ANALISA KAPASITAS USAHA &amp; BIAYA</span>
        </div>
        <span className="text-[10px] font-normal lowercase tracking-normal text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline">
          evaluasi kelayakan pendapatan &amp; pengeluaran
        </span>
      </div>

      <div className="p-3 sm:p-5 text-xs sm:text-[13px] space-y-5">
        {/* 1. TABEL KAPASITAS USAHA */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>1. Kapasitas Usaha (Komoditi &amp; Margin)</span>
          </div>
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-2xs">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#005a36] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th rowSpan={2} className="border border-emerald-800 p-1.5 w-10">NO</th>
                  <th rowSpan={2} className="border border-emerald-800 p-1.5 min-w-[140px]">Jenis Barang</th>
                  <th colSpan={2} className="border border-emerald-800 p-1.5">Harga Satuan</th>
                  <th colSpan={3} className="border border-emerald-800 p-1.5">Volume</th>
                  <th rowSpan={2} className="border border-emerald-800 p-1.5 min-w-[120px]">
                    LABA<br />
                    <span className="font-normal normal-case text-[10px] text-emerald-200">(Jual - Pokok)</span>
                  </th>
                </tr>
                <tr className="bg-[#00472a] text-white text-[10px] uppercase font-medium">
                  <th className="border border-emerald-900 p-1 min-w-[90px]">POKOK</th>
                  <th className="border border-emerald-900 p-1 min-w-[90px]">JUAL</th>
                  <th className="border border-emerald-900 p-1 min-w-[70px]">Perhari</th>
                  <th className="border border-emerald-900 p-1 min-w-[70px]">Perpekan</th>
                  <th className="border border-emerald-900 p-1 min-w-[70px]">Perbulan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-emerald-50/40 text-xs transition-colors">
                    <td className="border border-slate-200 p-1 font-bold text-slate-700">{i}</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`barang_${i}`}
                        placeholder={`Nama komoditi ${i}`}
                        value={data[`barang_${i}`] || ''}
                        onChange={(e) => onChange(`barang_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`hp_${i}`}
                        placeholder="0"
                        value={data[`hp_${i}`] || ''}
                        onChange={(e) => handleFormattedInput(`hp_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-right bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`hj_${i}`}
                        placeholder="0"
                        value={data[`hj_${i}`] || ''}
                        onChange={(e) => handleFormattedInput(`hj_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-right bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`vh_${i}`}
                        placeholder="0"
                        value={data[`vh_${i}`] || ''}
                        onChange={(e) => handleFormattedInput(`vh_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`vp_${i}`}
                        placeholder="0"
                        value={data[`vp_${i}`] || ''}
                        onChange={(e) => handleFormattedInput(`vp_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`vb_${i}`}
                        placeholder="0"
                        value={data[`vb_${i}`] || ''}
                        onChange={(e) => handleFormattedInput(`vb_${i}` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        name={`laba_${i}`}
                        readOnly
                        placeholder="0"
                        value={data[`laba_${i}`] || ''}
                        className="w-full px-2 py-1 rounded text-xs text-right font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs"
                      />
                    </td>
                  </tr>
                ))}
                {/* BARIS TOTAL */}
                <tr className="font-bold bg-slate-100 text-xs border-t-2 border-slate-300">
                  <td colSpan={2} className="border border-slate-300 p-2 text-center text-slate-800 font-bold uppercase tracking-wider">
                    Pendapatan Kotor
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.total_hp || ''}
                      className="w-full px-1.5 py-0.5 text-right font-bold text-slate-800 bg-transparent border-none text-xs"
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.total_hj || ''}
                      className="w-full px-1.5 py-0.5 text-right font-bold text-slate-800 bg-transparent border-none text-xs"
                    />
                  </td>
                  <td className="border border-slate-300 p-1"></td>
                  <td className="border border-slate-300 p-1"></td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.total_vb || ''}
                      className="w-full px-1.5 py-0.5 text-center font-bold text-slate-800 bg-transparent border-none text-xs"
                    />
                  </td>
                  <td className="border border-slate-300 p-1 bg-emerald-100/60">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.total_laba || ''}
                      className="w-full px-1.5 py-0.5 text-right font-black text-emerald-800 bg-transparent border-none text-xs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. PENDAPATAN LAIN */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
            <Coins className="w-3.5 h-3.5 text-emerald-700" />
            <span>2. Pendapatan Lain-Lain</span>
          </div>
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-2xs">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-xs font-semibold">
                  <th className="border border-slate-700 p-2 text-left">PENDAPATAN LAIN</th>
                  <th className="border border-slate-700 p-2 w-[18%]">Perhari</th>
                  <th className="border border-slate-700 p-2 w-[18%]">Perpekan</th>
                  <th className="border border-slate-700 p-2 w-[22%]">Perbulan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-200 p-2 text-left font-semibold text-slate-700">1. Gaji atau Upah</td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="gaji_perhari"
                      placeholder="0"
                      value={data.gaji_perhari || ''}
                      onChange={(e) => handleFormattedInput('gaji_perhari', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="gaji_perpekan"
                      placeholder="0"
                      value={data.gaji_perpekan || ''}
                      onChange={(e) => handleFormattedInput('gaji_perpekan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="gaji_perbulan"
                      placeholder="0"
                      value={data.gaji_perbulan || ''}
                      onChange={(e) => handleFormattedInput('gaji_perbulan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-semibold focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-200 p-2 text-left font-semibold text-slate-700">2. Pensiun</td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pensiun_perhari"
                      placeholder="0"
                      value={data.pensiun_perhari || ''}
                      onChange={(e) => handleFormattedInput('pensiun_perhari', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pensiun_perpekan"
                      placeholder="0"
                      value={data.pensiun_perpekan || ''}
                      onChange={(e) => handleFormattedInput('pensiun_perpekan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pensiun_perbulan"
                      placeholder="0"
                      value={data.pensiun_perbulan || ''}
                      onChange={(e) => handleFormattedInput('pensiun_perbulan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-semibold focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-200 p-2 text-left font-semibold text-slate-700">3. Sumber Pendapatan Lainnya</td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pendapatanLain_perhari"
                      placeholder="0"
                      value={data.pendapatanLain_perhari || ''}
                      onChange={(e) => handleFormattedInput('pendapatanLain_perhari', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pendapatanLain_perpekan"
                      placeholder="0"
                      value={data.pendapatanLain_perpekan || ''}
                      onChange={(e) => handleFormattedInput('pendapatanLain_perpekan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      name="pendapatanLain_perbulan"
                      placeholder="0"
                      value={data.pendapatanLain_perbulan || ''}
                      onChange={(e) => handleFormattedInput('pendapatanLain_perbulan', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-semibold focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMBER PENGEMBALIAN */}
        <div className="bg-emerald-50/90 border border-emerald-300/80 p-3 rounded-lg shadow-2xs flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="font-bold text-xs sm:text-sm tracking-wide text-emerald-950 sm:w-56 flex items-center gap-1.5">
            <WalletCards className="w-4 h-4 text-emerald-700" />
            <span>SUMBER PENGEMBALIAN :</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="sumberPengembalian"
              placeholder="Jelaskan sumber dana pengembalian pembiayaan..."
              value={data.sumberPengembalian || ''}
              onChange={(e) => onChange('sumberPengembalian', e.target.value)}
              className="w-full px-3 py-1.5 bg-white text-emerald-950 font-semibold rounded-md border border-emerald-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 3. BIAYA USAHA */}
        <div>
          <div className="bg-slate-800 text-white text-center py-2 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-t-lg shadow-xs">
            3. BIAYA USAHA
          </div>
          <div className="overflow-x-auto border border-slate-200 rounded-b-lg shadow-2xs">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold">
                  <th className="border border-slate-300 p-2 text-left">Uraian</th>
                  <th className="border border-slate-300 p-2 w-[22%]">Perhari</th>
                  <th className="border border-slate-300 p-2 w-[22%]">Perpekan</th>
                  <th className="border border-slate-300 p-2 w-[26%]">Perbulan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { key: 'biayaTransportasi', label: 'Transportasi' },
                  { key: 'biayaKonsumsi', label: 'Konsumsi/Snack' },
                  { key: 'biayaUpah', label: 'Upah Kerja' },
                  { key: 'biayaPulsa', label: 'Pulsa Telpon' },
                  { key: 'biayaSewaAlat', label: 'Sewa Alat Dll' },
                  { key: 'biayaListrik', label: 'Listrik & PDAM' },
                  { key: 'biayaHutangUsaha', label: 'Hutang Usaha' },
                  { key: 'biayaPajak', label: 'Pajak' },
                  { key: 'biayaLain', label: 'Lain-lain' },
                ].map((item) => (
                  <tr key={item.key} className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-200 p-2 text-left font-semibold text-slate-700">{item.label}</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        placeholder="0"
                        value={data[`${item.key}_h` as keyof PembiayaanData] || ''}
                        onChange={(e) => handleFormattedInput(`${item.key}_h` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        placeholder="0"
                        value={data[`${item.key}_p` as keyof PembiayaanData] || ''}
                        onChange={(e) => handleFormattedInput(`${item.key}_p` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="text"
                        placeholder="0"
                        value={data[`${item.key}_b` as keyof PembiayaanData] || ''}
                        onChange={(e) => handleFormattedInput(`${item.key}_b` as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-semibold focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                  </tr>
                ))}
                {/* BARIS TOTAL BIAYA USAHA */}
                <tr className="bg-slate-900 text-white font-bold">
                  <td className="border border-slate-800 p-2 text-center uppercase tracking-wider font-bold">Jumlah Biaya Usaha</td>
                  <td className="border border-slate-800 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.totalBiayaUsaha_h || ''}
                      className="w-full px-1.5 py-0.5 text-right font-bold text-white bg-transparent border-none text-xs"
                    />
                  </td>
                  <td className="border border-slate-800 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.totalBiayaUsaha_p || ''}
                      className="w-full px-1.5 py-0.5 text-right font-bold text-white bg-transparent border-none text-xs"
                    />
                  </td>
                  <td className="border border-slate-800 p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.totalBiayaUsaha_b || ''}
                      className="w-full px-1.5 py-0.5 text-right font-bold text-yellow-300 bg-transparent border-none text-xs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. BEBAN RUMAH TANGGA & INFORMASI PENDIDIKAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Kolom Kiri: BEBAN RUMAH TANGGA */}
          <div className="border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
            <div className="bg-slate-800 text-white text-center py-2 font-bold uppercase tracking-wider text-xs">
              4. BEBAN RUMAH TANGGA
            </div>
            <table className="w-full text-xs border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-2 border-b font-semibold text-slate-700">Kebutuhan Makan (30 Hari)</td>
                  <td className="p-1 border-b w-40">
                    <input
                      type="text"
                      name="rt_kebutuhanMakan"
                      readOnly
                      placeholder="0"
                      value={data.rt_kebutuhanMakan || ''}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-right font-semibold bg-slate-50 text-slate-800 text-xs shadow-2xs"
                    />
                  </td>
                </tr>
                <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <td className="p-2 border-b font-bold text-emerald-950">UANG SAKU / JAJAN ANAK</td>
                  <td className="p-1 border-b">
                    <input
                      type="text"
                      name="rt_uangSaku"
                      readOnly
                      placeholder="0"
                      value={data.rt_uangSaku || ''}
                      className="w-full px-2 py-1 border border-emerald-300 rounded text-right font-bold text-emerald-950 bg-emerald-100/70 text-xs shadow-2xs"
                    />
                  </td>
                </tr>
                <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <td className="p-2 border-b font-bold text-emerald-950">SPP PENDIDIKAN</td>
                  <td className="p-1 border-b">
                    <input
                      type="text"
                      name="rt_sppPendidikan"
                      readOnly
                      placeholder="0"
                      value={data.rt_sppPendidikan || ''}
                      className="w-full px-2 py-1 border border-emerald-300 rounded text-right font-bold text-emerald-950 bg-emerald-100/70 text-xs shadow-2xs"
                    />
                  </td>
                </tr>
                {[
                  { key: 'rt_tagihanListrik', label: 'Tagihan Listrik' },
                  { key: 'rt_tagihanPdam', label: 'Tagihan PDAM' },
                  { key: 'rt_telpPulsa', label: 'Telp / Pulsa HP' },
                  { key: 'rt_transportasi', label: 'Transportasi' },
                  { key: 'rt_kesehatan', label: 'Biaya Kesehatan' },
                  { key: 'rt_sewa', label: 'Biaya Sewa / kontrak' },
                  { key: 'rt_hutangArisan', label: 'Bayar Hutang/Arisan' },
                  { key: 'rt_pembantuLain', label: 'Pembantu RT/Lain-lain' },
                ].map((item) => (
                  <tr key={item.key} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2 border-b text-slate-700 font-medium">{item.label}</td>
                    <td className="p-1 border-b">
                      <input
                        type="text"
                        placeholder="0"
                        value={data[item.key as keyof PembiayaanData] || ''}
                        onChange={(e) => handleFormattedInput(item.key as keyof PembiayaanData, e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-900 text-white font-bold">
                  <td className="p-2 text-center uppercase tracking-wider font-bold">JUMLAH BEBAN RT</td>
                  <td className="p-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="0"
                      value={data.rt_totalBeban || ''}
                      className="w-full px-2 py-1 text-right font-black text-yellow-300 bg-transparent border-none text-xs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kolom Kanan: INFORMASI PENDIDIKAN */}
          <div className="space-y-3">
            {/* Banner Asumsi Makan */}
            <div className="bg-emerald-800 text-white p-2.5 rounded-lg flex items-center justify-between shadow-2xs">
              <span className="font-bold text-[11px] sm:text-xs tracking-wide">
                ASUMSI KEBUTUHAN MAKAN 1 ORANG / HARI :
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-200">Rp</span>
                <input
                  type="text"
                  name="asumsiMakanPerHari"
                  value={data.asumsiMakanPerHari || '15.000'}
                  onChange={(e) => handleFormattedInput('asumsiMakanPerHari', e.target.value)}
                  className="w-24 px-2 py-1 text-right font-bold text-emerald-950 bg-white rounded-md border border-emerald-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-2xs"
                />
              </div>
            </div>

            {/* Tabel Biaya Pendidikan & Uang Saku per Tingkat */}
            <div className="border border-slate-200 rounded-lg shadow-2xs overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800 text-white text-[11px] font-semibold">
                    <th colSpan={5} className="p-2 border-b border-slate-700 tracking-wide uppercase">
                      INFORMASI BIAYA PENDIDIKAN &amp; UANG SAKU
                    </th>
                  </tr>
                  <tr className="bg-slate-700 text-white text-[10px] uppercase font-medium">
                    <th className="p-1 border border-slate-600">TINGKAT</th>
                    <th className="p-1 border border-slate-600">Uang Saku</th>
                    <th className="p-1 border border-slate-600 w-12">HARI</th>
                    <th className="p-1 border border-slate-600">JUMLAH</th>
                    <th className="p-1 border border-slate-600">SPP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { key: 'tksd', label: 'TK/SD' },
                    { key: 'smp', label: 'SMP' },
                    { key: 'sma', label: 'SMA' },
                    { key: 'kuliah', label: 'D3/S1' },
                  ].map((t) => (
                    <tr key={t.key} className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-200 p-1.5 font-semibold text-slate-700">{t.label}</td>
                      <td className="border border-slate-200 p-1">
                        <input
                          type="text"
                          placeholder="0"
                          value={data[`saku_${t.key}` as keyof PembiayaanData] || ''}
                          onChange={(e) => handleFormattedInput(`saku_${t.key}` as keyof PembiayaanData, e.target.value)}
                          className="w-full px-1.5 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                        />
                      </td>
                      <td className="border border-slate-200 p-1">
                        <input
                          type="text"
                          value={data[`hari_${t.key}` as keyof PembiayaanData] || '24'}
                          onChange={(e) => onChange(`hari_${t.key}` as keyof PembiayaanData, e.target.value)}
                          className="w-full px-1 py-1 border border-slate-300 rounded text-center text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                        />
                      </td>
                      <td className="border border-slate-200 p-1">
                        <input
                          type="text"
                          readOnly
                          placeholder="0"
                          value={data[`jumlahSaku_${t.key}` as keyof PembiayaanData] || ''}
                          className="w-full px-1.5 py-1 rounded text-right font-semibold text-xs bg-emerald-50/60 text-emerald-900 border border-emerald-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-1">
                        <input
                          type="text"
                          placeholder="0"
                          value={data[`spp_${t.key}` as keyof PembiayaanData] || ''}
                          onChange={(e) => handleFormattedInput(`spp_${t.key}` as keyof PembiayaanData, e.target.value)}
                          className="w-full px-1.5 py-1 border border-slate-300 rounded text-right text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tabel Jumlah Anak per Tingkat */}
            <div className="border border-slate-200 rounded-lg shadow-2xs overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800 text-white text-[11px] font-semibold uppercase">
                    <th colSpan={2} className="p-2 border-r border-slate-700 tracking-wide">Tingkat Pendidikan Anak</th>
                    <th className="p-2 border-r border-slate-700 w-1/3 tracking-wide">Total Uang Saku</th>
                    <th className="p-2 w-1/3 tracking-wide">Total SPP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-200 p-1.5 font-semibold text-left pl-3 text-slate-700">TK/SD</td>
                    <td className="border border-slate-200 p-1 w-20">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={data.anak_tksd || ''}
                        onChange={(e) => onChange('anak_tksd', e.target.value)}
                        className="w-full px-1.5 py-1 border border-slate-300 rounded text-center text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                    <td
                      rowSpan={4}
                      className="bg-emerald-950 text-white align-middle text-center p-2.5 border border-emerald-900 font-bold"
                    >
                      <div className="text-[10px] text-emerald-300 uppercase tracking-wider mb-1">TOTAL SAKU</div>
                      <div className="text-base sm:text-lg font-black text-amber-300">{data.totalUangSakuAnak || '0'}</div>
                    </td>
                    <td
                      rowSpan={4}
                      className="bg-emerald-950 text-white align-middle text-center p-2.5 border border-emerald-900 font-bold"
                    >
                      <div className="text-[10px] text-emerald-300 uppercase tracking-wider mb-1">TOTAL SPP</div>
                      <div className="text-base sm:text-lg font-black text-amber-300">{data.totalSppAnak || '0'}</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-200 p-1.5 font-semibold text-left pl-3 text-slate-700">SMP</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={data.anak_smp || ''}
                        onChange={(e) => onChange('anak_smp', e.target.value)}
                        className="w-full px-1.5 py-1 border border-slate-300 rounded text-center text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-200 p-1.5 font-semibold text-left pl-3 text-slate-700">SMA</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={data.anak_sma || ''}
                        onChange={(e) => onChange('anak_sma', e.target.value)}
                        className="w-full px-1.5 py-1 border border-slate-300 rounded text-center text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-200 p-1.5 font-semibold text-left pl-3 text-slate-700">Kuliah</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={data.anak_kuliah || ''}
                        onChange={(e) => onChange('anak_kuliah', e.target.value)}
                        className="w-full px-1.5 py-1 border border-slate-300 rounded text-center text-xs bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 shadow-2xs"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* REKAPITULASI AKHIR / SHU NETTO */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#005a36] to-teal-950 text-white p-3.5 sm:p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-emerald-700/50">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
              Hasil Analisa Kelayakan Usaha
            </div>
            <div className="text-sm font-medium">
              Laba Usaha Bersih:{' '}
              <span className="font-bold text-yellow-300 text-base">
                Rp {data.labaUsaha || '0'}
              </span>
            </div>
          </div>

          <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-center sm:text-right backdrop-blur-xs">
            <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-medium">
              Sisa Hasil Usaha (SHU Netto)
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Rp {data.shuNetto || '0'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
