import { KantorBMT, PetugasOffice, OfficerRole } from '../types';

const STORAGE_KEY = 'bmt_offices_directory';
const ACTIVE_OFFICE_KEY = 'bmt_active_office_id';

export const ROLE_LABELS: Record<OfficerRole, { label: string; badge: string; color: string; desc: string }> = {
  KCP: {
    label: 'Kepala Capem (KCP)',
    badge: 'KCP',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Kepala Kantor Cabang Pembantu',
  },
  AOAP: {
    label: 'AO Pembiayaan (AOAP / AOA)',
    badge: 'AOAP',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    desc: 'Account Officer Analisa Pembiayaan',
  },
  AOSP: {
    label: 'AO Simpanan & Pelayanan (AOSP)',
    badge: 'AOSP',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    desc: 'Account Officer Simpanan & Pelayanan',
  },
  AOP: {
    label: 'AO Penagihan & Pendanaan (AOP)',
    badge: 'AOP',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Account Officer Penagihan',
  },
  KC: {
    label: 'Kepala Cabang (KC)',
    badge: 'KC',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    desc: 'Pimpinan Kantor Cabang Induk',
  },
  KOMITE: {
    label: 'Wakil Ketua Komite',
    badge: 'KOMITE',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Komite Pembiayaan',
  },
  PENGURUS: {
    label: 'Wakil Pengurus',
    badge: 'PENGURUS',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    desc: 'Pengurus KSPPS BMT UGT',
  },
  LAINNYA: {
    label: 'Staf / Petugas Lainnya',
    badge: 'STAF',
    color: 'bg-slate-100 text-slate-800 border-slate-300',
    desc: 'Staf Pendukung',
  },
};

