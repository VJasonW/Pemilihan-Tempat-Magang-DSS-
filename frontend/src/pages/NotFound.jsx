import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiCompass } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <FiCompass className="mx-auto text-primary-500 mb-4" size={64} />
        <h1 className="text-6xl font-extrabold text-primary-600 mb-2">404</h1>
        <p className="text-slate-500 mb-6">Sepertinya Anda tersesat sebelum menemukan tempat magang.</p>
        <Link to="/login" className="btn-primary inline-flex items-center gap-2">
          <FiHome /> Kembali ke Login
        </Link>
      </motion.div>
    </div>
  );
}
