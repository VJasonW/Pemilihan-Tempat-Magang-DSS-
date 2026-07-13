# InternMatch DSS

Sistem Pendukung Keputusan (Decision Support System) untuk membantu mahasiswa
Teknik Informatika memilih tempat magang terbaik menggunakan metode **AHP**
(pembobotan kriteria) dan **TOPSIS** (perangkingan alternatif).

## Teknologi

**Frontend:** React + Vite, Tailwind CSS, React Router, Axios, React Icons, Framer Motion, Recharts
**Backend:** Node.js, Express.js, JWT, bcryptjs
**Database:** MySQL

## Struktur Project

```
internmatch-dss/
├── backend/          # REST API (Express + MySQL)
│   ├── config/       # Koneksi database
│   ├── controllers/  # Logic bisnis
│   ├── middleware/   # Auth JWT & role guard
│   ├── routes/       # Definisi endpoint
│   ├── utils/        # Implementasi algoritma AHP & TOPSIS
│   ├── seed.js        # Script seeding akun dummy
│   └── server.js
├── frontend/         # React + Vite SPA
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── context/
│       └── api/
└── database/
    └── database.sql  # Skema tabel + data dummy 10 perusahaan
```

## Cara Instalasi & Menjalankan

### 1. Import Database

Pastikan MySQL Server sudah berjalan, lalu import skema:

```bash
mysql -u root -p < database/database.sql
```

Ini akan membuat database `internmatch_dss` beserta tabel `users`, `perusahaan`,
`preferensi`, dan `hasil`, lengkap dengan 10 data dummy perusahaan.

### 2. Menjalankan Backend

```bash
cd backend
npm install
cp .env.example .env
# Sesuaikan isi .env dengan kredensial MySQL Anda (DB_HOST, DB_USER, DB_PASSWORD, dst.)
npm run seed     # membuat akun dummy dengan password ter-hash dengan benar
npm run dev      # menjalankan server di http://localhost:5000
```

### 3. Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev      # menjalankan aplikasi di http://localhost:5173
```

Buka browser ke `http://localhost:5173`.

## Akun Dummy (setelah menjalankan `npm run seed`)

| Role      | Email                  | Password     |
|-----------|-------------------------|--------------|
| Admin     | admin@internmatch.id    | password123  |
| Mahasiswa | budi@student.ac.id      | password123  |
| Mahasiswa | siti@student.ac.id      | password123  |

## Alur Penggunaan (Mahasiswa)

1. Login sebagai mahasiswa.
2. Buka **Daftar Tempat Magang** untuk melihat/mencari/memfilter perusahaan.
3. Buka **Isi Preferensi**, geser slider skala Saaty (1-9) untuk tiap kriteria.
4. Klik **Hitung DSS** — sistem akan menjalankan AHP untuk menghitung bobot
   kriteria. Jika Consistency Ratio (CR) > 0.1, sistem meminta preferensi
   diperbaiki. Jika CR ≤ 0.1, sistem otomatis melanjutkan ke TOPSIS untuk
   merangking seluruh perusahaan.
5. Lihat **Hasil Rekomendasi** lengkap dengan seluruh tabel perhitungan AHP
   dan TOPSIS (bisa di-export/print ke PDF melalui tombol yang tersedia).
6. Semua hasil tersimpan otomatis di halaman **Riwayat**.

## Alur Penggunaan (Admin)

1. Login sebagai admin.
2. Kelola data perusahaan magang (tambah/edit/hapus) di **Data Perusahaan**.
3. Lihat statistik jumlah perusahaan, jumlah mahasiswa, dan perusahaan
   terfavorit di **Dashboard**.
4. Lihat seluruh hasil perhitungan mahasiswa di **Hasil Perhitungan**.

## Catatan Implementasi Algoritma

Implementasi AHP dan TOPSIS berada di `backend/utils/ahpTopsis.js` dan
dilakukan secara nyata (bukan sekadar tampilan), meliputi:

- **AHP:** Pairwise Comparison Matrix → Normalisasi → Priority Vector
  (bobot) → Lambda Max (Eigen Value) → Consistency Index (CI) →
  Consistency Ratio (CR).
- **TOPSIS:** Normalisasi matriks keputusan → Normalisasi berbobot
  (menggunakan bobot dari AHP) → Solusi ideal positif/negatif → Jarak ke
  solusi ideal (D+ / D-) → Nilai preferensi (V) → Ranking.

Kode diberi komentar pada setiap tahapan agar mudah dipahami dan
dipresentasikan di depan dosen.

## Keamanan

- Password di-hash menggunakan **bcrypt**.
- Autentikasi menggunakan **JWT**.
- Semua query database menggunakan **prepared statement** (parameterized
  query via mysql2) untuk mencegah SQL Injection.
- Validasi input pada form registrasi (email unik, password minimal 8
  karakter) dan form perusahaan.
