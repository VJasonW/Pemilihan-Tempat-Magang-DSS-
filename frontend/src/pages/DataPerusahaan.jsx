import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export default function DataPerusahaan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const { showToast } = useToast();

  const fetchData = async (q = '') => {
    setLoading(true);
    try {
      const res = await api.get('/perusahaan', { params: { search: q } });
      setData(res.data);
    } catch {
      showToast('Gagal memuat data perusahaan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(search);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/perusahaan/${id}`);
      showToast('Perusahaan berhasil dihapus.', 'success');
      setData((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast('Gagal menghapus perusahaan.', 'error');
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <DashboardLayout title="Kelola Tempat Magang">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau bidang perusahaan..."
            className="input-field pl-11 bg-white dark:bg-slate-800"
          />
        </form>
        <Link to="/admin/perusahaan/tambah" className="btn-primary shrink-0">
          <FiPlus className="text-lg" /> Tambah Perusahaan
        </Link>
      </div>

      {loading ? <Loading /> : (
        <div className="double-bezel">
          <div className="double-bezel-inner !p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="dss-table min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="font-semibold px-6 py-4">Nama Perusahaan</th>
                    <th className="font-semibold px-6 py-4">Bidang</th>
                    <th className="font-semibold px-6 py-4">Lokasi</th>
                    <th className="font-semibold px-6 py-4">Uang Saku</th>
                    <th className="font-semibold px-6 py-4">Tipe Kerja</th>
                    <th className="font-semibold px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                  <AnimatePresence mode="popLayout">
                    {data.map((p, idx) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1], delay: idx * 0.03 }}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors"
                      >
                        <td className="font-bold text-slate-800 dark:text-slate-200 px-6 py-4.5">{p.nama}</td>
                        <td className="px-6 py-4.5 font-medium">{p.bidang}</td>
                        <td className="px-6 py-4.5 font-medium">{p.lokasi}</td>
                        <td className="px-6 py-4.5 font-semibold text-slate-700 dark:text-slate-300">{formatRupiah(p.uang_saku)}</td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            p.tipe_kerja === 'WFH' ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' :
                            p.tipe_kerja === 'Hybrid' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                            'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                          }`}>
                            {p.tipe_kerja}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center justify-center gap-2.5">
                            <Link to={`/admin/perusahaan/edit/${p.id}`} className="p-2 rounded-xl bg-slate-100 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-primary-950/20 text-slate-650 hover:text-primary-600 dark:text-slate-350 dark:hover:text-primary-450 border border-slate-200/40 dark:border-slate-750/30 transition-all">
                              <FiEdit2 size={14} />
                            </Link>
                            <button onClick={() => setConfirmId(p.id)} className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-950/20 text-slate-650 hover:text-red-550 dark:text-slate-350 dark:hover:text-red-400 border border-slate-200/40 dark:border-slate-750/30 transition-all">
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-slate-400">
                        <p className="text-base font-semibold">Tidak ada data perusahaan</p>
                        <p className="text-xs text-slate-450 mt-1">Coba kata kunci pencarian lain atau tambahkan data baru.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-650 dark:text-red-400 shrink-0">
                  <FiAlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight">Hapus Tempat Magang?</h3>
                  <p className="text-slate-400 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                    Data perusahaan ini beserta riwayat penilaiain mahasiswa terkait akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setConfirmId(null)} className="btn-secondary flex-1">
                  Batal
                </button>
                <button onClick={() => handleDelete(confirmId)} className="btn-danger flex-1">
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
