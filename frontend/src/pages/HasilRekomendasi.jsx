import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronDown, FiChevronUp, FiAward, FiInfo, FiActivity } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const MEDALS = ['🥇', '🥈', '🥉'];

function num(n, d = 4) {
  return Number(n).toFixed(d);
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="double-bezel mb-6 overflow-hidden">
      <div className="double-bezel-inner !p-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-left px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors border-b border-slate-150/40 dark:border-slate-850/40"
        >
          <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">{title}</span>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 shadow-sm">
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="p-6 overflow-x-auto bg-white dark:bg-slate-900">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HasilRekomendasi() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem('internmatch_last_result');
    if (saved) setResult(JSON.parse(saved));
  }, []);

  if (!result) {
    return (
      <DashboardLayout title="Hasil Analisis">
        <div className="double-bezel max-w-xl mx-auto">
          <div className="double-bezel-inner text-center py-16">
            <p className="text-slate-400 font-semibold mb-6">Belum ada hasil perhitungan pada sesi aktif ini.</p>
            <Link to="/mahasiswa/preferensi" className="btn-primary inline-flex">Isi Preferensi Sekarang</Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { ahp, topsis } = result;
  const ranking = topsis.hasilRanking;

  const handlePrint = () => window.print();

  return (
    <DashboardLayout title="Hasil Rekomendasi">
      <div className="flex justify-end mb-6 print:hidden">
        <button onClick={handlePrint} className="btn-secondary flex items-center gap-2 border border-slate-200/50 dark:border-slate-700/30">
          <FiDownload /> Cetak Hasil (PDF)
        </button>
      </div>

      {/* RANKING FINAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {ranking.map((r, i) => (
          <motion.div
            key={r.perusahaan_id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: i * 0.08 }}
            className={`double-bezel ${i === 0 ? 'ring-2 ring-primary-500/50' : ''}`}
          >
            <div className="double-bezel-inner p-6 flex flex-col justify-between h-full bg-white dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl shrink-0">{MEDALS[i] || <FiAward className="text-slate-300" />}</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    i === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Peringkat #{r.ranking}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-white mb-2 leading-tight">{r.nama}</h3>
                <p className="text-xs text-slate-400 font-semibold mb-4">
                  Nilai Preferensi: <strong className="text-primary-650 dark:text-primary-400 font-bold text-sm ml-1">{num(r.nilai_preferensi)}</strong>
                </p>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full" style={{ width: `${r.nilai_preferensi * 100}%` }} />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100/50 dark:border-slate-800/40 pt-4 mt-auto">
                {r.penjelasan}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        {/* TABEL PERHITUNGAN AHP */}
        <div>
          <h2 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <FiActivity className="text-primary-600" /> 📐 Tahapan Perhitungan AHP
          </h2>

          <Section title="1. Matriks Perbandingan Berpasangan (Pairwise Comparison Matrix)">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Kriteria</th>
                  {ahp.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {ahp.matriksPerbandingan.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-bold text-slate-700 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{ahp.kriteria[i]}</td>
                    {row.map((v, j) => <td key={j} className="font-medium">{num(v, 3)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="2. Normalisasi Matriks & Jumlah Kolom">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Kriteria</th>
                  {ahp.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {ahp.matriksNormalisasi.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-bold text-slate-700 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{ahp.kriteria[i]}</td>
                    {row.map((v, j) => <td key={j} className="font-medium">{num(v, 3)}</td>)}
                  </tr>
                ))}
                <tr className="font-bold bg-primary-50/20 dark:bg-slate-800/50 text-primary-750 dark:text-primary-350 border-t-2 border-primary-100/30">
                  <td>Jumlah Kolom</td>
                  {ahp.jumlahKolom.map((v, j) => <td key={j} className="font-extrabold">{num(v, 3)}</td>)}
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="3. Priority Vector (Bobot Kriteria)" defaultOpen>
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Kriteria</th>
                  <th className="font-bold">Bobot Prioritas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {ahp.kriteria.map((k, i) => (
                  <tr key={k} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-medium text-slate-750 dark:text-slate-350">{k}</td>
                    <td className="font-extrabold text-primary-600 dark:text-primary-400">{num(ahp.priorityVector[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="4. Uji Konsistensi AHP">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/45 border border-slate-100 dark:border-slate-850 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Lambda Max</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-150 text-lg mt-2">{num(ahp.lambdaMax, 4)}</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/45 border border-slate-100 dark:border-slate-850 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Consistency Index (CI)</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-150 text-lg mt-2">{num(ahp.consistencyIndex, 4)}</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/45 border border-slate-100 dark:border-slate-850 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Consistency Ratio (CR)</span>
                <span className={`font-extrabold text-lg mt-2 ${ahp.konsisten ? 'text-green-600' : 'text-red-500'}`}>{num(ahp.consistencyRatio, 4)}</span>
              </div>
              <div className={`p-4 rounded-2xl md:col-span-3 border text-xs font-semibold flex items-center gap-2.5 ${
                ahp.konsisten
                  ? 'bg-green-50/60 border-green-100/50 text-green-700 dark:bg-green-950/15 dark:border-green-900/30 dark:text-green-400'
                  : 'bg-red-50/60 border-red-100/50 text-red-700 dark:bg-red-950/15 dark:border-red-900/30 dark:text-red-400'
              }`}>
                <FiInfo size={16} /> {ahp.pesan}
              </div>
            </div>
          </Section>
        </div>

        {/* TABEL PERHITUNGAN TOPSIS */}
        <div className="pt-6">
          <h2 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <FiActivity className="text-primary-600" /> 📊 Tahapan Perhitungan TOPSIS
          </h2>

          <Section title="1. Matriks Keputusan (Data Mentah Alternatif)">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Perusahaan</th>
                  {topsis.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {ranking.map((r) => {
                  const p = r.perusahaan;
                  const vals = [p.relevansi_ti, p.reputasi, p.jarak_km, p.uang_saku, p.peluang_rekrut, p.fleksibilitas];
                  return (
                    <tr key={r.perusahaan_id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                      <td className="font-bold text-slate-700 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{r.nama}</td>
                      {vals.map((v, j) => <td key={j} className="font-medium">{j === 3 ? formatRupiah(v) : v}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Section>

          <Section title="2. Matriks Normalisasi (R)">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Perusahaan</th>
                  {topsis.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {topsis.matriksNormalisasi.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-bold text-slate-700 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{topsis.namaUrutanAsli[i]}</td>
                    {row.map((v, j) => <td key={j} className="font-medium">{num(v, 3)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="3. Matriks Normalisasi Terbobot (Y)">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Perusahaan</th>
                  {topsis.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {topsis.matriksTerbobot.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-bold text-slate-700 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{topsis.namaUrutanAsli[i]}</td>
                    {row.map((v, j) => <td key={j} className="font-medium">{num(v, 4)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="4. Solusi Ideal Positif (A+) & Solusi Ideal Negatif (A-)">
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Solusi</th>
                  {topsis.kriteria.map((k) => <th key={k} className="font-bold">{k}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                <tr className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                  <td className="font-bold text-green-700 dark:text-green-450 bg-green-50/15">A+ (Ideal Positif)</td>
                  {topsis.solusiIdealPositif.map((v, j) => <td key={j} className="font-semibold text-green-700 dark:text-green-400">{num(v, 4)}</td>)}
                </tr>
                <tr className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                  <td className="font-bold text-red-700 dark:text-red-450 bg-red-50/15">A- (Ideal Negatif)</td>
                  {topsis.solusiIdealNegatif.map((v, j) => <td key={j} className="font-semibold text-red-700 dark:text-red-450">{num(v, 4)}</td>)}
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="5. Jarak Solusi Ideal & Nilai Preferensi Akhir (V)" defaultOpen>
            <table className="dss-table">
              <thead>
                <tr>
                  <th className="font-bold">Perusahaan</th>
                  <th className="font-bold">Jarak Positif (D+)</th>
                  <th className="font-bold">Jarak Negatif (D-)</th>
                  <th className="font-bold">Nilai Preferensi (V)</th>
                  <th className="font-bold text-center">Peringkat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {ranking.map((r) => (
                  <tr key={r.perusahaan_id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/20">
                    <td className="font-bold text-slate-750 dark:text-slate-350 bg-slate-50/20 dark:bg-slate-850/10">{r.nama}</td>
                    <td className="font-semibold">{num(r.jarak_positif)}</td>
                    <td className="font-semibold">{num(r.jarak_negatif)}</td>
                    <td className="font-extrabold text-primary-600 dark:text-primary-400 text-base">{num(r.nilai_preferensi)}</td>
                    <td className="text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold leading-none ${
                        r.ranking === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        #{r.ranking}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>
      </div>
    </DashboardLayout>
  );
}
