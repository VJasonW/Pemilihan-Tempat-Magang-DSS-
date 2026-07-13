import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn, FiCompass } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      showToast(`Selamat datang, ${u.nama}!`, 'success');
      navigate(u.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login gagal.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isiAkun = (e, p) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-4 mb-8 bg-white/30 dark:bg-slate-800/20 p-4 rounded-3xl border border-slate-100/50 dark:border-slate-800/20">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-soft shrink-0">
            <FiCompass />
          </div>
          <div className="text-left min-w-0">
            <h1 className="text-xl font-bold text-primary-700 dark:text-primary-350 tracking-tight leading-none">InternMatch DSS</h1>
            <p className="text-slate-400 dark:text-slate-450 text-[11px] mt-1.5 leading-relaxed">
              Sistem Pendukung Keputusan Pemilihan Tempat Magang — AHP & TOPSIS
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="label-field">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="input-field !pl-12"
              />
            </div>
          </div>
          <div>
            <label className="label-field">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field !pl-12"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            <FiLogIn /> {loading ? 'Memproses...' : 'Masuk'}
          </button>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-400 mb-2 text-center">Akun Demo (password: password123)</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => isiAkun('admin@internmatch.id', 'password123')} className="btn-secondary text-xs py-2">
                Admin
              </button>
              <button type="button" onClick={() => isiAkun('budi@student.ac.id', 'password123')} className="btn-secondary text-xs py-2">
                Mahasiswa
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
