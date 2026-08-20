import { MenuItem, Invoice, SalesAnalytics, PrinterSettings, CashierProfile, AttendanceRecord } from '../types';

export const CASHIERS_LIST: CashierProfile[] = [
  {
    id: 'c-01',
    name: 'Alya Putri',
    code: 'KSR-01',
    role: 'kasir',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '0812-8821-0091'
  },
  {
    id: 'c-02',
    name: 'Dimas Setiawan',
    code: 'KSR-02',
    role: 'kasir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '0813-9942-1182'
  },
  {
    id: 'c-03',
    name: 'Nabila Zahra',
    code: 'KSR-03',
    role: 'kasir',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    phone: '0821-3329-8711'
  },
  {
    id: 'owner-01',
    name: 'Owner (Hendra Pratama)',
    code: 'OWNER-01',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '0811-7788-9900'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    cashierId: 'c-01',
    cashierName: 'Alya Putri',
    cashierCode: 'KSR-01',
    date: '20 Agustus 2026',
    clockInTime: '07:55',
    shiftType: 'Shift Pagi (08:00 - 16:00)',
    status: 'Aktif Bertugas',
    initialCashDrawer: 500000,
    timestampIn: Date.now() - 1000 * 60 * 60 * 6,
    notes: 'Kondisi mesin POS & printer thermal siap pakai.'
  },
  {
    id: 'att-2',
    cashierId: 'c-02',
    cashierName: 'Dimas Setiawan',
    cashierCode: 'KSR-02',
    date: '19 Agustus 2026',
    clockInTime: '14:50',
    clockOutTime: '23:05',
    shiftType: 'Shift Sore (15:00 - 23:00)',
    status: 'Selesai Shift',
    initialCashDrawer: 500000,
    timestampIn: Date.now() - 1000 * 60 * 60 * 28,
    timestampOut: Date.now() - 1000 * 60 * 60 * 20,
    notes: 'Closing kas harian sesuai laporan fisik cash drawer.'
  }
];

