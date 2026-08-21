import React, { useState, useEffect } from 'react';
import { MatchaLogo } from './MatchaLogo';
import { 
  Smartphone, 
  Receipt, 
  BarChart3, 
  Printer, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Download,
  Lock,
  UserCheck,
  User,
  Boxes
} from 'lucide-react';
import { UserRole, CashierProfile, AttendanceRecord } from '../types';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenDownload: () => void;
  currentRole: UserRole;
  currentCashier: CashierProfile;
  activeAttendance: AttendanceRecord | null;
  onOpenRoleModal: () => void;
  onOpenAttendanceModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDemo, 
  onOpenDownload,
  currentRole,
  currentCashier,
  activeAttendance,
  onOpenRoleModal,
  onOpenAttendanceModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fitur Kasir', href: '#features', icon: Smartphone },
    { name: 'Demo POS Interaktif', href: '#simulator', icon: Receipt, badge: 'Live POS' },
    { name: 'Stok & Inventaris', href: '#inventory', icon: Boxes, badge: '48 SKU' },
    { name: 'Laporan & Audit', href: '#analytics', icon: BarChart3, badge: currentRole === 'owner' ? 'Owner' : 'Terkunci' },
    { name: 'Cetak Struk', href: '#printer', icon: Printer },
    { name: 'Brand & Filosofi', href: '#brand', icon: Sparkles },
    { name: 'Perangkat', href: '#hardware', icon: ShieldCheck },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F2]/95 backdrop-blur-md shadow-sm border-b border-[#47623A]/10 py-3'
          : 'bg-[#FAF8F2]/80 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="focus:outline-none shrink-0" aria-label="Matcha Heaven Homepage">
          <MatchaLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-2 text-xs font-semibold text-[#3D4C33] hover:text-[#47623A] hover:bg-[#47623A]/8 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <link.icon className="w-3.5 h-3.5 opacity-70 text-[#47623A]" />
              <span>{link.name}</span>
              {link.badge && (
                <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                  link.badge === 'Owner' 
                    ? 'bg-amber-400 text-stone-900' 
                    : link.badge === 'Terkunci'
                    ? 'bg-stone-200 text-stone-600'
                    : 'bg-[#47623A] text-[#FAF8F2]'
                }`}>
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* User Role & Cashier Status Badges (Desktop) */}
        <div className="hidden md:flex items-center space-x-2.5">
          
          {/* Absensi Quick Trigger */}
          <button
            onClick={onOpenAttendanceModal}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 ${
              activeAttendance
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{activeAttendance ? `Shift: ${activeAttendance.shiftType.split(' ')[0]}` : 'Absen Shift'}</span>
          </button>

          {/* User Account / Role Trigger */}
          <button
            onClick={onOpenRoleModal}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
              currentRole === 'owner'
                ? 'bg-[#1E2B18] text-white border-[#1E2B18]'
                : 'bg-white text-stone-800 border-[#47623A]/20 hover:bg-[#FAF9F5]'
            }`}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden bg-[#47623A] text-white flex items-center justify-center text-[10px] font-bold">
              {currentCashier.avatar ? (
                <img src={currentCashier.avatar} alt={currentCashier.name} className="w-full h-full object-cover" />
              ) : (
                currentCashier.code.slice(0, 2)
              )}
            </div>
            <div className="text-left leading-tight">
              <span className="font-extrabold block text-[11px]">{currentCashier.name}</span>
              <span className="text-[9px] uppercase font-mono text-stone-400 block">
                {currentRole === 'owner' ? '👑 Owner' : '🧑‍🍳 Kasir'}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#3D4C33] hover:bg-[#47623A]/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F2] border-b border-[#47623A]/15 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          
          {/* User Account Bar in Mobile Drawer */}
          <div className="p-3 bg-white rounded-2xl border border-[#47623A]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#47623A] text-white flex items-center justify-center text-xs font-bold">
                {currentCashier.avatar ? (
                  <img src={currentCashier.avatar} alt={currentCashier.name} className="w-full h-full object-cover" />
                ) : (
                  currentCashier.code
                )}
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#1E2B18]">{currentCashier.name}</div>
                <div className="text-[10px] text-stone-500 font-mono">
                  Role: <strong className="uppercase text-[#47623A]">{currentRole}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoleModal();
              }}
              className="px-2.5 py-1 bg-[#47623A] text-white text-[11px] font-bold rounded-lg"
            >
              Ganti Akun
            </button>
          </div>

          {/* Absensi Shift Quick Button in Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAttendanceModal();
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
              activeAttendance
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{activeAttendance ? `Status Absensi (Masuk: ${activeAttendance.clockInTime})` : 'Lakukan Absensi Shift Masuk'}</span>
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#2A3B22] hover:bg-[#47623A]/10 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <link.icon className="w-4 h-4 text-[#47623A]" />
                <span>{link.name}</span>
              </div>
              {link.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#47623A] text-white rounded-full">
                  {link.badge}
                </span>
              )}
            </a>
          ))}

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 text-xs font-bold text-[#47623A] bg-[#47623A]/10 border border-[#47623A]/20 rounded-xl text-center"
            >
              Coba Simulator
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#47623A] rounded-xl text-center flex items-center justify-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
