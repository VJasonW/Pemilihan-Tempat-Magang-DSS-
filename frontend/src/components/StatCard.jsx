import { motion } from 'framer-motion';

export default function StatCard({ icon, label, value, accent = 'primary' }) {
  const accents = {
    primary: 'from-blue-500 to-indigo-600 shadow-[0_4px_12px_rgba(59,130,246,0.25)]',
    green: 'from-emerald-500 to-teal-600 shadow-[0_4px_12px_rgba(16,185,129,0.25)]',
    orange: 'from-amber-500 to-orange-600 shadow-[0_4px_12px_rgba(245,158,11,0.25)]',
    pink: 'from-pink-500 to-rose-600 shadow-[0_4px_12px_rgba(244,63,94,0.25)]',
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="double-bezel"
    >
      <div className="double-bezel-inner flex items-center gap-6 p-5">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center text-white text-xl shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold truncate tracking-tight text-slate-800 dark:text-slate-100">{value}</p>
          <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase mt-0.5">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