export const MATCHA_MENU: MenuItem[] = [
  // ==========================================
  // 1. MATCHA SIGNATURE (MS001 - MS014)
  // ==========================================
  {
    id: 'ms-001',
    code: 'MS001',
    name: 'Matcha Latte',
    category: 'matcha-signature',
    price: 18000,
    description: 'Matcha autentik Uji dengan susu creamy segar yang lembut dan rasa umami khas yang menenangkan.',
    badge: 'Signature',
    temperature: 'Both',
    calories: '160 kkal'
  },
  {
    id: 'ms-002',
    code: 'MS002',
    name: 'Strawberry Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Puree strawberry segar buatan rumah berlapis susu segar dan matcha pekat premium.',
    badge: 'Best Seller',
    temperature: 'Iced',
    calories: '210 kkal'
  },
  {
    id: 'ms-003',
    code: 'MS003',
    name: 'Chocolate Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Kombinasi kaya cokelat hitam belgia dengan sentuhan matcha pekat yang seimbang.',
    badge: 'Favorit',
    temperature: 'Both',
    calories: '230 kkal'
  },
  {
    id: 'ms-004',
    code: 'MS004',
    name: 'Mango Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Lapisan mangga tropis harum dengan susu lembut dan foam matcha segar.',
    temperature: 'Iced',
    calories: '200 kkal'
  },
  {
    id: 'ms-005',
    code: 'MS005',
    name: 'Vanilla Matcha',
    category: 'matcha-signature',
    price: 20000,
    description: 'Matcha latte beraroma vanilla madagaskar lembut dan rasa manis elegan.',
    temperature: 'Both',
    calories: '180 kkal'
  },
  {
    id: 'ms-006',
    code: 'MS006',
    name: 'Matcha Caramel',
    category: 'matcha-signature',
    price: 21000,
    description: 'Drizzle saus karamel panggang gurih manis berpadu seduhan matcha pilihan.',
    badge: 'Favorit',
    temperature: 'Both',
    calories: '220 kkal'
  },
  {
    id: 'ms-007',
    code: 'MS007',
    name: 'Matcha Brown Sugar',
    category: 'matcha-signature',
    price: 21000,
    description: 'Karamelisasi brown sugar aren nusantara dengan matcha creamy autentik.',
    temperature: 'Both',
    calories: '215 kkal'
  },
  {
    id: 'ms-008',
    code: 'MS008',
    name: 'Coconut Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Air kelapa murni segar dipadukan float matcha, manis alami dan sangat menyegarkan.',
    badge: 'Best Seller',
    temperature: 'Iced',
    calories: '140 kkal'
  },
  {
    id: 'ms-009',
    code: 'MS009',
    name: 'Blueberry Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Selai blueberry liar asam manis menyatu indah dengan lapisan matcha pekat.',
    temperature: 'Iced',
    calories: '195 kkal'
  },
  {
    id: 'ms-010',
    code: 'MS010',
    name: 'Lychee Matcha',
    category: 'matcha-signature',
    price: 22000,
    description: 'Ekstrak buah leci wangi manis dipadukan seduhan matcha dingin menyegarkan.',
    temperature: 'Iced',
    calories: '170 kkal'
  },
  {
    id: 'ms-011',
    code: 'MS011',
    name: 'Passion Fruit Matcha',
    category: 'matcha-signature',
    price: 23000,
    description: 'Sensasi markisa segar eksotis dengan aftertaste matcha yang pekat dan berkarakter.',
    badge: 'Baru',
    temperature: 'Iced',
    calories: '165 kkal'
  },
  {
    id: 'ms-012',
    code: 'MS012',
    name: 'Dirty Matcha',
    category: 'matcha-signature',
    price: 24000,
    description: 'Shot espresso specialty yang dituangkan perlahan di atas matcha latte dingin.',
    badge: 'Signature',
    temperature: 'Both',
    calories: '175 kkal'
  },
  {
    id: 'ms-013',
    code: 'MS013',
    name: 'Matcha Coffee',
    category: 'matcha-signature',
    price: 24000,
    description: 'Harmoni sempurna blend kopi Arabica house-blend dengan double shot matcha Uji.',
    temperature: 'Both',
    calories: '170 kkal'
  },
  {
    id: 'ms-014',
    code: 'MS014',
    name: 'Heaven Matcha',
    category: 'matcha-signature',
    price: 28000,
    description: 'Kreasi mahakarya Matcha Heaven: Ceremonial Grade Matcha dengan foam velvety rahasia.',
    badge: 'Heaven Special',
    temperature: 'Both',
    calories: '240 kkal'
  },

  // ==========================================
  // 2. MATCHA FRUIT SERIES (FM001 - FM006)
  // ==========================================
  {
    id: 'fm-001',
    code: 'FM001',
    name: 'Strawberry Matcha',
    category: 'matcha-series',
    price: 22000,
    description: 'Potongan dan sari buah strawberry asli dengan susu segar dan matcha dingin.',
    badge: 'Best Seller',
    temperature: 'Iced',
    calories: '205 kkal'
  },
  {
    id: 'fm-002',
    code: 'FM002',
    name: 'Mango Matcha',
    category: 'matcha-series',
    price: 22000,
    description: 'Sari mangga matang manis segar yang menyatu dengan lapisan matcha hijau.',
    temperature: 'Iced',
    calories: '190 kkal'
  },
  {
    id: 'fm-003',
    code: 'FM003',
    name: 'Blueberry Matcha',
    category: 'matcha-series',
    price: 22000,
    description: 'Infusi buah blueberry segar kaya antioksidan berpadu teh matcha premium.',
    temperature: 'Iced',
    calories: '195 kkal'
  },
  {
    id: 'fm-004',
    code: 'FM004',
    name: 'Peach Matcha',
    category: 'matcha-series',
    price: 23000,
    description: 'Aroma peach jepang yang semerbak manis dipadukan matcha sejuk menyegarkan.',
    badge: 'Favorit',
    temperature: 'Iced',
    calories: '180 kkal'
  },
  {
    id: 'fm-005',
    code: 'FM005',
    name: 'Lychee Matcha',
    category: 'matcha-series',
    price: 22000,
    description: 'Sensasi rasa buah leci tropis menyegarkan berpadu kelembutan matcha.',
    temperature: 'Iced',
    calories: '175 kkal'
  },
  {
    id: 'fm-006',
    code: 'FM006',
    name: 'Passion Fruit Matcha',
    category: 'matcha-series',
    price: 23000,
    description: 'Kombinasi asam manis markisa asli dengan ketenangan matcha autentik.',
    badge: 'Baru',
    temperature: 'Iced',
    calories: '165 kkal'
  },

  // ==========================================
  // 3. NON-MATCHA SERIES (NM001 - NM006)
  // ==========================================
  {
    id: 'nm-001',
    code: 'NM001',
    name: 'Chocolate Latte',
    category: 'non-matcha',
    price: 18000,
    description: 'Cokelat kental lezat berpadu susu murni hangat atau dingin yang memanjakan lidah.',
    badge: 'Favorit',
    temperature: 'Both',
    calories: '220 kkal'
  },
  {
    id: 'nm-002',
    code: 'NM002',
    name: 'Strawberry Milk',
    category: 'non-matcha',
    price: 18000,
    description: 'Susu segar manis berpadu selai strawberry asli ala café Korea.',
    temperature: 'Iced',
    calories: '190 kkal'
  },
  {
    id: 'nm-003',
    code: 'NM003',
    name: 'Taro Milk',
    category: 'non-matcha',
    price: 18000,
    description: 'Rasa talas ungu manis gurih lembut dengan warna pastel yang cantik.',
    temperature: 'Both',
    calories: '200 kkal'
  },
  {
    id: 'nm-004',
    code: 'NM004',
    name: 'Red Velvet Latte',
    category: 'non-matcha',
    price: 19000,
    description: 'Kue red velvet dalam cangkir dengan aroma cokelat vanila dan hint cream cheese.',
    badge: 'Best Seller',
    temperature: 'Both',
    calories: '210 kkal'
  },
  {
    id: 'nm-005',
    code: 'NM005',
    name: 'Vanilla Milk',
    category: 'non-matcha',
    price: 17000,
    description: 'Susu murni gurih beraroma vanila manis klasik yang ramah di segala suasana.',
    temperature: 'Both',
    calories: '160 kkal'
  },
  {
    id: 'nm-006',
    code: 'NM006',
    name: 'Brown Sugar Milk',
    category: 'non-matcha',
    price: 19000,
    description: 'Susu segar berpadu lelehan sirup gula aren legit wangi alami.',
    badge: 'Favorit',
    temperature: 'Both',
    calories: '205 kkal'
  },

  // ==========================================
  // 4. COFFEE SERIES (CF001 - CF005)
  // ==========================================
  {
    id: 'cf-001',
    code: 'CF001',
    name: 'Coffee Latte',
    category: 'coffee',
    price: 18000,
    description: 'Espresso specialty Arabica dengan microfoam susu lembut yang seimbang.',
    badge: 'Best Seller',
    temperature: 'Both',
    calories: '130 kkal'
  },
  {
    id: 'cf-002',
    code: 'CF002',
    name: 'Caramel Macchiato',
    category: 'coffee',
    price: 22000,
    description: 'Susu vanilla dengan lapisan espresso tebal dan siraman karamel manis.',
    badge: 'Favorit',
    temperature: 'Both',
    calories: '210 kkal'
  },
  {
    id: 'cf-003',
    code: 'CF003',
    name: 'Brown Sugar Coffee',
    category: 'coffee',
    price: 20000,
    description: 'Kopi susu gula aren kekinian dengan cita rasa manis gurih khas nusantara.',
    temperature: 'Both',
    calories: '190 kkal'
  },
  {
    id: 'cf-004',
    code: 'CF004',
    name: 'Matcha Coffee',
    category: 'coffee',
    price: 24000,
    description: 'Perpaduan seimbang antara kopi espresso harum dan matcha pekat berkualitas.',
    badge: 'Signature',
    temperature: 'Both',
    calories: '170 kkal'
  },
  {
    id: 'cf-005',
    code: 'CF005',
    name: 'Dirty Matcha',
    category: 'coffee',
    price: 24000,
    description: 'Double shot espresso dituang di atas matcha kental dingin berlapis.',
    badge: 'Signature',
    temperature: 'Iced',
    calories: '175 kkal'
  },

  // ==========================================
  // 5. MAIN COURSE (MC001 - MC016)
  // ==========================================
  {
    id: 'mc-001',
    code: 'MC001',
    name: 'Chicken Katsu Rice Bowl',
    category: 'main-course',
    price: 28000,
    description: 'Fillet ayam katsu krispi emas disajikan bersama nasi pulen hangat dan saus spesial.',
    badge: 'Best Seller',
    calories: '520 kkal'
  },
  {
    id: 'mc-002',
    code: 'MC002',
    name: 'Chicken Teriyaki Rice Bowl',
    category: 'main-course',
    price: 27000,
    description: 'Potongan ayam panggang saus teriyaki manis gurih dengan taburan wijen harum.',
    calories: '490 kkal'
  },
  {
    id: 'mc-003',
    code: 'MC003',
    name: 'Beef Teriyaki Rice Bowl',
    category: 'main-course',
    price: 32000,
    description: 'Irisan daging sapi empuk dimasak saus teriyaki gurih disajikan di atas nasi hangat.',
    badge: 'Signature',
    calories: '560 kkal'
  },
  {
    id: 'mc-004',
    code: 'MC004',
    name: 'Chicken Blackpepper Rice Bowl',
    category: 'main-course',
    price: 28000,
    description: 'Ayam tumis lada hitam pedas gurih mantap berpadu paprika renyah segar.',
    calories: '500 kkal'
  },
  {
    id: 'mc-005',
    code: 'MC005',
    name: 'Katsu Curry Rice',
    category: 'main-course',
    price: 30000,
    description: 'Katsu renyah dengan siraman kuah kari Jepang kental harum wortel dan kentang.',
    badge: 'Favorit',
    calories: '580 kkal'
  },
  {
    id: 'mc-006',
    code: 'MC006',
    name: 'Chicken Mentai Rice',
    category: 'main-course',
    price: 30000,
    description: 'Nasi hangat dengan topping ayam panggang juicy dan saus mentai bakar tobiko creamy.',
    badge: 'Best Seller',
    calories: '540 kkal'
  },
  {
    id: 'mc-007',
    code: 'MC007',
    name: 'Beef Yakiniku Rice Bowl',
    category: 'main-course',
    price: 33000,
    description: 'Daging sapi tumis bumbu yakiniku gurih manis dengan aroma bawang bombay lezat.',
    calories: '570 kkal'
  },
  {
    id: 'mc-008',
    code: 'MC008',
    name: 'Chicken Salted Egg Rice Bowl',
    category: 'main-course',
    price: 30000,
    description: 'Ayam krispi berbalut saus telur asin gurih creamy beraroma daun kari harum.',
    badge: 'Favorit',
    calories: '550 kkal'
  },
  {
    id: 'mc-009',
    code: 'MC009',
    name: 'Spicy Chicken Rice Bowl',
    category: 'main-course',
    price: 27000,
    description: 'Ayam bumbu pedas khas cabai rawit segar yang menggugah selera makan.',
    calories: '480 kkal'
  },
  {
    id: 'mc-010',
    code: 'MC010',
    name: 'Chicken Sambal Matah Rice Bowl',
    category: 'main-course',
    price: 28000,
    description: 'Ayam suwir renyah dengan siraman sambal matah Bali segar perasan jeruk limau.',
    badge: 'Favorit',
    calories: '495 kkal'
  },
  {
    id: 'mc-011',
    code: 'MC011',
    name: 'Chicken Steak',
    category: 'main-course',
    price: 32000,
    description: 'Steak paha ayam panggang juicy disajikan dengan kentang goreng & saus mushroom/bbq.',
    badge: 'Signature',
    calories: '530 kkal'
  },
  {
    id: 'mc-012',
    code: 'MC012',
    name: 'Beef Steak',
    category: 'main-course',
    price: 38000,
    description: 'Steak daging sapi empuk dipanggang sempurna dengan saus lada hitam & sayuran segar.',
    badge: 'Signature',
    calories: '610 kkal'
  },
  {
    id: 'mc-013',
    code: 'MC013',
    name: 'Creamy Chicken Pasta',
    category: 'main-course',
    price: 30000,
    description: 'Pasta al dente dalam balutan saus krim keju parmesan gurih dengan potongan ayam juicy.',
    calories: '510 kkal'
  },
  {
    id: 'mc-014',
    code: 'MC014',
    name: 'Aglio Olio Chicken',
    category: 'main-course',
    price: 28000,
    description: 'Spaghetti tumis minyak zaitun, bawang putih harum, cabai kering, dan ayam.',
    badge: 'Favorit',
    calories: '460 kkal'
  },
  {
    id: 'mc-015',
    code: 'MC015',
    name: 'Spicy Chicken Pasta',
    category: 'main-course',
    price: 29000,
    description: 'Pasta lezat dengan sentuhan saus tomat pedas berbumbu dan suwiran ayam gurih.',
    calories: '485 kkal'
  },
  {
    id: 'mc-016',
    code: 'MC016',
    name: 'Chicken Katsu Sandwich',
    category: 'main-course',
    price: 25000,
    description: 'Roti panggang lembut berisi katsu ayam tebal krispi, selada segar, dan saus tartar.',
    badge: 'Baru',
    calories: '440 kkal'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-MH-20260820-0089',
    date: '20 Agustus 2026',
    time: '14:28:15',
    timestamp: Date.now() - 1000 * 60 * 12,
    cashierName: 'Alya (Kasir 01)',
    orderType: 'Dine In',
    tableNumber: 'Meja 04',
    items: [
      { name: '[MS001] Matcha Latte (Iced)', quantity: 2, price: 18000, optionsSummary: 'Less Sugar (70%), Normal Ice', total: 36000 },
      { name: '[MC006] Chicken Mentai Rice', quantity: 1, price: 30000, optionsSummary: 'Standard Serving', total: 30000 }
    ],
    subtotal: 66000,
    discount: 0,
    tax: 6600,
    grandTotal: 72600,
    paymentMethod: 'QRIS',
    paymentDetails: { referenceNumber: 'QRIS-MH-98214140' },
    status: 'LUNAS',
    customerName: 'Dina Ramadhani',
    customerPhone: '0812-3456-7890'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-MH-20260820-0088',
    date: '20 Agustus 2026',
    time: '14:15:02',
    timestamp: Date.now() - 1000 * 60 * 25,
    cashierName: 'Alya (Kasir 01)',
    orderType: 'Take Away',
    items: [
      { name: '[MS002] Strawberry Matcha (Iced)', quantity: 1, price: 22000, optionsSummary: 'Oat Milk (+Rp 6.000)', total: 28000 },
      { name: '[MC001] Chicken Katsu Rice Bowl', quantity: 2, price: 28000, optionsSummary: 'Extra Sambal', total: 56000 }
    ],
    subtotal: 84000,
    discount: 5000,
    tax: 7900,
    grandTotal: 86900,
    paymentMethod: 'Tunai',
    paymentDetails: { cashReceived: 100000, changeAmount: 13100 },
    status: 'LUNAS',
    customerName: 'Bima Satria'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-MH-20260820-0087',
    date: '20 Agustus 2026',
    time: '13:58:40',
    timestamp: Date.now() - 1000 * 60 * 42,
    cashierName: 'Alya (Kasir 01)',
    orderType: 'Dine In',
    tableNumber: 'Meja 09',
    items: [
      { name: '[MS012] Dirty Matcha (Iced)', quantity: 1, price: 24000, optionsSummary: 'No Sugar', total: 24000 },
      { name: '[MC003] Beef Teriyaki Rice Bowl', quantity: 1, price: 32000, optionsSummary: 'Standard Serving', total: 32000 },
      { name: '[MS014] Heaven Matcha (Iced)', quantity: 1, price: 28000, optionsSummary: 'Signature Foam', total: 28000 }
    ],
    subtotal: 84000,
    discount: 0,
    tax: 8400,
    grandTotal: 92400,
    paymentMethod: 'Kartu Debit/Kredit',
    paymentDetails: { referenceNumber: 'EDC-MH-489100' },
    status: 'LUNAS',
    customerName: 'Clarissa Valerie'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-MH-20260820-0086',
    date: '20 Agustus 2026',
    time: '13:42:19',
    timestamp: Date.now() - 1000 * 60 * 58,
    cashierName: 'Alya (Kasir 01)',
    orderType: 'Take Away',
    items: [
      { name: '[FM004] Peach Matcha (Iced)', quantity: 2, price: 23000, optionsSummary: 'Less Ice', total: 46000 },
      { name: '[NM001] Chocolate Latte', quantity: 1, price: 18000, optionsSummary: 'Hot', total: 18000 }
    ],
    subtotal: 64000,
    discount: 0,
    tax: 6400,
    grandTotal: 70400,
    paymentMethod: 'QRIS',
    paymentDetails: { referenceNumber: 'QRIS-MH-98214092' },
    status: 'LUNAS',
    customerName: 'Fajar Nugraha'
  },
  {
    id: 'inv-105',
    invoiceNumber: 'INV-MH-20260819-0074',
    date: '19 Agustus 2026',
    time: '19:10:45',
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    cashierName: 'Dimas Setiawan (Kasir 02)',
    orderType: 'Dine In',
    tableNumber: 'Meja 02',
    items: [
      { name: '[MS001] Matcha Latte (Hot)', quantity: 2, price: 18000, optionsSummary: 'Oat Milk (+Rp 6.000)', total: 48000 },
      { name: '[FM008] Coconut Matcha (Iced)', quantity: 1, price: 23000, optionsSummary: 'Regular Ice', total: 23000 }
    ],
    subtotal: 71000,
    discount: 0,
    tax: 7100,
    grandTotal: 78100,
    paymentMethod: 'QRIS',
    paymentDetails: { referenceNumber: 'QRIS-MH-87192801' },
    status: 'LUNAS',
    customerName: 'Nadira Safira'
  },
  {
    id: 'inv-106',
    invoiceNumber: 'INV-MH-20260818-0062',
    date: '18 Agustus 2026',
    time: '16:45:10',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    cashierName: 'Maya Anggraini (Kasir 03)',
    orderType: 'Take Away',
    items: [
      { name: '[FM001] Strawberry Matcha Puree', quantity: 3, price: 22000, optionsSummary: 'Jelly Topping', total: 75000 },
      { name: '[MC010] Tori Karaage Rice Bowl', quantity: 2, price: 28000, optionsSummary: 'Sambal Matah', total: 56000 }
    ],
    subtotal: 131000,
    discount: 10000,
    tax: 12100,
    grandTotal: 133100,
    paymentMethod: 'Tunai',
    paymentDetails: { cashReceived: 150000, changeAmount: 16900 },
    status: 'LUNAS',
    customerName: 'Reza Pratama'
  },
  {
    id: 'inv-107',
    invoiceNumber: 'INV-MH-20260816-0045',
    date: '16 Agustus 2026',
    time: '15:20:00',
    timestamp: Date.now() - 1000 * 60 * 60 * 96,
    cashierName: 'Rian Hidayat (Kasir 04)',
    orderType: 'Dine In',
    tableNumber: 'Meja 11',
    items: [
      { name: '[MS014] Heaven Matcha (Iced)', quantity: 2, price: 28000, optionsSummary: 'Signature Foam', total: 56000 },
      { name: '[MC014] Japanese Curry Katsu Rice', quantity: 2, price: 32000, optionsSummary: 'Spicy Level 2', total: 64000 }
    ],
    subtotal: 120000,
    discount: 0,
    tax: 12000,
    grandTotal: 132000,
    paymentMethod: 'Kartu Debit/Kredit',
    paymentDetails: { referenceNumber: 'EDC-MH-391802' },
    status: 'LUNAS',
    customerName: 'Amalia Rizky'
  },
  {
    id: 'inv-108',
    invoiceNumber: 'INV-MH-20260812-0031',
    date: '12 Agustus 2026',
    time: '12:05:30',
    timestamp: Date.now() - 1000 * 60 * 60 * 192,
    cashierName: 'Alya Putri (Kasir 01)',
    orderType: 'Take Away',
    items: [
      { name: '[MS006] Matcha Caramel (Iced)', quantity: 1, price: 21000, optionsSummary: 'Less Sugar', total: 21000 },
      { name: '[NM005] Hojicha Latte', quantity: 1, price: 20000, optionsSummary: 'Hot', total: 20000 }
    ],
    subtotal: 41000,
    discount: 0,
    tax: 4100,
    grandTotal: 45100,
    paymentMethod: 'QRIS',
    paymentDetails: { referenceNumber: 'QRIS-MH-74620188' },
    status: 'LUNAS',
    customerName: 'Galih Chandra'
  },
  {
    id: 'inv-109',
    invoiceNumber: 'INV-MH-20260805-0012',
    date: '05 Agustus 2026',
    time: '11:15:22',
    timestamp: Date.now() - 1000 * 60 * 60 * 360,
    cashierName: 'Dimas Setiawan (Kasir 02)',
    orderType: 'Dine In',
    tableNumber: 'Meja 07',
    items: [
      { name: '[MS001] Matcha Latte (Iced)', quantity: 4, price: 18000, optionsSummary: 'Standard', total: 72000 },
      { name: '[MC001] Chicken Katsu Rice Bowl', quantity: 4, price: 28000, optionsSummary: 'Standard', total: 112000 }
    ],
    subtotal: 184000,
    discount: 15000,
    tax: 16900,
    grandTotal: 185900,
    paymentMethod: 'Kartu Debit/Kredit',
    paymentDetails: { referenceNumber: 'EDC-MH-209481' },
    status: 'LUNAS',
    customerName: 'PT Gemilang Kreasi (Acara Tim)'
  }
];

