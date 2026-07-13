import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ title, onMenuClick }) {
  const { dark, toggleDark } = useTheme();
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/30 px-6 py-4 flex items-center justify-between h-[72px] transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 p-2 -ml-2 rounded-xl transition-all"
        >
          <FiMenu size={22} />
        </button>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight leading-none">{title}</h1>
      </div>
      <button
        onClick={toggleDark}
        className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100/50 hover:bg-slate-200/50 dark:bg-slate-800/50 dark:hover:bg-slate-750/50 border border-slate-200/50 dark:border-slate-700/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 active:scale-95"
        title="Toggle dark mode"
      >
        {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-primary-600" />}
      </button>
    </header>
  );
}
