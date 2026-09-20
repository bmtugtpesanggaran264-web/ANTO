import React, { useState, useEffect } from 'react';
import { Building2, Sparkles, Plus, ChevronDown, Landmark, ReceiptText } from 'lucide-react';
import { PembiayaanData, KantorBMT, PetugasOffice } from '../types';
import { formatInputNominal, formatNoRekening } from '../utils/formatters';
import {
  getStoredOffices,
  getActiveOfficeId,
  setActiveOfficeId,
  getAllOfficersByRole,
} from '../services/officeService';

interface RealisasiSectionProps {
  data: PembiayaanData;
  onChange: (field: keyof PembiayaanData, value: any) => void;
  onOpenOfficeManager?: () => void;
}

interface OfficerPickerFieldProps {
  label: string;
  badge: string;
  badgeColor: string;
  fieldName: keyof PembiayaanData;
  value: string;
  placeholder: string;
  currentOfficeName: string;
  officeOfficers: PetugasOffice[];
  allOfficers: PetugasOffice[];
  onChange: (field: keyof PembiayaanData, value: any) => void;
  onOpenOfficeManager?: () => void;
  datalistId: string;
}

const OfficerPickerField: React.FC<OfficerPickerFieldProps> = ({
  label,
  badge,
  badgeColor,
  fieldName,
  value,
  placeholder,
  currentOfficeName,
  officeOfficers,
  allOfficers,
  onChange,
  onOpenOfficeManager,
  datalistId,
}) => {
  const otherOfficers = allOfficers.filter(
    (allP) => !officeOfficers.some((oP) => oP.nama.trim().toLowerCase() === allP.nama.trim().toLowerCase())
  );

  return (
    <div className="flex items-center">
      <label className="w-2/5 font-semibold text-slate-700 text-xs sm:text-[13px] flex items-center justify-between pr-1">
        <span>{label}</span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs no-print ${badgeColor}`}>
          {badge}
        </span>
      </label>
      <span className="w-4 font-bold text-slate-400 text-center">:</span>
      <div className="w-[58%] relative flex items-center">
        <input
          type="text"
          list={datalistId}
          name={String(fieldName)}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          className="w-full px-2.5 py-1.5 pr-8 text-xs sm:text-sm border border-emerald-300 rounded-md bg-emerald-50/70 hover:bg-emerald-50/90 text-emerald-950 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all shadow-2xs"
        />

        {/* Dropdown Selector Button & Native Select Overlay */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-1 no-print">
          <div
            className="relative flex items-center justify-center w-6 h-6 rounded hover:bg-emerald-200/60 text-emerald-950 transition cursor-pointer"
            title={`Klik untuk memilih atau mengganti ${label}`}
          >
            <ChevronDown className="w-3.5 h-3.5 pointer-events-none text-emerald-800" />
            <select
              aria-label={`Pilih ${label}`}
              value=""
              onChange={(e) => {
                if (e.target.value === '__MANAGE__') {
                  if (onOpenOfficeManager) onOpenOfficeManager();
                } else if (e.target.value) {
                  onChange(fieldName, e.target.value);
                }
              }}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            >
              <option value="">-- Pilih {label} --</option>
              {officeOfficers.length > 0 && (
                <optgroup label={`📍 Petugas ${currentOfficeName || 'Kantor Ini'}`}>
                  {officeOfficers.map((p) => (
                    <option key={`off_${p.id}`} value={p.nama}>
                      {p.nama} {p.nip ? `[NIP: ${p.nip}]` : ''}
                    </option>
                  ))}
                </optgroup>
              )}
              {otherOfficers.length > 0 && (
                <optgroup label="🏢 Dari Kantor / Cabang Lain">
                  {otherOfficers.map((p) => (
                    <option key={`all_${p.id}`} value={p.nama}>
                      {p.nama} {p.nip ? `[NIP: ${p.nip}]` : ''}
                    </option>
                  ))}
                </optgroup>
              )}
              {onOpenOfficeManager && (
                <option value="__MANAGE__">⚙️ Kelola / Tambah {label} Baru...</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RealisasiSection: React.FC<RealisasiSectionProps> = ({
  data,
  onChange,
  onOpenOfficeManager,
}) => {
  const [offices, setOffices] = useState<KantorBMT[]>([]);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('');

  const loadOffices = () => {
    const list = getStoredOffices();
    setOffices(list);
    const activeId = getActiveOfficeId();
    setSelectedOfficeId(activeId || list[0]?.id || '');
  };

  useEffect(() => {
    loadOffices();
  }, []);

  const handleFormattedInput = (field: keyof PembiayaanData, raw: string) => {
    const formatted = formatInputNominal(raw);
    onChange(field, formatted);
  };

  const handleRekeningInput = (field: keyof PembiayaanData, raw: string) => {
    const formatted = formatNoRekening(raw);
    onChange(field, formatted);
  };

  const currentOffice = offices.find((o) => o.id === selectedOfficeId) || offices[0];

  const handleSwitchOffice = (officeId: string) => {
    setSelectedOfficeId(officeId);
    setActiveOfficeId(officeId);
  };

  const handleAutoFillOfficers = () => {
    if (!currentOffice) return;

    const kcp = currentOffice.petugas.find((p) => p.role === 'KCP')?.nama || '';
    const aoa = currentOffice.petugas.find((p) => p.role === 'AOAP')?.nama || '';
    const aosp = currentOffice.petugas.find((p) => p.role === 'AOSP')?.nama || '';
    const aop = currentOffice.petugas.find((p) => p.role === 'AOP')?.nama || '';
    const kc = currentOffice.petugas.find((p) => p.role === 'KC')?.nama || '';
    const pengurus = currentOffice.petugas.find((p) => p.role === 'PENGURUS')?.nama || '';
    const komite = currentOffice.petugas.find((p) => p.role === 'KOMITE')?.nama || '';

    if (kcp) onChange('kepalaCapem', kcp);
    if (aoa) onChange('petugasAoa', aoa);
    if (aosp) onChange('petugasAosp', aosp);
    if (aop) onChange('petugasAop', aop);
    if (kc) onChange('kepalaCabang', kc);
    if (pengurus) onChange('wakilPengurus', pengurus);
    if (komite) onChange('wakilKomite', komite);
  };

  // Lists for datalists
  const kcpList = currentOffice?.petugas.filter((p) => p.role === 'KCP') || [];
  const aoapList = currentOffice?.petugas.filter((p) => p.role === 'AOAP') || [];
  const aospList = currentOffice?.petugas.filter((p) => p.role === 'AOSP') || [];
  const aopList = currentOffice?.petugas.filter((p) => p.role === 'AOP') || [];
  const kcList = currentOffice?.petugas.filter((p) => p.role === 'KC') || [];
  const pengurusList = currentOffice?.petugas.filter((p) => p.role === 'PENGURUS') || [];
  const komiteList = currentOffice?.petugas.filter((p) => p.role === 'KOMITE') || [];

  // All officers across all offices for dropdown selection and fallback
  const allKcp = getAllOfficersByRole('KCP');
  const allAoap = getAllOfficersByRole('AOAP');
  const allAosp = getAllOfficersByRole('AOSP');
  const allAop = getAllOfficersByRole('AOP');
  const allKc = getAllOfficersByRole('KC');
  const allPengurus = getAllOfficersByRole('PENGURUS');
  const allKomite = getAllOfficersByRole('KOMITE');

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#005a36] via-[#00683f] to-[#004d2e] text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-emerald-300" />
          <span>REALISASI PEMBIAYAAN</span>
        </div>
        <span className="text-[10px] font-normal lowercase tracking-normal text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 hidden sm:inline">
          data akad &amp; pejabat pembiayaan
        </span>
      </div>

      {/* Interactive Office & Officer Selector Toolbar (Hidden on print) */}
      <div className="bg-emerald-50/70 border-b border-emerald-200/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 no-print">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Pilih Kantor BMT:</span>
          </div>

          <select
            value={selectedOfficeId}
            onChange={(e) => handleSwitchOffice(e.target.value)}
            className="text-xs font-bold px-2.5 py-1.5 rounded-md bg-white border border-emerald-300 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shadow-2xs"
          >
            {offices.map((off) => (
              <option key={off.id} value={off.id}>
                {off.nama} (#{off.kode}) - {off.tipe}
              </option>
            ))}
          </select>

          {currentOffice && (
            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300 shadow-2xs hidden sm:inline">
              {currentOffice.petugas.length} Petugas Terdaftar
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleAutoFillOfficers}
            className="px-2.5 py-1 text-xs font-bold bg-[#005a36] hover:bg-emerald-800 text-white rounded-md shadow-xs flex items-center gap-1.5 transition active:scale-95"
            title="Isi otomatis seluruh petugas (KCP, AOAP, AOSP, AOP, KC) dari kantor yang dipilih ke kolom formulir di bawah"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Terapkan Petugas Kantor Ini</span>
          </button>

          {onOpenOfficeManager && (
            <button
              type="button"
              onClick={onOpenOfficeManager}
              className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-md shadow-2xs flex items-center gap-1 transition"
              title="Tambah AOAP, KCP, AOSP baru atau kelola kantor"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-700" />
              <span>Kelola / Tambah Petugas</span>
            </button>
          )}
        </div>
      </div>

      {/* Datalists for input suggestions */}
      <datalist id="list-kcp">
        {kcpList.map((p) => (
          <option key={p.id} value={p.nama}>
            {p.nip ? `NIP: ${p.nip}` : 'Kepala Capem'}
          </option>
        ))}
      </datalist>

      <datalist id="list-aoap">
        {aoapList.map((p) => (
          <option key={p.id} value={p.nama}>
            {p.nip ? `NIP: ${p.nip}` : 'AO Pembiayaan'}
          </option>
        ))}
      </datalist>

      <datalist id="list-aosp">
        {aospList.map((p) => (
          <option key={p.id} value={p.nama}>
            {p.nip ? `NIP: ${p.nip}` : 'AO Simpanan'}
          </option>
        ))}
      </datalist>

      <datalist id="list-aop">
        {aopList.map((p) => (
          <option key={p.id} value={p.nama}>
            {p.nip ? `NIP: ${p.nip}` : 'AO Penagihan'}
          </option>
        ))}
      </datalist>

      <datalist id="list-kc">
        {kcList.map((p) => (
          <option key={p.id} value={p.nama}>
            {p.nip ? `NIP: ${p.nip}` : 'Kepala Cabang'}
          </option>
        ))}
      </datalist>

      <datalist id="list-pengurus">
        {pengurusList.map((p) => (
          <option key={p.id} value={p.nama}>
            Wakil Pengurus
          </option>
        ))}
      </datalist>

      <datalist id="list-komite">
        {komiteList.map((p) => (
          <option key={p.id} value={p.nama}>
            Wakil Ketua Komite
          </option>
        ))}
      </datalist>

      {/* Form Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 sm:p-5 text-xs sm:text-[13px]">
        {/* Kolom Kiri */}
        <div className="space-y-2">
          {/* Rek. Tabungan - Format 000.00.000000.00 */}
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700 flex items-center justify-between pr-1">
              <span>Rek. Tabungan</span>
              <span className="text-[9px] font-mono text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded border border-emerald-200 no-print">
                000.00.000000.00
              </span>
            </label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="rekTabungan"
                placeholder="000.00.000000.00"
                value={data.rekTabungan || ''}
                onChange={(e) => handleRekeningInput('rekTabungan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide font-semibold text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Rek. Pembiayaan - Format 000.00.000000.00 */}
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700 flex items-center justify-between pr-1">
              <span>Rek. Pembiayaan</span>
              <span className="text-[9px] font-mono text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded border border-emerald-200 no-print">
                000.00.000000.00
              </span>
            </label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="rekPembiayaan"
                placeholder="000.00.000000.00"
                value={data.rekPembiayaan || ''}
                onChange={(e) => handleRekeningInput('rekPembiayaan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wide font-semibold text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tgl Permohonan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="date"
                name="tglPermohonan"
                value={data.tglPermohonan || ''}
                onChange={(e) => onChange('tglPermohonan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tgl Survey</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="date"
                name="tglSurvey"
                value={data.tglSurvey || ''}
                onChange={(e) => onChange('tglSurvey', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tgl Realisasi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="date"
                name="tglRealisasi"
                value={data.tglRealisasi || ''}
                onChange={(e) => onChange('tglRealisasi', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Tgl Jatuh Tempo</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="date"
                id="tglJatuhTempo"
                name="tglJatuhTempo"
                readOnly
                value={data.tglJatuhTempo || ''}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-300 rounded-md bg-emerald-50/80 text-emerald-950 font-bold focus:outline-none shadow-2xs cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jumlah Realisasi</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                id="jumlahRealisasi"
                name="jumlahRealisasi"
                placeholder="0"
                value={data.jumlahRealisasi || ''}
                onChange={(e) => handleFormattedInput('jumlahRealisasi', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/90 text-emerald-950 font-bold text-right focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Jangka Waktu (Bulan)</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="number"
                id="jangkaWaktu"
                name="jangkaWaktu"
                min="1"
                placeholder="0"
                value={data.jangkaWaktu ?? ''}
                onChange={(e) => onChange('jangkaWaktu', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Margin Perbulan (%)</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                name="marginPersen"
                placeholder="Contoh: 1.2 atau 1,2"
                value={data.marginPersen || ''}
                onChange={(e) => onChange('marginPersen', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Akad Pembiayaan</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="akadPembiayaan"
                value={data.akadPembiayaan || 'MURABAHAH'}
                onChange={(e) => onChange('akadPembiayaan', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="MURABAHAH">MURABAHAH</option>
                <option value="IJARAH">IJARAH</option>
                <option value="MUSYARAKAH">MUSYARAKAH</option>
                <option value="MUDHARABAH">MUDHARABAH</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Skema Angsuran</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <select
                name="skemaAngsuran"
                value={data.skemaAngsuran || 'Pokok dan Margin'}
                onChange={(e) => onChange('skemaAngsuran', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-2xs"
              >
                <option value="Pokok dan Margin">Pokok dan Margin</option>
                <option value="Margin Saja">Margin Saja</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Margin Nominal</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                id="marginNominal"
                name="marginNominal"
                readOnly
                placeholder="0"
                value={data.marginNominal || ''}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/90 text-emerald-950 font-bold text-right focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Total Margin</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                id="totalMargin"
                name="totalMargin"
                readOnly
                placeholder="0"
                value={data.totalMargin || ''}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/90 text-emerald-950 font-bold text-right focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-2/5 font-semibold text-slate-700">Harga Jual / Piutang</label>
            <span className="w-4 font-bold text-slate-400 text-center">:</span>
            <div className="w-[58%]">
              <input
                type="text"
                id="hargaJual"
                name="hargaJual"
                readOnly
                placeholder="0"
                value={data.hargaJual || ''}
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/90 text-emerald-950 font-bold text-right focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label className="w-2/5 font-semibold text-slate-700">Angsuran Perbulan</label>
              <span className="w-4 font-bold text-slate-400 text-center">:</span>
              <div className="w-[58%]">
                <input
                  type="text"
                  id="angsuranPerbulan"
                  name="angsuranPerbulan"
                  readOnly
                  placeholder="0"
                  value={data.angsuranPerbulan || ''}
                  className="w-full px-2.5 py-1.5 text-xs sm:text-sm border border-emerald-400 rounded-md bg-emerald-50/90 text-emerald-950 font-bold text-right focus:outline-none shadow-2xs"
                />
              </div>
            </div>
            {data.terbilangAngsuran && (
              <div className="text-[11px] text-right italic font-medium text-emerald-800 pr-1 mt-1">
                {data.terbilangAngsuran}
              </div>
            )}
          </div>

          {/* KEPALA CABANG */}
          <OfficerPickerField
            label="Kepala Cabang"
            badge="KC"
            badgeColor="text-indigo-700 bg-indigo-50 border border-indigo-200"
            fieldName="kepalaCabang"
            value={data.kepalaCabang || ''}
            placeholder="Pilih atau ketik nama Kepala Cabang"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={kcList}
            allOfficers={allKc}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-kc"
          />

          {/* WAKIL PENGURUS */}
          <OfficerPickerField
            label="Wakil Pengurus"
            badge="PENGURUS"
            badgeColor="text-teal-700 bg-teal-50 border border-teal-200"
            fieldName="wakilPengurus"
            value={data.wakilPengurus || ''}
            placeholder="Pilih atau ketik nama Wakil Pengurus"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={pengurusList}
            allOfficers={allPengurus}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-pengurus"
          />

          {/* WAKIL KETUA KOMITE */}
          <OfficerPickerField
            label="Wakil Ketua Komite"
            badge="KOMITE"
            badgeColor="text-rose-700 bg-rose-50 border border-rose-200"
            fieldName="wakilKomite"
            value={data.wakilKomite || ''}
            placeholder="Pilih atau ketik nama Komite"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={komiteList}
            allOfficers={allKomite}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-komite"
          />

          {/* KEPALA CAPEM (KCP) */}
          <OfficerPickerField
            label="Kepala Capem"
            badge="KCP"
            badgeColor="text-emerald-800 bg-emerald-100 border border-emerald-300"
            fieldName="kepalaCapem"
            value={data.kepalaCapem || ''}
            placeholder="Pilih atau ketik nama Kepala Capem (KCP)"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={kcpList}
            allOfficers={allKcp}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-kcp"
          />

          {/* AOA / AOAP */}
          <OfficerPickerField
            label="AOA"
            badge="AOAP"
            badgeColor="text-blue-800 bg-blue-100 border border-blue-300"
            fieldName="petugasAoa"
            value={data.petugasAoa || ''}
            placeholder="Pilih atau ketik nama AOAP / AOA"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={aoapList}
            allOfficers={allAoap}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-aoap"
          />

          {/* AOP */}
          <OfficerPickerField
            label="AOP"
            badge="AOP"
            badgeColor="text-amber-800 bg-amber-100 border border-amber-300"
            fieldName="petugasAop"
            value={data.petugasAop || ''}
            placeholder="Pilih atau ketik nama AOP (Penagihan)"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={aopList}
            allOfficers={allAop}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-aop"
          />

          {/* AOSP */}
          <OfficerPickerField
            label="AOSP"
            badge="AOSP"
            badgeColor="text-purple-800 bg-purple-100 border border-purple-300"
            fieldName="petugasAosp"
            value={data.petugasAosp || ''}
            placeholder="Pilih atau ketik nama AOSP (Simpanan)"
            currentOfficeName={currentOffice?.nama || ''}
            officeOfficers={aospList}
            allOfficers={allAosp}
            onChange={onChange}
            onOpenOfficeManager={onOpenOfficeManager}
            datalistId="list-aosp"
          />
        </div>
      </div>
    </div>
  );
};
