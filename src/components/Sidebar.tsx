import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Building2,
  Users,
  Database,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { KantorBMT } from '../types';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  activeOffice: KantorBMT | null;
  onOpenOfficeManager: () => void;
  onOpenRecordsModal: () => void;
  onOpenGoogleModal: () => void;
  onPrint: () => void;
  onQuickApplyOfficers: () => void;
  isSheetsConnected: boolean;
  userEmail?: string | null;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
  activeOffice,
  onOpenOfficeManager,
  onOpenRecordsModal,
  onOpenGoogleModal,
  onPrint,
  onQuickApplyOfficers,
  isSheetsConnected,
  userEmail,
  activeSection = 'section-debitur',
  onNavigateSection,
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(true);

  const sections = [
    { id: 'section-debitur', label: '1. Data Debitur', short: 'Debitur' },
    { id: 'section-penjamin', label: '2. Data Penjamin', short: 'Penjamin' },
    { id: 'section-realisasi', label: '3. Realisasi Pembiayaan', short: 'Realisasi' },
    { id: 'section-agunan', label: '4. Agunan & Jaminan', short: 'Agunan' },
    { id: 'section-analisa', label: '5. Analisa Kapasitas Usaha', short: 'Analisa' },
    { id: 'all', label: '📋 Tampilkan Semua Form', short: 'Semua' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
    if (window.innerWidth < 1024) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300 shadow-xl no-print ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}
      >
        {/* Top Branding Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-[#005a36] flex items-center justify-center text-amber-300 font-extrabold shadow-md shadow-emerald-950/50 shrink-0">
              <span className="text-sm tracking-tighter">BMT</span>
            </div>

            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-extrabold text-sm tracking-wide text-white leading-tight truncate">
                  BMT UGT Nusantara
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase truncate">
                  KSPPS Terpadu • Sidogiri
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Office Badge Card */}
        <div className="p-3 border-b border-slate-800 bg-slate-950/30 shrink-0">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Kantor Terpilih
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onOpenOfficeManager();
                    if (window.innerWidth < 1024) onCloseMobile();
                  }}
                  className="text-[10px] text-amber-300 hover:text-amber-200 font-bold hover:underline"
                >
                  Ganti
                </button>
              </div>

              <div className="font-bold text-xs text-slate-100 truncate">
                {activeOffice ? activeOffice.nama : 'Capem Pesanggaran'}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                <span>Kode: #{activeOffice?.kode || '264'}</span>
                <span className="text-emerald-300 font-medium">
                  {activeOffice?.petugas?.length || 0} Petugas
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onQuickApplyOfficers();
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className="w-full mt-2 py-1 px-2 text-[11px] font-bold bg-emerald-700/80 hover:bg-emerald-600 text-white rounded shadow-sm flex items-center justify-center gap-1 transition active:scale-95"
                title="Isi otomatis petugas kantor ini (KCP, AOAP, AOSP, AOP) ke formulir"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Terapkan Petugas Kantor Ini</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenOfficeManager}
              className="w-full p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/50 flex flex-col items-center justify-center text-emerald-300"
              title={activeOffice ? `${activeOffice.nama} (#${activeOffice.kode})` : 'Kantor BMT'}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">#{activeOffice?.kode || '264'}</span>
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {/* Menu: Formulir Pengajuan */}
          <div>
            <button
              type="button"
              onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition ${
                'bg-emerald-800/30 text-emerald-300 border border-emerald-700/40 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                {!isCollapsed && <span>Formulir Pembiayaan</span>}
              </div>
              {!isCollapsed && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300">
                  5 Bagian
                </span>
              )}
            </button>

            {/* Sub-sections links (when expanded) */}
            {!isCollapsed && isSubmenuOpen && (
              <div className="mt-1 ml-3 pl-2 border-l-2 border-emerald-900/80 space-y-1 text-xs">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleNavClick(sec.id)}
                      className={`w-full text-left py-1.5 px-2.5 rounded text-[11px] truncate flex items-center justify-between transition group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-[#005a36] text-white font-bold shadow-sm ring-1 ring-emerald-400/60'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                      }`}
                      title={`Buka formulir: ${sec.label}`}
                    >
                      <span className="truncate">{sec.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0 ml-1 shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Menu: Kelola Kantor & Petugas */}
          <button
            type="button"
            onClick={() => {
              onOpenOfficeManager();
              if (window.innerWidth < 1024) onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition group"
            title="Kelola Kantor & Petugas (AOAP, KCP, AOSP, AOP)"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
              {!isCollapsed && <span>Kantor &amp; Petugas</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                AOAP • KCP
              </span>
            )}
          </button>

          {/* Menu: Arsip / Data Tersimpan */}
          <button
            type="button"
            onClick={() => {
              onOpenRecordsModal();
              if (window.innerWidth < 1024) onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition group"
            title="Buka Arsip Data Pengajuan Tersimpan"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
              {!isCollapsed && <span>Data Tersimpan</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-medium text-slate-400">Arsip</span>
            )}
          </button>

          {/* Menu: Google Sheets */}
          <button
            type="button"
            onClick={() => {
              onOpenGoogleModal();
              if (window.innerWidth < 1024) onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition group"
            title="Konfigurasi Google Sheets Sync"
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
              {!isCollapsed && <span>Google Sheets</span>}
            </div>
            {!isCollapsed && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isSheetsConnected
                    ? 'bg-emerald-900 text-emerald-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isSheetsConnected ? 'Tersambung' : 'Atur'}
              </span>
            )}
          </button>

          {/* Menu: Cetak / Print */}
          <button
            type="button"
            onClick={() => {
              onPrint();
              if (window.innerWidth < 1024) onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition group"
            title="Cetak Formulir ke Kertas / PDF"
          >
            <div className="flex items-center gap-2.5">
              <Printer className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
              {!isCollapsed && <span>Cetak Dokumen</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-medium text-slate-400">PDF / Print</span>
            )}
          </button>
        </div>

        {/* User Account / Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0">
          {!isCollapsed ? (
            <div className="space-y-2">
              {userEmail && (
                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">{userEmail}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Versi 2.0 • BMT UGT</span>
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-white font-medium"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Kecilkan</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Perbesar Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
