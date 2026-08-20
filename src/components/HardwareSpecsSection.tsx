import React from 'react';
import { 
  Smartphone, 
  Tablet, 
  Printer, 
  Wifi, 
  ShieldCheck, 
  Cpu, 
  Check,
  Server
} from 'lucide-react';

export const HardwareSpecsSection: React.FC = () => {
  const hardwareList = [
    {
      title: 'Smartphone & Tablet Android',
      desc: 'Mendukung Android versi 9.0 (Pie) hingga Android 15+. Responsif pada smartphone baris depan dan tablet kasir berlayar 8-12 inci.',
      icon: Smartphone,
      specs: ['RAM minimal 2GB', 'Bluetooth 4.2/5.0 BLE', 'Kamera scanner QRIS cepat']
    },
    {
      title: 'Terminal All-in-One Sunmi / POS',
      desc: 'Kompatibilitas native dengan Sunmi V2s, Sunmi T2, iMin Swan 1, dan Pax A920 dengan auto-cutter printer internal.',
      icon: Tablet,
      specs: ['Built-in Thermal 58/80mm', 'NFC & QR Barcode Scanner', 'Customer Facing Display Ready']
    },
    {
      title: 'Printer Thermal ESC/POS',
      desc: 'Konektivitas instan dengan printer thermal Bluetooth mini (Panda, Iware, Eppos, RPP02N) dan Desktop LAN/USB (Epson TM-T82, Xprinter).',
      icon: Printer,
      specs: ['Kertas 58mm & 80mm', 'Kecepatan cetak 90-250mm/s', 'Trigger Cash Drawer RJ11']
    },
    {
      title: 'Mode Offline & Cloud Sync',
      desc: 'Tetap dapat melayani transaksi kasir dan mencetak struk walau internet kafe terputus. Data akan otomatis sync ke cloud saat online.',
      icon: Server,
      specs: ['Local SQLite Storage', 'Auto-Sync Conflict Resolver', 'Enkripsi Data AES-256']
    }
  ];

  return (
    <section id="hardware" className="py-16 sm:py-24 bg-[#F4F1E6]/40 border-b border-[#47623A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Spesifikasi & Kompatibilitas Perangkat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Gunakan Perangkat yang Sudah Anda Miliki
          </h2>
          <p className="text-sm sm:text-base text-[#56684A] leading-relaxed">
            Tidak perlu membeli perangkat mahal yang terkunci. Pasang aplikasi Matcha Heaven POS di tablet atau smartphone staf Anda dalam sekejap.
          </p>
        </div>

        {/* 4 Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#47623A]/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] text-[#47623A] flex items-center justify-center mb-4 border border-[#47623A]/15">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1E2B18] mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#526346] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-1.5">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#47623A] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
