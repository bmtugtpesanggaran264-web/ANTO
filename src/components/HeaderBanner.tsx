import React from 'react';
import {
  FileSpreadsheet,
  Search,
  Save,
  RotateCcw,
  Trash2,
  ExternalLink,
  Database,
  Printer,
  Menu,
  Building2,
  Users,
} from 'lucide-react';
import { GoogleSheetsConfig } from '../types';

interface HeaderBannerProps {
  noRegister: string;
  onNoRegisterChange: (val: string) => void;
  onCari: () => void;
  onSimpan: () => void;
  onClear: () => void;
  onHapus: () => void;
  onPrint?: () => void;
  isSaving: boolean;
  statusMessage: { text: string; isSuccess: boolean } | null;
  config: GoogleSheetsConfig | null;
  isSignedIn: boolean;
  onOpenConfigModal: () => void;
  onOpenRecordsModal: () => void;
  onToggleSidebar?: () => void;
  onOpenOfficeManager?: () => void;
  activeOfficeName?: string;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  noRegister,
  onNoRegisterChange,
  onCari,
  onSimpan,
  onClear,
  onHapus,
  onPrint,
  isSaving,
  statusMessage,
  config,
  isSignedIn,
  onOpenConfigModal,
  onOpenRecordsModal,
  onToggleSidebar,
  onOpenOfficeManager,
  activeOfficeName,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-md pb-1 no-print">
      {/* Islamic BMT Banner matching exact template */}
      <div className="bg-[#000080] text-white text-center py-2 px-3 sm:px-4 text-base sm:text-lg font-bold rounded-t tracking-wide shadow-inner flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="p-1.5 bg-blue-900/80 hover:bg-blue-800 text-white rounded border border-blue-400/60 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Buka Menu Sidebar"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          )}

          {onOpenOfficeManager && (
            <button
              type="button"
              onClick={onOpenOfficeManager}
              className="p-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 rounded border border-emerald-400/60 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Kelola Kantor & Petugas (AOAP, KCP, AOSP, AOP)"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline truncate max-w-[170px]">
                {activeOfficeName || 'Kantor & Petugas'}
              </span>
            </button>
          )}
        </div>

        <div className="flex-1 text-center font-bold text-xs sm:text-sm md:text-base leading-tight">
          Bismillahirrohmanirrohim &ldquo; Isikan Data Dengan Tepat dan Valid &rdquo;
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenRecordsModal}
            className="text-xs bg-blue-900 hover:bg-blue-800 text-white px-2 py-1 rounded border border-blue-400 flex items-center gap-1 transition-colors"
            title="Daftar Data Pembiayaan Tersimpan"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Data Tersimpan</span>
          </button>
          <button
            type="button"
            onClick={onOpenConfigModal}
            className={`text-xs px-2 py-1 rounded border flex items-center gap-1 font-medium transition-colors ${
              isSignedIn && config?.spreadsheetId
                ? 'bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-400'
                : 'bg-amber-800 hover:bg-amber-700 text-white border-amber-400'
            }`}
            title="Konfigurasi Google Sheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isSignedIn ? 'Google Sheet' : 'Hubungkan Sheet'}
            </span>
          </button>
        </div>
      </div>

      {/* Toolbar Buttons */}
      <div className="bg-[#000080] px-4 py-2 flex flex-wrap items-center justify-between border-b-2 border-white text-white gap-2">
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
          <span className="tracking-wide">NO REGISTER :</span>
          <input
            type="text"
            id="noRegister"
            value={noRegister}
            onChange={(e) => onNoRegisterChange(e.target.value)}
            className="w-24 sm:w-28 px-2 py-1 text-black font-bold text-center bg-white rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="2139"
          />
        </div>

        {/* Action Button Group */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onCari}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-[#e0e0e0] hover:bg-gray-300 text-gray-900 rounded font-bold shadow transition-all active:scale-95 flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cari</span>
          </button>

          <button
            type="button"
            onClick={onSimpan}
            disabled={isSaving}
            className="px-3 sm:px-5 py-1.5 text-xs sm:text-sm bg-[#1b5e20] hover:bg-[#144d18] text-white rounded font-bold shadow transition-all active:scale-95 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
          </button>

          <button
            type="button"
            onClick={onClear}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-[#f57f17] hover:bg-[#e07212] text-white rounded font-bold shadow transition-all active:scale-95 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={onHapus}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-[#b71c1c] hover:bg-[#961616] text-white rounded font-bold shadow transition-all active:scale-95 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>

          {onPrint && (
            <button
              type="button"
              onClick={onPrint}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-slate-700 hover:bg-slate-800 text-white rounded font-bold shadow transition-all active:scale-95 flex items-center gap-1"
              title="Cetak formulir (Print to PDF/Paper)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
          )}

          {config?.spreadsheetUrl && (
            <a
              href={config.spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded font-semibold transition-colors ml-2"
              title="Buka Google Sheet di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Sheet</span>
            </a>
          )}
        </div>
      </div>

      {/* Status Notification Message */}
      {statusMessage && (
        <div
          id="statusMessage"
          className={`mx-4 mt-2 p-2.5 rounded font-semibold text-center text-xs sm:text-sm transition-all shadow-sm ${
            statusMessage.isSuccess
              ? 'bg-[#c8e6c9] text-[#2e7d32] border border-[#a5d6a7]'
              : 'bg-[#ffcdd2] text-[#c62828] border border-[#ef9a9a]'
          }`}
        >
          {statusMessage.text}
        </div>
      )}
    </header>
  );
};
