// ============================================================
// Konfigurasi koneksi database MySQL menggunakan connection pool.
// Menggunakan mysql2/promise agar mendukung async/await dan
// prepared statements (mencegah SQL Injection).
// ============================================================
const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

if (process.env.DATABASE_URL) {
  // Menggunakan connection URI (contoh: mysql://user:pass@host:port/db)
  let connectionString = process.env.DATABASE_URL;
  if (connectionString.includes('ssl-mode=REQUIRED')) {
    connectionString = connectionString.replace('ssl-mode=REQUIRED', 'ssl={"rejectUnauthorized":false}');
  } else if (!connectionString.includes('ssl=')) {
    const separator = connectionString.includes('?') ? '&' : '?';
    connectionString += `${separator}ssl={"rejectUnauthorized":false}`;
  }
  pool = mysql.createPool(connectionString);
} else {
  // Menggunakan konfigurasi individual
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'internmatch_dss',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    allowPublicKeyRetrieval: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

module.exports = pool;
