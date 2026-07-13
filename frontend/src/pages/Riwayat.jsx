import { useEffect, useState } from 'react';
import { FiClock, FiAward } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function Riwayat() {
  const [sesi, setSesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    api.get('/hasil/riwayat')
      .then((res) => setSesi(res.data))
      .catch(() => showToast('Gagal memuat riwayat.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Riwayat Rekomendasi">
      {loading ? <Loading /> : sesi.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">Belum ada riwayat perhitungan.</div>
      ) : (
        <div className="space-y-6">
          {sesi.map((s) => (
            <div key={s.tanggal} className="card p-5">
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <FiClock className="text-primary-500" />
                <p className="font-semibold">{new Date(s.tanggal).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="dss-table min-w-[500px]">
                  <thead><tr><th>Ranking</th><th>Perusahaan</th><th>Bidang</th><th>Nilai Preferensi</th></tr></thead>
                  <tbody>
                    {s.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.ranking === 1 ? <FiAward className="inline text-amber-500 mr-1" /> : null}#{item.ranking}</td>
                        <td className="font-medium">{item.nama_perusahaan}</td>
                        <td>{item.bidang}</td>
                        <td>{Number(item.nilai_preferensi).toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
