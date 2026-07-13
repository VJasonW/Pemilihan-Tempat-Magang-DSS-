const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nama, nim, email, created_at FROM users WHERE role = 'mahasiswa' ORDER BY nama ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data mahasiswa.' });
  }
});

module.exports = router;
