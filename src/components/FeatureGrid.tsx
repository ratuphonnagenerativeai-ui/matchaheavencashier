import React from 'react';
import { 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Printer, 
  QrCode, 
  Sparkles, 
  Smartphone, 
  Calculator, 
  Clock, 
  CheckCircle,
  FileSpreadsheet,
  Share2
} from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      id: 'feature-pos',
      icon: Smartphone,
      category: 'KASIR MOBILE CEPAT',
      title: 'Proses Pesanan Kilat & Multi-Metode Pembayaran',
      desc: 'Layani antrean pelanggan Matcha Heaven dengan gesit. Input pesanan minuman matcha dan dessert dalam 3 ketukan, pilih level gula & es, dan terima pembayaran QRIS, Tunai, EDC Kartu, hingga split bill.',
      points: [
        'Katalog visual menu dengan varian (Hot/Iced, Sweetness, Topping)',
        'Dukungan QRIS Dinamis & Statis dengan auto-detect sukses',
        'Kalkulator kembalian instan & nominal uang cepat (Rp 50k, Rp 100k)',
        'Mode Kasir Multi-Shift & pergantian kasir tanpa selisih uang'
      ],
      badgeColor: 'bg-[#47623A]/10 text-[#47623A] border-[#47623A]/20',
      accentBorder: 'border-l-4 border-l-[#47623A]'
    },
    {
      id: 'feature-invoice',
      icon: Receipt,
      category: 'PENCATATAN INVOICE OTOMATIS',
      title: 'Total Invoice Terstruktur & Perhitungan Pajak PB1',
      desc: 'Setiap transaksi dicatat secara otomatis dengan nomor invoice unik berurutan (INV-MH-...), rincian subtotal transparan, potongan diskon voucher member, serta perhitungan pajak restoran PB1 10%.',
      points: [
        'Nomor invoice otomatis berurutan & anti duplikasi',
        'Rincian detail catatan barista (cth: Oat Milk, Less Sugar 70%)',
        'Perhitungan otomatis pajak PB1 (10%) & diskon promo kafe',
        'Arsip invoice digital lengkap dapat dicari & dicetak ulang kapan saja'
      ],
      badgeColor: 'bg-amber-100 text-[#8C6A4A] border-amber-300',
      accentBorder: 'border-l-4 border-l-[#8C6A4A]'
    },
    {
      id: 'feature-analytics',
      icon: BarChart3,
      category: 'LAPORAN PENJUALAN REAL-TIME',
      title: 'Dashboard Analitik & Pemantauan Omzet Langsung',
      desc: 'Pantau performa bisnis Matcha Heaven di mana pun Anda berada. Dapatkan laporan omzet real-time, grafik jam sibuk, pergerakan stok minuman matcha, dan total keuntungan kotor harian.',
      points: [
        'Grafik tren omzet per jam untuk evaluasi peak hour kafe',
        'Leaderboard menu terlaris (contoh: Premium Matcha Latte vs Croffle)',
        'Rekapitulasi kas masuk per kasir & audit setoran tunai',
        'Ekspor laporan lengkap ke Excel, PDF, dan CSV dalam satu klik'
      ],
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accentBorder: 'border-l-4 border-l-emerald-600'
    },
    {
      id: 'feature-printer',
      icon: Printer,
      category: 'INTEGRASI CETAK STRUK OTOMATIS',
      title: 'Auto-Print Thermal Bluetooth/LAN & E-Receipt',
      desc: 'Struk thermal otomatis tercetak segera setelah pembayaran berstatus Lunas. Kompatibel dengan semua printer thermal standar 58mm & 80mm, lengkap dengan logo resmi Matcha Heaven dan QR validasi.',
      points: [
        'Koneksi Bluetooth, USB OTG, dan LAN/Wi-Fi instan',
        'Kustom header: Logo Matcha Heaven, alamat outlet, dan nomor meja',
        'Kustom footer: Password Wi-Fi tamu kafe, promo voucher, & Instagram',
        'Kirim E-Receipt digital ke WhatsApp & Email pelanggan ramah lingkungan'
      ],
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      accentBorder: 'border-l-4 border-l-teal-600'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-[#FAF8F2] border-y border-[#47623A]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 Pilar Unggulan Sistem POS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Dirancang Khusus untuk Kelancaran Operasional Matcha Heaven
          </h2>
          <p className="text-sm sm:text-base text-[#56684A] leading-relaxed">
            Menghilangkan antrean menumpuk, mencegah selisih hitung kasir, dan menyajikan laporan keuangan yang selalu terupdate setiap detik.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#47623A]/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#F4F1E6] text-[#47623A] group-hover:bg-[#47623A] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E2C17] mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E6043] leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-3 border-t border-stone-100">
                    {item.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#2F4125]">
                        <CheckCircle className="w-4 h-4 text-[#47623A] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom subtle accent */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-[#6A7B5F] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#47623A]" />
                    Teruji di Gerai Matcha Heaven
                  </span>
                  <span className="text-[#47623A] group-hover:translate-x-1 transition-transform font-bold inline-flex items-center gap-1">
                    Aktif Otomatis &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick workflow strip */}
        <div className="mt-12 bg-[#47623A] text-[#FAF8F2] rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="pt-4 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl font-black text-[#D8E6C3] font-display">01</div>
              <div className="text-sm font-bold">Pilih Menu & Topping</div>
              <div className="text-xs text-stone-200">Input varian matcha & gula dalam sekejap</div>
            </div>
            <div className="pt-4 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl font-black text-[#D8E6C3] font-display">02</div>
              <div className="text-sm font-bold">Kalkulasi Invoice Otomatis</div>
              <div className="text-xs text-stone-200">Pajak PB1, promo diskon & split bill</div>
            </div>
            <div className="pt-4 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl font-black text-[#D8E6C3] font-display">03</div>
              <div className="text-sm font-bold">Bayar via QRIS / Tunai / EDC</div>
              <div className="text-xs text-stone-200">Validasi instan dalam hitungan detik</div>
            </div>
            <div className="pt-4 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl font-black text-[#D8E6C3] font-display">04</div>
              <div className="text-sm font-bold">Auto-Print Struk & Laporan Live</div>
              <div className="text-xs text-stone-200">Struk thermal keluar & omzet terupdate</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
