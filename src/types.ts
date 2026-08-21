export type MenuCategory = 'matcha-signature' | 'matcha-series' | 'non-matcha' | 'coffee' | 'main-course';

export type UserRole = 'kasir' | 'owner';

export interface CashierProfile {
  id: string;
  name: string;
  code: string;
  role: 'kasir' | 'owner';
  avatar?: string;
  phone?: string;
}

export interface AttendanceRecord {
  id: string;
  cashierId: string;
  cashierName: string;
  cashierCode: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  shiftType: 'Shift Pagi (08:00 - 16:00)' | 'Shift Sore (15:00 - 23:00)' | 'Full Day';
  status: 'Hadir Tepat Waktu' | 'Terlambat' | 'Selesai Shift' | 'Aktif Bertugas';
  initialCashDrawer: number;
  timestampIn: number;
  timestampOut?: number;
  notes?: string;
}

export interface MenuItem {
  id: string;
  code: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  badge?: 'Signature' | 'Best Seller' | 'Favorit' | 'Baru' | 'Heaven Special';
  imagePlaceholderColor?: string;
  temperature?: 'Hot' | 'Iced' | 'Both';
  calories?: string;
}

export interface CartItemOption {
  sugarLevel?: 'Normal (100%)' | 'Less Sugar (70%)' | 'Half Sugar (50%)' | 'No Sugar (0%)';
  iceLevel?: 'Normal Ice' | 'Less Ice' | 'No Ice';
  dairyOption?: 'Fresh Milk' | 'Oat Milk (+Rp 6.000)' | 'Almond Milk (+Rp 7.000)';
  extraTopping?: 'Matcha Ice Cream (+Rp 8.000)' | 'Boba Pearls (+Rp 4.000)' | 'Extra Matcha Shot (+Rp 5.000)' | 'None';
  servingType?: 'Dine In' | 'Take Away';
  note?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  options: CartItemOption;
  extraPrice: number;
  totalPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  time: string;
  timestamp: number;
  cashierName: string;
  orderType: 'Dine In' | 'Take Away';
  tableNumber?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    optionsSummary?: string;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number; // PB1 10%
  grandTotal: number;
  paymentMethod: 'QRIS' | 'Tunai' | 'Kartu Debit/Kredit' | 'Transfer Bank';
  paymentDetails?: {
    cashReceived?: number;
    changeAmount?: number;
    referenceNumber?: string;
  };
  status: 'LUNAS' | 'PENDING' | 'REFUND' | 'VOID';
  customerName?: string;
  customerPhone?: string;
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalTransactions: number;
  averageOrderValue: number;
  totalCupsSold: number;
  totalDessertSold: number;
  cashRevenue: number;
  qrisRevenue: number;
  cardRevenue: number;
}

export interface PrinterSettings {
  paperWidth: '58mm' | '80mm';
  autoPrintOnSuccess: boolean;
  showLogo: boolean;
  showTagline: boolean;
  showWifiPass: boolean;
  showSocialMedia: boolean;
  showBarcode: boolean;
  footerMessage: string;
  wifiSsid: string;
  wifiPass: string;
  instagramHandle: string;
}

export type InventoryType = 'beverage' | 'main-course' | 'packaging';

export interface InventoryItem {
  code: string;
  name: string;
  type: InventoryType;
  category: string;
  unit: string;
  initialStock: number;
  currentStock: number;
  minStock: number;
  unitPrice: number;
  supplier: string;
  status: 'Aman' | 'Menipis' | 'Kritis';
  lastUpdated?: string;
  storageLocation?: string;
}

export interface StockMovement {
  id: string;
  itemCode: string;
  itemName: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  unit: string;
  timestamp: number;
  dateStr: string;
  reason: string;
  actor: string;
  referenceDoc?: string;
}
