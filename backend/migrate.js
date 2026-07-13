const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

async function migrate() {
  try {
    console.log('⏳ Membaca database.sql...');
    const sqlPath = path.join(__dirname, '../database/database.sql');
    let sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Jika terhubung ke Aiven/cloud, kita hapus "CREATE DATABASE" dan "USE" agar tidak error
    // Aiven menggunakan database default 'defaultdb' dan tidak mengizinkan query CREATE DATABASE di tier gratis
    if (process.env.DATABASE_URL) {
      console.log('ℹ️ Koneksi menggunakan DATABASE_URL (Cloud). Menghapus perintah CREATE DATABASE/USE...');
      sqlContent = sqlContent.replace(/CREATE DATABASE[\s\S]*?;/i, '');
      sqlContent = sqlContent.replace(/USE[\s\S]*?;/i, '');
    }

    // Split query berdasarkan titik koma (;)
    const queries = sqlContent
      .split(';')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    console.log(`🚀 Menjalankan ${queries.length} query migrasi...`);

    for (let i = 0; i < queries.length; i++) {
      let query = queries[i];
      
      // Hapus komentar satu baris dari query untuk menghindari error sintaksis jika tersisa
      query = query
        .split('\n')
        .filter(line => !line.trim().startsWith('--'))
        .join('\n')
        .trim();

      if (query.length === 0) continue;

      try {
        await pool.query(query);
      } catch (err) {
        console.error(`❌ Gagal pada query ke-${i + 1}:`);
        console.error(query);
        throw err;
      }
    }

    console.log('🎉 Migrasi database sukses! Semua tabel dan data awal perusahaan berhasil dibuat.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal menjalankan migrasi:', err);
    process.exit(1);
  }
}

migrate();