const DEFAULT_OFFICES: KantorBMT[] = [
  {
    id: 'office_pesanggaran_264',
    nama: 'Capem Pesanggaran',
    kode: '264',
    tipe: 'Capem',
    alamat: 'Jl. Raya Pesanggaran, Banyuwangi',
    kota: 'Banyuwangi',
    telepon: '(0333) 710264',
    isDefault: true,
    petugas: [
      {
        id: 'p_pes_1',
        nama: 'Ahmad Fauzi, S.E.I.',
        role: 'KCP',
        roleTitle: 'Kepala Capem (KCP)',
        nip: 'UGT-264-001',
        hp: '081234567890',
        isDefault: true,
      },
      {
        id: 'p_pes_2',
        nama: 'M. Nurul Huda',
        role: 'AOAP',
        roleTitle: 'AO Pembiayaan (AOAP / AOA)',
        nip: 'UGT-264-002',
        hp: '082198765432',
        isDefault: true,
      },
      {
        id: 'p_pes_3',
        nama: 'Siti Rohmah, S.Akun.',
        role: 'AOSP',
        roleTitle: 'AO Simpanan & Pelayanan (AOSP)',
        nip: 'UGT-264-003',
        hp: '085612345678',
        isDefault: true,
      },
      {
        id: 'p_pes_4',
        nama: 'Bambang Irawan',
        role: 'AOP',
        roleTitle: 'AO Penagihan & Pendanaan (AOP)',
        nip: 'UGT-264-004',
        hp: '087799887766',
        isDefault: true,
      },
      {
        id: 'p_pes_5',
        nama: 'H. Abdul Wahid, M.M.',
        role: 'KC',
        roleTitle: 'Kepala Cabang (KC)',
        nip: 'UGT-010-001',
        hp: '081333444555',
        isDefault: true,
      },
      {
        id: 'p_pes_6',
        nama: 'Drs. H. M. Sholeh',
        role: 'PENGURUS',
        roleTitle: 'Wakil Pengurus',
        nip: 'UGT-PST-005',
        hp: '081222333444',
        isDefault: true,
      },
      {
        id: 'p_pes_7',
        nama: 'KH. Syamsul Arifin',
        role: 'KOMITE',
        roleTitle: 'Wakil Ketua Komite',
        nip: 'UGT-KOM-003',
        hp: '081111222333',
        isDefault: true,
      },
    ],
  },
  {
    id: 'office_siliragung_265',
    nama: 'Capem Siliragung',
    kode: '265',
    tipe: 'Capem',
    alamat: 'Jl. KH. Wachid Hasyim, Siliragung',
    kota: 'Banyuwangi',
    telepon: '(0333) 710265',
    petugas: [
      {
        id: 'p_sil_1',
        nama: 'M. Arifin, S.Pd.I.',
        role: 'KCP',
        roleTitle: 'Kepala Capem (KCP)',
        nip: 'UGT-265-001',
        hp: '081298765431',
        isDefault: true,
      },
      {
        id: 'p_sil_2',
        nama: 'Hendra Wijaya',
        role: 'AOAP',
        roleTitle: 'AO Pembiayaan (AOAP / AOA)',
        nip: 'UGT-265-002',
        hp: '082233445566',
        isDefault: true,
      },
      {
        id: 'p_sil_3',
        nama: 'Anisa Nur Laila',
        role: 'AOSP',
        roleTitle: 'AO Simpanan & Pelayanan (AOSP)',
        nip: 'UGT-265-003',
        hp: '085711223344',
        isDefault: true,
      },
      {
        id: 'p_sil_4',
        nama: 'Dwi Prasetyo',
        role: 'AOP',
        roleTitle: 'AO Penagihan & Pendanaan (AOP)',
        nip: 'UGT-265-004',
        hp: '087812341234',
        isDefault: true,
      },
      {
        id: 'p_sil_5',
        nama: 'H. Abdul Wahid, M.M.',
        role: 'KC',
        roleTitle: 'Kepala Cabang (KC)',
        nip: 'UGT-010-001',
        hp: '081333444555',
        isDefault: true,
      },
      {
        id: 'p_sil_6',
        nama: 'Drs. H. M. Sholeh',
        role: 'PENGURUS',
        roleTitle: 'Wakil Pengurus',
        nip: 'UGT-PST-005',
        hp: '081222333444',
        isDefault: true,
      },
      {
        id: 'p_sil_7',
        nama: 'KH. Syamsul Arifin',
        role: 'KOMITE',
        roleTitle: 'Wakil Ketua Komite',
        nip: 'UGT-KOM-003',
        hp: '081111222333',
        isDefault: true,
      },
    ],
  },
  {
    id: 'office_genteng_202',
    nama: 'Capem Genteng',
    kode: '202',
    tipe: 'Capem',
    alamat: 'Jl. Gajah Mada No. 45, Genteng',
    kota: 'Banyuwangi',
    telepon: '(0333) 845202',
    petugas: [
      {
        id: 'p_gen_1',
        nama: 'H. Lukman Hakim, S.E.',
        role: 'KCP',
        roleTitle: 'Kepala Capem (KCP)',
        nip: 'UGT-202-001',
        hp: '081234998877',
        isDefault: true,
      },
      {
        id: 'p_gen_2',
        nama: 'Zaenal Abidin, S.E.',
        role: 'AOAP',
        roleTitle: 'AO Pembiayaan (AOAP / AOA)',
        nip: 'UGT-202-002',
        hp: '085233112233',
        isDefault: true,
      },
      {
        id: 'p_gen_3',
        nama: 'Fitri Handayani',
        role: 'AOSP',
        roleTitle: 'AO Simpanan & Pelayanan (AOSP)',
        nip: 'UGT-202-003',
        hp: '085744556677',
        isDefault: true,
      },
      {
        id: 'p_gen_4',
        nama: 'Agus Setiawan',
        role: 'AOP',
        roleTitle: 'AO Penagihan & Pendanaan (AOP)',
        nip: 'UGT-202-004',
        hp: '081988776655',
        isDefault: true,
      },
      {
        id: 'p_gen_5',
        nama: 'H. Abdul Wahid, M.M.',
        role: 'KC',
        roleTitle: 'Kepala Cabang (KC)',
        nip: 'UGT-010-001',
        hp: '081333444555',
        isDefault: true,
      },
      {
        id: 'p_gen_6',
        nama: 'Drs. H. M. Sholeh',
        role: 'PENGURUS',
        roleTitle: 'Wakil Pengurus',
        nip: 'UGT-PST-005',
        hp: '081222333444',
        isDefault: true,
      },
      {
        id: 'p_gen_7',
        nama: 'KH. Syamsul Arifin',
        role: 'KOMITE',
        roleTitle: 'Wakil Ketua Komite',
        nip: 'UGT-KOM-003',
        hp: '081111222333',
        isDefault: true,
      },
    ],
  },
  {
    id: 'office_banyuwangi_101',
    nama: 'Cabang Banyuwangi',
    kode: '101',
    tipe: 'Cabang',
    alamat: 'Jl. Ahmad Yani No. 12, Banyuwangi Kota',
    kota: 'Banyuwangi',
    telepon: '(0333) 412101',
    petugas: [
      {
        id: 'p_bwi_1',
        nama: 'H. Abdul Wahid, M.M.',
        role: 'KC',
        roleTitle: 'Kepala Cabang (KC)',
        nip: 'UGT-010-001',
        hp: '081333444555',
        isDefault: true,
      },
      {
        id: 'p_bwi_2',
        nama: 'M. Ali Maksum, S.E.',
        role: 'KCP',
        roleTitle: 'Kepala Capem (KCP)',
        nip: 'UGT-101-002',
        hp: '081255443322',
        isDefault: true,
      },
      {
        id: 'p_bwi_3',
        nama: 'Rahmat Hidayat',
        role: 'AOAP',
        roleTitle: 'AO Pembiayaan (AOAP / AOA)',
        nip: 'UGT-101-003',
        hp: '081277665544',
        isDefault: true,
      },
      {
        id: 'p_bwi_4',
        nama: 'Eka Fitriani',
        role: 'AOSP',
        roleTitle: 'AO Simpanan & Pelayanan (AOSP)',
        nip: 'UGT-101-004',
        hp: '085699887711',
        isDefault: true,
      },
      {
        id: 'p_bwi_5',
        nama: 'Moh. Hasan',
        role: 'AOP',
        roleTitle: 'AO Penagihan & Pendanaan (AOP)',
        nip: 'UGT-101-005',
        hp: '087755667788',
        isDefault: true,
      },
      {
        id: 'p_bwi_6',
        nama: 'Drs. H. M. Sholeh',
        role: 'PENGURUS',
        roleTitle: 'Wakil Pengurus',
        nip: 'UGT-PST-005',
        hp: '081222333444',
        isDefault: true,
      },
      {
        id: 'p_bwi_7',
        nama: 'KH. Syamsul Arifin',
        role: 'KOMITE',
        roleTitle: 'Wakil Ketua Komite',
        nip: 'UGT-KOM-003',
        hp: '081111222333',
        isDefault: true,
      },
    ],
  },
];

