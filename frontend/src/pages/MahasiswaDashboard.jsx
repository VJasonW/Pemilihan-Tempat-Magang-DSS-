import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiArrowRight, FiPlayCircle, FiZap, FiClock } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function MahasiswaDashboard() {
  const { user } = useAuth();
  const [totalPerusahaan, setTotalPerusahaan] = useState(0);
  const [terakhir, setTerakhir] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/perusahaan'),
      api.get('/hasil/terakhir'),
    ]).then(([p, h]) => {
      setTotalPerusahaan(p.data.length);
      setTerakhir(h.data);
    }).catch((err) => {
      console.error(err);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout title="Dashboard"><Loading /></DashboardLayout>;

  const rekomendasiTerbaik = terakhir.find((h) => h.ranking === 1);

  return (
    <DashboardLayout title="Ringkasan Karir">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white p-8 md:p-10 mb-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] border border-primary-500/20"
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -right-4 bottom-0 w-36 h-36 rounded-full bg-white/5 blur-xl" />
        
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/90 mb-4 border border-white/10 backdrop-blur-sm">
            <FiZap /> Sistem Pendukung Keputusan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight leading-tight">
            Selamat Datang, {user?.nama}! 👋
          </h2>
          <p className="text-slate-100/80 text-sm md:text-base mb-6 leading-relaxed">
            Temukan tempat magang terbaik yang sesuai dengan kriteria dan prioritas Anda menggunakan kalkulasi AHP-TOPSIS secara presisi.
          </p>
          <Link to="/mahasiswa/preferensi" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3.5 rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-md">
            <FiPlayCircle className="text-lg" /> Mulai Penilaian
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatCard icon={<FiBriefcase />} label="Tempat Magang Tersedia" value={`${totalPerusahaan} Perusahaan`} accent="primary" />
        <StatCard icon={<FiAward />} label="Rekomendasi Terbaik Anda" value={rekomendasiTerbaik?.nama_perusahaan ?? 'Belum ada data'} accent="green" />
      </div>

      <div className="double-bezel">
        <div className="double-bezel-inner">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FiClock className="text-primary-600" /> Hasil Rekomendasi Terakhir
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">Hasil kalkulasi 3 alternatif peringkat teratas pada simulasi terakhir Anda.</p>
            </div>
            <Link to="/mahasiswa/riwayat" className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua Riwayat <FiArrowRight />
            </Link>
          </div>
          {terakhir.length === 0 ? (
            <p className="text-slate-400 text-sm py-12 text-center">Anda belum pernah melakukan perhitungan preferensi DSS.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {terakhir.slice(0, 3).map((h) => (
                <div key={h.id} className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-between group hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-3 ${
                      h.ranking === 1 ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                      h.ranking === 2 ? 'bg-slate-100 text-slate-650 dark:bg-slate-700/30 dark:text-slate-350' :
                      'bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400'
                    }`}>
                      Peringkat #{h.ranking}
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{h.nama_perusahaan}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">{h.bidang} · {h.lokasi}</p>
                  </div>
                  <p className="text-xs font-semibold mt-4 text-slate-450 uppercase tracking-wider">
                    Skor: <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{Number(h.nilai_preferensi).toFixed(4)}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
