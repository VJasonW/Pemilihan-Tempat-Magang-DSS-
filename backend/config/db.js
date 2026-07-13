// ============================================================
// Konfigurasi koneksi database MySQL menggunakan connection pool.
// Menggunakan mysql2/promise agar mendukung async/await dan
// prepared statements (mencegah SQL Injection).
// ============================================================
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'internmatch_dss',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
