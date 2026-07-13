-- ============================================================
-- InternMatch DSS - Database Schema & Dummy Data
-- Sistem Pendukung Keputusan Pemilihan Tempat Magang
-- Metode: AHP (pembobotan kriteria) + TOPSIS (perangkingan)
-- ============================================================

CREATE DATABASE IF NOT EXISTS internmatch_dss;
USE internmatch_dss;

-- ============================================================
-- TABEL USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nim VARCHAR(20) DEFAULT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','mahasiswa') NOT NULL DEFAULT 'mahasiswa',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABEL PERUSAHAAN
-- Kriteria DSS:
--  relevansi_ti    (Benefit) 1-100
--  reputasi        (Benefit) 1-100
--  lokasi          (Cost)    jarak dalam km
--  uang_saku       (Benefit) rupiah
--  peluang_rekrut  (Benefit) 1-100
--  fleksibilitas   (Benefit) 1-100
-- ============================================================
CREATE TABLE IF NOT EXISTS perusahaan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  bidang VARCHAR(100) NOT NULL,
  lokasi VARCHAR(150) NOT NULL,
  jarak_km DECIMAL(6,2) NOT NULL DEFAULT 0,
  alamat VARCHAR(255) DEFAULT NULL,
  deskripsi TEXT,
  tipe_kerja ENUM('WFH','Hybrid','Office') DEFAULT 'Office',
  logo VARCHAR(255) DEFAULT NULL,
  uang_saku INT NOT NULL DEFAULT 0,
  reputasi DECIMAL(5,2) NOT NULL DEFAULT 0,
  relevansi_ti DECIMAL(5,2) NOT NULL DEFAULT 0,
  peluang_rekrut DECIMAL(5,2) NOT NULL DEFAULT 0,
  fleksibilitas DECIMAL(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABEL PREFERENSI (bobot kepentingan kriteria per mahasiswa, skala Saaty 1-9)
-- Disimpan sebagai matriks perbandingan berpasangan versi ringkas:
-- kita simpan tingkat kepentingan tiap kriteria (1-9) lalu diproses jadi
-- pairwise comparison matrix di backend.
-- ============================================================
CREATE TABLE IF NOT EXISTS preferensi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  relevansi INT NOT NULL DEFAULT 5,
  reputasi INT NOT NULL DEFAULT 5,
  jarak INT NOT NULL DEFAULT 5,
  uang_saku INT NOT NULL DEFAULT 5,
  peluang_rekrut INT NOT NULL DEFAULT 5,
  fleksibilitas INT NOT NULL DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- TABEL HASIL
-- ============================================================
CREATE TABLE IF NOT EXISTS hasil (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  perusahaan_id INT NOT NULL,
  nilai_preferensi DECIMAL(10,6) NOT NULL,
  ranking INT NOT NULL,
  cr_value DECIMAL(10,6) DEFAULT NULL,
  tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (perusahaan_id) REFERENCES perusahaan(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- DATA DUMMY: USERS
-- CATATAN: Password akun dummy di-generate & di-hash (bcrypt) otomatis
-- melalui script backend/seed.js agar hash selalu valid.
-- Jalankan: node seed.js  (lihat README.md)
-- Password default semua akun dummy = "password123"
-- ============================================================

-- ============================================================
-- DATA DUMMY: PERUSAHAAN (10 perusahaan)
-- ============================================================
INSERT INTO perusahaan
(nama, bidang, lokasi, jarak_km, alamat, deskripsi, tipe_kerja, uang_saku, reputasi, relevansi_ti, peluang_rekrut, fleksibilitas)
VALUES
('PT Telkom Indonesia', 'Telekomunikasi & IT', 'Jakarta', 2.5, 'Jl. Jend. Gatot Subroto No.52, Jakarta', 'BUMN telekomunikasi terbesar di Indonesia dengan banyak proyek digital dan infrastruktur IT.', 'Hybrid', 1500000, 95.0, 75.0, 55.0, 50.0),
('Bank Central Asia (BCA)', 'Perbankan & IT', 'Jakarta', 12.0, 'Jl. MH Thamrin No.1, Jakarta', 'Bank swasta terbesar dengan divisi IT yang kuat untuk sistem perbankan digital.', 'Office', 2500000, 95.0, 75.0, 90.0, 30.0),
('Astra International', 'Otomotif & IT', 'Jakarta', 8.5, 'Jl. Gaya Motor Raya No.8, Jakarta', 'Perusahaan otomotif dengan divisi IT untuk sistem ERP dan digitalisasi bisnis.', 'Office', 1800000, 95.0, 55.0, 75.0, 50.0),
('Shopee Indonesia', 'E-Commerce', 'Jakarta', 15.0, 'Jl. Jend. Sudirman Kav 25, Jakarta', 'Platform e-commerce terbesar di Asia Tenggara dengan tim engineering yang besar.', 'Hybrid', 3000000, 95.0, 95.0, 75.0, 30.0),
('Tokopedia', 'E-Commerce', 'Jakarta', 9.0, 'Jl. Prof. Dr. Satrio, Jakarta', 'Platform e-commerce lokal dengan budaya kerja modern dan proyek teknologi tinggi.', 'Hybrid', 2800000, 75.0, 95.0, 75.0, 70.0),
('Traveloka', 'Teknologi & Pariwisata', 'Jakarta', 10.5, 'Jl. Let. Jend. TB Simatupang, Jakarta', 'Perusahaan travel-tech dengan produk berbasis aplikasi mobile dan web.', 'Hybrid', 2000000, 75.0, 95.0, 55.0, 90.0),
('Gojek (GoTo)', 'Teknologi & Transportasi', 'Jakarta', 6.0, 'Jl. Asia Afrika No.8, Jakarta', 'Super-app teknologi dengan proyek microservices dan big data skala besar.', 'Hybrid', 1200000, 95.0, 95.0, 75.0, 70.0),
('Kementerian Kominfo', 'Pemerintahan & IT', 'Jakarta', 4.0, 'Jl. Medan Merdeka Barat No.9, Jakarta', 'Instansi pemerintah yang menangani kebijakan dan proyek digitalisasi nasional.', 'Office', 800000, 75.0, 55.0, 30.0, 50.0),
('PT PLN (Persero)', 'Energi & IT', 'Jakarta', 7.0, 'Jl. Trunojoyo Blok M I/135, Jakarta', 'BUMN kelistrikan dengan sistem informasi skala nasional dan smart grid.', 'Office', 1400000, 75.0, 55.0, 55.0, 30.0),
('Dinas Kominfo Kota Semarang', 'Pemerintahan & IT', 'Semarang', 1.2, 'Jl. Pemuda No.148, Semarang', 'Instansi pemerintah daerah yang mengelola sistem informasi dan layanan publik digital kota.', 'Office', 500000, 55.0, 55.0, 30.0, 70.0);
