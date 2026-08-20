import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Printer, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Utensils, 
  Coffee, 
  Milk,
  Flame,
  Search,
  Tag, 
  Download, 
  Share2, 
  X,
  Volume2,
  VolumeX,
  Wifi,
  ChevronRight,
  Info,
  Lock,
  UserCheck,
  ShieldCheck,
  User,
  AlertCircle
} from 'lucide-react';
import { MenuItem, CartItem, CartItemOption, Invoice, MenuCategory, UserRole, CashierProfile, AttendanceRecord } from '../types';
import { MATCHA_MENU } from '../data/mockData';
import { MatchaLogo } from './MatchaLogo';

interface InteractivePOSSimulatorProps {
  onNewTransaction: (invoice: Invoice) => void;
  currentRole: UserRole;
  currentCashier: CashierProfile;
  activeAttendance: AttendanceRecord | null;
  onOpenAttendance: () => void;
  onOpenRoleModal: () => void;
}

export const InteractivePOSSimulator: React.FC<InteractivePOSSimulatorProps> = ({ 
  onNewTransaction,
  currentRole,
  currentCashier,
  activeAttendance,
  onOpenAttendance,
  onOpenRoleModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  
  // Customization modal state
  const [customSugar, setCustomSugar] = useState<'Normal (100%)' | 'Less Sugar (70%)' | 'Half Sugar (50%)' | 'No Sugar (0%)'>('Normal (100%)');
  const [customIce, setCustomIce] = useState<'Normal Ice' | 'Less Ice' | 'No Ice'>('Normal Ice');
  const [customDairy, setCustomDairy] = useState<'Fresh Milk' | 'Oat Milk (+Rp 6.000)' | 'Almond Milk (+Rp 7.000)'>('Fresh Milk');
  const [customTopping, setCustomTopping] = useState<'Matcha Ice Cream (+Rp 8.000)' | 'Boba Pearls (+Rp 4.000)' | 'Extra Matcha Shot (+Rp 5.000)' | 'None'>('None');
  const [orderType, setOrderType] = useState<'Dine In' | 'Take Away'>('Dine In');
  const [tableNumber, setTableNumber] = useState<string>('Meja 03');
  const [customerName, setCustomerName] = useState<string>('');

  // Voucher discount
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>('');

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Tunai' | 'Kartu Debit/Kredit'>('QRIS');
  const [cashGiven, setCashGiven] = useState<number>(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [completedInvoice, setCompletedInvoice] = useState<Invoice | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Filtered menu
  const filteredMenu = MATCHA_MENU.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Price calculations
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = appliedDiscount;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.10); // PB1 10%
  const grandTotal = taxableAmount + tax;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Open item modal or quick add
  const handleOpenItem = (item: MenuItem) => {
    setSelectedItemForModal(item);
    // Reset options
    setCustomSugar('Normal (100%)');
    setCustomIce('Normal Ice');
    setCustomDairy('Fresh Milk');
    setCustomTopping('None');
  };

  const handleAddToCart = () => {
    if (!selectedItemForModal) return;

    const isBeverage = selectedItemForModal.category !== 'main-course';

    let extraPrice = 0;
    if (isBeverage) {
      if (customDairy === 'Oat Milk (+Rp 6.000)') extraPrice += 6000;
      if (customDairy === 'Almond Milk (+Rp 7.000)') extraPrice += 7000;
      if (customTopping === 'Matcha Ice Cream (+Rp 8.000)') extraPrice += 8000;
      if (customTopping === 'Boba Pearls (+Rp 4.000)') extraPrice += 4000;
      if (customTopping === 'Extra Matcha Shot (+Rp 5.000)') extraPrice += 5000;
    }

    const unitPrice = selectedItemForModal.price + extraPrice;
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      menuItem: selectedItemForModal,
      quantity: 1,
      options: {
        sugarLevel: isBeverage ? customSugar : undefined,
        iceLevel: isBeverage ? customIce : undefined,
        dairyOption: isBeverage ? customDairy : undefined,
        extraTopping: isBeverage ? customTopping : undefined,
        servingType: orderType
      },
      extraPrice,
      totalPrice: unitPrice
    };

    setCart([...cart, newItem]);
    setSelectedItemForModal(null);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        const unitPrice = item.menuItem.price + item.extraPrice;
        return {
          ...item,
          quantity: newQty,
          totalPrice: unitPrice * newQty
        };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (code === 'MATCHA10') {
      const disc = Math.round(subtotal * 0.10);
      setAppliedDiscount(disc);
      setDiscountMessage('✓ Voucher MATCHA10 diterapkan (Diskon 10%)');
    } else if (code === 'CALM5K') {
      setAppliedDiscount(5000);
      setDiscountMessage('✓ Voucher CALM5K diterapkan (Potongan Rp 5.000)');
    } else if (code === 'MEMBERHEAVEN' || code === 'MEMBERHAVEN') {
      const disc = Math.round(subtotal * 0.15);
      setAppliedDiscount(disc);
      setDiscountMessage('✓ Diskon Member VIP 15% diterapkan');
    } else {
      setDiscountMessage('✗ Kode voucher tidak valid. Coba: MATCHA10 atau CALM5K');
    }
  };

  const playReceiptSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // AudioContext might be restricted until user gesture
    }
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const now = new Date();
      const invoiceNumber = `INV-MH-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber,
        date: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        timestamp: Date.now(),
        cashierName: `${currentCashier.name} (${currentCashier.code})`,
        orderType,
        tableNumber: orderType === 'Dine In' ? tableNumber : undefined,
        items: cart.map(c => {
          const opts: string[] = [];
          if (c.options.sugarLevel && c.options.sugarLevel !== 'Normal (100%)') opts.push(c.options.sugarLevel);
          if (c.options.iceLevel && c.options.iceLevel !== 'Normal Ice') opts.push(c.options.iceLevel);
          if (c.options.dairyOption && c.options.dairyOption !== 'Fresh Milk') opts.push(c.options.dairyOption);
          if (c.options.extraTopping && c.options.extraTopping !== 'None') opts.push(c.options.extraTopping);
          return {
            name: `[${c.menuItem.code}] ${c.menuItem.name}`,
            quantity: c.quantity,
            price: c.menuItem.price + c.extraPrice,
            optionsSummary: opts.join(', ') || undefined,
            total: c.totalPrice
          };
        }),
        subtotal,
        discount: discountAmount,
        tax,
        grandTotal,
        paymentMethod,
        paymentDetails: {
          cashReceived: paymentMethod === 'Tunai' ? (cashGiven || grandTotal) : undefined,
          changeAmount: paymentMethod === 'Tunai' ? Math.max(0, (cashGiven || grandTotal) - grandTotal) : undefined,
          referenceNumber: paymentMethod === 'QRIS' ? `QRIS-MH-${Math.floor(10000000 + Math.random() * 90000000)}` : `EDC-MH-${Math.floor(100000 + Math.random() * 900000)}`
        },
        status: 'LUNAS',
        customerName: customerName.trim() || 'Pelanggan Walk-In',
        customerPhone: '0812-****-****'
      };

      setCompletedInvoice(newInvoice);
      setIsProcessingPayment(false);
      setIsCheckoutOpen(false);
      onNewTransaction(newInvoice);

      // Trigger celebration confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#47623A', '#A3B67A', '#8C6A4A', '#F7F5EE']
      });

      playReceiptSound();
    }, 1200);
  };

  const handleResetOrder = () => {
    setCart([]);
    setAppliedDiscount(0);
    setVoucherCode('');
    setDiscountMessage('');
    setCompletedInvoice(null);
    setCustomerName('');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceiptText = () => {
    if (!completedInvoice) return;
    const textContent = `
