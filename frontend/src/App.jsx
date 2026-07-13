import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

import AdminDashboard from './pages/AdminDashboard';
import DataPerusahaan from './pages/DataPerusahaan';
import FormPerusahaan from './pages/FormPerusahaan';
import DataMahasiswa from './pages/DataMahasiswa';
import HasilPerhitunganAdmin from './pages/HasilPerhitunganAdmin';

import MahasiswaDashboard from './pages/MahasiswaDashboard';
import DaftarMagang from './pages/DaftarMagang';
import DetailPerusahaan from './pages/DetailPerusahaan';
import Preferensi from './pages/Preferensi';
import HasilRekomendasi from './pages/HasilRekomendasi';
import Riwayat from './pages/Riwayat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/perusahaan" element={<ProtectedRoute role="admin"><DataPerusahaan /></ProtectedRoute>} />
        <Route path="/admin/perusahaan/tambah" element={<ProtectedRoute role="admin"><FormPerusahaan mode="tambah" /></ProtectedRoute>} />
        <Route path="/admin/perusahaan/edit/:id" element={<ProtectedRoute role="admin"><FormPerusahaan mode="edit" /></ProtectedRoute>} />
        <Route path="/admin/mahasiswa" element={<ProtectedRoute role="admin"><DataMahasiswa /></ProtectedRoute>} />
        <Route path="/admin/hasil" element={<ProtectedRoute role="admin"><HasilPerhitunganAdmin /></ProtectedRoute>} />

        {/* MAHASISWA */}
        <Route path="/mahasiswa/dashboard" element={<ProtectedRoute role="mahasiswa"><MahasiswaDashboard /></ProtectedRoute>} />
        <Route path="/mahasiswa/daftar-magang" element={<ProtectedRoute role="mahasiswa"><DaftarMagang /></ProtectedRoute>} />
        <Route path="/mahasiswa/perusahaan/:id" element={<ProtectedRoute role="mahasiswa"><DetailPerusahaan /></ProtectedRoute>} />
        <Route path="/mahasiswa/preferensi" element={<ProtectedRoute role="mahasiswa"><Preferensi /></ProtectedRoute>} />
        <Route path="/mahasiswa/hasil" element={<ProtectedRoute role="mahasiswa"><HasilRekomendasi /></ProtectedRoute>} />
        <Route path="/mahasiswa/riwayat" element={<ProtectedRoute role="mahasiswa"><Riwayat /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