export function getStoredOffices(): KantorBMT[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure central officers (PENGURUS, KOMITE, KC) exist in every office
        let hasChanges = false;
        const defaultPengurus = DEFAULT_OFFICES[0].petugas.find((p) => p.role === 'PENGURUS');
        const defaultKomite = DEFAULT_OFFICES[0].petugas.find((p) => p.role === 'KOMITE');
        const defaultKC = DEFAULT_OFFICES[0].petugas.find((p) => p.role === 'KC');

        const migrated = parsed.map((off: KantorBMT) => {
          const pets = [...(off.petugas || [])];
          if (!pets.some((p) => p.role === 'PENGURUS') && defaultPengurus) {
            pets.push({ ...defaultPengurus, id: `p_${off.id}_pengurus` });
            hasChanges = true;
          }
          if (!pets.some((p) => p.role === 'KOMITE') && defaultKomite) {
            pets.push({ ...defaultKomite, id: `p_${off.id}_komite` });
            hasChanges = true;
          }
          if (!pets.some((p) => p.role === 'KC') && defaultKC) {
            pets.push({ ...defaultKC, id: `p_${off.id}_kc` });
            hasChanges = true;
          }
          return { ...off, petugas: pets };
        });

        if (hasChanges) {
          saveStoredOffices(migrated);
        }
        return migrated;
      }
    }
  } catch (err) {
    console.error('Failed to parse offices from localStorage', err);
  }
  // Initialize with default and save
  saveStoredOffices(DEFAULT_OFFICES);
  return DEFAULT_OFFICES;
}

export function saveStoredOffices(offices: KantorBMT[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offices));
  } catch (err) {
    console.error('Failed to save offices to localStorage', err);
  }
}