========================================
           MATCHA HAVEN CAFÉ
    Taste The Calm, Sip The Matcha
========================================
No. Invoice : ${completedInvoice.invoiceNumber}
Tanggal     : ${completedInvoice.date} ${completedInvoice.time}
Kasir       : ${completedInvoice.cashierName}
Tipe Order  : ${completedInvoice.orderType} ${completedInvoice.tableNumber ? `(${completedInvoice.tableNumber})` : ''}
Pelanggan   : ${completedInvoice.customerName}
----------------------------------------
ITEM PESANAN:
${completedInvoice.items.map(i => `${i.quantity}x ${i.name.padEnd(25)} Rp ${i.total.toLocaleString('id-ID')}\n   ${i.optionsSummary ? `↳ ${i.optionsSummary}\n` : ''}`).join('')}
----------------------------------------
Subtotal     : Rp ${completedInvoice.subtotal.toLocaleString('id-ID')}
Diskon Promo : Rp ${completedInvoice.discount.toLocaleString('id-ID')}
PB1 (10%)    : Rp ${completedInvoice.tax.toLocaleString('id-ID')}
----------------------------------------
TOTAL AKHIR  : Rp ${completedInvoice.grandTotal.toLocaleString('id-ID')}
Metode Bayar : ${completedInvoice.paymentMethod}
Status       : ${completedInvoice.status}
========================================
Wi-Fi: MatchaHaven_Guest / Pass: TasteTheCalm2026
IG: @matchahaven.cafe
Terima kasih atas kunjungan Anda!
========================================
    `;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${completedInvoice.invoiceNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 bg-[#F4F1E6]/70 border-b border-[#47623A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#47623A]" />
            <span>Simulasi Kasir & Invoice Interaktif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
            Uji Coba Langsung Aplikasi Kasir Matcha Haven
          </h2>
          <p className="text-sm sm:text-base text-[#526346] leading-relaxed">
            Klik menu di bawah untuk menambahkan minuman matcha atau dessert ke keranjang kasir, atur varian rasa, proses pembayaran, dan saksikan struk thermal tercetak seketika!
          </p>
        </div>

        {/* The POS Terminal Sandbox Container */}
        <div className="bg-white rounded-3xl border border-[#47623A]/20 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
          
          {/* Left / Middle: Catalog Selection & Category Tabs (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#47623A]/15 bg-[#FAF9F5]">
            <div className="space-y-4">
              
              {/* POS Top Bar Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#47623A]/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#47623A] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    {currentCashier.avatar ? (
                      <img src={currentCashier.avatar} alt={currentCashier.name} className="w-full h-full object-cover" />
                    ) : (
                      currentCashier.code
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#1E2B18]">{currentCashier.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#47623A]/15 text-[#47623A]">
                        {currentCashier.code}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#637557] flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${activeAttendance ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span>{activeAttendance ? `${activeAttendance.shiftType.split(' ')[0]} (Masuk: ${activeAttendance.clockInTime})` : 'Belum Absen Shift'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Badges & Dine In Toggle */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Absensi Shift Quick Button */}
                  <button
                    type="button"
                    onClick={onOpenAttendance}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 ${
                      activeAttendance
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 animate-pulse'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{activeAttendance ? 'Status Absensi' : 'Absen Masuk'}</span>
                  </button>

                  {/* Role Switcher Button */}
                  <button
                    type="button"
                    onClick={onOpenRoleModal}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      currentRole === 'owner'
                        ? 'bg-[#1E2B18] text-white'
                        : 'bg-[#47623A]/10 border border-[#47623A]/20 text-[#47623A] hover:bg-[#47623A]/20'
                    }`}
                  >
                    {currentRole === 'owner' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5" />}
                    <span className="capitalize">Role: {currentRole}</span>
                  </button>

                  {/* Dine-In / Take-Away Toggle */}
                  <div className="flex items-center bg-[#EFECE0] p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setOrderType('Dine In')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        orderType === 'Dine In'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#506144] hover:text-[#28381F]'
                      }`}
                    >
                      Dine In
                    </button>
                    <button
                      onClick={() => setOrderType('Take Away')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        orderType === 'Take Away'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#506144] hover:text-[#28381F]'
                      }`}
                    >
                      Take Away
                    </button>
                  </div>
                </div>
              </div>

              {/* Notice if Cashier hasn't clocked in yet */}
              {!activeAttendance && currentRole === 'kasir' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-2 text-xs text-amber-900 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>Perhatian Kasir:</strong> Anda belum melakukan absensi masuk shift hari ini.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAttendance}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] shrink-0 cursor-pointer"
                  >
                    Absen Sekarang
                  </button>
                </div>
              )}

              {/* Category Pills & Search Bar */}
              <div className="space-y-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kode (MS001, FM001, MC001...) atau nama menu..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#47623A]/20 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#47623A] focus:ring-1 focus:ring-[#47623A]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'all', label: 'Semua', count: MATCHA_MENU.length, icon: Coffee },
                    { id: 'matcha-signature', label: 'Matcha Signature', count: 14, icon: Sparkles },
                    { id: 'matcha-series', label: 'Fruit Matcha', count: 6, icon: Coffee },
                    { id: 'non-matcha', label: 'Non-Matcha', count: 6, icon: Milk },
                    { id: 'coffee', label: 'Coffee Series', count: 5, icon: Flame },
                    { id: 'main-course', label: 'Main Course', count: 16, icon: Utensils }
                  ].map((cat) => {
                    const CatIcon = cat.icon;
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                          active
                            ? 'bg-[#47623A] text-white shadow-sm'
                            : 'bg-white text-[#4A5D3F] border border-[#47623A]/15 hover:bg-[#EFECE0]'
                        }`}
                      >
                        <CatIcon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          active ? 'bg-white/20 text-white' : 'bg-[#47623A]/10 text-[#47623A]'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
                {filteredMenu.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-stone-400 space-y-2">
                    <Search className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-xs font-medium">Menu tidak ditemukan untuk kata kunci "{searchQuery}"</p>
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="text-xs font-bold text-[#47623A] underline cursor-pointer"
                    >
                      Reset Filter & Tampilkan Semua Menu
                    </button>
                  </div>
                ) : (
                  filteredMenu.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenItem(item)}
                      className="p-3.5 bg-white rounded-2xl border border-[#47623A]/15 hover:border-[#47623A] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#47623A]/10 text-[#47623A] border border-[#47623A]/20">
                            {item.code}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-sm font-bold text-[#1E2B18] group-hover:text-[#47623A] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#607255] line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-[#47623A]">
                            {formatRupiah(item.price)}
                          </span>
                          {item.temperature && item.temperature !== 'Both' && (
                            <span className="ml-1.5 text-[9px] text-stone-400">
                              • {item.temperature}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="p-1.5 px-2 rounded-lg bg-[#47623A]/10 group-hover:bg-[#47623A] group-hover:text-white text-[#47623A] transition-colors text-xs font-bold flex items-center gap-1"
                          aria-label={`Tambah ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Pilih</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Quick Helper Banner */}
            <div className="mt-4 pt-3 border-t border-[#47623A]/10 flex items-center justify-between text-[11px] text-[#697B5D]">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#47623A]" />
                Total 47 menu terintegrasi dengan kode & pencetakan struk
              </span>
              <span className="font-semibold text-[#47623A]">Voucher: MATCHA10</span>
            </div>
          </div>

          {/* Right Column: Active Cart, Invoice Summary & Checkout (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-white">
            
            {/* Cart Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-[#8C6A4A]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1E2B18]">Keranjang Kasir</h3>
                    <div className="text-[10px] text-stone-500">
                      {cart.length} item • {orderType} {orderType === 'Dine In' && `(${tableNumber})`}
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-[10px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Kosongkan</span>
                  </button>
                )}
              </div>

              {/* Customer Name & Table field */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Nama Tamu / Pelanggan</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Clarissa"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-[#47623A]"
                  />
                </div>
                {orderType === 'Dine In' && (
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Nomor Meja</label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-[#47623A] bg-white"
                    >
                      <option value="Meja 01">Meja 01 (Indoor Zen)</option>
                      <option value="Meja 02">Meja 02 (Indoor Window)</option>
                      <option value="Meja 03">Meja 03 (Bar Counter)</option>
                      <option value="Meja 04">Meja 04 (Sofa Area)</option>
                      <option value="Meja 09">Meja 09 (Outdoor Garden)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Cart Item List */}
              <div className="mt-3 space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-stone-400 space-y-2">
                    <ShoppingBag className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-xs">Keranjang masih kosong</p>
                    <p className="text-[10px] text-stone-400">Pilih menu dari panel kiri untuk memulai transaksi</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 bg-[#FAF9F5] rounded-xl border border-stone-200 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#1E2B18]">{item.menuItem.name}</div>
                        
                        {/* Selected modifiers */}
                        <div className="text-[10px] text-[#697B5D] space-y-0.5">
                          {item.options.sugarLevel && (
                            <div>Gula: {item.options.sugarLevel}</div>
                          )}
                          {item.options.dairyOption && item.options.dairyOption !== 'Fresh Milk' && (
                            <div>Susu: {item.options.dairyOption}</div>
                          )}
                          {item.options.extraTopping && item.options.extraTopping !== 'None' && (
                            <div>Topping: {item.options.extraTopping}</div>
                          )}
                        </div>

                        <div className="text-xs font-bold text-[#47623A] pt-1">
                          {formatRupiah(item.totalPrice)}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-stone-200 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-100 rounded text-stone-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-100 rounded text-stone-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Voucher Code input */}
              {cart.length > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-200 space-y-1.5">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="Kode Promo (MATCHA10 / CALM5K)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs uppercase focus:outline-none focus:border-[#47623A]"
                    />
                    <button
                      onClick={handleApplyVoucher}
                      className="px-3 py-1.5 bg-[#47623A]/10 hover:bg-[#47623A]/20 text-[#47623A] font-bold text-xs rounded-lg transition-colors"
                    >
                      Klaim
                    </button>
                  </div>
                  {discountMessage && (
                    <div className={`text-[10px] font-semibold ${discountMessage.startsWith('✓') ? 'text-emerald-700' : 'text-red-600'}`}>
                      {discountMessage}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bill Breakdown & Checkout Trigger */}
            <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} item)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Potongan Diskon Promo</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>Pajak Restoran PB1 (10%)</span>
                  </span>
                  <span>{formatRupiah(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#1E2B18] pt-1.5 border-t border-dashed border-stone-200">
                  <span>Total Tagihan</span>
                  <span className="text-[#47623A] font-black">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              {/* Process Payment Button */}
              <button
                disabled={cart.length === 0}
                onClick={() => {
                  setCashGiven(grandTotal);
                  setIsCheckoutOpen(true);
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                  cart.length > 0
                    ? 'bg-[#47623A] hover:bg-[#394F2E] text-white cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Bayar & Terbitkan Invoice ({formatRupiah(grandTotal)})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* MODAL 1: Item Customization Modifier */}
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 border border-[#47623A]/20">
              
              <div className="flex items-start justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-[#47623A] uppercase tracking-wider">Kustomisasi Pesanan</span>
                  <h3 className="text-lg font-bold text-[#1E2B18]">{selectedItemForModal.name}</h3>
                  <div className="text-xs font-extrabold text-[#47623A] mt-0.5">
                    {formatRupiah(selectedItemForModal.price)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedItemForModal.category !== 'main-course' && (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {/* Sugar Level */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Tingkat Kemanisan (Sugar Level)</label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {(['Normal (100%)', 'Less Sugar (70%)', 'Half Sugar (50%)', 'No Sugar (0%)'] as const).map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setCustomSugar(sug)}
                          className={`p-2 rounded-xl text-left border text-xs font-semibold transition-all ${
                            customSugar === sug
                              ? 'bg-[#47623A] text-white border-[#47623A]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ice Level */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Jumlah Es (Ice Level)</label>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      {(['Normal Ice', 'Less Ice', 'No Ice'] as const).map((ice) => (
                        <button
                          key={ice}
                          type="button"
                          onClick={() => setCustomIce(ice)}
                          className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                            customIce === ice
                              ? 'bg-[#47623A] text-white border-[#47623A]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {ice}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dairy Option */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Pilihan Susu (Dairy / Plant-Based)</label>
                    <div className="space-y-1.5 text-xs">
                      {(['Fresh Milk', 'Oat Milk (+Rp 6.000)', 'Almond Milk (+Rp 7.000)'] as const).map((milk) => (
                        <button
                          key={milk}
                          type="button"
                          onClick={() => setCustomDairy(milk)}
                          className={`w-full p-2 rounded-xl text-left border text-xs font-semibold flex justify-between transition-all ${
                            customDairy === milk
                              ? 'bg-[#47623A] text-white border-[#47623A]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <span>{milk.split(' (')[0]}</span>
                          <span className="opacity-80">{milk.includes('(') ? milk.split(' (')[1].replace(')', '') : 'Termasuk'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Topping */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Tambahan Topping</label>
                    <div className="space-y-1.5 text-xs">
                      {(['None', 'Matcha Ice Cream (+Rp 8.000)', 'Extra Matcha Shot (+Rp 5.000)', 'Boba Pearls (+Rp 4.000)'] as const).map((top) => (
                        <button
                          key={top}
                          type="button"
                          onClick={() => setCustomTopping(top)}
                          className={`w-full p-2 rounded-xl text-left border text-xs font-semibold flex justify-between transition-all ${
                            customTopping === top
                              ? 'bg-[#47623A] text-white border-[#47623A]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <span>{top === 'None' ? 'Tanpa Topping Tambahan' : top.split(' (')[0]}</span>
                          <span className="opacity-80">{top.includes('(') ? top.split(' (')[1].replace(')', '') : ''}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedItemForModal.category === 'main-course' && (
                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
                  <div className="font-semibold text-[#1E2B18]">Penyajian Standar Dapur Kafe</div>
                  <p>{selectedItemForModal.description}</p>
                  <div className="text-[10px] text-stone-500">Disajikan hangat dan fresh dalam packaging ramah lingkungan Matcha Heaven dengan set alat makan lengkap.</div>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItemForModal(null)}
                  className="w-1/3 py-2.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-2/3 py-2.5 text-xs font-bold text-white bg-[#47623A] hover:bg-[#384E2D] rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODAL 2: Checkout & Multi-Payment Simulator */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 border border-[#47623A]/20">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-[#47623A] uppercase tracking-wider">Kasir Pembayaran</span>
                  <h3 className="text-lg font-extrabold text-[#1E2B18]">Pilih Metode Pembayaran</h3>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Total amount due banner */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#47623A]/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Total Tagihan (Termasuk PB1)</div>
                  <div className="text-xl font-black text-[#47623A]">{formatRupiah(grandTotal)}</div>
                </div>
                <div className="text-right text-[11px] text-stone-500">
                  <div>{orderType} • {customerName || 'Pelanggan Walk-in'}</div>
                  <div className="font-mono text-[10px]">Auto-Struk: Aktif</div>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'QRIS', label: 'QRIS Instan', icon: QrCode },
                  { id: 'Tunai', label: 'Tunai (Cash)', icon: Banknote },
                  { id: 'Kartu Debit/Kredit', label: 'EDC / Kartu', icon: CreditCard }
                ].map((pm) => {
                  const PmIcon = pm.icon;
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        active
                          ? 'bg-[#47623A] text-white border-[#47623A] shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <PmIcon className="w-4 h-4" />
                      <span>{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Content based on payment method */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                {paymentMethod === 'QRIS' && (
                  <div className="text-center space-y-3">
                    <div className="inline-block p-3 bg-white rounded-2xl border border-stone-300 shadow-xs">
                      {/* Stylized QRIS visual */}
                      <div className="w-36 h-36 bg-[#1A2613] rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
                        <div className="absolute top-1 left-1 bg-white text-[7px] font-bold px-1 rounded text-[#47623A]">QRIS</div>
                        <div className="w-28 h-28 bg-white p-1.5 rounded flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-stone-900" />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-stone-600">
                      <div className="font-bold text-[#1E2B18]">Scan QRIS Matcha Heaven Café</div>
                      <div className="text-[10px] text-stone-500">Mendukung BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, DANA</div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Tunai' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Nominal Uang Diterima (Rp)</label>
                      <input
                        type="number"
                        value={cashGiven}
                        onChange={(e) => setCashGiven(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold focus:outline-none focus:border-[#47623A] bg-white"
                      />
                    </div>

                    {/* Quick Cash Buttons */}
                    <div className="flex gap-2">
                      {[grandTotal, 50000, 100000, 200000].map((amt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCashGiven(amt)}
                          className="flex-1 py-1.5 bg-white border border-stone-200 hover:border-[#47623A] rounded-lg text-[10px] font-bold text-stone-700"
                        >
                          {amt === grandTotal ? 'Uang Pas' : `Rp ${(amt/1000)}k`}
                        </button>
                      ))}
                    </div>

                    {/* Kembalian calculation */}
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                      <span className="font-bold text-stone-600">Uang Kembalian</span>
                      <span className={`font-black text-sm ${cashGiven >= grandTotal ? 'text-emerald-700' : 'text-red-500'}`}>
                        {cashGiven >= grandTotal 
                          ? formatRupiah(cashGiven - grandTotal) 
                          : 'Uang Kurang!'}
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Kartu Debit/Kredit' && (
                  <div className="text-center space-y-2 py-2">
                    <CreditCard className="w-8 h-8 text-[#47623A] mx-auto" />
                    <div className="text-xs font-bold text-[#1E2B18]">Integrasi Mesin EDC Terhubung</div>
                    <p className="text-[11px] text-stone-500">
                      Silakan tap kartu contactless atau masukkan chip kartu di mesin EDC Matcha Heaven.
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm & Print Receipt Button */}
              <button
                disabled={isProcessingPayment || (paymentMethod === 'Tunai' && cashGiven < grandTotal)}
                onClick={handleProcessPayment}
                className="w-full py-3.5 bg-[#47623A] hover:bg-[#384F2D] text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses & Mencetak Struk Thermal...</span>
                  </>
                ) : (
                  <>
                    <Printer className="w-4 h-4" />
                    <span>Konfirmasi Bayar & Cetak Struk Otomatis</span>
                  </>
                )}
              </button>

            </div>
          </div>
        )}

        {/* MODAL 3: COMPLETED INVOICE & THERMAL RECEIPT PREVIEW */}
        {completedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 border-2 border-[#47623A]/30 my-8">
              
              {/* Success Badge */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#47623A] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7 text-[#47623A]" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Transaksi Berhasil ({completedInvoice.status})
                </span>
                <h3 className="text-lg font-bold text-[#1E2B18]">Struk Thermal Siap / Tercetak</h3>
                <p className="text-xs text-stone-500">Struk otomatis diteruskan ke Thermal Printer via Bluetooth/LAN.</p>
              </div>

              {/* Thermal Receipt Paper Visual Simulation */}
              <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl border border-stone-300 font-mono-receipt text-xs text-stone-900 shadow-inner relative overflow-hidden animate-receipt-feed">
                
                {/* Sawtooth / Paper edge effect top & bottom */}
                <div className="text-center pb-3 border-b border-dashed border-stone-400 space-y-1">
                  <div className="font-bold text-sm tracking-wider uppercase">MATCHA HEAVEN CAFÉ</div>
                  <div className="text-[10px] text-stone-600">Jl. Senopati No. 42, Kebayoran Baru, Jakarta</div>
                  <div className="text-[9px] text-stone-500 italic">"Taste The Calm, Sip The Matcha"</div>
                  <div className="text-[9px] text-stone-600 pt-1">Telp: (021) 789-2345 | IG: @matchaheaven.cafe</div>
                </div>

                {/* Metadata */}
                <div className="py-2.5 border-b border-dashed border-stone-400 text-[10px] space-y-0.5">
                  <div className="flex justify-between">
                    <span>No. Invoice :</span>
                    <span className="font-bold">{completedInvoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu       :</span>
                    <span>{completedInvoice.date} {completedInvoice.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasir       :</span>
                    <span>{completedInvoice.cashierName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipe Order  :</span>
                    <span className="font-bold">{completedInvoice.orderType} {completedInvoice.tableNumber ? `(${completedInvoice.tableNumber})` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelanggan   :</span>
                    <span>{completedInvoice.customerName}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="py-2.5 border-b border-dashed border-stone-400 space-y-1.5 text-[11px]">
                  {completedInvoice.items.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-bold">Rp {item.total.toLocaleString('id-ID')}</span>
                      </div>
                      {item.optionsSummary && (
                        <div className="text-[9px] text-stone-500 pl-3">↳ {item.optionsSummary}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Subtotals & Taxes */}
                <div className="py-2.5 border-b border-dashed border-stone-400 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {completedInvoice.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {completedInvoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Diskon Promo</span>
                      <span>-Rp {completedInvoice.discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>PB1 Pajak Resto (10%)</span>
                    <span>Rp {completedInvoice.tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-black pt-1 border-t border-stone-300">
                    <span>TOTAL BAYAR</span>
                    <span>Rp {completedInvoice.grandTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-600">
                    <span>Metode: {completedInvoice.paymentMethod}</span>
                    <span>STATUS: LUNAS</span>
                  </div>
                  {completedInvoice.paymentDetails?.changeAmount !== undefined && (
                    <div className="flex justify-between text-[10px] text-stone-600">
                      <span>Kembalian</span>
                      <span>Rp {completedInvoice.paymentDetails.changeAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>

                {/* Receipt Footer */}
                <div className="pt-3 text-center text-[9px] text-stone-600 space-y-1">
                  <div>Wi-Fi: <span className="font-bold">MatchaHeaven_Guest</span></div>
                  <div>Password: <span className="font-bold">TasteTheCalm2026</span></div>
                  <div className="pt-1 text-[8px] text-stone-400">
                    * * * TERIMA KASIH ATAS KUNJUNGAN ANDA * * *
                  </div>
                  <div className="pt-1 text-[8px] font-mono tracking-widest text-stone-500">
                    ||| | ||||| || |||||| |||| | ||| ||||
                  </div>
                </div>

              </div>

              {/* Security Lock Notice for Cashier: Completed Transactions Are Locked */}
              <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200 text-[10.5px] text-stone-700 flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#47623A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1E2B18]">Transaksi Lunas & Terkunci Permanen:</span>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-relaxed">
                    Sesuai wewenang kasir, pembayaran yang telah selesai tidak dapat diedit atau diubah nominalnya. Pembatalan/void hanya dapat diproses melalui otorisasi Owner.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrintReceipt}
                    className="py-2.5 bg-[#47623A] hover:bg-[#384F2D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak ke Printer</span>
                  </button>

                  <button
                    onClick={handleDownloadReceiptText}
                    className="py-2.5 bg-[#FAF9F5] hover:bg-[#EFECE0] text-[#3E5234] border border-[#47623A]/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh File Struk</span>
                  </button>
                </div>

                <button
                  onClick={handleResetOrder}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Transaksi Baru (Reset POS)</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
