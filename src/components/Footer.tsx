import React from 'react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  ShieldCheck, 
  Coffee, 
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { MatchaLogo } from './MatchaLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2817] text-[#FAF8F2] pt-16 pb-12 border-t border-[#47623A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Story (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <MatchaLogo variant="full-horizontal" size="lg" inverted={true} />
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Sistem kasir mobile modern yang dirancang untuk menghadirkan ketenangan, kecepatan pencatatan invoice, laporan omzet real-time, dan integrasi cetak struk otomatis di setiap cangkir Matcha Heaven Café.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A3B67A] shrink-0" />
                <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A3B67A] shrink-0" />
                <span>(021) 789-2345 • WhatsApp: 0812-8899-7722</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#A3B67A] shrink-0" />
                <span>@matchaheaven.cafe • @matchaheaven.pos</span>
              </div>
            </div>
          </div>

          {/* Col 3: Modul & Fitur */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A3B67A] uppercase tracking-wider">Fitur Sistem POS</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#simulator" className="hover:text-white transition-colors">Kasir Cepat & Multi-Payment</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Pencatatan Invoice Otomatis</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Laporan Penjualan Real-Time</a></li>
              <li><a href="#printer" className="hover:text-white transition-colors">Integrasi Cetak Struk ESC/POS</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Katalog Menu & Custom Sugar/Ice</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">Mode Offline & Cloud Sync</a></li>
            </ul>
          </div>

          {/* Col 4: Menu Favorit Matcha */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A3B67A] uppercase tracking-wider">Menu Andalan Kafe</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><span className="text-white font-medium">Premium Matcha Latte</span> (Uji Kyoto)</li>
              <li><span className="text-white font-medium">Strawberry Matcha Latte</span></li>
              <li><span className="text-white font-medium">Matcha Basque Cheesecake</span></li>
              <li><span className="text-white font-medium">Matcha Tiramisu in Jar</span></li>
              <li><span className="text-white font-medium">Matcha Croffle with Glaze</span></li>
              <li><span className="text-white font-medium">Chicken Katsu Rice Set</span></li>
            </ul>
          </div>

          {/* Col 5: Filosofi & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A3B67A] uppercase tracking-wider">Tagline & Filosofi</h4>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300 italic">
              "Taste the calm, sip the matcha."
            </div>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Server POS & API: Normal (100% Up)
              </div>
              <div>Versi Rilis: v2.4 (Build 2026.08)</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 Matcha Heaven Café. Hak cipta dilindungi undang-undang.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              Crafted with <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> for Matcha Heaven
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
