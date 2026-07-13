import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiEdit3, FiSliders, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/Loading';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

const initialForm = {
  nama: '', bidang: '', lokasi: '', jarak_km: '', alamat: '', deskripsi: '',
  tipe_kerja: 'Office', logo: '', uang_saku: '', reputasi: '', relevansi_ti: '',
  peluang_rekrut: '', fleksibilitas: '',
};

export default function FormPerusahaan({ mode }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (mode === 'edit' && id) {
      api.get(`/perusahaan/${id}`)
        .then((res) => {
          // Normalize null/numeric fields to string to avoid uncontrolled inputs warnings
          const normalized = {};
          Object.keys(res.data).forEach((key) => {
            normalized[key] = res.data[key] ?? '';
          });
          setForm(normalized);
        })
        .catch(() => showToast('Gagal memuat data perusahaan.', 'error'))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Convert numeric strings back to numbers or defaults
    const payload = { ...form };
    const numFields = ['jarak_km', 'uang_saku', 'reputasi', 'relevansi_ti', 'peluang_rekrut', 'fleksibilitas'];
    numFields.forEach((key) => {
      payload[key] = payload[key] === '' ? 0 : Number(payload[key]);
    });

    try {
      if (mode === 'edit') {
        await api.put(`/perusahaan/${id}`, payload);
        showToast('Perusahaan berhasil diperbarui.', 'success');
      } else {
        await api.post('/perusahaan', payload);
        showToast('Perusahaan berhasil ditambahkan.', 'success');
      }
      navigate('/admin/perusahaan');
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan data.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout title="Form Perusahaan"><Loading /></DashboardLayout>;

  const REPUTASI_OPTIONS = [
    { value: '95', label: 'Sangat Baik (BUMN Besar, Tech Giant, Multinasional)' },
    { value: '75', label: 'Baik (Startup Ternama, Instansi Swasta Menengah-Atas)' },
    { value: '55', label: 'Cukup (Perusahaan Lokal, Instansi Pemda/Dinas)' },
    { value: '35', label: 'Rendah (UMKM, Perusahaan Rintisan Kecil)' },
  ];

  const RELEVANSI_OPTIONS = [
    { value: '95', label: 'Sangat Relevan (Software Dev, Data, Network, Cyber)' },
    { value: '75', label: 'Relevan (IT Support, QA Testing, Database Admin)' },
    { value: '55', label: 'Cukup Relevan (Administrasi IT, Data Entry Teknis)' },
    { value: '35', label: 'Kurang Relevan (Pekerjaan Non-IT Dominan)' },
  ];

  const PELUANG_OPTIONS = [
    { value: '90', label: 'Sangat Tinggi (Ada Program Ikatan Dinas / Konversi Magang)' },
    { value: '75', label: 'Tinggi (Sering Merekrut Alumni Magang Berprestasi)' },
    { value: '55', label: 'Sedang (Merekrut Hanya Jika Ada Lowongan Kosong)' },
    { value: '30', label: 'Rendah (Hampir Tidak Pernah Merekrut Karyawan Baru)' },
  ];

  const FLEKSIBILITAS_OPTIONS = [
    { value: '90', label: 'Sangat Tinggi (Bebas WFH/WFO & Jam Kerja Flexi-time)' },
    { value: '70', label: 'Tinggi (Sistem Hybrid dengan Absensi Kasual)' },
    { value: '50', label: 'Cukup (Full WFO tetapi Budaya Kerja Santai/Kasual)' },
    { value: '30', label: 'Rendah (Full WFO, Aturan Disiplin Ketat & Seragam)' },
  ];

  const renderSelectField = (name, label, options, formValue) => {
    const valueStr = formValue !== undefined && formValue !== null ? String(formValue) : '';

    return (
      <div>
        <label className="label-field">{label}</label>
        <select
          name={name}
          value={valueStr}
          onChange={handleChange}
          required
          className="input-field select-field"
        >
          <option value="" disabled hidden>Pilih {label}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <DashboardLayout title={mode === 'edit' ? 'Edit Tempat Magang' : 'Tambah Tempat Magang'}>
      <Link to="/admin/perusahaan" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold text-sm mb-6 transition-all">
        <FiArrowLeft /> Kembali ke Daftar
      </Link>

      <div className="double-bezel max-w-4xl">
        <div className="double-bezel-inner">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
                <FiEdit3 className="text-primary-600" /> Informasi Dasar Perusahaan
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400">Silakan lengkapi profil dasar instansi/perusahaan magang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-field">Nama Perusahaan</label>
                <input
                  name="nama" required value={form.nama ?? ''}
                  onChange={handleChange} placeholder="PT Telkom Indonesia" className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Bidang</label>
                <input
                  name="bidang" required value={form.bidang ?? ''}
                  onChange={handleChange} placeholder="Telekomunikasi & IT" className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Lokasi (Kota)</label>
                <input
                  name="lokasi" required value={form.lokasi ?? ''}
                  onChange={handleChange} placeholder="Jakarta" className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Tipe Kerja</label>
                <select name="tipe_kerja" value={form.tipe_kerja ?? 'Office'} onChange={handleChange} className="input-field select-field">
                  <option value="Office">Office</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="WFH">WFH</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label-field">Alamat Lengkap</label>
                <input
                  name="alamat" value={form.alamat ?? ''}
                  onChange={handleChange} placeholder="Jl. Jend. Gatot Subroto No.52, Jakarta" className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label-field">Deskripsi</label>
                <textarea
                  name="deskripsi" rows={3} value={form.deskripsi ?? ''}
                  onChange={handleChange} placeholder="Tulis deskripsi singkat mengenai unit kerja, teknologi yang digunakan, atau penawaran magang..."
                  className="input-field resize-none"
                />
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
                <FiSliders className="text-primary-600" /> Parameter Penilaian (Kriteria DSS)
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400">Masukkan nilai numerik yang merepresentasikan kriteria untuk perhitungan AHP-TOPSIS.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="label-field">Jarak dari Kampus (km)</label>
                <input
                  type="number" step="any" name="jarak_km" required
                  value={form.jarak_km ?? ''} onChange={handleChange}
                  placeholder="Contoh: 5.5 (dari Kampus Utama)"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="label-field">Uang Saku Bulanan (Rp)</label>
                <input
                  type="number" name="uang_saku" required
                  value={form.uang_saku ?? ''} onChange={handleChange}
                  placeholder="Contoh: 2000000 (0 jika tidak ada)"
                  className="input-field"
                />
              </div>

              {renderSelectField('reputasi', 'Reputasi Instansi', REPUTASI_OPTIONS, form.reputasi)}
              {renderSelectField('relevansi_ti', 'Relevansi Bidang TI', RELEVANSI_OPTIONS, form.relevansi_ti)}
              {renderSelectField('peluang_rekrut', 'Peluang Rekrutmen', PELUANG_OPTIONS, form.peluang_rekrut)}
              {renderSelectField('fleksibilitas', 'Fleksibilitas Operasional', FLEKSIBILITAS_OPTIONS, form.fleksibilitas)}
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={saving} className="btn-primary px-8 py-3.5">
                <FiSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan Perusahaan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
