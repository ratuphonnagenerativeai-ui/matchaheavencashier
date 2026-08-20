import React, { useState } from 'react';
import { 
  Sparkles, 
  Coffee, 
  Package, 
  Shirt, 
  Store, 
  HeartHandshake, 
  Leaf, 
  ShieldCheck, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { MatchaLogo } from './MatchaLogo';
import { BRAND_PHILOSOPHY } from '../data/mockData';

export const BrandAestheticShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packaging' | 'uniform' | 'interior' | 'philosophy'>('packaging');

  const colorPalette = [
    { name: 'Matcha Deep Green', hex: '#47623A', usage: 'Identitas Utama, Navbar, Tombol Aksi POS' },
    { name: 'Sage Herbal Green', hex: '#A3B67A', usage: 'Aksen Daun, Highlight, Status Sukses' },
    { name: 'Natural Cream Oat', hex: '#E9E5D6', usage: 'Latar Belakang Kafe, Card Background' },
    { name: 'Warm Earth Caramel', hex: '#8C6A4A', usage: 'Garis Elegan, Kategori Menu, Tombol Secondary' },
    { name: 'Pure Matcha Mist', hex: '#F6F4EC', usage: 'Canvas Utama Landing Page' }
  ];

  return (
    <section id="brand" className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#47623A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Identitas & Visual Brand</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Ekosistem Estetika Matcha Heaven Café
          </h2>
          <p className="text-sm sm:text-base text-[#526346] leading-relaxed">
            Dari kemasan ramah lingkungan hingga seragam barista dan atmosfer ruang kafe yang menenangkan, sistem POS dirancang selaras dengan jati diri Matcha Heaven.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#EFECE0] border border-[#47623A]/15 overflow-x-auto max-w-full">
            {[
              { id: 'packaging', label: 'Konsep Packaging', icon: Package },
              { id: 'uniform', label: 'Seragam Barista', icon: Shirt },
              { id: 'interior', label: 'Suasana & Interior Kafe', icon: Store },
              { id: 'philosophy', label: 'Filosofi & Logo', icon: Leaf }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-[#47623A] text-white shadow-sm'
                      : 'text-[#526346] hover:text-[#213019]'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#47623A]/15 shadow-sm">
          
          {/* TAB 1: PACKAGING */}
          {activeTab === 'packaging' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold text-[#47623A] uppercase tracking-wider">
                  Desain Kemasan Alami & Ramah Lingkungan
                </span>
                <h3 className="text-2xl font-bold text-[#1E2B18] font-display">
                  Packaging Minimalis, Natural, dan Berkelas
                </h3>
                <p className="text-sm text-[#546648] leading-relaxed">
                  Dirancang menggunakan material ramah lingkungan (food-grade recycled paper, biodegradable cups, soy ink) yang menjaga suhu minuman serta kesegaran dessert Matcha Heaven tetap prima.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-xs text-[#1E2B18] mb-1">Cup Hot & Iced</div>
                    <div className="text-[11px] text-stone-500">Logo timbul jelas, double-wall insulasi suhu optimal.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-xs text-[#1E2B18] mb-1">Food & Dessert Box</div>
                    <div className="text-[11px] text-stone-500">Khusus Basque Cheesecake & Tiramisu anti-tumpah.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-xs text-[#1E2B18] mb-1">Paper Carrier Bag</div>
                    <div className="text-[11px] text-stone-500">Kraft paper kokoh dengan cetak logo daun teh elegan.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-xs text-[#1E2B18] mb-1">Sticker Seal & Label</div>
                    <div className="text-[11px] text-stone-500">Segel higienis & penanda nomor invoice pesanan.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#FAF9F5] p-6 rounded-2xl border border-[#47623A]/15 text-center space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-[#47623A]/20 shadow-inner flex flex-col items-center justify-center space-y-3">
                  <MatchaLogo variant="full-vertical" size="lg" />
                  <div className="h-[1px] w-32 bg-[#8C6A4A]" />
                  <div className="text-xs font-serif italic text-stone-600">
                    "Kemasan yang baik, menjaga rasa dan menyampaikan cerita brand."
                  </div>
                </div>
                <div className="flex justify-around text-xs font-bold text-[#47623A]">
                  <span>✓ 100% Recyclable</span>
                  <span>✓ Food Grade Safe</span>
                  <span>✓ Soy-based Ink</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UNIFORM */}
          {activeTab === 'uniform' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold text-[#47623A] uppercase tracking-wider">
                  Keramahan & Profesionalitas Barista
                </span>
                <h3 className="text-2xl font-bold text-[#1E2B18] font-display">
                  Seragam Bersih, Nyaman, dan Bersahaja
                </h3>
                <p className="text-sm text-[#546648] leading-relaxed">
                  Seragam barista dan kasir Matcha Heaven mengusung nuansa alami: kemeja warna oat cream berkerah Shanghai dengan saku beraksen list hijau matcha, dipadukan apron hijau matcha bordir logo.
                </p>

                <div className="space-y-2.5 pt-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2 p-2.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                    <span><strong>Kerah Shanghai:</strong> Memberikan kesan rapi, modern, dan sopan saat melayani tamu di kasir.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                    <span><strong>Apron Hijau Matcha:</strong> Kantong fungsional untuk menyimpan thermal printer portable & stylus POS.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#47623A] shrink-0" />
                    <span><strong>Bordir Logo Halus:</strong> Simbol daun & mangkuk teh terjahit rapi di dada kiri dan apron.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 bg-[#FAF9F5] rounded-2xl border border-[#47623A]/15 space-y-3">
                <div className="text-xs font-bold text-[#1E2B18] uppercase tracking-wider">Standar Hospitality Kasir</div>
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
                  <div className="font-bold text-[#47623A]">1. Greeting & Rekomendasi Menu</div>
                  <p>Menyapa pelanggan dengan ramah serta menawarkan tingkat manis dan varian susu sesuai preferensi.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
                  <div className="font-bold text-[#47623A]">2. Transaksi Cepat & Invoice Transparan</div>
                  <p>Menjelaskan rincian pesanan di layar kasir mobile sebelum memproses pembayaran QRIS atau Tunai.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
                  <div className="font-bold text-[#47623A]">3. Penyerahan Struk & Kartu Nomor Meja</div>
                  <p>Struk thermal otomatis tercetak dan diserahkan bersama ucapan hangat "Taste the calm, sip the matcha".</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERIOR */}
          {activeTab === 'interior' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold text-[#47623A] uppercase tracking-wider">
                  Suasana & Kenyamanan Kafe
                </span>
                <h3 className="text-2xl font-bold text-[#1E2B18] font-display">
                  Tempat Tenang untuk Menikmati Matcha & Berkumpul
                </h3>
                <p className="text-sm text-[#546648] leading-relaxed">
                  Interior Matcha Heaven memadukan kayu hangat, dinding aksen matcha beralur (fluted wood panel), tanaman hias hijau alami, dan pencahayaan hangat yang menciptakan sanctuary tenang di tengah hiruk-pikuk kota.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-[#1E2B18]">Bar Counter Zen</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">Area barista menyeduh matcha dengan whisk chasen tradisional.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-[#1E2B18]">Cozy Sofa Seating</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">Bantalan hijau sage yang empuk untuk waktu santai berkualitas.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-[#1E2B18]">Acoustic Calm</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">Musik lo-fi ambient menenangkan yang mendukung fokus bekerja.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                    <div className="font-bold text-[#1E2B18]">High-Speed Wi-Fi</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">Password otomatis tertera di bagian bawah struk kasir.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 bg-[#47623A] text-white rounded-2xl space-y-4">
                <div className="text-xs uppercase tracking-widest text-[#D4E8BF] font-extrabold">
                  Menu Display Board Showcase
                </div>
                <div className="bg-[#FAF9F5] text-stone-900 p-4 rounded-xl space-y-3">
                  <div className="font-serif font-bold text-center text-sm border-b pb-1 text-[#47623A]">
                    MATCHA SIGNATURE • COFFEE • MAIN COURSE
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                    <div>
                      <div className="font-bold text-[#47623A]">SIGNATURE</div>
                      <div>[MS001] Latte: 18k</div>
                      <div>[MS002] Strawb: 22k</div>
                      <div>[MS014] Heaven: 28k</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#47623A]">NON/COFFEE</div>
                      <div>[NM001] Choco: 18k</div>
                      <div>[CF001] Latte: 18k</div>
                      <div>[CF005] Dirty: 24k</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#47623A]">MAIN COURSE</div>
                      <div>[MC001] Katsu: 28k</div>
                      <div>[MC006] Mentai: 30k</div>
                      <div>[MC012] Beef: 38k</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-stone-200 italic text-center">
                  "Sip the serenity, savor every droplet."
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PHILOSOPHY */}
          {activeTab === 'philosophy' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BRAND_PHILOSOPHY.map((phil, i) => (
                  <div key={i} className="p-6 bg-[#FAF9F5] rounded-2xl border border-[#47623A]/15 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#47623A] text-white flex items-center justify-center">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1E2B18]">{phil.title}</h4>
                    <p className="text-xs text-[#526346] leading-relaxed">{phil.desc}</p>
                  </div>
                ))}
              </div>

              {/* Color Palette Grid */}
              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">
                  Palet Warna Resmi Brand Matcha Heaven
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {colorPalette.map((col, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 space-y-2">
                      <div
                        className="w-full h-12 rounded-lg border border-black/10 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1E2B18]">{col.name}</div>
                        <div className="text-[10px] font-mono text-stone-500 font-semibold">{col.hex}</div>
                        <div className="text-[9px] text-stone-500 mt-0.5 line-clamp-1">{col.usage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
