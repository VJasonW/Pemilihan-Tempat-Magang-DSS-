import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid, FiBriefcase, FiPlusCircle, FiUsers, FiBarChart2, FiLogOut,
  FiSliders, FiClipboard, FiClock, FiX, FiCompass,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const adminMenu = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/admin/perusahaan', label: 'Data Perusahaan', icon: <FiBriefcase /> },
  { to: '/admin/perusahaan/tambah', label: 'Tambah Perusahaan', icon: <FiPlusCircle /> },
  { to: '/admin/mahasiswa', label: 'Data Mahasiswa', icon: <FiUsers /> },
  { to: '/admin/hasil', label: 'Hasil Perhitungan', icon: <FiBarChart2 /> },
];

const mahasiswaMenu = [
  { to: '/mahasiswa/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/mahasiswa/daftar-magang', label: 'Daftar Tempat Magang', icon: <FiCompass /> },
  { to: '/mahasiswa/preferensi', label: 'Isi Preferensi', icon: <FiSliders /> },
  { to: '/mahasiswa/hasil', label: 'Hasil Rekomendasi', icon: <FiClipboard /> },
  { to: '/mahasiswa/riwayat', label: 'Riwayat', icon: <FiClock /> },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const menu = user?.role === 'admin' ? adminMenu : mahasiswaMenu;

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 flex flex-col
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-100 dark:border-slate-800/60
        transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 h-[72px] border-b border-slate-150/40 dark:border-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold shadow-[0_4px_12px_rgba(37,99,237,0.25)] shrink-0">
              IM
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100 leading-none tracking-tight">InternMatch</p>
              <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-1">DSS AHP-TOPSIS</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-650 p-1.5 rounded-lg">
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 border border-slate-200/50 dark:border-slate-700/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-bold'
                    : 'text-slate-500 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850/50 border border-transparent'
                }`
              }
            >
              <span className="text-lg opacity-85">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-150/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-3 bg-white dark:bg-slate-800/45 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-sm border border-slate-200/40 dark:border-slate-700/40">
              {user?.nama?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-800 dark:text-primary-400 truncate leading-none mb-1">{user?.nama}</p>
              <p className="text-[10px] text-slate-400 capitalize tracking-wider font-semibold leading-none">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/15 border border-transparent hover:border-red-200/30 transition-all active:scale-[0.98]"
          >
            <FiLogOut className="opacity-80" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
