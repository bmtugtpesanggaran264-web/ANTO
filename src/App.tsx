import React, { useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { PembiayaanData, GoogleSheetsConfig, KantorBMT } from './types';
import {
  getDefaultPembiayaanData,
  recalculateAll,
} from './utils/calculations';
import {
  getStoredConfig,
  saveStoredConfig,
  saveLocalRecord,
  getLocalRecords,
  deleteLocalRecord,
  syncDataToGoogleSheets,
  deleteRecordFromGoogleSheets,
} from './services/sheetsService';
import { getActiveOffice } from './services/officeService';
import { auth, signInWithGooglePopup, signOutGoogle } from './lib/firebase';

import { HeaderBanner } from './components/HeaderBanner';
import { Sidebar } from './components/Sidebar';
import { OfficeManagerModal } from './components/OfficeManagerModal';
import { DebiturSection } from './components/DebiturSection';
import { PenjaminSection } from './components/PenjaminSection';
import { RealisasiSection } from './components/RealisasiSection';
import { AgunanSection } from './components/AgunanSection';
import { AnalisaSection } from './components/AnalisaSection';
import { GoogleSheetModal } from './components/GoogleSheetModal';
import { RecordsViewerModal } from './components/RecordsViewerModal';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Save,
  Eye,
  FileText,
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PembiayaanData>(() => {
    const savedDraft = localStorage.getItem('bmt_form_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        return recalculateAll(parsed);
      } catch (e) {
        console.error('Error parsing draft:', e);
      }
    }
    return recalculateAll(getDefaultPembiayaanData());
  });

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem('google_access_token');
  });
  const [config, setConfig] = useState<GoogleSheetsConfig | null>(() => getStoredConfig());
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Office state
  const [activeOffice, setActiveOffice] = useState<KantorBMT | null>(() => getActiveOffice());

  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Modals
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState<boolean>(false);
  const [isOfficeManagerOpen, setIsOfficeManagerOpen] = useState<boolean>(false);

  // Active form section (controls which form is visible: 'section-debitur' | 'section-penjamin' | 'section-realisasi' | 'section-agunan' | 'section-analisa' | 'all')
  const [activeSection, setActiveSection] = useState<string>('section-debitur');

  const FORM_SECTIONS = [
    { id: 'section-debitur', title: '1. Data Debitur', shortTitle: 'Debitur', step: 1 },
    { id: 'section-penjamin', title: '2. Data Penjamin', shortTitle: 'Penjamin', step: 2 },
    { id: 'section-realisasi', title: '3. Realisasi Pembiayaan', shortTitle: 'Realisasi', step: 3 },
    { id: 'section-agunan', title: '4. Agunan & Jaminan', shortTitle: 'Agunan', step: 4 },
    { id: 'section-analisa', title: '5. Analisa Kapasitas Usaha', shortTitle: 'Analisa Usaha', step: 5 },
  ];

  const currentSectionIndex = FORM_SECTIONS.findIndex((s) => s.id === activeSection);

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      const prevSec = FORM_SECTIONS[currentSectionIndex - 1];
      setActiveSection(prevSec.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex >= 0 && currentSectionIndex < FORM_SECTIONS.length - 1) {
      const nextSec = FORM_SECTIONS[currentSectionIndex + 1];
      setActiveSection(nextSec.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync draft to local storage
  useEffect(() => {
    try {
      localStorage.setItem('bmt_form_draft', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save form draft', e);
    }
  }, [data]);

  // Refresh active office
  const refreshActiveOffice = useCallback(() => {
    const current = getActiveOffice();
    setActiveOffice(current);
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setAccessToken(null);
        sessionStorage.removeItem('google_access_token');
      }
    });
    return () => unsubscribe();
  }, []);

  // Update field and recalculate values immediately
  const handleFieldChange = useCallback((field: keyof PembiayaanData, value: any) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      return recalculateAll(updated);
    });
  }, []);

  // Quick apply active office officers to form
  const handleQuickApplyOfficers = useCallback(() => {
    const current = getActiveOffice();
    setActiveOffice(current);
    if (!current) return;

    const kcp = current.petugas.find((p) => p.role === 'KCP')?.nama || '';
    const aoa = current.petugas.find((p) => p.role === 'AOAP')?.nama || '';
    const aosp = current.petugas.find((p) => p.role === 'AOSP')?.nama || '';
    const aop = current.petugas.find((p) => p.role === 'AOP')?.nama || '';
    const kc = current.petugas.find((p) => p.role === 'KC')?.nama || '';
    const pengurus = current.petugas.find((p) => p.role === 'PENGURUS')?.nama || '';
    const komite = current.petugas.find((p) => p.role === 'KOMITE')?.nama || '';

    setData((prev) =>
      recalculateAll({
        ...prev,
        kepalaCapem: kcp || prev.kepalaCapem,
        petugasAoa: aoa || prev.petugasAoa,
        petugasAosp: aosp || prev.petugasAosp,
        petugasAop: aop || prev.petugasAop,
        kepalaCabang: kc || prev.kepalaCabang,
        wakilPengurus: pengurus || prev.wakilPengurus,
        wakilKomite: komite || prev.wakilKomite,
      })
    );

    setStatusMessage(`Petugas dari ${current.nama} (#${current.kode}) diterapkan ke formulir.`);
    setIsError(false);
  }, []);

  // Apply specific officers from OfficeManagerModal
  const handleApplyOfficersFromModal = useCallback(
    (officers: {
      kcp?: string;
      aoa?: string;
      aosp?: string;
      aop?: string;
      kc?: string;
      komite?: string;
      pengurus?: string;
      namaKantor?: string;
    }) => {
      setData((prev) =>
        recalculateAll({
          ...prev,
          ...(officers.kcp ? { kepalaCapem: officers.kcp } : {}),
          ...(officers.aoa ? { petugasAoa: officers.aoa } : {}),
          ...(officers.aosp ? { petugasAosp: officers.aosp } : {}),
          ...(officers.aop ? { petugasAop: officers.aop } : {}),
          ...(officers.kc ? { kepalaCabang: officers.kc } : {}),
          ...(officers.komite ? { wakilKomite: officers.komite } : {}),
          ...(officers.pengurus ? { wakilPengurus: officers.pengurus } : {}),
        })
      );
      refreshActiveOffice();
      setStatusMessage(
        `Daftar petugas ${officers.namaKantor || ''} berhasil diterapkan ke formulir pembiayaan.`
      );
      setIsError(false);
    },
    [refreshActiveOffice]
  );

  const handleSignIn = async () => {
    try {
      const result = await signInWithGooglePopup();
      setUser(result.user);
      setAccessToken(result.token);
      sessionStorage.setItem('google_access_token', result.token);
      setStatusMessage(`Berhasil terhubung ke akun Google: ${result.user.displayName || result.user.email}`);
      setIsError(false);
    } catch (err: any) {
      console.error(err);
      setStatusMessage(err.message || 'Gagal masuk dengan Google.');
      setIsError(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutGoogle();
      setUser(null);
      setAccessToken(null);
      sessionStorage.removeItem('google_access_token');
      setStatusMessage('Telah keluar dari akun Google.');
      setIsError(false);
    } catch (err: any) {
      setStatusMessage('Gagal keluar.');
      setIsError(true);
    }
  };

  const handleSave = async () => {
    if (!data.nama || !data.nama.trim()) {
      setStatusMessage('Harap lengkapi Nama Debitur.');
      setIsError(true);
      return;
    }
    if (!data.nomorKtp || !data.nomorKtp.trim()) {
      setStatusMessage('Harap lengkapi Nomor KTP Debitur.');
      setIsError(true);
      return;
    }
    if (!data.noRegister || !data.noRegister.trim()) {
      setStatusMessage('Nomor Register harus terisi.');
      setIsError(true);
      return;
    }

    setIsSaving(true);
    setStatusMessage('Menyimpan data formulir pembiayaan...');
    setIsError(false);

    try {
      // 1. Simpan ke database lokal
      saveLocalRecord(data);

      // 2. Sinkronkan ke Google Sheets jika konfigurasi ada
      let sheetsSuccessMsg = '';
      if (config && (config.spreadsheetId || config.appsScriptUrl)) {
        try {
          const res = await syncDataToGoogleSheets(data, accessToken, config);
          if (res.success) {
            sheetsSuccessMsg = ' dan berhasil disinkronkan ke Google Sheet!';
          } else {
            sheetsSuccessMsg = ` (Peringatan Sheet: ${res.message})`;
          }
        } catch (sheetErr: any) {
          sheetsSuccessMsg = ` (Tersimpan lokal, sinkronisasi Google Sheet terkendala: ${sheetErr.message})`;
        }
      }

      setStatusMessage(`Alhamdulillah, Data No Register ${data.noRegister} (${data.nama}) berhasil disimpan${sheetsSuccessMsg}`);
      setIsError(false);
    } catch (err: any) {
      console.error('Error saving record:', err);
      setStatusMessage(`Gagal menyimpan data: ${err.message || 'Terjadi kesalahan'}`);
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan / me-reset formulir ke nomor register baru?')) {
      const fresh = getDefaultPembiayaanData();
      setData(recalculateAll(fresh));
      setStatusMessage('Formulir telah di-reset.');
      setIsError(false);
    }
  };

  const handleDelete = async () => {
    const reg = data.noRegister;
    if (!reg) {
      setStatusMessage('Nomor Register kosong.');
      setIsError(true);
      return;
    }

    if (!confirm(`Hapus data pembiayaan untuk No Register ${reg} (${data.nama || 'Tanpa Nama'})?`)) {
      return;
    }

    deleteLocalRecord(reg);

    if (accessToken && config?.spreadsheetId) {
      try {
        await deleteRecordFromGoogleSheets(reg, accessToken, config.spreadsheetId);
      } catch (e) {
        console.warn('Gagal menghapus dari Google Sheet:', e);
      }
    }

    const fresh = getDefaultPembiayaanData();
    setData(recalculateAll(fresh));
    setStatusMessage(`Data No Register ${reg} telah dihapus.`);
    setIsError(false);
  };

  const handleSearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setStatusMessage('Masukkan Nomor Register atau Nama Debitur untuk mencari.');
      setIsError(true);
      return;
    }

    const records = getLocalRecords();
    const found = records.find((r) => {
      return (
        (r.noRegister && r.noRegister.toLowerCase().includes(q)) ||
        (r.nama && r.nama.toLowerCase().includes(q)) ||
        (r.nomorKtp && r.nomorKtp.toLowerCase().includes(q))
      );
    });

    if (found) {
      setData(recalculateAll(found));
      setStatusMessage(`Data pengajuan ditemukan: ${found.noRegister} - ${found.nama}`);
      setIsError(false);
    } else {
      setStatusMessage(`Data tidak ditemukan untuk kata kunci: "${query}"`);
      setIsError(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadRecord = (record: PembiayaanData) => {
    setData(recalculateAll(record));
    setStatusMessage(`Data pengajuan ${record.noRegister} (${record.nama}) dimuat ke form.`);
    setIsError(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 pb-12 flex flex-col">
      {/* 1. Sleek BMT Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsSidebarOpen(false)}
        activeOffice={activeOffice}
        onOpenOfficeManager={() => setIsOfficeManagerOpen(true)}
        onOpenRecordsModal={() => setIsRecordsModalOpen(true)}
        onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
        onPrint={handlePrint}
        onQuickApplyOfficers={handleQuickApplyOfficers}
        isSheetsConnected={Boolean(user && (config?.spreadsheetId || config?.appsScriptUrl))}
        userEmail={user?.email}
        activeSection={activeSection}
        onNavigateSection={(secId) => setActiveSection(secId)}
      />

      {/* 2. Main Content Area adjusted to Sidebar on Desktop */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Action Header & Toolbar */}
        <HeaderBanner
          noRegister={data.noRegister || ''}
          onNoRegisterChange={(val) => handleFieldChange('noRegister', val)}
          onCari={() => handleSearch(data.noRegister)}
          onSimpan={handleSave}
          onClear={handleReset}
          onHapus={handleDelete}
          onPrint={handlePrint}
          isSaving={isSaving}
          statusMessage={statusMessage ? { text: statusMessage, isSuccess: !isError } : null}
          config={config}
          isSignedIn={Boolean(user)}
          onOpenConfigModal={() => setIsGoogleModalOpen(true)}
          onOpenRecordsModal={() => setIsRecordsModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenOfficeManager={() => setIsOfficeManagerOpen(true)}
          activeOfficeName={activeOffice ? `${activeOffice.nama} (#${activeOffice.kode})` : 'Kantor BMT'}
        />

        {/* Main Printable Form Container */}
        <main className="max-w-6xl mx-auto px-2 sm:px-4 mt-3">
          {/* Interactive Form Section Tabs (No-Print) */}
          <div className="mb-3 bg-white rounded-lg border border-gray-200 shadow-sm p-1.5 sm:p-2 no-print">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-thin">
                {FORM_SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-[#005a36] text-white shadow-sm ring-1 ring-emerald-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      title={`Klik untuk mengisi: ${sec.title}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                          isActive
                            ? 'bg-amber-300 text-emerald-950 shadow-inner'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {sec.step}
                      </span>
                      <span>{sec.title}</span>
                    </button>
                  );
                })}

                {/* Button Tampilkan Semua */}
                <button
                  type="button"
                  onClick={() => setActiveSection('all')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
                    activeSection === 'all'
                      ? 'bg-slate-800 text-amber-300 shadow-sm ring-1 ring-slate-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Tampilkan semua formulir sekaligus"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tampilkan Semua Form</span>
                </button>
              </div>

              {/* Section counter / indicator */}
              <div className="text-[11px] text-gray-500 font-medium hidden md:flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  Mode:{' '}
                  <strong className="text-emerald-900 font-bold">
                    {activeSection === 'all'
                      ? 'Semua Bagian Terbuka'
                      : `${FORM_SECTIONS[currentSectionIndex]?.title || 'Formulir'}`}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div
            id="formPembiayaanBMT"
            className="print-container bg-white border border-gray-300 rounded shadow-sm overflow-hidden divide-y divide-gray-300"
          >
            {/* 1. DATA DEBITUR */}
            <section
              id="section-debitur"
              className={`bmt-form-section ${
                activeSection === 'section-debitur' || activeSection === 'all'
                  ? 'block'
                  : 'hidden print:block'
              }`}
            >
              <DebiturSection data={data} onChange={handleFieldChange} />
            </section>

            {/* 2. DATA PENJAMIN */}
            <section
              id="section-penjamin"
              className={`bmt-form-section ${
                activeSection === 'section-penjamin' || activeSection === 'all'
                  ? 'block'
                  : 'hidden print:block'
              }`}
            >
              <PenjaminSection data={data} onChange={handleFieldChange} />
            </section>

            {/* 3. REALISASI PEMBIAYAAN */}
            <section
              id="section-realisasi"
              className={`bmt-form-section ${
                activeSection === 'section-realisasi' || activeSection === 'all'
                  ? 'block'
                  : 'hidden print:block'
              }`}
            >
              <RealisasiSection
                data={data}
                onChange={handleFieldChange}
                onOpenOfficeManager={() => setIsOfficeManagerOpen(true)}
              />
            </section>

            {/* 4. JAMINAN / AGUNAN */}
            <section
              id="section-agunan"
              className={`bmt-form-section ${
                activeSection === 'section-agunan' || activeSection === 'all'
                  ? 'block'
                  : 'hidden print:block'
              }`}
            >
              <AgunanSection data={data} onChange={handleFieldChange} />
            </section>

            {/* 5. ANALISA KAPASITAS USAHA & BIAYA */}
            <section
              id="section-analisa"
              className={`bmt-form-section ${
                activeSection === 'section-analisa' || activeSection === 'all'
                  ? 'block'
                  : 'hidden print:block'
              }`}
            >
              <AnalisaSection data={data} onChange={handleFieldChange} />
            </section>
          </div>

          {/* Step Navigation Bar (Next / Prev buttons) when viewing individual section */}
          {activeSection !== 'all' && (
            <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex items-center justify-between gap-3 no-print">
              <div>
                {currentSectionIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goToPreviousSection}
                    className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-600" />
                    <span>Sebelumnya: {FORM_SECTIONS[currentSectionIndex - 1]?.shortTitle}</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-semibold text-gray-400 italic pl-1">
                    Langkah 1: Data Debitur
                  </div>
                )}
              </div>

              {/* Center: Save and indicator */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-xs font-bold bg-[#000080] hover:bg-blue-900 text-white rounded flex items-center gap-1.5 shadow-sm transition active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Data'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('all')}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 hidden sm:flex items-center gap-1"
                  title="Buka semua bagian formulir sekaligus"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Lihat Semua</span>
                </button>
              </div>

              <div>
                {currentSectionIndex < FORM_SECTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goToNextSection}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                  >
                    <span>Lanjut: {FORM_SECTIONS[currentSectionIndex + 1]?.shortTitle}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-1.5 text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 rounded flex items-center gap-1.5 transition active:scale-95 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Form Footer Branding */}
          <div className="mt-4 text-center text-xs text-gray-500 no-print">
            <p className="font-semibold text-gray-600">
              Aplikasi Analisa &amp; Formulir Pengajuan Pembiayaan • BMT UGT Nusantara
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Kantor Aktif:{' '}
              <strong className="text-emerald-800">
                {activeOffice ? `${activeOffice.nama} (${activeOffice.kode})` : 'Capem Pesanggaran'}
              </strong>{' '}
              • Terhubung ke Penyimpanan Lokal &amp; Google Sheets
            </p>
          </div>
        </main>
      </div>

      {/* 3. Office & Officer Manager Modal (Tambah/Kelola AOAP, KCP, AOSP, Kantor) */}
      <OfficeManagerModal
        isOpen={isOfficeManagerOpen}
        onClose={() => {
          setIsOfficeManagerOpen(false);
          refreshActiveOffice();
        }}
        onApplyOfficersToForm={handleApplyOfficersFromModal}
      />

      {/* 4. Google Sheets Connection Modal */}
      <GoogleSheetModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        user={user}
        accessToken={accessToken}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        config={config}
        onUpdateConfig={(cfg) => {
          setConfig(cfg);
          saveStoredConfig(cfg);
        }}
      />

      {/* 5. Records Viewer / Database Modal */}
      <RecordsViewerModal
        isOpen={isRecordsModalOpen}
        onClose={() => setIsRecordsModalOpen(false)}
        onSelectRecord={handleLoadRecord}
        onDeleteRecord={(noReg) => {
          deleteLocalRecord(noReg);
          setStatusMessage(`Data ${noReg} telah dihapus dari database lokal.`);
          setIsError(false);
        }}
      />
    </div>
  );
}
