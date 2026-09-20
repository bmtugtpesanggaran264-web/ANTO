import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { GoogleSheetsConfig } from '../types';
import { createBMTSpreadsheet, saveStoredConfig } from '../services/sheetsService';
import { X, ExternalLink, CheckCircle2, AlertCircle, PlusCircle, RefreshCw, KeyRound, Link2 } from 'lucide-react';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  config: GoogleSheetsConfig | null;
  onUpdateConfig: (cfg: GoogleSheetsConfig) => void;
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  onSignIn,
  onSignOut,
  config,
  onUpdateConfig,
}) => {
  const [spreadsheetInput, setSpreadsheetInput] = useState(config?.spreadsheetId || '');
  const [appsScriptUrlInput, setAppsScriptUrlInput] = useState(config?.appsScriptUrl || '');
  const [activeTab, setActiveTab] = useState<'direct' | 'appsScript'>('direct');
  const [isCreating, setIsCreating] = useState(false);
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleCreateNewSheet = async () => {
    if (!accessToken) {
      setMsg({ text: 'Harap masuk dengan akun Google terlebih dahulu.', isError: true });
      return;
    }
    try {
      setIsCreating(true);
      setMsg(null);
      const newConfig = await createBMTSpreadsheet(accessToken, 'Form Pembiayaan BMT UGT Nusantara');
      onUpdateConfig(newConfig);
      setSpreadsheetInput(newConfig.spreadsheetId);
      setMsg({ text: 'Google Sheet baru berhasil dibuat dengan 7 sheet lengkap!', isError: false });
    } catch (err: any) {
      setMsg({ text: err.message || 'Gagal membuat Google Sheet', isError: true });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveExistingSheet = () => {
    let cleanId = spreadsheetInput.trim();
    // Extract ID from URL if pasted full url
    const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      cleanId = match[1];
    }

    if (!cleanId) {
      setMsg({ text: 'Harap masukkan ID atau URL Spreadsheet yang valid.', isError: true });
      return;
    }

    const updated: GoogleSheetsConfig = {
      spreadsheetId: cleanId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${cleanId}/edit`,
      spreadsheetTitle: config?.spreadsheetTitle || 'BMT UGT Spreadsheet',
      appsScriptUrl: appsScriptUrlInput.trim(),
      syncMode: activeTab,
    };

    saveStoredConfig(updated);
    onUpdateConfig(updated);
    setMsg({ text: 'Pengaturan Google Sheet berhasil disimpan.', isError: false });
  };

  const handleSaveAppsScriptUrl = () => {
    const url = appsScriptUrlInput.trim();
    if (!url) {
      setMsg({ text: 'Harap masukkan URL Web App Apps Script.', isError: true });
      return;
    }

    const updated: GoogleSheetsConfig = {
      spreadsheetId: config?.spreadsheetId || '',
      spreadsheetUrl: config?.spreadsheetUrl || '',
      spreadsheetTitle: 'Apps Script Connected',
      appsScriptUrl: url,
      syncMode: 'appsScript',
    };

    saveStoredConfig(updated);
    onUpdateConfig(updated);
    setMsg({ text: 'URL Apps Script Web App berhasil disimpan.', isError: false });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="bg-[#000080] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="font-bold text-base flex items-center gap-2">
            <span>Koneksi Google Sheet</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto text-xs sm:text-sm">
          {/* Status Akun Google */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
            <div className="font-semibold text-gray-800 text-xs uppercase tracking-wider">
              Status Akun Google
            </div>

            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{user.displayName || 'Pengguna'}</div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terhubung dengan Google Sheets API</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="px-3 py-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded font-medium transition-colors"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Masuk dengan akun Google untuk langsung menyimpan formulir ke spreadsheet Google Sheets di Google Drive Anda.
                </p>
                {/* Official Sign in with Google button */}
                <button
                  type="button"
                  onClick={onSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md font-medium text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            )}
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'direct'
                  ? 'border-[#000080] text-[#000080]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Koneksi Langsung (Google Sheets API)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('appsScript')}
              className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'appsScript'
                  ? 'border-[#000080] text-[#000080]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Apps Script Web App URL
            </button>
          </div>

          {activeTab === 'direct' ? (
            <div className="space-y-4">
              {/* Auto Create Button */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-emerald-900 text-xs">
                    Buat Spreadsheet BMT Otomatis
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Otomatis membuat spreadsheet baru di Google Drive dengan 7 sheet &amp; header lengkap.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewSheet}
                  disabled={!user || isCreating}
                  className="px-3 py-1.5 bg-[#1b5e20] hover:bg-[#144d18] text-white rounded font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Membuat...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Buat Baru</span>
                    </>
                  )}
                </button>
              </div>

              {/* Or manual ID */}
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 text-xs">
                  Atau Gunakan ID / Link Google Sheet yang Sudah Ada:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    value={spreadsheetInput}
                    onChange={(e) => setSpreadsheetInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleSaveExistingSheet}
                    className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded font-semibold text-xs transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </div>

              {/* Active Sheet Link */}
              {config?.spreadsheetId && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                  <div className="text-gray-500 font-medium">Spreadsheet Aktif:</div>
                  <div className="font-mono text-[11px] text-gray-800 break-all">
                    {config.spreadsheetId}
                  </div>
                  {config.spreadsheetUrl && (
                    <a
                      href={config.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-700 hover:underline font-semibold text-xs mt-1"
                    >
                      <span>Buka Google Sheet di Tab Baru</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                Jika Anda telah menyebarkan (Deploy) file Google Apps Script yang Anda berikan sebagai <strong>Web App</strong> di Google Sheet, masukkan URL Web App (contoh: https://script.google.com/macros/s/.../exec) di bawah ini:
              </p>
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 text-xs">
                  URL Google Apps Script Web App:
                </label>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={appsScriptUrlInput}
                  onChange={(e) => setAppsScriptUrlInput(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveAppsScriptUrl}
                className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded font-semibold text-xs transition-colors"
              >
                Gunakan Apps Script Web App Ini
              </button>
            </div>
          )}

          {/* Messages */}
          {msg && (
            <div
              className={`p-2.5 rounded text-xs flex items-center gap-2 ${
                msg.isError
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {msg.isError ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              )}
              <span>{msg.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-5 py-3 flex justify-end border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
