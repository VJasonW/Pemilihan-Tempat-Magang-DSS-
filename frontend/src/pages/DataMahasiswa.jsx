import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function DataMahasiswa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    api.get('/mahasiswa')
      .then((res) => setData(res.data))
      .catch(() => showToast('Gagal memuat data mahasiswa.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Data Mahasiswa">
      {loading ? <Loading /> : (
        <div className="card overflow-x-auto">
          <table className="dss-table min-w-[700px]">
            <thead>
              <tr><th>Nama</th><th>NIM</th><th>Email</th><th>Terdaftar</th></tr>
            </thead>
            <tbody>
              {data.map((m) => (
                <tr key={m.id} className="hover:bg-primary-50/50 dark:hover:bg-slate-700/40">
                  <td className="flex items-center gap-2 font-medium"><FiUser className="text-primary-500" /> {m.nama}</td>
                  <td>{m.nim || '-'}</td>
                  <td>{m.email}</td>
                  <td>{new Date(m.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-slate-400">Belum ada mahasiswa terdaftar.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
