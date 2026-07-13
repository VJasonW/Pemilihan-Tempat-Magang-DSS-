import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign, FiTrendingUp, FiTarget, FiSliders, FiArrowLeft, FiAward, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

function BenefitCard({ icon, label, value, suffix = '', highlight = false }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 ${
      highlight
        ? 'bg-primary-50/50 border-primary-100 dark:bg-primary-950/10 dark:border-primary-900/30'
        : 'bg-slate-50/40 border-slate-100 dark:bg-slate-800/20 dark:border-slate-800/60'
    } flex items-center gap-4`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
        highlight
          ? 'bg-primary-600 text-white shadow-soft'
          : 'bg-white dark:bg-slate-800 text-primary-500 border border-slate-150/30 dark:border-slate-700/50 shadow-sm'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">{label}</p>
        <p className="font-extrabold text-slate-850 dark:text-slate-150 mt-0.5 text-base">{value}{suffix}</p>
      </div>
    </div>
  );
}

export default function DetailPerusahaan() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/perusahaan/${id}`).then((res) => setP(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DashboardLayout title="Profil Perusahaan"><Loading /></DashboardLayout>;
  if (!p) return <DashboardLayout title="Profil Perusahaan"><p className="p-8 text-center text-slate-400">Data tidak ditemukan.</p></DashboardLayout>;

  return (
    <DashboardLayout title="Detail Instansi">
      <Link to="/mahasiswa/daftar-magang" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold text-sm mb-6 transition-all">
        <FiArrowLeft /> Kembali ke Daftar
      </Link>

      <div className="double-bezel max-w-5xl">
        <div className="double-bezel-inner">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Basic Info & Branding */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-indigo-650 flex items-center justify-center text-white font-black text-3xl shadow-lg mb-4">
                {p.nama.charAt(0)}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-1">{p.nama}</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary-50 text-primary-650 dark:bg-primary-950/20 dark:text-primary-400 mb-6">
                {p.bidang}
              </span>

              <div className="w-full space-y-4 text-sm text-slate-500 dark:text-slate-350">
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/30 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5"><FiMapPin /> Wilayah Kerja</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{p.lokasi}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/30 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5"><FiBriefcase /> Tipe Kerja</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{p.tipe_kerja}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed parameters & descriptions */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-2">Profil Perusahaan</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">{p.deskripsi || 'Tidak ada deskripsi yang tersedia.'}</p>
              </div>

              {p.alamat && (
                <div>
                  <h3 className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-2">Alamat Kantor</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{p.alamat}</p>
                </div>
              )}

              <hr className="border-slate-100 dark:border-slate-800" />

              <div>
                <h3 className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-4">Parameter Kriteria & Benefit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BenefitCard icon={<FiDollarSign />} label="Uang Saku" value={formatRupiah(p.uang_saku)} suffix=" / bln" highlight />
                  <BenefitCard icon={<FiAward />} label="Reputasi Instansi" value={p.reputasi} suffix=" / 100" />
                  <BenefitCard icon={<FiTarget />} label="Relevansi TI" value={p.relevansi_ti} suffix=" / 100" />
                  <BenefitCard icon={<FiSliders />} label="Fleksibilitas Kerja" value={p.fleksibilitas} suffix=" / 100" />
                  <BenefitCard icon={<FiTrendingUp />} label="Peluang Rekrutmen" value={p.peluang_rekrut} suffix=" / 100" />
                  <BenefitCard icon={<FiMapPin />} label="Jarak Operasional" value={p.jarak_km} suffix=" km" />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <Link to="/mahasiswa/preferensi" className="btn-primary px-6 py-3.5 group">
                  Lanjut Isi Preferensi 
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FiCheckCircle className="text-xs" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
