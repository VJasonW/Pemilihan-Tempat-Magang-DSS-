// ============================================================
// Script seeding akun dummy dengan password ter-hash bcrypt.
// Jalankan setelah import database.sql: `node seed.js`
// ============================================================
const bcrypt = require('bcryptjs');
const pool = require('./config/db');

const akunDummy = [
  { nama: 'Admin InternMatch', nim: null, email: 'admin@internmatch.id', role: 'admin' },
  { nama: 'Budi Santoso', nim: '5301421001', email: 'budi@student.ac.id', role: 'mahasiswa' },
  { nama: 'Siti Aminah', nim: '5301421002', email: 'siti@student.ac.id', role: 'mahasiswa' },
];

const DEFAULT_PASSWORD = 'password123';

async function seed() {
  try {
    const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    for (const akun of akunDummy) {
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [akun.email]);
      if (existing.length > 0) {
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashed, akun.email]);
        console.log(`🔄 Password diperbarui untuk: ${akun.email}`);
      } else {
        await pool.query(
          'INSERT INTO users (nama, nim, email, password, role) VALUES (?,?,?,?,?)',
          [akun.nama, akun.nim, akun.email, hashed, akun.role]
        );
        console.log(`✅ Akun dibuat: ${akun.email}`);
      }
    }

    console.log('\n🎉 Seeding selesai! Password default semua akun: password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal seeding:', err);
    process.exit(1);
  }
}

seed();
