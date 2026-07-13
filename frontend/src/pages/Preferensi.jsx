import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiTarget, FiAward, FiMapPin, FiDollarSign, FiTrendingUp, FiSliders, 
  FiZap, FiInfo, FiGrid, FiArrowUp, FiArrowDown 
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import Loading from '../components/Loading';

const INITIAL_KRITERIA = [
  { key: 'relevansi', label: 'Relevansi Bidang TI', icon: <FiTarget />, desc: 'Seberapa penting kesesuaian bidang magang dengan kurikulum Teknik Informatika.' },
  { key: 'reputasi', label: 'Reputasi Instansi', icon: <FiAward />, desc: 'Pentingnya nama besar dan prestise perusahaan dalam portofolio Anda.' },
  { key: 'jarak', label: 'Jarak & Aksesibilitas', icon: <FiMapPin />, desc: 'Skala prioritas kedekatan fisik lokasi magang dari domisili Anda.' },
  { key: 'uang_saku', label: 'Kompensasi / Uang Saku', icon: <FiDollarSign />, desc: 'Tingkat kepentingan besaran tunjangan finansial bulanan.' },
  { key: 'peluang_rekrut', label: 'Peluang Rekrutmen', icon: <FiTrendingUp />, desc: 'Pentingnya prospek penawaran kontrak kerja pasca magang.' },
  { key: 'fleksibilitas', label: 'Fleksibilitas Operasional', icon: <FiSliders />, desc: 'Preferensi sistem kerja (Work From Home, Hybrid, atau Full Office).' },
];

const RANK_SUBTITLES = [
  'Prioritas Utama',
  'Sangat Penting',
  'Cukup Penting',
  'Sedang',
  'Kurang Penting',
  'Terendah',
];

const getRankBoxClass = (index) => {
  const styles = [
    'bg-primary-600 text-white border-primary-600 dark:bg-primary-600 dark:border-primary-600 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]',
    'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-600 dark:border-indigo-600 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.35)]',
    'bg-violet-600 text-white border-violet-600 dark:bg-violet-600 dark:border-violet-600 shadow-[0_8px_20px_-6px_rgba(124,58,237,0.35)]',
    'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700',
    'bg-slate-50 text-slate-650 border-slate-200/60 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-800',
    'bg-slate-50/40 text-slate-400 border-slate-100 dark:bg-slate-900/20 dark:text-slate-500 dark:border-slate-850',
  ];
  return styles[index] || styles[5];
};

export default function Preferensi() {
  const [list, setList] = useState(INITIAL_KRITERIA);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/hasil/preferensi')
      .then((res) => {
        const pref = res.data;
        if (pref) {
          // Sort INITIAL_KRITERIA descending based on saved Saaty rating
          const sortedList = [...INITIAL_KRITERIA].sort((a, b) => {
            const valA = pref[a.key] !== undefined ? Number(pref[a.key]) : 5;
            const valB = pref[b.key] !== undefined ? Number(pref[b.key]) : 5;
            return valB - valA;
          });
          setList(sortedList);
        }
      })
      .catch((err) => {
        console.error('Gagal memuat preferensi:', err);
        showToast('Gagal memuat preferensi tersimpan.', 'error');
      })
      .finally(() => setLoadingData(false));
  }, []);

  if (loadingData) return <DashboardLayout title="Prioritas Kriteria Magang"><Loading /></DashboardLayout>;

  // Native Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newList = [...list];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setList(newList);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Keyboard/Mobile fallback handlers
  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    
    const newList = [...list];
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;
    setList(newList);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Map order (0 to 5) to Saaty scales (9, 7, 5, 3, 2, 1)
    const saatyMap = [9, 7, 5, 3, 2, 1];
    const skor = {};
    list.forEach((item, index) => {
      skor[item.key] = saatyMap[index];
    });

    try {
      const res = await api.post('/hasil/proses', skor);
      if (!res.data.konsisten) {
        showToast('Hasil pembobotan AHP Anda tidak konsisten (CR > 0.1). Silakan sesuaikan preferensi Anda kembali.', 'error');
      } else {
        showToast('Analisis pembobotan DSS berhasil diproses!', 'success');
        sessionStorage.setItem('internmatch_last_result', JSON.stringify(res.data));
        navigate('/mahasiswa/hasil');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal memproses perhitungan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Prioritas Kriteria Magang">
      <div className="double-bezel mb-8">
        <div className="double-bezel-inner flex flex-col md:flex-row items-start md:items-center gap-4 bg-primary-50/20 border-primary-100/30">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shrink-0 shadow-soft">
            <FiInfo size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Panduan Urutan Prioritas Kriteria</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Urutkan kriteria magang berdasarkan preferensi Anda dari yang <strong>paling penting (Teratas)</strong> hingga <strong>kurang penting (Terbawah)</strong>. Geser menggunakan handle <FiGrid className="inline mx-1" /> atau gunakan tombol panah <FiArrowUp className="inline" /> <FiArrowDown className="inline" /> di sebelah kanan.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {list.map((item, index) => (
          <div key={item.key} className="flex items-stretch gap-4">
            {/* Left Box: Ranking (Fixed to index) */}
            <div className={`w-16 md:w-20 rounded-2xl flex flex-col items-center justify-center border font-bold text-center shrink-0 shadow-sm transition-all duration-300 ${getRankBoxClass(index)}`}>
              <span className="text-[9px] uppercase tracking-wider opacity-60 leading-none mb-1">Rank</span>
              <span className="text-2xl leading-none font-black">{index + 1}</span>
            </div>

            {/* Right Box: Draggable Card (Moves with drag/drop) */}
            <motion.div
              layoutId={item.key}
              className="flex-1 double-bezel select-none cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              style={{ opacity: draggedIndex === index ? 0.4 : 1 }}
            >
              <div className="double-bezel-inner p-4 flex items-center gap-4 bg-white dark:bg-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors duration-200 h-full">
                {/* Drag Handle */}
                <div className="text-slate-400 dark:text-slate-650 hover:text-slate-650 dark:hover:text-slate-400 cursor-grab shrink-0 p-1">
                  <FiGrid size={20} />
                </div>

                {/* Icon & Label */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-primary-600">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base leading-snug">{item.label}</h4>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 block">
                      {RANK_SUBTITLES[index]}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 dark:text-slate-500 hidden lg:block flex-1 leading-relaxed pl-4 border-l border-slate-100 dark:border-slate-800">{item.desc}</p>

                {/* Action Buttons (Up/Down) */}
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                    title="Pindahkan ke atas"
                  >
                    <FiArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === list.length - 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                    title="Pindahkan ke bawah"
                  >
                    <FiArrowDown size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary px-8 py-4 text-base shadow-[0_10px_25px_-5px_rgba(37,99,235,0.3)] active:scale-95 transition-all group"
        >
          <FiZap className="text-lg group-hover:scale-110 transition-transform" /> 
          {loading ? 'Menganalisis Prioritas...' : 'Proses & Hitung Rekomendasi'}
        </button>
      </div>
    </DashboardLayout>
  );
}
