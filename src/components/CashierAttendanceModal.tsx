import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  UserCheck, 
  Calendar, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight,
  ShieldCheck,
  Coffee,
  Sparkles,
  LogOut,
  MapPin,
  Banknote,
  FileText
} from 'lucide-react';
import { CashierProfile, AttendanceRecord } from '../types';

interface CashierAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashier: CashierProfile;
  attendanceList: AttendanceRecord[];
  onClockIn: (record: AttendanceRecord) => void;
  onClockOut: (cashierId: string, notes?: string) => void;
}

export const CashierAttendanceModal: React.FC<CashierAttendanceModalProps> = ({
  isOpen,
  onClose,
  cashier,
  attendanceList,
  onClockIn,
  onClockOut
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDateString, setCurrentDateString] = useState<string>('');
  const [selectedShift, setSelectedShift] = useState<'Shift Pagi (08:00 - 16:00)' | 'Shift Sore (15:00 - 23:00)' | 'Full Day'>('Shift Pagi (08:00 - 16:00)');
  const [cashDrawerStart, setCashDrawerStart] = useState<string>('200000');
  const [shiftNote, setShiftNote] = useState<string>('Mesin POS online, roll thermal printer siap, modal kembalian cukup.');
  const [closingNote, setClosingNote] = useState<string>('Kas laci fisik telah dihitung dan sesuai dengan total transaksi.');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Find if this cashier is currently clocked in without clock out
  const activeRecord = attendanceList.find(
    rec => rec.cashierId === cashier.id && !rec.clockOutTime
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
      const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      setCurrentTime(timeStr);
      setCurrentDateString(dateStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handlePerformClockIn = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const clockInStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      cashierId: cashier.id,
      cashierName: cashier.name,
      cashierCode: cashier.code,
      date: dateStr,
      clockInTime: clockInStr,
      shiftType: selectedShift,
      status: 'Aktif Bertugas',
      initialCashDrawer: Number(cashDrawerStart) || 200000,
      timestampIn: Date.now(),
      notes: `Modal kas laci: Rp ${Number(cashDrawerStart || 0).toLocaleString('id-ID')}. ${shiftNote}`
    };

    onClockIn(newRecord);
    setSuccessNotice(`Absen Masuk Berhasil! Selamat bertugas, ${cashier.name}.`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1800);
  };

  const handlePerformClockOut = () => {
    onClockOut(cashier.id, closingNote);
    setSuccessNotice(`Absen Pulang Berhasil! Shift kerja Anda telah ditutup.`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] rounded-3xl max-w-lg w-full border border-[#47623A]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#1E2B18] text-[#FAF8F2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#47623A] text-white">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight font-display text-white">
                  Absensi & Masuk Shift Kasir
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#8A9E66] text-white">
                  {cashier.code}
                </span>
              </div>
              <p className="text-[11px] text-[#A6C097]">
                Sistem Kehadiran & Validasi Operasional Terminal POS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {successNotice && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Live Digital Clock Card */}
          <div className="p-4 bg-white rounded-2xl border border-[#47623A]/15 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#47623A]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentDateString || 'Hari ini'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#1E2B18] tracking-tight">
                {currentTime || '00:00:00 WIB'}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Outlet Matcha Heaven Buka
              </span>
              <div className="text-[10px] text-stone-400 mt-1">Cabang Utama #01</div>
            </div>
          </div>

          {/* Cashier Info Pill */}
          <div className="p-3.5 bg-[#EAEFE4] rounded-2xl border border-[#47623A]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#47623A] flex items-center justify-center text-white font-bold">
                {cashier.avatar ? (
                  <img src={cashier.avatar} alt={cashier.name} className="w-full h-full object-cover" />
                ) : (
                  cashier.code
                )}
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#1E2B18]">{cashier.name}</div>
                <div className="text-[11px] text-[#47623A] font-medium">Staf Kasir & Barista</div>
                <div className="text-[10px] text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#47623A]" /> Terminal POS Kasir 01
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                activeRecord
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-200 text-stone-700'
              }`}>
                {activeRecord ? 'Sedang Bertugas' : 'Belum Clock-In'}
              </span>
            </div>
          </div>

          {/* If Already Clocked In: Show Active Shift Status & Clock-out option */}
          {activeRecord ? (
            <div className="space-y-4 p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Shift Aktif: {activeRecord.shiftType}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-stone-600">
                  Masuk: {activeRecord.clockInTime}
                </span>
              </div>

              <div className="text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800">Status Operasional POS:</div>
                <p className="text-[11px] text-stone-500">
                  Terminal kasir Anda aktif dan siap memproses transaksi pembayaran pelanggan. Semua pesanan akan otomatis tercatat dengan ID kasir <strong>{cashier.name} ({cashier.code})</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Catatan Penutupan Shift / Handover:
                </label>
                <input
                  type="text"
                  value={closingNote}
                  onChange={(e) => setClosingNote(e.target.value)}
                  placeholder="Catatan saldo kas akhir..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#47623A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePerformClockOut}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Clock-Out / Selesai Shift Kerja</span>
                </button>
              </div>
            </div>
          ) : (
            /* If Not Clocked In: Show Clock-in Form */
            <form onSubmit={handlePerformClockIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2B18] mb-1.5">
                  Pilih Jadwal Shift Hari Ini:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Shift Pagi (08:00 - 16:00)', label: 'Shift Pagi', time: '08:00 - 16:00' },
                    { id: 'Shift Sore (15:00 - 23:00)', label: 'Shift Sore', time: '15:00 - 23:00' },
                    { id: 'Full Day', label: 'Full Day', time: '08:00 - 23:00' }
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => setSelectedShift(sh.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedShift === sh.id
                          ? 'border-[#47623A] bg-[#47623A]/10 ring-1 ring-[#47623A]'
                          : 'border-stone-200 bg-white hover:border-[#47623A]/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#1E2B18]">{sh.label}</div>
                      <div className="text-[10px] text-stone-500">{sh.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Kas Awal */}
              <div>
                <label className="block text-xs font-bold text-[#1E2B18] mb-1">
                  Saldo Awal Uang Kembalian di Laci Kasir (Rp):
                </label>
                <div className="relative">
                  <Banknote className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={cashDrawerStart}
                    onChange={(e) => setCashDrawerStart(e.target.value)}
                    placeholder="200000"
                    className="w-full pl-10 pr-4 py-2 text-xs font-mono font-bold rounded-xl border border-stone-300 bg-white text-[#1E2B18] focus:outline-none focus:border-[#47623A]"
                  />
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  Uang tunai fisik untuk kembalian awal transaksi kasir.
                </p>
              </div>

              {/* Catatan Kesiapan */}
              <div>
                <label className="block text-xs font-bold text-[#1E2B18] mb-1">
                  Catatan Kesiapan POS:
                </label>
                <input
                  type="text"
                  value={shiftNote}
                  onChange={(e) => setShiftNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white text-stone-700 focus:outline-none focus:border-[#47623A]"
                />
              </div>

              {/* Attendance disclaimer */}
              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#47623A] shrink-0 mt-0.5" />
                <span>
                  Dengan menekan tombol di bawah, Anda mengonfirmasi kehadiran dan siap membuka sesi transaksi kasir POS Matcha Heaven.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#47623A] hover:bg-[#38502E] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <UserCheck className="w-4 h-4" />
                <span>Clock-In / Absen Masuk Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Today's Attendance Logs Summary */}
          <div className="pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#1E2B18] uppercase tracking-wider">
                Riwayat Absensi Terdaftar
              </span>
              <span className="text-[10px] text-stone-500">{attendanceList.length} Catatan</span>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {attendanceList.map((rec) => (
                <div
                  key={rec.id}
                  className="p-2 bg-white rounded-xl border border-stone-200 text-[10.5px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-bold text-[#1E2B18]">{rec.cashierName}</span>{' '}
                      <span className="text-stone-400">({rec.shiftType.split(' ')[0]} {rec.shiftType.split(' ')[1]})</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-stone-600">
                    <span>{rec.clockInTime}</span>
                    {rec.clockOutTime && <span className="text-stone-400"> → {rec.clockOutTime}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-stone-200 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
