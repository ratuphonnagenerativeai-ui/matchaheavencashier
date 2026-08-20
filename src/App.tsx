import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { InteractivePOSSimulator } from './components/InteractivePOSSimulator';
import { RealTimeAnalyticsSection } from './components/RealTimeAnalyticsSection';
import { ReceiptPrinterIntegrationSection } from './components/ReceiptPrinterIntegrationSection';
import { BrandAestheticShowcase } from './components/BrandAestheticShowcase';
import { HardwareSpecsSection } from './components/HardwareSpecsSection';
import { FAQSection } from './components/FAQSection';
import { DownloadAppModal } from './components/DownloadAppModal';
import { RoleAuthModal } from './components/RoleAuthModal';
import { CashierAttendanceModal } from './components/CashierAttendanceModal';
import { Footer } from './components/Footer';
import { INITIAL_INVOICES, INITIAL_SALES_ANALYTICS, CASHIERS_LIST, INITIAL_ATTENDANCE } from './data/mockData';
import { Invoice, SalesAnalytics, UserRole, CashierProfile, AttendanceRecord } from './types';
import { CheckCircle2, Sparkles, X, ShieldAlert, UserCheck } from 'lucide-react';

export default function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [analytics, setAnalytics] = useState<SalesAnalytics>(INITIAL_SALES_ANALYTICS);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  // Role & Attendance State
  const [currentRole, setCurrentRole] = useState<UserRole>('kasir');
  const [currentUser, setCurrentUser] = useState<CashierProfile>(CASHIERS_LIST[1]); // Default to Kasir Alya
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState<boolean>(false);

  // Get active attendance for current cashier
  const activeAttendance = attendanceList.find(
    att => att.cashierId === currentUser.id && att.status === 'Aktif Bertugas'
  ) || null;

  const handleNewTransaction = (newInvoice: Invoice) => {
    // Prepend new invoice
    setInvoices(prev => [newInvoice, ...prev]);

    // Recalculate sales analytics
    setAnalytics(prev => {
      const newTotalRevenue = prev.totalRevenue + newInvoice.grandTotal;
      const newTotalTransactions = prev.totalTransactions + 1;
      const newAov = Math.round(newTotalRevenue / newTotalTransactions);
      
      const drinkCount = newInvoice.items.reduce((acc, it) => {
        return acc + (it.name.toLowerCase().includes('latte') || it.name.toLowerCase().includes('matcha') || it.name.toLowerCase().includes('cloud') || it.name.toLowerCase().includes('fusion') || it.name.toLowerCase().includes('lemon') ? it.quantity : 0);
      }, 0);

      const dessertCount = newInvoice.items.reduce((acc, it) => {
        return acc + (it.name.toLowerCase().includes('cake') || it.name.toLowerCase().includes('tiramisu') || it.name.toLowerCase().includes('croffle') || it.name.toLowerCase().includes('cookie') || it.name.toLowerCase().includes('ice cream') ? it.quantity : 0);
      }, 0);

      let newCash = prev.cashRevenue;
      let newQris = prev.qrisRevenue;
      let newCard = prev.cardRevenue;

      if (newInvoice.paymentMethod === 'Tunai') newCash += newInvoice.grandTotal;
      else if (newInvoice.paymentMethod === 'QRIS') newQris += newInvoice.grandTotal;
      else newCard += newInvoice.grandTotal;

      return {
        totalRevenue: newTotalRevenue,
        totalTransactions: newTotalTransactions,
        averageOrderValue: newAov,
        totalCupsSold: prev.totalCupsSold + drinkCount,
        totalDessertSold: prev.totalDessertSold + dessertCount,
        cashRevenue: newCash,
        qrisRevenue: newQris,
        cardRevenue: newCard
      };
    });

    setRecentNotification(`Transaksi ${newInvoice.invoiceNumber} berhasil dicatat & struk thermal diproses!`);
    setTimeout(() => {
      setRecentNotification(null);
    }, 4500);
  };

  const handleSelectRole = (role: UserRole, cashier: CashierProfile) => {
    setCurrentRole(role);
    setCurrentUser(cashier);
    if (role === 'owner') {
      setRecentNotification('👑 Mode Owner Aktif: Akses penuh dibuka untuk seluruh pembukuan, laporan omzet & rekap.');
    } else {
      setRecentNotification(`🧑‍🍳 Masuk sebagai Kasir: ${cashier.name} (${cashier.code}). Siap melayani pesanan.`);
    }
    setTimeout(() => {
      setRecentNotification(null);
    }, 4500);
  };

  const handleSaveAttendance = (record: AttendanceRecord) => {
    setAttendanceList(prev => {
      const existsIndex = prev.findIndex(r => r.id === record.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = record;
        return updated;
      }
      return [record, ...prev];
    });

    if (record.status === 'Aktif Bertugas') {
      setRecentNotification(`✅ Clock-In Berhasil: ${record.cashierName} aktif bertugas di ${record.shiftType}.`);
    } else {
      setRecentNotification(`👋 Clock-Out Selesai: ${record.cashierName} telah mengakhiri shift.`);
    }
    setTimeout(() => {
      setRecentNotification(null);
    }, 4500);
  };

  const handleVoidInvoice = (invoiceId: string, reason: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status: 'VOID' };
      }
      return inv;
    }));

    setRecentNotification(`⚠️ Invoice berhasil di-VOID oleh Owner. Alasan: ${reason}`);
    setTimeout(() => {
      setRecentNotification(null);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#1E2819] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {recentNotification && (
        <div className="fixed top-20 right-4 z-50 bg-[#1E2B18] text-[#FAF8F2] px-4 py-3 rounded-2xl shadow-xl border border-[#47623A] flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-md">
          <div className="p-1.5 rounded-xl bg-[#47623A] text-white shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold flex-1">
            {recentNotification}
          </div>
          <button
            onClick={() => setRecentNotification(null)}
            className="text-stone-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        onOpenDemo={() => scrollToSection('simulator')}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        currentRole={currentRole}
        currentCashier={currentUser}
        activeAttendance={activeAttendance}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onScrollToSimulator={() => scrollToSection('simulator')}
          onScrollToPrinter={() => scrollToSection('printer')}
          onOpenDownload={() => setIsDownloadModalOpen(true)}
          todayRevenue={analytics.totalRevenue}
          totalOrders={analytics.totalTransactions}
        />

        {/* 2. Core 4-Pillar Features */}
        <FeatureGrid />

        {/* 3. Interactive POS & Cashier Simulator */}
        <InteractivePOSSimulator 
          onNewTransaction={handleNewTransaction}
          currentRole={currentRole}
          currentCashier={currentUser}
          activeAttendance={activeAttendance}
          onOpenAttendance={() => setIsAttendanceModalOpen(true)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* 4. Real-time Sales Reporting & Invoice Ledger (Role Guarded) */}
        <RealTimeAnalyticsSection
          invoices={invoices}
          analytics={analytics}
          attendanceList={attendanceList}
          currentRole={currentRole}
          currentCashier={currentUser}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
          onVoidInvoice={handleVoidInvoice}
        />

        {/* 5. Automatic Receipt Printing Integration */}
        <ReceiptPrinterIntegrationSection />

        {/* 6. Brand Aesthetic & Mockup Story Showcase */}
        <BrandAestheticShowcase />

        {/* 7. Hardware & Device Compatibility */}
        <HardwareSpecsSection />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Download App & Hardware Modal */}
      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Role Switcher & Owner PIN Auth Modal */}
      <RoleAuthModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        currentCashier={currentUser}
        cashiersList={CASHIERS_LIST}
        onSelectRole={handleSelectRole}
      />

      {/* Cashier Attendance / Clock-In / Clock-Out Modal */}
      <CashierAttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        cashier={currentUser}
        attendanceList={attendanceList}
        onClockIn={handleSaveAttendance}
        onClockOut={(cashierId, notes) => {
          const now = new Date();
          const clockOutStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
          setAttendanceList(prev => prev.map(rec => {
            if (rec.cashierId === cashierId && !rec.clockOutTime) {
              return {
                ...rec,
                clockOutTime: clockOutStr,
                status: 'Selesai Shift',
                timestampOut: Date.now(),
                notes: notes ? `${rec.notes || ''} | Closing: ${notes}` : rec.notes
              };
            }
            return rec;
          }));
          setRecentNotification(`👋 Clock-Out Selesai: Shift kasir telah ditutup.`);
          setTimeout(() => {
            setRecentNotification(null);
          }, 4500);
        }}
      />
    </div>
  );
}
