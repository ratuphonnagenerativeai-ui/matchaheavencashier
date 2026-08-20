import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  User, 
  X, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { UserRole, CashierProfile } from '../types';
import { CASHIERS_LIST } from '../data/mockData';
import { MatchaLogo } from './MatchaLogo';

interface RoleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  currentCashier: CashierProfile;
  onSelectRole: (role: UserRole, cashierProfile: CashierProfile) => void;
  onOpenAttendance: () => void;
}

export const RoleAuthModal: React.FC<RoleAuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentCashier,
  onSelectRole,
  onOpenAttendance
}) => {
  const [selectedTargetRole, setSelectedTargetRole] = useState<UserRole>(currentRole);
  const [selectedCashierId, setSelectedCashierId] = useState<string>(currentCashier.id);
  const [ownerPin, setOwnerPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  if (!isOpen) return null;

  const cashiersOnly = CASHIERS_LIST.filter(c => c.role === 'kasir');
  const ownerProfile = CASHIERS_LIST.find(c => c.role === 'owner') || {
    id: 'owner-01',
    name: 'Owner (Hendra Pratama)',
    code: 'OWNER-01',
    role: 'owner',
    phone: '0811-7788-9900'
  };

  const handleApplyRole = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);

    if (selectedTargetRole === 'owner') {
      // Default demo PIN is 1234
      if (ownerPin.trim() === '1234' || ownerPin.trim() === '') {
        onSelectRole('owner', ownerProfile);
        onClose();
      } else {
        setPinError('PIN Owner salah. Gunakan PIN demo: 1234');
      }
    } else {
      const chosen = cashiersOnly.find(c => c.id === selectedCashierId) || cashiersOnly[0];
      onSelectRole('kasir', chosen);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] rounded-3xl max-w-md w-full border border-[#47623A]/20 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#1E2B18] text-[#FAF8F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#47623A] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-display text-white">
                Pilih Akses Pengguna & Role
              </h3>
              <p className="text-[11px] text-[#A6C097]">
                Manajemen Wewenang Kasir & Hak Akses Owner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleApplyRole} className="p-5 sm:p-6 space-y-5">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-[#1E2B18] mb-2 uppercase tracking-wider">
              Pilih Peran Akun
            </label>
            <div className="grid grid-cols-2 gap-2.5 p-1 bg-[#EFECE0] rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedTargetRole('kasir');
                  setPinError(null);
                }}
                className={`py-3 px-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  selectedTargetRole === 'kasir'
                    ? 'bg-[#47623A] text-white shadow-sm'
                    : 'text-[#47623A] hover:bg-[#E2DDD0]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>Akun Kasir</span>
                </div>
                <span className={`text-[10px] font-normal ${selectedTargetRole === 'kasir' ? 'text-white/80' : 'text-stone-500'}`}>
                  Absensi & Kasir POS Saja
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTargetRole('owner');
                  setPinError(null);
                }}
                className={`py-3 px-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  selectedTargetRole === 'owner'
                    ? 'bg-[#1E2B18] text-white shadow-sm'
                    : 'text-[#1E2B18] hover:bg-[#E2DDD0]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Akun Owner</span>
                </div>
                <span className={`text-[10px] font-normal ${selectedTargetRole === 'owner' ? 'text-white/80' : 'text-stone-500'}`}>
                  Akses Penuh & Laporan
                </span>
              </button>
            </div>
          </div>

          {/* If Kasir Selected: Choose Cashier Name */}
          {selectedTargetRole === 'kasir' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1E2B18]">
                  Pilih Profil Kasir Bertugas
                </label>
                <span className="text-[10px] text-stone-500 font-medium">3 Kasir Terdaftar</span>
              </div>

              <div className="space-y-2">
                {cashiersOnly.map((cashier) => {
                  const isSelected = selectedCashierId === cashier.id;
                  return (
                    <div
                      key={cashier.id}
                      onClick={() => setSelectedCashierId(cashier.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#47623A] bg-[#47623A]/10 shadow-xs ring-1 ring-[#47623A]'
                          : 'border-stone-200 bg-white hover:border-[#47623A]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#47623A]/20 flex items-center justify-center font-bold text-xs text-[#47623A]">
                          {cashier.avatar ? (
                            <img src={cashier.avatar} alt={cashier.name} className="w-full h-full object-cover" />
                          ) : (
                            cashier.code
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1E2B18] flex items-center gap-2">
                            {cashier.name}
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#47623A]/15 text-[#47623A]">
                              {cashier.code}
                            </span>
                          </div>
                          <div className="text-[10px] text-stone-500">{cashier.phone}</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#47623A] bg-[#47623A] text-white' : 'border-stone-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cashier Permissions Disclaimer */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  Hak Akses Terbatas Kasir:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-amber-800/90 pl-1">
                  <li>Bisa melakukan <strong>Absensi Shift (Clock-In / Out)</strong></li>
                  <li>Bisa melayani pesanan dan <strong>Transaksi Pembayaran</strong></li>
                  <li><strong>TIDAK BISA</strong> mengedit/menghapus transaksi yang sudah lunas</li>
                  <li><strong>TIDAK BISA</strong> melihat laporan omset keuangan rahasia owner</li>
                </ul>
              </div>
            </div>
          )}

          {/* If Owner Selected: PIN Authorization */}
          {selectedTargetRole === 'owner' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-[#1E2B18] mb-1">
                  PIN Otorisasi Pemilik Toko
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    value={ownerPin}
                    onChange={(e) => {
                      setOwnerPin(e.target.value);
                      setPinError(null);
                    }}
                    placeholder="Masukkan PIN Owner (Demo: 1234)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-mono tracking-widest text-[#1E2B18] focus:outline-none focus:border-[#1E2B18] focus:ring-1 focus:ring-[#1E2B18]"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
                  <span>PIN default demo: <strong>1234</strong></span>
                  <button
                    type="button"
                    onClick={() => setOwnerPin('1234')}
                    className="text-[#47623A] font-semibold hover:underline cursor-pointer"
                  >
                    Isi Otomatis
                  </button>
                </div>
              </div>

              {pinError && (
                <div className="p-2.5 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              {/* Owner Privileges info */}
              <div className="p-3.5 bg-[#EAEFE4] rounded-2xl border border-[#47623A]/20 text-[11px] text-[#2D3F24] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#1E2B18]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#47623A]" />
                  Hak Akses Penuh Owner:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-[#3D5232] pl-1">
                  <li>Melihat seluruh laporan omset penjualan real-time & grafik</li>
                  <li>Melihat buku besar riwayat invoice lengkap & log audit</li>
                  <li>Memantau seluruh absensi dan kehadiran karyawan kafe</li>
                  <li>Konfigurasi printer thermal, struk, dan data master kafe</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer text-center"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl text-xs font-bold text-white bg-[#47623A] hover:bg-[#39502E] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Terapkan Role {selectedTargetRole === 'owner' ? 'Owner' : 'Kasir'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
