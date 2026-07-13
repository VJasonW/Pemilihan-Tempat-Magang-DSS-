import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function HasilPerhitunganAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    api.get('/hasil/semua')
      .then((res) => setData(res.data))
      .catch(() => showToast('Gagal memuat hasil perhitungan.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Hasil Perhitungan Seluruh Mahasiswa">
      {loading ? <Loading /> : (
        <div className="card overflow-x-auto">
          <table className="dss-table min-w-[800px]">
            <thead>
              <tr>
                <th>Mahasiswa</th><th>NIM</th><th>Perusahaan</th><th>Ranking</th><th>Nilai Preferensi</th><th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((h) => (
                <tr key={h.id} className="hover:bg-primary-50/50 dark:hover:bg-slate-700/40">
                  <td className="font-medium">{h.nama_mahasiswa}</td>
                  <td>{h.nim || '-'}</td>
                  <td>{h.nama_perusahaan}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${h.ranking === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                      #{h.ranking}
                    </span>
                  </td>
                  <td>{Number(h.nilai_preferensi).toFixed(4)}</td>
                  <td>{new Date(h.tanggal).toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-slate-400">Belum ada hasil perhitungan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
