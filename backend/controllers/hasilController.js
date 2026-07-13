// ============================================================
// Controller Proses Perhitungan DSS (AHP + TOPSIS)
// Alur:
//  1. Mahasiswa mengirim skor kepentingan tiap kriteria (1-9)
//  2. Backend menghitung AHP -> menghasilkan bobot & Consistency Ratio (CR)
//  3. Jika CR > 0.1 -> kembalikan pesan "belum konsisten", TIDAK lanjut TOPSIS
//  4. Jika CR <= 0.1 -> lanjutkan ke TOPSIS menggunakan bobot AHP
//  5. Simpan hasil ranking ke tabel `hasil` dan preferensi ke tabel `preferensi`
// ============================================================
const pool = require('../config/db');
const { hitungAHP, hitungTOPSIS, buatPenjelasan, KRITERIA } = require('../utils/ahpTopsis');

exports.proses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { relevansi, reputasi, jarak, uang_saku, peluang_rekrut, fleksibilitas } = req.body;

    const skor = [relevansi, reputasi, jarak, uang_saku, peluang_rekrut, fleksibilitas];
    if (skor.some((s) => s === undefined || s === null || isNaN(s) || s < 1 || s > 9)) {
      return res.status(400).json({
        message: 'Semua skor kepentingan kriteria wajib diisi dengan skala 1-9.',
      });
    }

    // ---------- STEP 1: HITUNG AHP ----------
    const ahpResult = hitungAHP(skor.map(Number));

    if (!ahpResult.konsisten) {
      // CR > 0.1 -> hentikan proses, jangan lanjut ke TOPSIS
      return res.status(200).json({
        konsisten: false,
        pesan: 'Perbandingan belum konsisten.',
        ahp: ahpResult,
      });
    }

    // Simpan preferensi mahasiswa
    await pool.query(
      `INSERT INTO preferensi (user_id, relevansi, reputasi, jarak, uang_saku, peluang_rekrut, fleksibilitas)
       VALUES (?,?,?,?,?,?,?)`,
      [userId, relevansi, reputasi, jarak, uang_saku, peluang_rekrut, fleksibilitas]
    );

    // ---------- STEP 2: AMBIL DATA PERUSAHAAN ----------
    const [perusahaanList] = await pool.query('SELECT * FROM perusahaan');
    if (perusahaanList.length === 0) {
      return res.status(400).json({ message: 'Data perusahaan kosong.' });
    }

    // ---------- STEP 3: HITUNG TOPSIS ----------
    const topsisResult = hitungTOPSIS(perusahaanList, ahpResult.priorityVector);

    // ---------- STEP 4: SIMPAN HASIL RANKING ----------
    // Hapus hasil lama milik user ini agar riwayat tidak duplikat per sesi (opsional: kita simpan sebagai riwayat baru)
    const insertPromises = topsisResult.hasilRanking.map((item) =>
      pool.query(
        `INSERT INTO hasil (user_id, perusahaan_id, nilai_preferensi, ranking, cr_value)
         VALUES (?,?,?,?,?)`,
        [userId, item.perusahaan_id, item.nilai_preferensi, item.ranking, ahpResult.consistencyRatio]
      )
    );
    await Promise.all(insertPromises);

    // ---------- STEP 5: SUSUN RESPON DENGAN PENJELASAN OTOMATIS ----------
    const perusahaanMap = {};
    perusahaanList.forEach((p) => (perusahaanMap[p.id] = p));

    const rankingLengkap = topsisResult.hasilRanking.map((item) => {
      const p = perusahaanMap[item.perusahaan_id];
      return {
        ...item,
        perusahaan: p,
        penjelasan: buatPenjelasan(p),
      };
    });

    return res.json({
      konsisten: true,
      ahp: ahpResult,
      topsis: { ...topsisResult, hasilRanking: rankingLengkap },
    });
  } catch (err) {
    console.error('Proses DSS error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan saat memproses perhitungan DSS.' });
  }
};

// Ambil hasil rekomendasi terakhir milik mahasiswa (untuk dashboard)
exports.hasilTerakhir = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT h.*, p.nama as nama_perusahaan, p.bidang, p.lokasi
       FROM hasil h
       JOIN perusahaan p ON p.id = h.perusahaan_id
       WHERE h.user_id = ?
       ORDER BY h.tanggal DESC
       LIMIT 6`,
      [userId]
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Gagal mengambil hasil terakhir.' });
  }
};

// Riwayat lengkap semua hasil rekomendasi mahasiswa, dikelompokkan per sesi (tanggal)
exports.riwayat = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT h.*, p.nama as nama_perusahaan, p.bidang, p.lokasi, p.uang_saku
       FROM hasil h
       JOIN perusahaan p ON p.id = h.perusahaan_id
       WHERE h.user_id = ?
       ORDER BY h.tanggal DESC, h.ranking ASC`,
      [userId]
    );

    // Kelompokkan berdasarkan timestamp (dibulatkan ke menit yang sama = 1 sesi perhitungan)
    const grouped = {};
    rows.forEach((row) => {
      const key = new Date(row.tanggal).toISOString().slice(0, 16); // per menit
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(row);
    });

    const sesi = Object.entries(grouped).map(([tanggal, items]) => ({
      tanggal,
      items: items.sort((a, b) => a.ranking - b.ranking),
    }));

    return res.json(sesi);
  } catch (err) {
    return res.status(500).json({ message: 'Gagal mengambil riwayat.' });
  }
};

// Untuk admin: lihat semua hasil perhitungan seluruh mahasiswa
exports.semuaHasil = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT h.*, u.nama as nama_mahasiswa, u.nim, p.nama as nama_perusahaan
       FROM hasil h
       JOIN users u ON u.id = h.user_id
       JOIN perusahaan p ON p.id = h.perusahaan_id
       ORDER BY h.tanggal DESC`
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Gagal mengambil data hasil.' });
  }
};

// Ambil preferensi terakhir milik mahasiswa untuk inisialisasi urutan kriteria
exports.getPreferensi = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT relevansi, reputasi, jarak, uang_saku, peluang_rekrut, fleksibilitas 
       FROM preferensi 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );
    if (rows.length === 0) {
      return res.json(null);
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error('Gagal mengambil preferensi:', err);
    return res.status(500).json({ message: 'Gagal mengambil preferensi.' });
  }
};
