import { useEffect, useState } from 'react';
import { FiBriefcase, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    api.get('/perusahaan/stats')
      .then((res) => setStats(res.data))
      .catch(() => showToast('Gagal memuat statistik.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout title="Dashboard Admin"><Loading /></DashboardLayout>;

  const chartData = (stats?.favorit || []).map((f) => ({
    nama: f.nama.length > 14 ? f.nama.slice(0, 14) + '…' : f.nama,
    dipilih: f.jumlah_dipilih,
  }));

  return (
    <DashboardLayout title="Dashboard Admin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<FiBriefcase />} label="Jumlah Perusahaan" value={stats?.totalPerusahaan ?? 0} accent="primary" />
        <StatCard icon={<FiUsers />} label="Jumlah Mahasiswa" value={stats?.totalMahasiswa ?? 0} accent="green" />
        <StatCard icon={<FiAward />} label="Perusahaan Terfavorit" value={stats?.favorit?.[0]?.nama ?? '-'} accent="orange" />
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiTrendingUp className="text-primary-600" />
          <h2 className="font-bold text-lg">Perusahaan Paling Banyak Dipilih (Ranking #1)</h2>
        </div>
        {chartData.length === 0 ? (
          <p className="text-slate-400 text-sm py-10 text-center">Belum ada data hasil perhitungan mahasiswa.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="nama" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#eff6ff' }} />
              <Bar dataKey="dipilih" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardLayout>
  );
}
