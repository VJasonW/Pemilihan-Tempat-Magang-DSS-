import { motion } from 'framer-motion';
import { FiMapPin, FiDollarSign, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export default function CompanyCard({ p }) {
  const colors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-650',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-purple-500 to-violet-600'
  ];
  const colorIndex = p.id % colors.length;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="double-bezel h-full flex flex-col group"
    >
      <div className="double-bezel-inner flex-1 flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-3.5 mb-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-md`}>
              {p.nama.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate text-base leading-snug">{p.nama}</h3>
              <p className="text-[10px] text-slate-400 font-semibold truncate uppercase tracking-widest mt-0.5">{p.bidang}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-sm text-slate-500 dark:text-slate-350 mb-6">
            <div className="flex items-center gap-2.5">
              <FiMapPin className="text-primary-500 shrink-0 text-base" />
              <span className="truncate font-medium">{p.lokasi} <span className="text-slate-200 dark:text-slate-800 mx-1">·</span> {p.jarak_km} km</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiDollarSign className="text-primary-500 shrink-0 text-base" />
              <span className="font-semibold text-slate-750 dark:text-slate-200">{formatRupiah(p.uang_saku)} <span className="text-xs text-slate-400 font-normal">/ bln</span></span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiBriefcase className="text-primary-500 shrink-0 text-base" />
              <span className="font-medium inline-flex items-center px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-150/40 dark:border-slate-700/30 text-xs font-bold">{p.tipe_kerja}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 mt-auto pt-4 border-t border-slate-100/50 dark:border-slate-800/40">
          <Link
            to={`/mahasiswa/perusahaan/${p.id}`}
            className="btn-primary w-full py-2.5 text-center text-xs font-bold"
          >
            Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
