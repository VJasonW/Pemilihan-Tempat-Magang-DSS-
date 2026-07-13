// ============================================================
// InternMatch DSS - Backend Server
// ============================================================
const express = require('express');
const cors = require('cors');
require('dotenv').config({ override: true });

const authRoutes = require('./routes/authRoutes');
const perusahaanRoutes = require('./routes/perusahaanRoutes');
const hasilRoutes = require('./routes/hasilRoutes');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routing
app.use('/api/auth', authRoutes);
app.use('/api/perusahaan', perusahaanRoutes);
app.use('/api/hasil', hasilRoutes);
app.use('/api/mahasiswa', mahasiswaRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'InternMatch DSS API is running 🚀' });
});

// 404 handler untuk route API yang tidak ditemukan
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = (process.env.PORT && process.env.PORT !== '3306') ? process.env.PORT : 5000;
  app.listen(PORT, () => {
    console.log(`✅ InternMatch DSS backend berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
