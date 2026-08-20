import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Receipt, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  QrCode,
  Banknote,
  CreditCard,
  Coffee,
  PieChart,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  FileText,
  UserX,
  X,
  RotateCcw
} from 'lucide-react';
import { Invoice, SalesAnalytics, UserRole, CashierProfile, AttendanceRecord } from '../types';
import { HOURLY_SALES_DATA } from '../data/mockData';

interface RealTimeAnalyticsSectionProps {
  invoices: Invoice[];
  analytics: SalesAnalytics;
  attendanceList: AttendanceRecord[];
  currentRole: UserRole;
  currentCashier: CashierProfile;
  onOpenRoleModal: () => void;
  onVoidInvoice?: (invoiceId: string, reason: string) => void;
}

export const RealTimeAnalyticsSection: React.FC<RealTimeAnalyticsSectionProps> = ({
  invoices,
  analytics,
  attendanceList,
  currentRole,
  currentCashier,
  onOpenRoleModal,
  onVoidInvoice
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'invoices' | 'attendance'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPayment, setFilterPayment] = useState<string>('ALL');
  const [invoiceDateRange, setInvoiceDateRange] = useState<'today' | 'week' | 'month' | 'all'>('today');
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<Invoice | null>(null);
  const [activeTimeRange, setActiveTimeRange] = useState<'today' | 'week' | 'month'>('today');
  
  // Void modal state (Owner only)
  const [invoiceToVoid, setInvoiceToVoid] = useState<Invoice | null>(null);
  const [voidReason, setVoidReason] = useState<string>('Salah Input Pesanan Pelanggan');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Date range filter helper
  const isInvoiceInDateRange = (inv: Invoice, range: 'today' | 'week' | 'month' | 'all') => {
    if (range === 'all') return true;
    if (!inv.timestamp) return true;
    const now = Date.now();
    const ageMs = now - inv.timestamp;
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (range === 'today') {
      return ageMs <= oneDayMs;
    }
    if (range === 'week') {
      return ageMs <= 7 * oneDayMs;
    }
    if (range === 'month') {
      return ageMs <= 30 * oneDayMs;
    }
    return true;
  };

  // Filter invoices based on date range, search query, and payment method
  const filteredInvoices = invoices.filter(inv => {
    const matchesDate = isInvoiceInDateRange(inv, invoiceDateRange);
    
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inv.tableNumber && inv.tableNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inv.cashierName && inv.cashierName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inv.date && inv.date.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPayment = filterPayment === 'ALL' || inv.paymentMethod.toUpperCase().includes(filterPayment);
    return matchesDate && matchesSearch && matchesPayment;
  });

  // Calculate quick summary metrics for current filtered invoices
  const periodTotalRevenue = filteredInvoices
    .filter(inv => inv.status !== 'VOID')
    .reduce((sum, inv) => sum + inv.grandTotal, 0);
  
  const periodTotalOrders = filteredInvoices.length;
  const periodAov = periodTotalOrders > 0 ? Math.round(periodTotalRevenue / periodTotalOrders) : 0;
  const periodVoidOrders = filteredInvoices.filter(inv => inv.status === 'VOID').length;

  // Counts for date filter pills
  const countToday = invoices.filter(inv => isInvoiceInDateRange(inv, 'today')).length;
  const countWeek = invoices.filter(inv => isInvoiceInDateRange(inv, 'week')).length;
  const countMonth = invoices.filter(inv => isInvoiceInDateRange(inv, 'month')).length;
  const countAll = invoices.length;

  const topSellingItems = [
    { name: 'Premium Matcha Latte', count: 142, revenue: 4260000, percentage: 88, category: 'Drinks' },
    { name: 'Matcha Basque Cheesecake', count: 76, revenue: 2432000, percentage: 65, category: 'Dessert' },
    { name: 'Strawberry Matcha Latte', count: 68, revenue: 2380000, percentage: 58, category: 'Drinks' },
    { name: 'Matcha Tiramisu in Jar', count: 54, revenue: 1728000, percentage: 46, category: 'Dessert' },
    { name: 'Chicken Katsu Rice', count: 38, revenue: 1520000, percentage: 32, category: 'Main' }
  ];

  // Export invoices to CSV simulation
  const handleExportCSV = () => {
    const headers = 'No Invoice,Tanggal,Waktu,Kasir,Tipe,Pelanggan,Metode,Total,Status\n';
    const rows = filteredInvoices.map(inv => 
      `"${inv.invoiceNumber}","${inv.date}","${inv.time}","${inv.cashierName}","${inv.orderType}","${inv.customerName || '-'}","${inv.paymentMethod}","${inv.grandTotal}","${inv.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MatchaHeaven_Ledger_${invoiceDateRange}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmVoid = () => {
    if (invoiceToVoid && onVoidInvoice) {
      onVoidInvoice(invoiceToVoid.id, voidReason);
      setInvoiceToVoid(null);
    }
  };

  return (
    <section id="analytics" className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#47623A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEFE4] text-[#47623A] text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Pusat Manajemen & Pembukuan Keuangan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2B18] tracking-tight font-display">
              Laporan Omzet, Audit Invoice & Absensi Kasir
            </h2>
            <p className="text-sm sm:text-base text-[#56684A] max-w-2xl">
              Portal komprehensif untuk memantau performa penjualan, rekonsiliasi pembayaran kasir, dan rekap jam kerja tim secara real-time.
            </p>
          </div>

          {/* Current Role Badge & Quick Switch */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white p-2 rounded-2xl border border-[#47623A]/20 shadow-xs">
            <div className="flex items-center gap-2 px-2">
              <div className={`p-1.5 rounded-lg ${currentRole === 'owner' ? 'bg-[#1E2B18] text-amber-400' : 'bg-[#47623A]/15 text-[#47623A]'}`}>
                {currentRole === 'owner' ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-stone-400">Hak Akses Modul</div>
                <div className="text-xs font-black text-[#1E2B18] capitalize flex items-center gap-1">
                  <span>{currentRole === 'owner' ? 'Owner / Pemilik Toko' : 'Kasir Operasional'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenRoleModal}
              className="px-3 py-1.5 bg-[#47623A] hover:bg-[#374D2D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {currentRole === 'owner' ? 'Ganti Akun' : 'Buka Akses Owner'}
            </button>
          </div>
        </div>

        {/* RESTRICTED ACCESS SCREEN FOR CASHIER */}
        {currentRole === 'kasir' ? (
          <div className="bg-white rounded-3xl border border-[#47623A]/20 p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#EAEFE4] text-[#47623A] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-[#47623A]" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 uppercase tracking-wider">
                Akses Terbatas: Khusus Owner
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E2B18]">
                Laporan Keuangan & Buku Besar Terkunci
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Anda saat ini masuk sebagai Kasir (<strong>{currentCashier.name} - {currentCashier.code}</strong>). 
                Sesuai standar operasional, kasir hanya memiliki wewenang untuk <strong>Absensi Shift</strong> dan <strong>Melakukan Transaksi Kasir POS</strong>. 
                Data omzet, grafik laba, dan riwayat audit penuh hanya dapat dilihat oleh Pemilik Kafe (Owner).
              </p>
            </div>

            {/* Cashier's Active Shift Summary Box */}
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-2">
              <div className="text-xs font-extrabold text-[#1E2B18] flex items-center justify-between pb-1 border-b border-stone-200">
                <span>Ringkasan Tugas Kasir Aktif</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Terminal Aktif
                </span>
              </div>
              <div className="text-xs text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Nama Kasir:</span>
                  <span className="font-bold text-stone-800">{currentCashier.name} ({currentCashier.code})</span>
                </div>
                <div className="flex justify-between">
                  <span>Wewenang Kasir:</span>
                  <span className="font-semibold text-[#47623A]">Absensi & Transaksi Bayar</span>
                </div>
                <div className="flex justify-between">
                  <span>Edit Transaksi Lunas:</span>
                  <span className="font-bold text-red-600">Dilarang / Terkunci</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenRoleModal}
                className="w-full sm:w-auto px-6 py-3 bg-[#47623A] hover:bg-[#364B2C] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Masuk sebagai Owner (PIN)</span>
              </button>
              
              <a
                href="#simulator"
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl text-center"
              >
                Kembali ke POS Kasir
              </a>
            </div>
          </div>
        ) : (
          /* OWNER FULL ACCESS DASHBOARD */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Owner Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2 bg-[#EFECE0] p-1 rounded-2xl">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Omzet & Grafik Real-Time</span>
                </button>

                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'invoices'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>Buku Besar & Audit Invoice ({invoices.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'attendance'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Rekap Absensi Kasir ({attendanceList.length})</span>
                </button>
              </div>

              {/* Time Filter & Export Controls */}
              {activeTab === 'analytics' && (
                <div className="flex items-center bg-[#EFECE0] p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setActiveTimeRange('today')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTimeRange === 'today'
                        ? 'bg-[#47623A] text-white shadow-xs'
                        : 'text-[#4D5E41] hover:text-[#202E19]'
                    }`}
                  >
                    Hari Ini (Live)
                  </button>
                  <button
                    onClick={() => setActiveTimeRange('week')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTimeRange === 'week'
                        ? 'bg-[#47623A] text-white shadow-xs'
                        : 'text-[#4D5E41] hover:text-[#202E19]'
                    }`}
                  >
                    7 Hari
                  </button>
                  <button
                    onClick={() => setActiveTimeRange('month')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTimeRange === 'month'
                        ? 'bg-[#47623A] text-white shadow-xs'
                        : 'text-[#4D5E41] hover:text-[#202E19]'
                    }`}
                  >
                    Bulan Ini
                  </button>
                </div>
              )}

              {/* Invoice Tab Date Filter + CSV Export Buttons */}
              {activeTab === 'invoices' && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-[#EFECE0] p-1 rounded-xl text-xs font-bold">
                    <button
                      id="filter-inv-today-top"
                      onClick={() => setInvoiceDateRange('today')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        invoiceDateRange === 'today'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#4D5E41] hover:text-[#202E19]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Hari Ini</span>
                    </button>
                    <button
                      id="filter-inv-week-top"
                      onClick={() => setInvoiceDateRange('week')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        invoiceDateRange === 'week'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#4D5E41] hover:text-[#202E19]'
                      }`}
                    >
                      <span>Minggu Ini</span>
                    </button>
                    <button
                      id="filter-inv-month-top"
                      onClick={() => setInvoiceDateRange('month')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        invoiceDateRange === 'month'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#4D5E41] hover:text-[#202E19]'
                      }`}
                    >
                      <span>Bulan Ini</span>
                    </button>
                    <button
                      id="filter-inv-all-top"
                      onClick={() => setInvoiceDateRange('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        invoiceDateRange === 'all'
                          ? 'bg-[#47623A] text-white shadow-xs'
                          : 'text-[#4D5E41] hover:text-[#202E19]'
                      }`}
                    >
                      <span>Semua</span>
                    </button>
                  </div>

                  <button
                    id="btn-export-csv-invoices"
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-[#47623A] hover:bg-[#384F2D] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
                    title={`Ekspor ${filteredInvoices.length} data invoice terpilih ke CSV`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Ekspor CSV ({filteredInvoices.length})</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: ANALYTICS & CHARTS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* Top Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Omzet Hari Ini</span>
                      <div className="p-2 rounded-xl bg-emerald-100 text-[#47623A]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E2B18] font-display">
                      {formatRupiah(analytics.totalRevenue)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+18.4% dibandingkan kemarin</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Transaksi / Invoice</span>
                      <div className="p-2 rounded-xl bg-amber-100 text-[#8C6A4A]">
                        <Receipt className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E2B18] font-display">
                      {analytics.totalTransactions} Transaksi
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#697B5D]">
                      <Clock className="w-3.5 h-3.5 text-[#47623A]" />
                      <span>100% Invoice Tercatat Otomatis</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Rata-Rata Nilai Struk (AOV)</span>
                      <div className="p-2 rounded-xl bg-[#47623A]/10 text-[#47623A]">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E2B18] font-display">
                      {formatRupiah(analytics.averageOrderValue)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <span>Per struk pembelian pelanggan</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Porsi Menu Terjual</span>
                      <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                        <Coffee className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E2B18] font-display">
                      {analytics.totalCupsSold + analytics.totalDessertSold} Porsi
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-600">
                      <span className="font-semibold">{analytics.totalCupsSold} Minuman</span>
                      <span>•</span>
                      <span className="font-semibold">{analytics.totalDessertSold} Dessert</span>
                    </div>
                  </div>
                </div>

                {/* Peak Hour Chart + Top Selling Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Hourly Sales Chart (7 cols) */}
                  <div className="lg:col-span-7 p-6 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E2B18]">Aktivitas Penjualan per Jam (Peak Hours)</h3>
                        <p className="text-xs text-stone-500">Distribusi omzet kafe sepanjang jam operasional Matcha Heaven</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Jam Tersibuk: 12:00 - 13:00
                      </span>
                    </div>

                    {/* Custom Bar Visualization */}
                    <div className="pt-4 space-y-3">
                      {HOURLY_SALES_DATA.map((item, idx) => {
                        const maxVal = 900000;
                        const widthPct = Math.round((item.sales / maxVal) * 100);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-[#202E19]">
                              <span className="font-mono text-stone-600">{item.hour} WIB</span>
                              <span className="text-[#47623A]">{formatRupiah(item.sales)} ({item.orders} order)</span>
                            </div>
                            <div className="w-full bg-[#FAF8F2] h-4 rounded-full overflow-hidden border border-stone-200">
                              <div
                                className="bg-gradient-to-r from-[#8CA86E] to-[#47623A] h-full rounded-full transition-all duration-700"
                                style={{ width: `${widthPct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Data disinkronisasi setiap 10 detik dari mobile kasir</span>
                      <span className="font-semibold text-[#47623A]">Shift 1 & Shift 2 Aktif</span>
                    </div>
                  </div>

                  {/* Top Selling Leaderboard (5 cols) */}
                  <div className="lg:col-span-5 p-6 bg-white rounded-2xl border border-[#47623A]/15 shadow-xs space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-extrabold text-[#1E2B18]">Menu Terlaris (Leaderboard)</h3>
                        <span className="text-[10px] font-bold text-[#47623A] uppercase">Top 5 Items</span>
                      </div>
                      <p className="text-xs text-stone-500 mb-4">Paling banyak dipesan pelanggan minggu ini</p>

                      <div className="space-y-3.5">
                        {topSellingItems.map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#EAEFE4] text-[#47623A] font-extrabold text-[10px] flex items-center justify-center">
                                  {i + 1}
                                </span>
                                <span className="font-bold text-[#1E2B18]">{item.name}</span>
                              </div>
                              <span className="font-extrabold text-[#47623A]">{item.count} cup</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#47623A] h-full rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method Breakdown Bar */}
                    <div className="pt-4 border-t border-stone-100">
                      <div className="text-xs font-bold text-stone-700 mb-2">Komposisi Pembayaran:</div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                          <QrCode className="w-3.5 h-3.5 text-emerald-700 mx-auto mb-1" />
                          <div className="text-[10px] font-bold text-emerald-900">QRIS (58%)</div>
                          <div className="text-[9px] text-emerald-700">{formatRupiah(analytics.qrisRevenue)}</div>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                          <Banknote className="w-3.5 h-3.5 text-amber-700 mx-auto mb-1" />
                          <div className="text-[10px] font-bold text-amber-900">Tunai (28%)</div>
                          <div className="text-[9px] text-amber-700">{formatRupiah(analytics.cashRevenue)}</div>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                          <CreditCard className="w-3.5 h-3.5 text-blue-700 mx-auto mb-1" />
                          <div className="text-[10px] font-bold text-blue-900">EDC (14%)</div>
                          <div className="text-[9px] text-blue-700">{formatRupiah(analytics.cardRevenue)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVOICES LEDGER & AUDIT (OWNER PRIVILEGE) */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl border border-[#47623A]/15 shadow-xs overflow-hidden animate-in fade-in duration-200">
                {/* Table Header & Toolbar */}
                <div className="p-4 sm:p-6 border-b border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-[#1E2B18]">Buku Besar Riwayat & Audit Invoice</h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                          {filteredInvoices.length} Terpilih
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">Semua transaksi terekam permanen. Owner memiliki wewenang Void jika diperlukan retur.</p>
                    </div>

                    {/* Quick Date Range Filter Tabs */}
                    <div className="flex items-center bg-[#EFECE0] p-1 rounded-xl text-xs font-bold self-start sm:self-auto overflow-x-auto max-w-full">
                      <button
                        id="filter-date-today"
                        onClick={() => setInvoiceDateRange('today')}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          invoiceDateRange === 'today'
                            ? 'bg-[#47623A] text-white shadow-xs'
                            : 'text-[#4D5E41] hover:text-[#202E19]'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Hari Ini</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          invoiceDateRange === 'today' ? 'bg-white/20 text-white' : 'bg-stone-300/60 text-stone-700'
                        }`}>
                          {countToday}
                        </span>
                      </button>
                      <button
                        id="filter-date-week"
                        onClick={() => setInvoiceDateRange('week')}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          invoiceDateRange === 'week'
                            ? 'bg-[#47623A] text-white shadow-xs'
                            : 'text-[#4D5E41] hover:text-[#202E19]'
                        }`}
                      >
                        <span>Minggu Ini (7 Hari)</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          invoiceDateRange === 'week' ? 'bg-white/20 text-white' : 'bg-stone-300/60 text-stone-700'
                        }`}>
                          {countWeek}
                        </span>
                      </button>
                      <button
                        id="filter-date-month"
                        onClick={() => setInvoiceDateRange('month')}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          invoiceDateRange === 'month'
                            ? 'bg-[#47623A] text-white shadow-xs'
                            : 'text-[#4D5E41] hover:text-[#202E19]'
                        }`}
                      >
                        <span>Bulan Ini (30 Hari)</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          invoiceDateRange === 'month' ? 'bg-white/20 text-white' : 'bg-stone-300/60 text-stone-700'
                        }`}>
                          {countMonth}
                        </span>
                      </button>
                      <button
                        id="filter-date-all"
                        onClick={() => setInvoiceDateRange('all')}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          invoiceDateRange === 'all'
                            ? 'bg-[#47623A] text-white shadow-xs'
                            : 'text-[#4D5E41] hover:text-[#202E19]'
                        }`}
                      >
                        <span>Semua</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          invoiceDateRange === 'all' ? 'bg-white/20 text-white' : 'bg-stone-300/60 text-stone-700'
                        }`}>
                          {countAll}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Ribbon for selected date range */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                        {invoiceDateRange === 'today' && 'Omzet Hari Ini'}
                        {invoiceDateRange === 'week' && 'Omzet 7 Hari Terakhir'}
                        {invoiceDateRange === 'month' && 'Omzet 30 Hari Terakhir'}
                        {invoiceDateRange === 'all' && 'Total Seluruh Omzet'}
                      </div>
                      <div className="text-sm sm:text-base font-black text-[#1E2B18] mt-0.5">
                        {formatRupiah(periodTotalRevenue)}
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Total Transaksi</div>
                      <div className="text-sm sm:text-base font-black text-[#1E2B18] mt-0.5 flex items-center gap-1.5">
                        <span>{periodTotalOrders} Invoice</span>
                        {periodVoidOrders > 0 && (
                          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                            ({periodVoidOrders} Void)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Rata-Rata Struk (AOV)</div>
                      <div className="text-sm sm:text-base font-black text-[#47623A] mt-0.5">
                        {formatRupiah(periodAov)}
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Rentang Waktu Aktif</div>
                      <div className="text-xs sm:text-xs font-extrabold text-[#47623A] mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#47623A]" />
                        <span>
                          {invoiceDateRange === 'today' && 'Hari Ini (24 Jam)'}
                          {invoiceDateRange === 'week' && '7 Hari Terakhir'}
                          {invoiceDateRange === 'month' && '30 Hari Terakhir'}
                          {invoiceDateRange === 'all' && 'Seluruh Arsip'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-stone-100">
                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto flex-1">
                      <div className="relative flex-1 sm:max-w-xs">
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="search-invoices-input"
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari no. invoice / kasir / pelanggan / tanggal..."
                          className="w-full pl-8 pr-8 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A] bg-[#FAF9F5]"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <select
                        id="filter-payment-select"
                        value={filterPayment}
                        onChange={(e) => setFilterPayment(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#47623A] bg-[#FAF9F5]"
                      >
                        <option value="ALL">Semua Metode Pembayaran</option>
                        <option value="QRIS">QRIS</option>
                        <option value="TUNAI">Tunai (Cash)</option>
                        <option value="KARTU">EDC / Kartu</option>
                      </select>

                      {(searchQuery || filterPayment !== 'ALL' || invoiceDateRange !== 'today') && (
                        <button
                          id="btn-reset-invoice-filters"
                          onClick={() => {
                            setSearchQuery('');
                            setFilterPayment('ALL');
                            setInvoiceDateRange('today');
                          }}
                          className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center gap-1 font-semibold cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset Filter</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold border-b border-stone-200 tracking-wider">
                      <tr>
                        <th className="py-3 px-4 sm:px-6">No. Invoice</th>
                        <th className="py-3 px-4">Waktu & Kasir</th>
                        <th className="py-3 px-4">Tipe & Meja</th>
                        <th className="py-3 px-4">Rincian Item</th>
                        <th className="py-3 px-4">Metode Bayar</th>
                        <th className="py-3 px-4">Total Akhir</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi Owner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                      {filteredInvoices.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-stone-400">
                            <div className="max-w-xs mx-auto space-y-2">
                              <Receipt className="w-8 h-8 text-stone-300 mx-auto" />
                              <p className="font-semibold text-stone-600">Tidak ada transaksi ditemukan</p>
                              <p className="text-xs text-stone-400">
                                Tidak ada invoice yang cocok pada rentang waktu atau kata kunci yang dipilih.
                              </p>
                              <button
                                onClick={() => {
                                  setSearchQuery('');
                                  setFilterPayment('ALL');
                                  setInvoiceDateRange('all');
                                }}
                                className="mt-2 px-3 py-1.5 bg-[#47623A] text-white rounded-lg text-xs font-bold hover:bg-[#384F2D] cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Tampilkan Semua Transaksi</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-[#FAF9F5] transition-colors">
                            <td className="py-3 px-4 sm:px-6 font-mono font-bold text-[#1E2B18]">
                              {inv.invoiceNumber}
                            </td>
                            <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                              <div className="font-bold text-stone-700">{inv.cashierName}</div>
                              <div className="text-[10px] text-stone-400">{inv.date} • {inv.time}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="font-bold text-[#2E4024]">{inv.orderType}</span>
                              {inv.tableNumber && (
                                <span className="text-[10px] text-stone-500 block">{inv.tableNumber}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 max-w-[200px] truncate">
                              {inv.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 border border-stone-200">
                                {inv.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-black text-[#47623A] whitespace-nowrap">
                              {formatRupiah(inv.grandTotal)}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                inv.status === 'LUNAS' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                <CheckCircle2 className="w-3 h-3" />
                                {inv.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                              <button
                                onClick={() => setSelectedInvoiceForView(inv)}
                                className="px-2.5 py-1 text-[11px] font-bold text-[#47623A] hover:bg-[#47623A]/10 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat</span>
                              </button>
                              
                              {onVoidInvoice && inv.status !== 'VOID' && (
                                <button
                                  onClick={() => setInvoiceToVoid(inv)}
                                  className="px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                                  title="Otorisasi Void Transaksi (Khusus Owner)"
                                >
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Void</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: REKAP ABSENSI KASIR (OWNER PRIVILEGE) */}
            {activeTab === 'attendance' && (
              <div className="bg-white rounded-2xl border border-[#47623A]/15 shadow-xs overflow-hidden animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-[#1E2B18]">Log Rekapitulasi Absensi & Shift Kasir</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#47623A] text-white rounded-full">
                        {attendanceList.length} Sesi Terdata
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Pemantauan jam masuk, jam pulang, saldo modal kas awal laci, dan catatan operasional kasir.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold border-b border-stone-200 tracking-wider">
                      <tr>
                        <th className="py-3 px-4 sm:px-6">Nama Kasir</th>
                        <th className="py-3 px-4">Tanggal & Shift</th>
                        <th className="py-3 px-4">Clock-In (Masuk)</th>
                        <th className="py-3 px-4">Clock-Out (Pulang)</th>
                        <th className="py-3 px-4">Modal Laci Awal</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Catatan Kasir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                      {attendanceList.map((rec) => (
                        <tr key={rec.id} className="hover:bg-[#FAF9F5] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#47623A] text-white flex items-center justify-center font-bold text-xs">
                                {rec.cashierCode}
                              </div>
                              <div>
                                <div className="font-bold text-[#1E2B18]">{rec.cashierName}</div>
                                <div className="text-[10px] text-stone-400 font-mono">ID: {rec.cashierCode}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-semibold text-stone-800">{rec.shiftType}</div>
                            <div className="text-[10px] text-stone-400">{rec.date}</div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {rec.clockInTime} WIB
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {rec.clockOutTime ? (
                              <span className="font-mono font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                                {rec.clockOutTime} WIB
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                Sedang Bertugas
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono font-semibold text-[#47623A]">
                            {formatRupiah(rec.initialCashDrawer)}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rec.status === 'Aktif Bertugas'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-stone-500 max-w-[220px] truncate">
                            {rec.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal: View Single Invoice Receipt */}
        {selectedInvoiceForView && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 border border-[#47623A]/20">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-[#47623A] uppercase tracking-wider">Detail Invoice Kasir</span>
                  <h3 className="text-base font-extrabold text-[#1E2B18]">{selectedInvoiceForView.invoiceNumber}</h3>
                </div>
                <button
                  onClick={() => setSelectedInvoiceForView(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Receipt Canvas */}
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-300 font-mono-receipt text-xs space-y-2">
                <div className="text-center font-bold pb-2 border-b border-dashed border-stone-400">
                  <div>MATCHA HEAVEN CAFÉ</div>
                  <div className="text-[10px] font-normal text-stone-500">"Taste The Calm, Sip The Matcha"</div>
                </div>

                <div className="text-[10px] space-y-0.5 py-1 border-b border-dashed border-stone-400">
                  <div className="flex justify-between">
                    <span>Tanggal:</span>
                    <span>{selectedInvoiceForView.date} {selectedInvoiceForView.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasir:</span>
                    <span>{selectedInvoiceForView.cashierName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipe:</span>
                    <span>{selectedInvoiceForView.orderType} {selectedInvoiceForView.tableNumber ? `(${selectedInvoiceForView.tableNumber})` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamu:</span>
                    <span>{selectedInvoiceForView.customerName}</span>
                  </div>
                </div>

                <div className="space-y-1 py-1 border-b border-dashed border-stone-400 text-[11px]">
                  {selectedInvoiceForView.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="font-bold">{formatRupiah(it.total)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-[11px] pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatRupiah(selectedInvoiceForView.subtotal)}</span>
                  </div>
                  {selectedInvoiceForView.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Diskon:</span>
                      <span>-{formatRupiah(selectedInvoiceForView.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Pajak PB1 (10%):</span>
                    <span>{formatRupiah(selectedInvoiceForView.tax)}</span>
                  </div>
                  <div className="flex justify-between font-black text-xs pt-1 border-t border-stone-300">
                    <span>GRAND TOTAL:</span>
                    <span>{formatRupiah(selectedInvoiceForView.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>Metode: {selectedInvoiceForView.paymentMethod}</span>
                    <span>STATUS: {selectedInvoiceForView.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#47623A] hover:bg-[#384F2D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Ulang Struk</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceForView(null)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Modal: Owner Void / Cancel Invoice Confirmation */}
        {invoiceToVoid && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border-2 border-rose-400">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="p-3 bg-rose-100 rounded-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1E2B18]">Otorisasi Void Invoice</h3>
                  <span className="text-[11px] text-rose-600 font-bold">Wewenang Khusus Owner</span>
                </div>
              </div>

              <p className="text-xs text-stone-600">
                Apakah Anda yakin ingin membatalkan transaksi <strong>{invoiceToVoid.invoiceNumber}</strong> senilai <strong>{formatRupiah(invoiceToVoid.grandTotal)}</strong>?
              </p>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Alasan Void / Pembatalan:</label>
                <select
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-[#FAF9F5]"
                >
                  <option value="Salah Input Pesanan Pelanggan">Salah Input Pesanan Pelanggan</option>
                  <option value="Pelanggan Membatalkan Pesanan">Pelanggan Membatalkan Pesanan</option>
                  <option value="Kendala Mesin / Bahan Baku Habis">Kendala Mesin / Bahan Baku Habis</option>
                  <option value="Pembayaran Ganda / Double Charge">Pembayaran Ganda / Double Charge</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleConfirmVoid}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Konfirmasi Void (Owner)
                </button>
                <button
                  onClick={() => setInvoiceToVoid(null)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
