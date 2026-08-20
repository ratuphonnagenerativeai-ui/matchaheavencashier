import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Apple, 
  CheckCircle, 
  Printer, 
  ShieldCheck, 
  Send,
  Sparkles
} from 'lucide-react';
import { MatchaLogo } from './MatchaLogo';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [managerName, setManagerName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSimulatedDownload = (platform: string) => {
    setDownloadStarted(true);
    setTimeout(() => {
      setDownloadStarted(false);
      alert(`Paket instalasi ${platform} Matcha Heaven POS v2.4 siap dipasang pada perangkat kasir Anda.`);
    }, 1500);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#47623A]/20 animate-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <MatchaLogo variant="icon-only" size="md" />
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1E2B18] font-display">
                Unduh Aplikasi Kasir Matcha Heaven
              </h3>
              <p className="text-xs text-[#5D6F51]">Versi Resmi v2.4 (Build 2026.08) • Android & iOS Ready</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download Buttons Section */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            1. Pilih Platform Perangkat Kasir
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Android APK */}
            <button
              onClick={() => handleSimulatedDownload('Android APK Direct')}
              className="p-4 rounded-2xl border-2 border-[#47623A] bg-[#FAF9F5] hover:bg-[#EFECE0] text-left transition-all flex items-start gap-3 group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-[#47623A] text-white group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#1E2B18]">Android APK Direct</div>
                <div className="text-[11px] text-[#55694A]">Untuk Tablet POS & Sunmi V2s</div>
                <div className="text-[10px] text-[#47623A] font-bold mt-1 inline-flex items-center gap-1">
                  <Download className="w-3 h-3" /> Unduh (42 MB)
                </div>
              </div>
            </button>

            {/* iOS / iPadOS */}
            <button
              onClick={() => handleSimulatedDownload('iOS TestFlight / iPadOS')}
              className="p-4 rounded-2xl border-2 border-stone-300 hover:border-[#47623A] bg-[#FAF9F5] hover:bg-[#EFECE0] text-left transition-all flex items-start gap-3 group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-stone-800 text-white group-hover:scale-105 transition-transform">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#1E2B18]">iPadOS / iOS Kasir</div>
                <div className="text-[11px] text-stone-500">Untuk iPad & iPhone Kasir</div>
                <div className="text-[10px] text-stone-800 font-bold mt-1 inline-flex items-center gap-1">
                  <Download className="w-3 h-3" /> App Store / TestFlight
                </div>
              </div>
            </button>
          </div>

          {downloadStarted && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2 animate-pulse">
              <Download className="w-4 h-4" />
              <span>Memulai pengunduhan file instalasi Matcha Heaven POS...</span>
            </div>
          )}
        </div>

        {/* Hardware Bundle Request Form */}
        <div className="pt-4 border-t border-stone-200 space-y-3">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5 text-[#47623A]" />
            <span>2. Butuh Paket Mesin Kasir + Thermal Printer?</span>
          </div>

          {formSent ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
              <CheckCircle className="w-6 h-6 text-[#47623A] mx-auto" />
              <div className="text-xs font-bold text-emerald-900">Permintaan Konsultasi Diterima!</div>
              <div className="text-[11px] text-emerald-700">
                Tim implementasi Matcha Heaven POS akan segera menghubungi WhatsApp <strong>{phone}</strong> untuk konfigurasi gerai {branchName}.
              </div>
            </div>
          ) : (
            <form onSubmit={handleConsultSubmit} className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Nama Manajer / Owner"
                  className="px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A] bg-white"
                />
                <input
                  type="text"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Nama Cabang / Gerai"
                  className="px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A] bg-white"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="No. WhatsApp Aktif"
                  className="px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#47623A] hover:bg-[#384E2D] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Konsultasi Instalasi & Perangkat POS Gerai</span>
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#47623A]" />
            Garansi Resmi & Enkripsi Data Transaksi
          </span>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-bold underline"
          >
            Tutup Jendela
          </button>
        </div>

      </div>
    </div>
  );
};
