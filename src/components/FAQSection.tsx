import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara menghubungkan printer thermal Bluetooth ke aplikasi Matcha Heaven POS?',
      a: 'Sangat mudah! Buka menu Pengaturan pada aplikasi Matcha Heaven POS, aktifkan Bluetooth di perangkat Anda, pilih nama printer Bluetooth (misalnya: PT-210, Panda, atau Epson), lalu lakukan uji cetak (Test Print). Struk akan otomatis keluar dalam kurang dari 1 detik.'
    },
    {
      q: 'Apakah pencatatan nomor invoice terjadi secara otomatis dan berurutan?',
      a: 'Ya, setiap transaksi kasir langsung menghasilkan kode invoice berpenomoran urut otomatis (contoh: INV-MH-20260820-0089). Nomor ini mencakup tanggal, urutan transaksi, dan kode unik anti-duplikasi yang aman untuk pembukuan akuntansi kafe.'
    },
    {
      q: 'Bagaimana jika koneksi internet di kafe Matcha Heaven tiba-tiba terputus (Offline)?',
      a: 'Aplikasi dilengkapi fitur Offline Mode cerdas. Anda tetap bisa melayani pemesanan minuman matcha & dessert, menerima pembayaran tunai, serta mencetak struk thermal. Saat internet kembali aktif, seluruh data transaksi akan tersinkronisasi ke cloud laporan penjualan secara otomatis.'
    },
    {
      q: 'Apakah aplikasi menghitung pajak restoran (PB1 10%) dan diskon voucher promo?',
      a: 'Tentu saja. Anda dapat mengaktifkan pajak PB1 10% secara otomatis pada setiap transaksi atau mengatur harga menu sudah termasuk pajak (tax-inclusive). Kode promo diskon seperti MATCHA10 atau diskon member loyalty juga langsung mengurangi total tagihan secara akurat.'
    },
    {
      q: 'Bisakah pemilik kafe memantau laporan omzet real-time dari luar gerai / smartphone pribadi?',
      a: 'Bisa! Laporan penjualan terupdate secara live di dashboard cloud. Pemilik kafe dan manajer dapat melihat grafik penjualan per jam, produk terlaris, total setoran kasir per shift, dan mengunduh laporan ke format Excel/PDF kapan saja dari mana saja.'
    },
    {
      q: 'Berapa banyak perangkat kasir dan barista yang bisa dihubungkan secara bersamaan?',
      a: 'Sistem mendukung multi-device tanpa batasan. Anda bisa memasang tablet kasir di meja pemesanan depan, layar display antrean pesanan di meja barista (Kitchen Display System), dan smartphone manajer untuk monitoring omzet secara simultan.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#47623A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab Seputar POS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-[#56684A]">
            Segala hal yang perlu Anda ketahui mengenai aplikasi kasir, invoice, dan integrasi cetak struk Matcha Heaven.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#47623A]/15 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1E2B18] hover:text-[#47623A] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#47623A] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#47623A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4F6244] leading-relaxed border-t border-stone-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