export const INITIAL_SALES_ANALYTICS: SalesAnalytics = {
  totalRevenue: 3480000,
  totalTransactions: 89,
  averageOrderValue: 39100,
  totalCupsSold: 154,
  totalDessertSold: 62,
  cashRevenue: 1040000,
  qrisRevenue: 1980000,
  cardRevenue: 460000
};

export const DEFAULT_PRINTER_SETTINGS: PrinterSettings = {
  paperWidth: '58mm',
  autoPrintOnSuccess: true,
  showLogo: true,
  showTagline: true,
  showWifiPass: true,
  showSocialMedia: true,
  showBarcode: true,
  footerMessage: 'Terima kasih atas kunjungan Anda!\nSemoga hari Anda setenang seduhan matcha kami.',
  wifiSsid: 'MatchaHeaven_Guest',
  wifiPass: 'TasteTheCalm2026',
  instagramHandle: '@matchaheaven.cafe'
};

export const BRAND_PHILOSOPHY = [
  {
    title: 'Daun Teh (Tea Leaf)',
    desc: 'Melambangkan kualitas bahan alami terbaik, kesegaran daun teh murni dari perkebunan organik, dan manfaat kesehatan antioksidan yang kaya.',
    icon: 'Leaf'
  },
  {
    title: 'Mangkuk Matcha (Matcha Bowl)',
    desc: 'Mewakili pengalaman menikmati matcha premium secara tradisional & tenang, dibuat dengan ketelitian dan kehangatan hati barista kami.',
    icon: 'Coffee'
  },
  {
    title: 'Keselarasan (Harmony & Calm)',
    desc: 'Perpaduan daun dan mangkuk menciptakan harmoni antara alam, kualitas premium, dan kenyamanan kafe sebagai tempat bekerja, belajar, dan bersantai.',
    icon: 'Sparkles'
  }
];

export const HOURLY_SALES_DATA = [
  { hour: '09:00', sales: 240000, orders: 8 },
  { hour: '10:00', sales: 380000, orders: 12 },
  { hour: '11:00', sales: 490000, orders: 14 },
  { hour: '12:00', sales: 820000, orders: 22 },
  { hour: '13:00', sales: 680000, orders: 17 },
  { hour: '14:00', sales: 550000, orders: 13 },
  { hour: '15:00', sales: 320000, orders: 8 }
];
