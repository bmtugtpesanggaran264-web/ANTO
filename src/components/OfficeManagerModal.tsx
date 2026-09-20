import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  UserPlus,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  MapPin,
  Phone,
  Search,
  X,
  Shield,
  Briefcase,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { KantorBMT, PetugasOffice, OfficerRole } from '../types';
import {
  getStoredOffices,
  saveStoredOffices,
  getActiveOfficeId,
  setActiveOfficeId,
  addOffice,
  updateOffice,
  deleteOffice,
  addOfficerToOffice,
  updateOfficerInOffice,
  deleteOfficerFromOffice,
  ROLE_LABELS,
  resetToDefaultOffices,
} from '../services/officeService';

interface OfficeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOfficersToForm?: (officers: {
    kcp?: string;
    aoa?: string;
    aosp?: string;
    aop?: string;
    kc?: string;
    komite?: string;
    pengurus?: string;
    namaKantor?: string;
  }) => void;
}

export const OfficeManagerModal: React.FC<OfficeManagerModalProps> = ({
  isOpen,
  onClose,
  onApplyOfficersToForm,
}) => {
  const [offices, setOffices] = useState<KantorBMT[]>([]);
  const [activeOfficeId, setActiveId] = useState<string>('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dialog states
  const [isAddOfficeOpen, setIsAddOfficeOpen] = useState<boolean>(false);
  const [editingOffice, setEditingOffice] = useState<KantorBMT | null>(null);

  const [isAddOfficerOpen, setIsAddOfficerOpen] = useState<boolean>(false);
  const [editingOfficer, setEditingOfficer] = useState<{ officeId: string; officer: PetugasOffice } | null>(null);

  // Form states for New/Edit Office
  const [officeForm, setOfficeForm] = useState({
    nama: '',
    kode: '',
    tipe: 'Capem' as 'Capem' | 'Cabang' | 'Kas',
    alamat: '',
    kota: 'Banyuwangi',
    telepon: '',
  });

  // Form states for New/Edit Officer
  const [officerForm, setOfficerForm] = useState({
    nama: '',
    role: 'AOAP' as OfficerRole,
    nip: '',
    hp: '',
    isDefault: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadData = () => {
    const list = getStoredOffices();
    setOffices(list);
    const curActive = getActiveOfficeId();
    setActiveId(curActive);
    if (!selectedOfficeId || !list.some((o) => o.id === selectedOfficeId)) {
      setSelectedOfficeId(curActive || list[0]?.id || '');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentOffice = offices.find((o) => o.id === selectedOfficeId) || offices[0];

  // Filter officers
  const filteredOfficers = (currentOffice?.petugas || []).filter((p) => {
    const matchRole = selectedRoleFilter === 'ALL' || p.role === selectedRoleFilter;
    const matchSearch =
      !searchQuery ||
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nip && p.nip.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.roleTitle && p.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchSearch;
  });

  // Count roles
  const countRole = (role: OfficerRole) => {
    return (currentOffice?.petugas || []).filter((p) => p.role === role).length;
  };

  const handleSetActiveOffice = (id: string) => {
    setActiveOfficeId(id);
    setActiveId(id);
    showNotification(`Kantor aktif diubah ke: ${offices.find((o) => o.id === id)?.nama}`);
  };

  const handleOpenAddOffice = () => {
    setEditingOffice(null);
    setOfficeForm({
      nama: '',
      kode: '',
      tipe: 'Capem',
      alamat: '',
      kota: 'Banyuwangi',
      telepon: '',
    });
    setIsAddOfficeOpen(true);
  };

  const handleOpenEditOffice = (office: KantorBMT) => {
    setEditingOffice(office);
    setOfficeForm({
      nama: office.nama,
      kode: office.kode,
      tipe: office.tipe,
      alamat: office.alamat || '',
      kota: office.kota || 'Banyuwangi',
      telepon: office.telepon || '',
    });
    setIsAddOfficeOpen(true);
  };

  const handleSaveOffice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeForm.nama.trim() || !officeForm.kode.trim()) {
      alert('Nama dan Kode Kantor wajib diisi.');
      return;
    }

    if (editingOffice) {
      updateOffice(editingOffice.id, officeForm);
      showNotification(`Kantor ${officeForm.nama} berhasil diperbarui.`);
    } else {
      const created = addOffice(officeForm);
      setSelectedOfficeId(created.id);
      showNotification(`Kantor baru ${officeForm.nama} (${officeForm.kode}) berhasil ditambahkan.`);
    }
    setIsAddOfficeOpen(false);
    loadData();
  };

  const handleDeleteOffice = (id: string, nama: string) => {
    if (offices.length <= 1) {
      alert('Minimal harus ada 1 kantor terdaftar.');
      return;
    }
    if (confirm(`Hapus kantor "${nama}" beserta seluruh petugas di dalamnya?`)) {
      try {
        deleteOffice(id);
        showNotification(`Kantor ${nama} telah dihapus.`);
        loadData();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  // Officer Form Handlers
  const handleOpenAddOfficer = (presetRole?: OfficerRole) => {
    setEditingOfficer(null);
    setOfficerForm({
      nama: '',
      role: presetRole || 'AOAP',
      nip: '',
      hp: '',
      isDefault: true,
    });
    setIsAddOfficerOpen(true);
  };

  const handleOpenEditOfficer = (officer: PetugasOffice) => {
    if (!currentOffice) return;
    setEditingOfficer({ officeId: currentOffice.id, officer });
    setOfficerForm({
      nama: officer.nama,
      role: officer.role,
      nip: officer.nip || '',
      hp: officer.hp || '',
      isDefault: Boolean(officer.isDefault),
    });
    setIsAddOfficerOpen(true);
  };

  const handleSaveOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerForm.nama.trim()) {
      alert('Nama Petugas wajib diisi.');
      return;
    }
    if (!currentOffice) return;

    const roleInfo = ROLE_LABELS[officerForm.role];
    const roleTitle = roleInfo ? roleInfo.label : officerForm.role;

    if (editingOfficer) {
      updateOfficerInOffice(currentOffice.id, editingOfficer.officer.id, {
        nama: officerForm.nama.trim(),
        role: officerForm.role,
        roleTitle,
        nip: officerForm.nip.trim(),
        hp: officerForm.hp.trim(),
        isDefault: officerForm.isDefault,
      });
      showNotification(`Data petugas ${officerForm.nama} berhasil diperbarui.`);
    } else {
      addOfficerToOffice(currentOffice.id, {
        nama: officerForm.nama.trim(),
        role: officerForm.role,
        roleTitle,
        nip: officerForm.nip.trim(),
        hp: officerForm.hp.trim(),
        isDefault: officerForm.isDefault,
      });
      showNotification(`Petugas ${officerForm.nama} (${officerForm.role}) berhasil ditambahkan ke ${currentOffice.nama}.`);
    }

    setIsAddOfficerOpen(false);
    loadData();
  };

  const handleDeleteOfficer = (officerId: string, nama: string) => {
    if (!currentOffice) return;
    if (confirm(`Hapus petugas "${nama}" dari kantor ${currentOffice.nama}?`)) {
      deleteOfficerFromOffice(currentOffice.id, officerId);
      showNotification(`Petugas ${nama} telah dihapus.`);
      loadData();
    }
  };

  const handleApplyToForm = () => {
    if (!currentOffice || !onApplyOfficersToForm) return;

    const kcp = currentOffice.petugas.find((p) => p.role === 'KCP')?.nama || '';
    const aoa = currentOffice.petugas.find((p) => p.role === 'AOAP')?.nama || '';
    const aosp = currentOffice.petugas.find((p) => p.role === 'AOSP')?.nama || '';
    const aop = currentOffice.petugas.find((p) => p.role === 'AOP')?.nama || '';
    const kc = currentOffice.petugas.find((p) => p.role === 'KC')?.nama || '';
    const komite = currentOffice.petugas.find((p) => p.role === 'KOMITE')?.nama || '';
    const pengurus = currentOffice.petugas.find((p) => p.role === 'PENGURUS')?.nama || '';

    onApplyOfficersToForm({
      kcp,
      aoa,
      aosp,
      aop,
      kc,
      komite,
      pengurus,
      namaKantor: `${currentOffice.nama} (${currentOffice.kode})`,
    });

    showNotification(`Petugas dari ${currentOffice.nama} berhasil diterapkan ke formulir.`);
    onClose();
  };

  const handleResetDefaults = () => {
    if (confirm('Kembalikan data kantor dan petugas ke setelan default BMT UGT Nusantara?')) {
      resetToDefaultOffices();
      loadData();
      showNotification('Daftar kantor dan petugas berhasil direset ke default.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in duration-200">
        {/* Header Dialog */}
        <div className="bg-gradient-to-r from-[#005a36] via-[#047857] to-[#065f46] text-white px-5 py-4 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-800/80 border border-emerald-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-wide">
                  Manajemen Kantor &amp; Petugas BMT
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-400 text-emerald-950 rounded-full uppercase tracking-wider">
                  KSPPS BMT UGT
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Kelola Kantor Capem/Cabang serta daftar Petugas AOAP, KCP, AOSP, AOP, dan Kepala Cabang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              title="Reset ke Default BMT"
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-md transition text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between animate-pulse">
            <span>{notification}</span>
            <button type="button" onClick={() => setNotification(null)} className="text-emerald-100 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Modal Body - 2 Columns */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* LEFT COLUMN: Daftar Kantor */}
          <div className="w-full md:w-80 bg-slate-50 flex flex-col shrink-0 border-r border-gray-200">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Daftar Kantor ({offices.length})
                </span>
              </div>
              <button
                type="button"
                onClick={handleOpenAddOffice}
                className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-sm flex items-center gap-1 transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kantor</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-56 md:max-h-none">
              {offices.map((office) => {
                const isSelected = office.id === currentOffice?.id;
                const isActive = office.id === activeOfficeId;

                return (
                  <div
                    key={office.id}
                    onClick={() => setSelectedOfficeId(office.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-sm text-gray-900">{office.nama}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                            #{office.kode}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {office.alamat || `${office.tipe} ${office.kota || 'Banyuwangi'}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditOffice(office);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"
                          title="Edit Kantor"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {offices.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteOffice(office.id, office.nama);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"
                            title="Hapus Kantor"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-600" />
                        {office.petugas?.length || 0} Petugas
                      </span>
                      {!isActive && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetActiveOffice(office.id);
                          }}
                          className="text-[10px] text-emerald-700 hover:underline font-semibold"
                        >
                          Jadikan Kantor Utama
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Detail Kantor & Manajemen Petugas */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {currentOffice ? (
              <>
                {/* Office Header Card */}
                <div className="p-4 bg-gradient-to-r from-emerald-50/60 to-white border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          {currentOffice.nama}
                        </h3>
                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-700 text-white">
                          Kode: {currentOffice.kode}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-gray-100 text-gray-700 border border-gray-300">
                          Tipe: {currentOffice.tipe}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1 flex-wrap">
                        {currentOffice.alamat && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {currentOffice.alamat}
                          </span>
                        )}
                        {currentOffice.telepon && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {currentOffice.telepon}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleApplyToForm}
                        className="px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md shadow-sm transition flex items-center gap-1.5"
                        title="Terapkan nama petugas kantor ini langsung ke inputan form pembiayaan"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Isi ke Form</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenAddOfficer()}
                        className="px-3 py-1.5 text-xs font-bold bg-[#005a36] hover:bg-emerald-800 text-white rounded-md shadow-sm transition flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>+ Tambah Petugas</span>
                      </button>
                    </div>
                  </div>

                  {/* Role Quick Cards (KCP, AOAP, AOSP, AOP, PENGURUS, KC) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
                    {(['KCP', 'AOAP', 'AOSP', 'AOP', 'PENGURUS', 'KC'] as OfficerRole[]).map((role) => {
                      const count = countRole(role);
                      const roleMeta = ROLE_LABELS[role];
                      const firstOfficer = currentOffice.petugas.find((p) => p.role === role);

                      return (
                        <div
                          key={role}
                          onClick={() => setSelectedRoleFilter(role === selectedRoleFilter ? 'ALL' : role)}
                          className={`p-2 rounded border cursor-pointer transition text-left ${
                            selectedRoleFilter === role
                              ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-gray-700">{role}</span>
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${roleMeta.color}`}>
                              {count}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-gray-900 truncate mt-0.5">
                            {firstOfficer ? firstOfficer.nama : <span className="text-gray-400 italic">Belum ada</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-3 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-2">
                  {/* Role Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
                    {[
                      { id: 'ALL', label: 'Semua Peran' },
                      { id: 'PENGURUS', label: 'Wakil Pengurus' },
                      { id: 'AOSP', label: 'AOSP (Simpanan)' },
                      { id: 'AOAP', label: 'AOAP / AOA' },
                      { id: 'KCP', label: 'KCP' },
                      { id: 'AOP', label: 'AOP' },
                      { id: 'KC', label: 'Kepala Cabang' },
                      { id: 'KOMITE', label: 'Komite' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedRoleFilter(tab.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                          selectedRoleFilter === tab.id
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search box */}
                  <div className="relative w-full sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari nama atau NIP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Officers Table / List */}
                <div className="flex-1 overflow-y-auto p-3">
                  {filteredOfficers.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 border border-dashed border-gray-200 rounded-lg">
                      <Users className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-semibold text-gray-700">Belum ada petugas yang sesuai.</p>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        Klik tombol di bawah untuk menambahkan petugas (AOAP, KCP, AOSP, AOP, dll.) untuk kantor ini.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenAddOfficer(selectedRoleFilter !== 'ALL' ? (selectedRoleFilter as OfficerRole) : 'AOAP')}
                        className="mt-3 px-3 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow inline-flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Tambah Petugas Sekarang</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredOfficers.map((petugas) => {
                        const meta = ROLE_LABELS[petugas.role] || ROLE_LABELS.LAINNYA;

                        return (
                          <div
                            key={petugas.id}
                            className="p-3 rounded-lg border border-gray-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/20 transition flex items-center justify-between gap-3 shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-extrabold text-xs">
                                {petugas.nama.charAt(0).toUpperCase()}
                              </div>

                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-gray-900">{petugas.nama}</span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${meta.color}`}>
                                    {meta.label}
                                  </span>
                                  {petugas.isDefault && (
                                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                      Default
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-0.5 flex-wrap">
                                  {petugas.nip && (
                                    <span>
                                      NIP: <strong className="text-gray-700">{petugas.nip}</strong>
                                    </span>
                                  )}
                                  {petugas.hp && (
                                    <span className="flex items-center gap-1">
                                      <Phone className="w-3 h-3 text-gray-400" />
                                      {petugas.hp}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleOpenEditOfficer(petugas)}
                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit Petugas"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteOfficer(petugas.id, petugas.nama)}
                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                                title="Hapus Petugas"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">Pilih kantor terlebih dahulu.</div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="text-xs text-gray-500">
            Kantor Aktif Formulir:{' '}
            <strong className="text-emerald-800">
              {offices.find((o) => o.id === activeOfficeId)?.nama || '-'}
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
            >
              Tutup
            </button>
            {onApplyOfficersToForm && (
              <button
                type="button"
                onClick={handleApplyToForm}
                className="px-4 py-1.5 text-xs font-bold bg-[#005a36] hover:bg-emerald-800 text-white rounded-md shadow transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Terapkan Petugas ke Formulir</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Form Tambah/Edit Kantor */}
      {isAddOfficeOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in">
            <div className="bg-[#005a36] text-white px-4 py-3 flex items-center justify-between">
              <h4 className="font-bold text-sm">
                {editingOffice ? 'Edit Kantor BMT' : 'Tambah Kantor / Capem Baru'}
              </h4>
              <button
                type="button"
                onClick={() => setIsAddOfficeOpen(false)}
                className="text-emerald-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOffice} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Kantor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Capem Siliragung / Capem Pesanggaran"
                  value={officeForm.nama}
                  onChange={(e) => setOfficeForm({ ...officeForm, nama: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kode Kantor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 264"
                    value={officeForm.kode}
                    onChange={(e) => setOfficeForm({ ...officeForm, kode: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipe Kantor</label>
                  <select
                    value={officeForm.tipe}
                    onChange={(e) => setOfficeForm({ ...officeForm, tipe: e.target.value as any })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Capem">Capem (Cabang Pembantu)</option>
                    <option value="Cabang">Kantor Cabang</option>
                    <option value="Kas">Kantor Kas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Kantor</label>
                <input
                  type="text"
                  placeholder="Jl. Raya Pesanggaran, Banyuwangi"
                  value={officeForm.alamat}
                  onChange={(e) => setOfficeForm({ ...officeForm, alamat: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kota / Wilayah</label>
                  <input
                    type="text"
                    value={officeForm.kota}
                    onChange={(e) => setOfficeForm({ ...officeForm, kota: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Telepon Kantor</label>
                  <input
                    type="text"
                    placeholder="(0333) 710264"
                    value={officeForm.telepon}
                    onChange={(e) => setOfficeForm({ ...officeForm, telepon: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOfficeOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#005a36] hover:bg-emerald-800 text-white rounded shadow"
                >
                  Simpan Kantor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Form Tambah/Edit Petugas (AOAP, KCP, AOSP, AOP, dll) */}
      {isAddOfficerOpen && currentOffice && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in">
            <div className="bg-[#005a36] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">
                  {editingOfficer ? 'Edit Data Petugas' : 'Tambah Petugas Baru'}
                </h4>
                <p className="text-[11px] text-emerald-200">
                  Untuk kantor: <strong>{currentOffice.nama} ({currentOffice.kode})</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOfficerOpen(false)}
                className="text-emerald-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOfficer} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Jabatan / Posisi Petugas <span className="text-red-500">*</span>
                </label>
                <select
                  value={officerForm.role}
                  onChange={(e) => setOfficerForm({ ...officerForm, role: e.target.value as OfficerRole })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 font-bold text-gray-900 bg-emerald-50/50"
                >
                  <option value="KCP">👑 Kepala Capem (KCP)</option>
                  <option value="AOAP">💼 AO Pembiayaan (AOAP / AOA)</option>
                  <option value="AOSP">💳 AO Simpanan &amp; Pelayanan (AOSP)</option>
                  <option value="AOP">📋 AO Penagihan &amp; Pendanaan (AOP)</option>
                  <option value="KC">🏢 Kepala Cabang (KC)</option>
                  <option value="KOMITE">⚖️ Wakil Ketua Komite</option>
                  <option value="PENGURUS">🏛️ Wakil Pengurus</option>
                  <option value="LAINNYA">👤 Staf / Petugas Lainnya</option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  {ROLE_LABELS[officerForm.role]?.desc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Lengkap Petugas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Fauzi, S.E.I."
                  value={officerForm.nama}
                  onChange={(e) => setOfficerForm({ ...officerForm, nama: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">NIP / Kode Petugas</label>
                  <input
                    type="text"
                    placeholder={`UGT-${currentOffice.kode}-001`}
                    value={officerForm.nip}
                    onChange={(e) => setOfficerForm({ ...officerForm, nip: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">No. HP / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="081234567890"
                    value={officerForm.hp}
                    onChange={(e) => setOfficerForm({ ...officerForm, hp: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={officerForm.isDefault}
                    onChange={(e) => setOfficerForm({ ...officerForm, isDefault: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-gray-700 font-medium">
                    Jadikan default untuk posisi {officerForm.role} di kantor ini
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOfficerOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#005a36] hover:bg-emerald-800 text-white rounded shadow"
                >
                  Simpan Petugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
