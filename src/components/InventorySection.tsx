import React, { useState, useMemo } from 'react';
import { 
  Boxes, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ShoppingBag, 
  TrendingDown, 
  TrendingUp, 
  SlidersHorizontal, 
  Layers, 
  FileSpreadsheet, 
  Truck, 
  Warehouse, 
  PackageCheck, 
  Sparkles, 
  History, 
  Check, 
  X, 
  Edit3, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Package,
  Coffee,
  UtensilsCrossed,
  Box,
  Eye,
  PlusCircle,
  MinusCircle,
  FileText,
  Printer
} from 'lucide-react';
import { InventoryItem, StockMovement, InventoryType, UserRole, CashierProfile } from '../types';

interface InventorySectionProps {
  inventoryItems: InventoryItem[];
  stockMovements: StockMovement[];
  onUpdateStock: (code: string, newStock: number, movementType: 'IN' | 'OUT' | 'ADJUSTMENT', quantity: number, reason: string, actor: string) => void;
  onAddItem?: (item: InventoryItem) => void;
  currentRole: UserRole;
  currentCashier: CashierProfile;
  onOpenRoleModal?: () => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  inventoryItems,
  stockMovements,
  onUpdateStock,
  onAddItem,
  currentRole,
  currentCashier,
  onOpenRoleModal
}) => {
  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<'all' | 'beverage' | 'main-course' | 'packaging' | 'low-stock' | 'movements'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'code' | 'name' | 'stock-asc' | 'valuation-desc' | 'usage-desc'>('code');

  // Interactive Modals
  const [stockModalItem, setStockModalItem] = useState<InventoryItem | null>(null);
  const [stockModalType, setStockModalType] = useState<'IN' | 'OUT' | 'ADJUSTMENT'>('IN');
  const [stockQuantityInput, setStockQuantityInput] = useState<number>(100);
  const [stockReasonInput, setStockReasonInput] = useState<string>('');

  // Purchase Order Generator Modal
  const [isPoModalOpen, setIsPoModalOpen] = useState(false);
  const [poSelectedSupplier, setPoSelectedSupplier] = useState<string>('Supplier Matcha');
  const [poNotes, setPoNotes] = useState<string>('Harap kirimkan dengan sertifikat uji kemurnian grade A.');
  const [poSuccessToast, setPoSuccessToast] = useState(false);

  // Detail View Modal
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);

  // Format IDR Currency
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Format Number with dots
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Extract unique categories & suppliers
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    inventoryItems.forEach(it => set.add(it.category));
    return Array.from(set).sort();
  }, [inventoryItems]);

  const suppliersList = useMemo(() => {
    const set = new Set<string>();
    inventoryItems.forEach(it => set.add(it.supplier));
    return Array.from(set).sort();
  }, [inventoryItems]);

  // Overall Inventory Metrics Calculation
  const totalValuation = useMemo(() => {
    return inventoryItems.reduce((sum, it) => sum + (it.currentStock * it.unitPrice), 0);
  }, [inventoryItems]);

  const initialValuation = useMemo(() => {
    return inventoryItems.reduce((sum, it) => sum + (it.initialStock * it.unitPrice), 0);
  }, [inventoryItems]);

  const totalUsedValuation = initialValuation - totalValuation;

  const lowStockCount = useMemo(() => {
    return inventoryItems.filter(it => it.currentStock <= it.minStock * 1.25 || it.status !== 'Aman').length;
  }, [inventoryItems]);

  const totalSKUs = inventoryItems.length;
  const beverageSKUs = inventoryItems.filter(it => it.type === 'beverage').length;
  const mainCourseSKUs = inventoryItems.filter(it => it.type === 'main-course').length;
  const packagingSKUs = inventoryItems.filter(it => it.type === 'packaging').length;

  // Filtered Inventory List
  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      // Tab filter
      if (activeTab === 'beverage' && item.type !== 'beverage') return false;
      if (activeTab === 'main-course' && item.type !== 'main-course') return false;
      if (activeTab === 'packaging' && item.type !== 'packaging') return false;
      if (activeTab === 'low-stock') {
        const isNearMin = item.currentStock <= item.minStock * 1.25 || item.status !== 'Aman';
        if (!isNearMin) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.code.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.supplier.toLowerCase().includes(q) ||
          (item.storageLocation && item.storageLocation.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category Dropdown Filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      // Supplier Dropdown Filter
      if (selectedSupplier !== 'ALL' && item.supplier !== selectedSupplier) return false;

      // Status Dropdown Filter
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'Aman' && item.status !== 'Aman') return false;
        if (selectedStatus === 'Menipis' && item.status !== 'Menipis' && item.currentStock > item.minStock) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock-asc') return (a.currentStock / a.initialStock) - (b.currentStock / b.initialStock);
      if (sortBy === 'valuation-desc') return (b.currentStock * b.unitPrice) - (a.currentStock * a.unitPrice);
      if (sortBy === 'usage-desc') return (b.initialStock - b.currentStock) - (a.initialStock - a.currentStock);
      return 0;
    });
  }, [inventoryItems, activeTab, searchQuery, selectedCategory, selectedSupplier, selectedStatus, sortBy]);

  // Export Inventory Data to CSV
  const handleExportCSV = () => {
    const headers = ['Kode', 'Bahan Baku', 'Tipe', 'Kategori', 'Satuan', 'Stok Awal', 'Stok Saat Ini', 'Minimum Stok', 'Harga Satuan (Rp)', 'Total Valuasi (Rp)', 'Supplier', 'Status', 'Lokasi Penyimpanan'];
    const rows = filteredItems.map(it => [
      it.code,
      `"${it.name}"`,
      it.type,
      it.category,
      it.unit,
      it.initialStock,
      it.currentStock,
      it.minStock,
      it.unitPrice,
      it.currentStock * it.unitPrice,
      `"${it.supplier}"`,
      it.status,
      `"${it.storageLocation || '-'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MatchaHeaven_Inventory_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Stock Modal
  const openStockModal = (item: InventoryItem, type: 'IN' | 'OUT' | 'ADJUSTMENT') => {
    setStockModalItem(item);
    setStockModalType(type);
    setStockQuantityInput(type === 'IN' ? item.minStock * 2 : Math.min(100, item.currentStock));
    setStockReasonInput(
      type === 'IN' 
        ? `Restock rutin dari ${item.supplier}` 
        : type === 'OUT' 
        ? 'Pemakaian operasional barista & dapur' 
        : 'Penyesuaian stok fisik (Stock Opname)'
    );
  };

  // Submit Stock Update
  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalItem || stockQuantityInput <= 0) return;

    let newStock = stockModalItem.currentStock;
    if (stockModalType === 'IN') {
      newStock += stockQuantityInput;
    } else if (stockModalType === 'OUT') {
      newStock = Math.max(0, newStock - stockQuantityInput);
    } else {
      newStock = stockQuantityInput;
    }

    onUpdateStock(
      stockModalItem.code,
      newStock,
      stockModalType,
      stockQuantityInput,
      stockReasonInput || (stockModalType === 'IN' ? 'Barang masuk' : 'Barang keluar'),
      `${currentCashier.name} (${currentRole.toUpperCase()})`
    );

    setStockModalItem(null);
  };

  // Items by Supplier for PO Modal
  const poItems = useMemo(() => {
    return inventoryItems.filter(it => it.supplier === poSelectedSupplier);
  }, [inventoryItems, poSelectedSupplier]);

  const poEstimatedCost = useMemo(() => {
    return poItems.reduce((sum, it) => {
      const restockQty = Math.max(0, (it.initialStock - it.currentStock));
      return sum + (restockQty * it.unitPrice);
    }, 0);
  }, [poItems]);

  return (
    <section id="inventory" className="py-16 sm:py-24 bg-[#F4F1EA] relative overflow-hidden border-t border-[#47623A]/15">
      {/* Background Decorative Subtle Matcha Leaf Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#47623A]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FA382]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#47623A]/10 border border-[#47623A]/20 text-[#2D3E25] text-xs font-bold uppercase tracking-wider">
              <Boxes className="w-4 h-4 text-[#47623A]" />
              <span>Sistem Manajemen Inventaris & Pergudangan</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E2B18] tracking-tight">
              Buku Stok & Kontrol Bahan Baku Terpadu
            </h2>
            <p className="text-sm sm:text-base text-[#4D5E41] leading-relaxed">
              Monitoring real-time pergerakan 48 SKU bahan baku premium matcha, racikan minuman, menu dapur main course, hingga perlengkapan packaging ramah lingkungan.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-open-po-modal"
              onClick={() => setIsPoModalOpen(true)}
              className="px-4 py-2.5 bg-white hover:bg-stone-50 text-[#1E2B18] border border-[#47623A]/30 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#47623A]" />
              <span>Buat PO Supplier</span>
            </button>

            <button
              id="btn-export-inventory-csv"
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-[#47623A] hover:bg-[#384F2D] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Lembar Audit ({filteredItems.length})</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Valuasi Stok */}
          <div className="bg-white p-5 rounded-2xl border border-[#47623A]/15 shadow-xs flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Nilai Valuasi Aset</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1E2B18] tracking-tight">
                {formatRupiah(totalValuation)}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500">
                <span className="text-emerald-600 font-bold">48 SKU</span>
                <span>tercatat di sistem pergudangan</span>
              </div>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#47623A] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((totalValuation / (initialValuation || 1)) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Card 2: Modal Terpakai (COGS) */}
          <div className="bg-white p-5 rounded-2xl border border-[#47623A]/15 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Konsumsi Modal Bahan (COGS)</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1E2B18] tracking-tight">
                {formatRupiah(totalUsedValuation)}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500">
                <span>Total nilai bahan terpakai periode ini</span>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-amber-600" />
              <span>Sinkron otomatis dengan pesanan POS</span>
            </div>
          </div>

          {/* Card 3: Status Kesehatan Stok */}
          <div className="bg-white p-5 rounded-2xl border border-[#47623A]/15 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Status Ketahanan Stok</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-700 tracking-tight flex items-center gap-2">
                <span>{totalSKUs - lowStockCount} / {totalSKUs}</span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Aman</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500">
                <span>{lowStockCount > 0 ? `${lowStockCount} SKU mendekati batas minimum` : 'Semua bahan berada dalam batas aman'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-emerald-700">{Math.round(((totalSKUs - lowStockCount) / totalSKUs) * 100)}% Siaga</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">Buffer Aman 3-5 Hari</span>
            </div>
          </div>

          {/* Card 4: Distribusi Kategori SKU */}
          <div className="bg-white p-5 rounded-2xl border border-[#47623A]/15 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Distribusi Inventaris</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <div className="text-xs font-extrabold text-[#47623A]">{beverageSKUs}</div>
                <div className="text-[10px] text-stone-500 font-bold">Minuman</div>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <div className="text-xs font-extrabold text-amber-800">{mainCourseSKUs}</div>
                <div className="text-[10px] text-stone-500 font-bold">Dapur</div>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <div className="text-xs font-extrabold text-blue-800">{packagingSKUs}</div>
                <div className="text-[10px] text-stone-500 font-bold">Packaging</div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 text-center font-medium">
              3 Kategori Pergudangan Utama
            </div>
          </div>
        </div>

        {/* Main Inventory Ledger & Control Panel Container */}
        <div className="bg-white rounded-3xl border border-[#47623A]/15 shadow-sm overflow-hidden">
          
          {/* Navigation Tab Bar */}
          <div className="border-b border-stone-200 p-4 sm:p-6 bg-[#FAF9F5]/80 space-y-4">
            
            {/* Upper Category Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-[#EFECE0] rounded-2xl text-xs font-extrabold overflow-x-auto max-w-full">
                
                {/* Tab: All */}
                <button
                  id="tab-inv-all"
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <Boxes className="w-3.5 h-3.5" />
                  <span>Semua Bahan ({totalSKUs})</span>
                </button>

                {/* Tab: Beverage & Matcha */}
                <button
                  id="tab-inv-beverage"
                  onClick={() => setActiveTab('beverage')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'beverage'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Bahan Baku Minuman & Matcha ({beverageSKUs})</span>
                </button>

                {/* Tab: Main Course */}
                <button
                  id="tab-inv-main-course"
                  onClick={() => setActiveTab('main-course')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'main-course'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Bahan Main Course & Dapur ({mainCourseSKUs})</span>
                </button>

                {/* Tab: Packaging */}
                <button
                  id="tab-inv-packaging"
                  onClick={() => setActiveTab('packaging')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'packaging'
                      ? 'bg-[#47623A] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Packaging & Kemasan ({packagingSKUs})</span>
                </button>

                {/* Tab: Low Stock Alert */}
                <button
                  id="tab-inv-low-stock"
                  onClick={() => setActiveTab('low-stock')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'low-stock'
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Peringatan Stok ({lowStockCount})</span>
                </button>

                {/* Tab: Stock Movement History */}
                <button
                  id="tab-inv-movements"
                  onClick={() => setActiveTab('movements')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'movements'
                      ? 'bg-[#1E2B18] text-white shadow-xs'
                      : 'text-[#4D5E41] hover:text-[#202E19]'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Mutasi Log ({stockMovements.length})</span>
                </button>
              </div>

              {/* Cashier Badge / Stock Opname Mode */}
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Petugas: <strong className="text-[#1E2B18]">{currentCashier.name}</strong> ({currentRole.toUpperCase()})</span>
              </div>
            </div>

            {/* Filter, Search & Sort Toolbar (Only for Inventory Tables) */}
            {activeTab !== 'movements' && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                
                {/* Search Box */}
                <div className="relative flex-1 sm:max-w-xs min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="search-inventory-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kode (INV001), nama bahan, supplier..."
                    className="w-full pl-8 pr-8 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A] bg-white shadow-2xs font-medium"
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

                {/* Dropdowns */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Category Filter */}
                  <select
                    id="filter-category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#47623A] bg-white cursor-pointer"
                  >
                    <option value="ALL">Semua Kategori</option>
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Supplier Filter */}
                  <select
                    id="filter-supplier-select"
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#47623A] bg-white cursor-pointer"
                  >
                    <option value="ALL">Semua Supplier</option>
                    {suppliersList.map(sup => (
                      <option key={sup} value={sup}>{sup}</option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    id="sort-inventory-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#47623A] bg-white cursor-pointer"
                  >
                    <option value="code">Urutkan: Kode SKU</option>
                    <option value="name">Urutkan: Nama Bahan (A-Z)</option>
                    <option value="stock-asc">Urutkan: Sisa Stok Terendah</option>
                    <option value="valuation-desc">Urutkan: Valuasi Tertinggi</option>
                    <option value="usage-desc">Urutkan: Pemakaian Tertinggi</option>
                  </select>

                  {/* Reset Button */}
                  {(searchQuery || selectedCategory !== 'ALL' || selectedSupplier !== 'ALL' || sortBy !== 'code') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('ALL');
                        setSelectedSupplier('ALL');
                        setSortBy('code');
                      }}
                      className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-200/80 hover:bg-stone-300 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* TAB 1: INVENTORY TABLE */}
          {activeTab !== 'movements' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAF9F5] text-[#202E19] border-b border-stone-200 uppercase tracking-wider font-extrabold text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Kode</th>
                    <th className="py-3.5 px-4">Bahan Baku</th>
                    <th className="py-3.5 px-3">Kategori</th>
                    <th className="py-3.5 px-3 text-center">Satuan</th>
                    <th className="py-3.5 px-3 text-right">Stok Awal</th>
                    <th className="py-3.5 px-4 text-center">Sisa Stok & Level</th>
                    <th className="py-3.5 px-3 text-right">Min. Stok</th>
                    <th className="py-3.5 px-3 text-right">Harga / Satuan</th>
                    <th className="py-3.5 px-4 text-right">Total Valuasi</th>
                    <th className="py-3.5 px-3">Supplier</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-stone-400">
                        <div className="max-w-xs mx-auto space-y-2">
                          <Boxes className="w-8 h-8 text-stone-300 mx-auto" />
                          <p className="font-bold text-stone-600 text-sm">Tidak ada bahan baku ditemukan</p>
                          <p className="text-xs text-stone-400">
                            Coba ubah kata kunci pencarian atau reset filter kategori.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const stockPercentage = Math.round((item.currentStock / (item.initialStock || 1)) * 100);
                      const isLow = item.currentStock <= item.minStock;
                      const isWarning = item.currentStock <= item.minStock * 1.25 && !isLow;

                      return (
                        <tr key={item.code} className="hover:bg-[#FAF9F5] transition-colors group">
                          
                          {/* Kode SKU */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-extrabold text-[#47623A] bg-[#47623A]/8 px-2 py-1 rounded-lg border border-[#47623A]/20">
                              {item.code}
                            </span>
                          </td>

                          {/* Bahan Baku & Lokasi */}
                          <td className="py-3.5 px-4">
                            <div>
                              <button
                                onClick={() => setDetailItem(item)}
                                className="font-extrabold text-[#1E2B18] hover:text-[#47623A] text-left hover:underline cursor-pointer"
                              >
                                {item.name}
                              </button>
                              {item.storageLocation && (
                                <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                                  <Warehouse className="w-2.5 h-2.5 text-stone-400" />
                                  <span>{item.storageLocation}</span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Kategori */}
                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-stone-100 text-stone-700">
                              {item.category}
                            </span>
                          </td>

                          {/* Satuan */}
                          <td className="py-3.5 px-3 text-center font-mono text-stone-500">
                            {item.unit}
                          </td>

                          {/* Stok Awal */}
                          <td className="py-3.5 px-3 text-right font-mono text-stone-500">
                            {formatNumber(item.initialStock)}
                          </td>

                          {/* Sisa Stok & Progress Bar */}
                          <td className="py-3.5 px-4">
                            <div className="w-32 space-y-1">
                              <div className="flex justify-between items-center text-[11px] font-bold">
                                <span className={isLow ? 'text-rose-600 font-extrabold' : 'text-[#1E2B18]'}>
                                  {formatNumber(item.currentStock)} {item.unit}
                                </span>
                                <span className="text-[10px] text-stone-400 font-mono">
                                  {stockPercentage}%
                                </span>
                              </div>
                              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    isLow 
                                      ? 'bg-rose-500' 
                                      : isWarning 
                                      ? 'bg-amber-500' 
                                      : 'bg-[#47623A]'
                                  }`}
                                  style={{ width: `${Math.min(100, Math.max(8, stockPercentage))}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>

                          {/* Minimum Stok */}
                          <td className="py-3.5 px-3 text-right font-mono text-stone-500">
                            {formatNumber(item.minStock)}
                          </td>

                          {/* Harga / Satuan */}
                          <td className="py-3.5 px-3 text-right font-mono font-semibold text-stone-700">
                            {formatRupiah(item.unitPrice)}
                          </td>

                          {/* Total Valuasi */}
                          <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#1E2B18]">
                            {formatRupiah(item.currentStock * item.unitPrice)}
                          </td>

                          {/* Supplier */}
                          <td className="py-3.5 px-3 text-stone-600 font-medium">
                            <div className="flex items-center gap-1 text-[11px]">
                              <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="truncate max-w-[120px]" title={item.supplier}>{item.supplier}</span>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-3 text-center">
                            <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                              isLow
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : isWarning
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {isLow ? 'Menipis' : item.status}
                            </span>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                id={`btn-stock-in-${item.code}`}
                                onClick={() => openStockModal(item, 'IN')}
                                title="Restock / Tambah Stok Masuk"
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                              </button>

                              <button
                                id={`btn-stock-out-${item.code}`}
                                onClick={() => openStockModal(item, 'OUT')}
                                title="Catat Pemakaian / Stok Keluar"
                                className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg transition-colors border border-amber-200 cursor-pointer"
                              >
                                <MinusCircle className="w-3.5 h-3.5" />
                              </button>

                              <button
                                id={`btn-detail-${item.code}`}
                                onClick={() => setDetailItem(item)}
                                title="Lihat Detail & Riwayat"
                                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            
            /* TAB 2: STOCK MOVEMENT / LOGS */
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#1E2B18]">Riwayat Pergerakan & Mutasi Stok (Audit Trail)</h3>
                  <p className="text-xs text-stone-500">Mencatat setiap pemakaian barista, masak dapur, kedatangan supplier, dan penyesuaian opname.</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold bg-[#47623A]/10 text-[#47623A] rounded-xl">
                  {stockMovements.length} Mutasi Tercatat
                </span>
              </div>

              <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-[#FAF9F5]">
                {stockMovements.length === 0 ? (
                  <div className="py-12 text-center text-stone-400">Belum ada mutasi stok tercatat.</div>
                ) : (
                  stockMovements.map((mov) => (
                    <div key={mov.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-[#FAF9F5] transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                          mov.type === 'IN' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : mov.type === 'OUT' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {mov.type === 'IN' ? (
                            <ArrowDownRight className="w-4 h-4" />
                          ) : mov.type === 'OUT' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-extrabold text-[#47623A]">{mov.itemCode}</span>
                            <span className="font-extrabold text-stone-900 text-sm">{mov.itemName}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              mov.type === 'IN' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {mov.type === 'IN' ? 'STOK MASUK' : mov.type === 'OUT' ? 'STOK KELUAR' : 'OPNAME'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">{mov.reason}</p>
                          <div className="text-[11px] text-stone-400 mt-1 flex flex-wrap items-center gap-3">
                            <span>Petugas: <strong>{mov.actor}</strong></span>
                            {mov.referenceDoc && <span>Ref: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono">{mov.referenceDoc}</code></span>}
                            <span>{mov.dateStr}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right sm:self-center font-mono">
                        <div className={`text-base font-black ${
                          mov.type === 'IN' ? 'text-emerald-700' : 'text-amber-800'
                        }`}>
                          {mov.type === 'IN' ? '+' : '-'}{formatNumber(mov.quantity)} {mov.unit}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Table Footer Stats */}
          <div className="p-4 bg-[#FAF9F5] border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
            <div>
              Menampilkan <strong className="text-[#1E2B18]">{filteredItems.length}</strong> dari total <strong className="text-[#1E2B18]">{totalSKUs} SKU</strong> bahan baku terdaftar
            </div>
            <div className="flex items-center gap-4">
              <span>Batas Minimum: <strong>Auto-Alert Level 20%</strong></span>
              <span>Integrasi: <strong>POS Real-Time Recipe Deduct</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL 1: QUICK STOCK ADJUSTMENT (IN / OUT / OPNAME) --- */}
      {stockModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${
                  stockModalType === 'IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {stockModalType === 'IN' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1E2B18] text-base">
                    {stockModalType === 'IN' ? 'Restock / Stok Masuk' : stockModalType === 'OUT' ? 'Catat Pemakaian Stok' : 'Stock Opname Fisik'}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">{stockModalItem.code} • {stockModalItem.name}</p>
                </div>
              </div>
              <button
                onClick={() => setStockModalItem(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStockSubmit} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStockModalType('IN')}
                  className={`py-1.5 rounded-lg transition-all ${
                    stockModalType === 'IN' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  + Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setStockModalType('OUT')}
                  className={`py-1.5 rounded-lg transition-all ${
                    stockModalType === 'OUT' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  - Keluar
                </button>
                <button
                  type="button"
                  onClick={() => setStockModalType('ADJUSTMENT')}
                  className={`py-1.5 rounded-lg transition-all ${
                    stockModalType === 'ADJUSTMENT' ? 'bg-[#1E2B18] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Opname
                </button>
              </div>

              {/* Current Stock Preview */}
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                <span className="text-stone-500">Stok Saat Ini:</span>
                <span className="font-mono font-extrabold text-[#1E2B18] text-sm">
                  {formatNumber(stockModalItem.currentStock)} {stockModalItem.unit}
                </span>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {stockModalType === 'ADJUSTMENT' ? 'Hasil Hitung Fisik Sebenarnya' : 'Jumlah Perubahan'} ({stockModalItem.unit})
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={stockQuantityInput}
                  onChange={(e) => setStockQuantityInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-mono font-bold focus:outline-none focus:border-[#47623A]"
                />
              </div>

              {/* Reason / Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Keterangan / Alasan Mutasi
                </label>
                <input
                  type="text"
                  required
                  value={stockReasonInput}
                  onChange={(e) => setStockReasonInput(e.target.value)}
                  placeholder="Contoh: Kiriman PO baru / Pemakaian shift barista"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStockModalItem(null)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#47623A] hover:bg-[#384F2D] rounded-xl shadow-xs cursor-pointer active:scale-98"
                >
                  Simpan Perubahan Stok
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* --- MODAL 2: PURCHASE ORDER (PO) GENERATOR --- */}
      {isPoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#47623A]/10 text-[#47623A]">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1E2B18] text-base">Buat Surat Pesanan (PO Supplier)</h3>
                  <p className="text-xs text-stone-500">Estimasi kalkulasi restock otomatis berdasarkan kebutuhan stok awal.</p>
                </div>
              </div>
              <button
                onClick={() => setIsPoModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Supplier Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Pilih Supplier Rekanan</label>
              <select
                value={poSelectedSupplier}
                onChange={(e) => setPoSelectedSupplier(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:border-[#47623A] bg-stone-50"
              >
                {suppliersList.map(sup => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>

            {/* Selected Items for PO */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">Daftar Bahan Yang Dipesan ({poItems.length} SKU)</div>
              <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
                {poItems.map(it => {
                  const neededQty = Math.max(0, it.initialStock - it.currentStock);
                  const cost = neededQty * it.unitPrice;

                  return (
                    <div key={it.code} className="p-3 bg-[#FAF9F5] flex items-center justify-between">
                      <div>
                        <div className="font-extrabold text-stone-900">{it.name} <span className="font-mono text-stone-400">({it.code})</span></div>
                        <div className="text-[11px] text-stone-500">
                          Sisa: {formatNumber(it.currentStock)} {it.unit} • Harga Satuan: {formatRupiah(it.unitPrice)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-[#47623A]">
                          Pesan: {formatNumber(neededQty || it.minStock * 2)} {it.unit}
                        </div>
                        <div className="font-mono text-[11px] text-stone-500 font-semibold">
                          Estimasi: {formatRupiah(cost || (it.minStock * 2 * it.unitPrice))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimated Total */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Total Estimasi Nilai PO</span>
                <span className="text-[11px] text-emerald-700">Termin: Pembayaran Tempo 14 Hari / Transfer Bank</span>
              </div>
              <div className="text-xl font-black text-emerald-900 font-mono">
                {formatRupiah(poEstimatedCost)}
              </div>
            </div>

            {/* PO Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Catatan Tambahan untuk Supplier</label>
              <textarea
                rows={2}
                value={poNotes}
                onChange={(e) => setPoNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#47623A]"
              ></textarea>
            </div>

            {poSuccessToast && (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>PO Resmi berhasil dibuat & disalin ke lembar pengadaan!</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPoModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setPoSuccessToast(true);
                  setTimeout(() => {
                    setPoSuccessToast(false);
                    setIsPoModalOpen(false);
                  }, 2000);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-[#47623A] hover:bg-[#384F2D] rounded-xl shadow-xs cursor-pointer active:scale-98 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Kirim PO Resmi</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- MODAL 3: DETAIL ITEM & SPECIFICATION --- */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#47623A]/10 text-[#47623A] rounded-md">
                  {detailItem.code}
                </span>
                <h3 className="font-extrabold text-[#1E2B18] text-lg mt-1">{detailItem.name}</h3>
              </div>
              <button
                onClick={() => setDetailItem(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Kategori & Tipe:</span>
                <span className="font-bold text-stone-900 capitalize">{detailItem.category} ({detailItem.type})</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Satuan Ukur:</span>
                <span className="font-bold text-stone-900 font-mono">{detailItem.unit}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Stok Awal:</span>
                <span className="font-bold text-stone-900 font-mono">{formatNumber(detailItem.initialStock)} {detailItem.unit}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Sisa Stok Saat Ini:</span>
                <span className="font-bold text-[#47623A] font-mono">{formatNumber(detailItem.currentStock)} {detailItem.unit}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Minimum Threshold:</span>
                <span className="font-bold text-stone-900 font-mono">{formatNumber(detailItem.minStock)} {detailItem.unit}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Harga / Satuan:</span>
                <span className="font-bold text-stone-900 font-mono">{formatRupiah(detailItem.unitPrice)}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 col-span-2">
                <span className="text-stone-400 block font-medium">Supplier Rekanan:</span>
                <span className="font-bold text-stone-900">{detailItem.supplier}</span>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 col-span-2">
                <span className="text-stone-400 block font-medium">Lokasi Penyimpanan:</span>
                <span className="font-bold text-stone-900">{detailItem.storageLocation || 'Gudang Utama'}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const itemToRestock = detailItem;
                  setDetailItem(null);
                  openStockModal(itemToRestock, 'IN');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#47623A] hover:bg-[#384F2D] rounded-xl shadow-xs"
              >
                Restock Bahan Ini
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
