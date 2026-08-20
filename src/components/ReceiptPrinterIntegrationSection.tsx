import React, { useState } from 'react';
import { 
  Printer, 
  Bluetooth, 
  Wifi, 
  Usb, 
  CheckCircle, 
  Settings2, 
  Sparkles, 
  Share2, 
  Smartphone,
  Check,
  RefreshCw
} from 'lucide-react';
import { DEFAULT_PRINTER_SETTINGS } from '../data/mockData';
import { PrinterSettings } from '../types';
import { MatchaLogo } from './MatchaLogo';

export const ReceiptPrinterIntegrationSection: React.FC = () => {
  const [settings, setSettings] = useState<PrinterSettings>(DEFAULT_PRINTER_SETTINGS);
  const [connectionType, setConnectionType] = useState<'bluetooth' | 'lan' | 'usb'>('bluetooth');
  const [isPrintingTest, setIsPrintingTest] = useState(false);
  const [testPrintSuccess, setTestPrintSuccess] = useState(false);

  const handleTestPrint = () => {
    setIsPrintingTest(true);
    setTestPrintSuccess(false);

    setTimeout(() => {
      setIsPrintingTest(false);
      setTestPrintSuccess(true);
      setTimeout(() => setTestPrintSuccess(false), 3500);
    }, 1200);
  };

  return (
    <section id="printer" className="py-16 sm:py-24 bg-[#F4F1E6]/50 border-b border-[#47623A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <Printer className="w-3.5 h-3.5" />
            <span>Integrasi Cetak Struk Otomatis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Auto-Print Struk Thermal Tanpa Driver Rumit
          </h2>
          <p className="text-sm sm:text-base text-[#556748] leading-relaxed">
            Struk pesanan langsung tercetak begitu pembayaran kasir diverifikasi. Kompatibel dengan semua printer thermal standar ESC/POS 58mm & 80mm di pasaran.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Printer Configuration Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Connection mode selector */}
            <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-3">
              <div className="text-xs font-extrabold text-[#1E2B18] uppercase tracking-wider">
                1. Mode Koneksi Printer Kasir
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'bluetooth', label: 'Bluetooth Thermal', icon: Bluetooth, desc: 'Nirkabel Cepat 10m' },
                  { id: 'lan', label: 'LAN / Wi-Fi Network', icon: Wifi, desc: 'Multi-device kasir' },
                  { id: 'usb', label: 'USB OTG / Direct', icon: Usb, desc: 'Kabel tanpa delay' }
                ].map((conn) => {
                  const ConnIcon = conn.icon;
                  const active = connectionType === conn.id;
                  return (
                    <button
                      key={conn.id}
                      onClick={() => setConnectionType(conn.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'bg-[#47623A] text-white border-[#47623A] shadow-xs'
                          : 'bg-[#FAF9F5] text-stone-700 border-stone-200 hover:bg-[#EFECE0]'
                      }`}
                    >
                      <ConnIcon className="w-4 h-4 mb-1" />
                      <div className="text-xs font-bold">{conn.label}</div>
                      <div className={`text-[10px] ${active ? 'text-emerald-100' : 'text-stone-500'}`}>{conn.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  Status: Terhubung ke "Matcha_Thermal_POS_58"
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-300 font-bold">
                  Baudrate: 9600
                </span>
              </div>
            </div>

            {/* Layout & Paper Width Settings */}
            <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-4">
              <div className="text-xs font-extrabold text-[#1E2B18] uppercase tracking-wider">
                2. Kustomisasi Format & Elemen Struk
              </div>

              {/* Width toggle */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">Ukuran Lebar Kertas Thermal:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSettings({ ...settings, paperWidth: '58mm' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      settings.paperWidth === '58mm'
                        ? 'bg-[#47623A] text-white border-[#47623A]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span>Format 58mm (Mini Portable)</span>
                  </button>
                  <button
                    onClick={() => setSettings({ ...settings, paperWidth: '80mm' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      settings.paperWidth === '80mm'
                        ? 'bg-[#47623A] text-white border-[#47623A]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span>Format 80mm (Desktop Station)</span>
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F5] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showLogo}
                    onChange={(e) => setSettings({ ...settings, showLogo: e.target.checked })}
                    className="accent-[#47623A]"
                  />
                  <span className="font-semibold text-stone-800">Cetak Logo Matcha Heaven</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F5] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showWifiPass}
                    onChange={(e) => setSettings({ ...settings, showWifiPass: e.target.checked })}
                    className="accent-[#47623A]"
                  />
                  <span className="font-semibold text-stone-800">Cetak Akun Wi-Fi Kafe</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F5] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showBarcode}
                    onChange={(e) => setSettings({ ...settings, showBarcode: e.target.checked })}
                    className="accent-[#47623A]"
                  />
                  <span className="font-semibold text-stone-800">Cetak Barcode / QR Validasi</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F5] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoPrintOnSuccess}
                    onChange={(e) => setSettings({ ...settings, autoPrintOnSuccess: e.target.checked })}
                    className="accent-[#47623A]"
                  />
                  <span className="font-semibold text-stone-800">Auto-Print Saat Bayar Sukses</span>
                </label>
              </div>

              {/* Action: Test Print Button */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleTestPrint}
                  disabled={isPrintingTest}
                  className="px-5 py-2.5 bg-[#47623A] hover:bg-[#384E2D] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
                >
                  {isPrintingTest ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengirim Perintah Cetak ESC/POS...</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-3.5 h-3.5" />
                      <span>Uji Cetak Struk Sekarang</span>
                    </>
                  )}
                </button>

                {testPrintSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 animate-in fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>Perintah cetak berhasil dikirim ke printer!</span>
                  </span>
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Live Thermal Receipt Visualizer (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="text-xs font-bold text-[#47623A] mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Preview Struk Thermal ({settings.paperWidth})</span>
            </div>

            {/* Thermal Printer Paper Frame */}
            <div
              className={`bg-white p-5 rounded-2xl shadow-xl border border-stone-300 font-mono-receipt text-stone-900 transition-all duration-300 ${
                settings.paperWidth === '58mm' ? 'w-[300px]' : 'w-[360px]'
              }`}
            >
              {/* Top slot illusion */}
              <div className="w-full h-1.5 bg-stone-800 rounded-full mb-4 opacity-10" />

              {/* Logo / Header */}
              <div className="text-center pb-3 border-b border-dashed border-stone-400 space-y-1">
                {settings.showLogo && (
                  <div className="flex justify-center mb-1">
                    <MatchaLogo variant="icon-only" size="md" />
                  </div>
                )}
                <div className="font-bold text-sm uppercase">MATCHA HEAVEN CAFÉ</div>
                <div className="text-[9px] text-stone-600">Jl. Senopati No. 42, Kebayoran Baru, Jakarta</div>
                {settings.showTagline && (
                  <div className="text-[9px] italic text-stone-500">"Taste The Calm, Sip The Matcha"</div>
                )}
                <div className="text-[8px] text-stone-500 pt-0.5">Telp: (021) 789-2345</div>
              </div>

              {/* Meta */}
              <div className="py-2 border-b border-dashed border-stone-400 text-[9px] space-y-0.5">
                <div className="flex justify-between">
                  <span>No: INV-MH-20260820-0089</span>
                  <span>Meja: 04</span>
                </div>
                <div className="flex justify-between">
                  <span>20/08/2026 14:28</span>
                  <span>Kasir: Alya</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamu: Dina Ramadhani</span>
                  <span>Dine In</span>
                </div>
              </div>

              {/* Items */}
              <div className="py-2.5 border-b border-dashed border-stone-400 text-[10px] space-y-1">
                <div>
                  <div className="flex justify-between">
                    <span>2x Matcha Latte (Iced)</span>
                    <span>60.000</span>
                  </div>
                  <div className="text-[8px] text-stone-500 pl-2">↳ Less Sugar 70%</div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>1x Matcha Cheesecake</span>
                    <span>32.000</span>
                  </div>
                </div>
              </div>

              {/* Calculations */}
              <div className="py-2 border-b border-dashed border-stone-400 text-[10px] space-y-0.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>92.000</span>
                </div>
                <div className="flex justify-between">
                  <span>PB1 Resto (10%)</span>
                  <span>9.200</span>
                </div>
                <div className="flex justify-between font-black text-xs pt-1 border-t border-stone-300">
                  <span>TOTAL BAYAR</span>
                  <span>Rp 101.200</span>
                </div>
                <div className="flex justify-between text-[9px] text-stone-600">
                  <span>QRIS • LUNAS</span>
                  <span>Ref: QRIS-98214140</span>
                </div>
              </div>

              {/* Wi-Fi & Socials Footer */}
              <div className="pt-3 text-center text-[8px] text-stone-600 space-y-1">
                {settings.showWifiPass && (
                  <div className="p-1 rounded bg-stone-50 border border-stone-200">
                    <div>Wi-Fi: <span className="font-bold">{settings.wifiSsid}</span></div>
                    <div>Pass: <span className="font-bold">{settings.wifiPass}</span></div>
                  </div>
                )}
                <div className="text-stone-500">{settings.instagramHandle}</div>
                <div className="pt-1 text-[8px] text-stone-400">
                  *** TASTE THE CALM, SIP THE MATCHA ***
                </div>
                {settings.showBarcode && (
                  <div className="pt-1 font-mono tracking-widest text-[8px] text-stone-500">
                    ||| | ||||| || |||||| |||| | ||| ||||
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