export function getActiveOfficeId(): string {
  try {
    const active = localStorage.getItem(ACTIVE_OFFICE_KEY);
    if (active) return active;
  } catch (e) {
    // Ignore
  }
  const offices = getStoredOffices();
  return offices[0]?.id || 'office_pesanggaran_264';
}

export function setActiveOfficeId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_OFFICE_KEY, id);
  } catch (e) {
    // Ignore
  }
}

export function getActiveOffice(): KantorBMT {
  const offices = getStoredOffices();
  const activeId = getActiveOfficeId();
  const found = offices.find((o) => o.id === activeId);
  return found || offices[0] || DEFAULT_OFFICES[0];
}

export function addOffice(newOffice: Omit<KantorBMT, 'id' | 'petugas'> & { petugas?: PetugasOffice[] }): KantorBMT {
  const offices = getStoredOffices();
  const id = `office_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const created: KantorBMT = {
    ...newOffice,
    id,
    petugas: newOffice.petugas || [],
  };
  const updated = [...offices, created];
  saveStoredOffices(updated);
  return created;
}

export function updateOffice(id: string, updates: Partial<Omit<KantorBMT, 'id' | 'petugas'>>): KantorBMT | null {
  const offices = getStoredOffices();
  const index = offices.findIndex((o) => o.id === id);
  if (index === -1) return null;

  offices[index] = { ...offices[index], ...updates };
  saveStoredOffices(offices);
  return offices[index];
}

export function deleteOffice(id: string): boolean {
  const offices = getStoredOffices();
  if (offices.length <= 1) {
    throw new Error('Minimal harus menyisakan 1 Kantor BMT.');
  }
  const filtered = offices.filter((o) => o.id !== id);
  saveStoredOffices(filtered);
  if (getActiveOfficeId() === id) {
    setActiveOfficeId(filtered[0].id);
  }
  return true;
}

export function addOfficerToOffice(officeId: string, officer: Omit<PetugasOffice, 'id'>): PetugasOffice {
  const offices = getStoredOffices();
  const officeIndex = offices.findIndex((o) => o.id === officeId);
  if (officeIndex === -1) throw new Error('Kantor tidak ditemukan');

  const id = `p_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const newOfficer: PetugasOffice = {
    ...officer,
    id,
  };

  offices[officeIndex].petugas.push(newOfficer);
  saveStoredOffices(offices);
  return newOfficer;
}

export function updateOfficerInOffice(
  officeId: string,
  officerId: string,
  updates: Partial<Omit<PetugasOffice, 'id'>>
): void {
  const offices = getStoredOffices();
  const officeIndex = offices.findIndex((o) => o.id === officeId);
  if (officeIndex === -1) return;

  const petIndex = offices[officeIndex].petugas.findIndex((p) => p.id === officerId);
  if (petIndex === -1) return;

  offices[officeIndex].petugas[petIndex] = {
    ...offices[officeIndex].petugas[petIndex],
    ...updates,
  };
  saveStoredOffices(offices);
}

export function deleteOfficerFromOffice(officeId: string, officerId: string): void {
  const offices = getStoredOffices();
  const officeIndex = offices.findIndex((o) => o.id === officeId);
  if (officeIndex === -1) return;

  offices[officeIndex].petugas = offices[officeIndex].petugas.filter((p) => p.id !== officerId);
  saveStoredOffices(offices);
}

export function getOfficersByRole(officeId: string, role: OfficerRole): PetugasOffice[] {
  const offices = getStoredOffices();
  const office = offices.find((o) => o.id === officeId);
  if (!office) return [];
  return office.petugas.filter((p) => p.role === role);
}

export function getAllOfficersByRole(role: OfficerRole): PetugasOffice[] {
  const offices = getStoredOffices();
  const map = new Map<string, PetugasOffice>();
  for (const off of offices) {
    for (const p of off.petugas) {
      if (p.role === role && !map.has(p.nama.trim().toLowerCase())) {
        map.set(p.nama.trim().toLowerCase(), p);
      }
    }
  }
  return Array.from(map.values());
}

export function resetToDefaultOffices(): KantorBMT[] {
  saveStoredOffices(DEFAULT_OFFICES);
  setActiveOfficeId(DEFAULT_OFFICES[0].id);
  return DEFAULT_OFFICES;
}
