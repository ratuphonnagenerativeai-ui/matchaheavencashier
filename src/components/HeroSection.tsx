import React from 'react';
import { 
  Zap, 
  Receipt, 
  Printer, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Smartphone,
  Wifi,
  ShoppingBag
} from 'lucide-react';
import { MatchaLogo } from './MatchaLogo';

interface HeroSectionProps {
  onScrollToSimulator: () => void;
  onScrollToPrinter: () => void;
  onOpenDownload: () => void;
  todayRevenue: number;
  totalOrders: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToSimulator,
  onScrollToPrinter,
  onOpenDownload,
  todayRevenue,
  totalOrders
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#A3B67A]/15 via-[#47623A]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#47623A]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-12 w-72 h-72 bg-[#8C6A4A]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAEFE4] border border-[#47623A]/20 text-[#324927] text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#47623A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#47623A]"></span>
              </span>
              <span>Sistem Kasir Mobile Resmi • Matcha Heaven Café v2.4</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2B18] tracking-tight leading-[1.15] font-display">
              Aplikasi Kasir Mobile & Invoice Otomatis untuk{' '}
              <span className="relative inline-block text-[#47623A]">
                Matcha Heaven
                <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#A3B67A]" viewBox="0 0 100 12" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,0 C30,10 70,10 100,0 L100,6 C70,14 30,14 0,6 Z" />
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#47573D] leading-relaxed max-w-2xl font-normal">
              Revolusi operasional kafe Anda: catat pesanan minuman matcha & dessert secepat kilat, terbitkan invoice berpenomoran otomatis, pantau omzet real-time, dan cetak struk thermal otomatis via Bluetooth/LAN tanpa jeda.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-[#2D3F23]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                <span>Kasir Cepat & Multi-Payment (QRIS, Kartu, Tunai)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                <span>Auto-Generate Nomor Invoice & Rincian PB1 10%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                <span>Laporan Penjualan & Analitik Omzet Real-Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                <span>Auto-Print Struk Thermal 58mm & 80mm ESC/POS</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                id="hero-btn-simulator"
                onClick={onScrollToSimulator}
                className="px-6 py-3.5 rounded-xl bg-[#47623A] hover:bg-[#384F2E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-98 group cursor-pointer"
              >
                <Receipt className="w-4 h-4 transition-transform group-hover:rotate-6" />
                <span>Jalankan Demo Kasir Interaktif</span>
                <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-btn-printer"
                onClick={onScrollToPrinter}
                className="px-5 py-3.5 rounded-xl bg-[#EFECE0] hover:bg-[#E5E1D2] text-[#334629] font-bold text-sm border border-[#47623A]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#47623A]" />
                <span>Lihat Integrasi Struk</span>
              </button>

              <button
                id="hero-btn-download-app"
                onClick={onOpenDownload}
                className="px-4 py-3.5 text-xs font-semibold text-[#5B6D4F] hover:text-[#28391F] underline decoration-[#A3B67A] underline-offset-4 cursor-pointer"
              >
                Unduh Aplikasi APK / iOS (v2.4)
              </button>
            </div>

            {/* Live Stats Ticker bar */}
            <div className="pt-4 border-t border-[#47623A]/15 grid grid-cols-3 gap-3 max-w-lg">
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#47623A]/10">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#697B5E]">Omzet Hari Ini</div>
                <div className="text-sm sm:text-base font-extrabold text-[#283A1F] mt-0.5">{formatRupiah(todayRevenue)}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#47623A]/10">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#697B5E]">Total Transaksi</div>
                <div className="text-sm sm:text-base font-extrabold text-[#283A1F] mt-0.5">{totalOrders} Pesanan</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#47623A]/10">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#697B5E]">Kecepatan Struk</div>
                <div className="text-sm sm:text-base font-extrabold text-[#47623A] mt-0.5">&lt; 0.8 Detik</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-fidelity Device Mockup Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient halo behind phone */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#47623A]/30 to-[#A3B67A]/30 rounded-[3rem] filter blur-xl transform scale-95 -z-10" />

            {/* Smartphone shell */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-[#1C2616] p-3 sm:p-4 rounded-[42px] shadow-2xl border-4 border-[#3D5230] text-white">
              
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full flex items-center justify-between px-3 z-30">
                <div className="w-2 h-2 rounded-full bg-[#324528]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#182312] border border-stone-700" />
              </div>

              {/* Screen Container */}
              <div className="bg-[#F7F5EE] text-[#1E2819] rounded-[32px] overflow-hidden pt-7 pb-4 px-3.5 space-y-3.5 relative min-h-[580px] flex flex-col justify-between">
                
                {/* Mobile Top Header */}
                <div className="flex items-center justify-between border-b border-[#47623A]/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#47623A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      MH
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2A3C21] font-display">Matcha Heaven POS</div>
                      <div className="text-[10px] text-[#697B5E] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Kasir 01 • Meja Aktif
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#47623A]/10 px-2 py-1 rounded-md text-[10px] font-bold text-[#47623A]">
                    <Wifi className="w-3 h-3" />
                    <span>Sync Live</span>
                  </div>
                </div>

                {/* Quick Menu Selection simulation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#55694A]">
                    <span>Katalog Cepat (Daftar Menu)</span>
                    <span className="text-[#47623A]">Kategori: Matcha Drinks</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-white rounded-xl border border-[#47623A]/15 shadow-2xs hover:border-[#47623A] transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#47623A]/10 text-[#47623A] rounded">Signature</span>
                        <span className="text-[10px] font-extrabold text-[#47623A]">Rp 30k</span>
                      </div>
                      <div className="text-xs font-bold text-[#202E19] mt-1 line-clamp-1">Matcha Latte</div>
                      <div className="text-[9px] text-[#718265]">Grade Uji Kyoto</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-[#47623A]/15 shadow-2xs hover:border-[#47623A] transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">Best</span>
                        <span className="text-[10px] font-extrabold text-[#47623A]">Rp 35k</span>
                      </div>
                      <div className="text-xs font-bold text-[#202E19] mt-1 line-clamp-1">Strawberry Matcha</div>
                      <div className="text-[9px] text-[#718265]">Fresh berry puree</div>
                    </div>
                  </div>
                </div>

                {/* Active Cart & Invoice Preview Card */}
                <div className="bg-white rounded-2xl p-3 border border-[#47623A]/20 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs pb-1.5 border-b border-stone-100">
                    <div className="flex items-center gap-1.5 font-bold text-[#2E4124]">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#47623A]" />
                      <span>Invoice #INV-0089</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#66775C]">Meja 04 • Dine In</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#33442A]">
                      <span>2x Premium Matcha Latte</span>
                      <span className="font-semibold">Rp 60.000</span>
                    </div>
                    <div className="text-[10px] text-stone-500 pl-3">↳ Less Sugar (70%), Normal Ice</div>

                    <div className="flex justify-between items-center text-[#33442A]">
                      <span>1x Matcha Basque Cheesecake</span>
                      <span className="font-semibold">Rp 32.000</span>
                    </div>

                    <div className="pt-1.5 border-t border-stone-100 space-y-0.5 text-[11px]">
                      <div className="flex justify-between text-stone-500">
                        <span>Pajak PB1 (10%)</span>
                        <span>Rp 9.200</span>
                      </div>
                      <div className="flex justify-between text-xs font-extrabold text-[#223319] pt-1">
                        <span>Total Bayar</span>
                        <span className="text-[#47623A] text-sm font-black">Rp 101.200</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auto Thermal Print Notification Pill */}
                <div className="bg-[#47623A] text-white p-2.5 rounded-xl flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/20">
                      <Printer className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-emerald-200">Thermal Printer ESC/POS</div>
                      <div className="font-bold text-[11px]">Auto Print Struk: Siap</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Bottom Action simulation */}
                <button
                  onClick={onScrollToSimulator}
                  className="w-full py-2.5 bg-[#8C6A4A] hover:bg-[#78593B] text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tekan untuk Simulasi Transaksi</span>
                </button>

              </div>
            </div>

            {/* Floating feature pills around device */}
            <div className="hidden sm:flex absolute -left-8 top-1/4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#47623A]/15 items-center gap-3 animate-bounce duration-1000">
              <div className="p-2 rounded-xl bg-emerald-100 text-[#47623A]">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#203018]">Bayar QRIS 0.8 Detik</div>
                <div className="text-[10px] text-stone-500">Auto-detect pembayaran</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -right-6 bottom-1/4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#47623A]/15 items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-[#8C6A4A]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#203018]">Rekap Shift & Laporan</div>
                <div className="text-[10px] text-stone-500">Sinkronisasi Cloud Real-Time</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
