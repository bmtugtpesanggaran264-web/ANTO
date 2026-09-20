import React, { useState } from 'react';
import { PembiayaanData } from '../types';
import { getLocalRecords } from '../services/sheetsService';
import { X, Search, FileEdit, Trash2, Database, UserCheck } from 'lucide-react';

interface RecordsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord: (record: PembiayaanData) => void;
  onDeleteRecord: (noReg: string) => void;
}

export const RecordsViewerModal: React.FC<RecordsViewerModalProps> = ({
  isOpen,
  onClose,
  onSelectRecord,
  onDeleteRecord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const records = getLocalRecords();

  if (!isOpen) return null;

  const filtered = records.filter((r) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (r.noRegister && r.noRegister.toLowerCase().includes(q)) ||
      (r.nama && r.nama.toLowerCase().includes(q)) ||
      (r.nomorKtp && r.nomorKtp.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#000080] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="font-bold text-base flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-300" />
            <span>Data Pengajuan Pembiayaan Tersimpan</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="p-3.5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan No Register, Nama Debitur, atau Nomor KTP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-blue-700"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            {filtered.length} Data
          </span>
        </div>

        {/* Records List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs">
              <UserCheck className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p>Belum ada data pengajuan yang tersimpan.</p>
              <p className="text-gray-400 mt-1">
                Isikan formulir dan klik tombol <strong>Simpan</strong> di toolbar.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.noRegister}
                className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      REG: {item.noRegister}
                    </span>
                    <span className="font-bold text-sm text-gray-900">{item.nama || 'Tanpa Nama'}</span>
                  </div>
                  <div className="text-xs text-gray-600 flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    <span>KTP: {item.nomorKtp || '-'}</span>
                    <span>Realisasi: Rp {item.jumlahRealisasi || item.jumlahPengajuan || '0'}</span>
                    <span>Akad: {item.akadPembiayaan || 'MURABAHAH'}</span>
                    <span>Angsuran: Rp {item.angsuranPerbulan || '0'}/bln</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectRecord(item);
                      onClose();
                    }}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Muat ke Form</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteRecord(item.noRegister)}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Hapus data ini"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-5 py-2.5 flex justify-end border-t border-gray-200">
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
