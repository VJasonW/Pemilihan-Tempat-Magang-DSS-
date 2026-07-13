// ============================================================
// Controller Autentikasi: Register & Login
// Password di-hash menggunakan bcryptjs. Query menggunakan
// prepared statement (parameterized query) untuk mencegah SQL Injection.
// ============================================================
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// Validasi sederhana format email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.register = async (req, res) => {
  try {
    const { nama, nim, email, password, role } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password minimal 8 karakter.' });
    }

    // Cek email unik
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const finalRole = role === 'admin' ? 'admin' : 'mahasiswa';

    const [result] = await pool.query(
      'INSERT INTO users (nama, nim, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [nama, nim || null, email, hashedPassword, finalRole]
    );

    return res.status(201).json({
      message: 'Registrasi berhasil.',
      user: { id: result.insertId, nama, email, role: finalRole },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      { id: user.id, nama: user.nama, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        nama: user.nama,
        nim: user.nim,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.me = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nama, nim, email, role FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};
