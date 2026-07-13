import { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiSliders } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import CompanyCard from '../components/CompanyCard';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function DaftarMagang() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [minUangSaku, setMinUangSaku] = useState('');
  const [sortBy, setSortBy] = useState('nama');
  const { showToast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/perusahaan', {
        params: { search, lokasi, minUangSaku, sortBy },
      });
      setData(res.data);
    } catch {
      showToast('Gagal memuat data perusahaan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchData();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <DashboardLayout title="Eksplorasi Tempat Magang">
      <form onSubmit={handleFilter} className="double-bezel mb-8">
        <div className="double-bezel-inner p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari perusahaan atau bidang keahlian..."
                className="input-field pl-11"
              />
            </div>
            <input
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              placeholder="Kota lokasi magang..."
              className="input-field"
            />
            <input
              type="number"
              value={minUangSaku}
              onChange={(e) => setMinUangSaku(e.target.value)}
              placeholder="Min. uang saku (Rp)"
              className="input-field"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <FiSliders /> Urutkan Berdasarkan
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 text-sm max-w-[200px]"
              >
                <option value="nama">Nama Instansi</option>
                <option value="uang_saku">Uang Saku Tertinggi</option>
                <option value="reputasi">Reputasi</option>
                <option value="jarak_km">Jarak Terdekat</option>
              </select>
            </div>
            <button type="submit" className="btn-primary px-8">
              <FiFilter /> Terapkan Filter
            </button>
          </div>
        </div>
      </form>

      {loading ? <Loading /> : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {data.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <CompanyCard p={p} />
            </motion.div>
          ))}
          {data.length === 0 && (
            <div className="col-span-full double-bezel">
              <div className="double-bezel-inner py-16 text-center text-slate-400">
                <p className="text-base font-bold">Tidak ada tempat magang ditemukan</p>
                <p className="text-xs text-slate-450 mt-1">Coba ganti filter Anda atau cari kata kunci lain.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  );
}
