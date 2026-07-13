// ============================================================
// Controller Data Perusahaan (CRUD)
// Semua query menggunakan prepared statement.
// Mendukung pencarian, filter (lokasi, bidang, min. uang saku), dan sorting.
// ============================================================
const pool = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const { search, lokasi, bidang, minUangSaku, sortBy, order } = req.query;

    let sql = 'SELECT * FROM perusahaan WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (nama LIKE ? OR bidang LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (lokasi) {
      sql += ' AND lokasi LIKE ?';
      params.push(`%${lokasi}%`);
    }
    if (bidang) {
      sql += ' AND bidang LIKE ?';
      params.push(`%${bidang}%`);
    }
    if (minUangSaku) {
      sql += ' AND uang_saku >= ?';
      params.push(Number(minUangSaku));
    }

    const allowedSort = ['nama', 'uang_saku', 'reputasi', 'jarak_km', 'relevansi_ti'];
    const sortColumn = allowedSort.includes(sortBy) ? sortBy : 'id';
    const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sortColumn} ${sortOrder}`;

    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal mengambil data perusahaan.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM perusahaan WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Perusahaan tidak ditemukan.' });
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      nama, bidang, lokasi, jarak_km, alamat, deskripsi, tipe_kerja, logo,
      uang_saku, reputasi, relevansi_ti, peluang_rekrut, fleksibilitas,
    } = req.body;

    if (!nama || !bidang || !lokasi) {
      return res.status(400).json({ message: 'Nama, bidang, dan lokasi wajib diisi.' });
    }

    const [result] = await pool.query(
      `INSERT INTO perusahaan
      (nama, bidang, lokasi, jarak_km, alamat, deskripsi, tipe_kerja, logo, uang_saku, reputasi, relevansi_ti, peluang_rekrut, fleksibilitas)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nama, bidang, lokasi, jarak_km || 0, alamat || null, deskripsi || null,
        tipe_kerja || 'Office', logo || null, uang_saku || 0, reputasi || 0,
        relevansi_ti || 0, peluang_rekrut || 0, fleksibilitas || 0,
      ]
    );

    return res.status(201).json({ message: 'Perusahaan berhasil ditambahkan.', id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal menambahkan perusahaan.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama, bidang, lokasi, jarak_km, alamat, deskripsi, tipe_kerja, logo,
      uang_saku, reputasi, relevansi_ti, peluang_rekrut, fleksibilitas,
    } = req.body;

    const [existing] = await pool.query('SELECT id FROM perusahaan WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Perusahaan tidak ditemukan.' });

    await pool.query(
      `UPDATE perusahaan SET nama=?, bidang=?, lokasi=?, jarak_km=?, alamat=?, deskripsi=?,
       tipe_kerja=?, logo=?, uang_saku=?, reputasi=?, relevansi_ti=?, peluang_rekrut=?, fleksibilitas=?
       WHERE id=?`,
      [
        nama, bidang, lokasi, jarak_km || 0, alamat || null, deskripsi || null,
        tipe_kerja || 'Office', logo || null, uang_saku || 0, reputasi || 0,
        relevansi_ti || 0, peluang_rekrut || 0, fleksibilitas || 0, id,
      ]
    );

    return res.json({ message: 'Perusahaan berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal memperbarui perusahaan.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT id FROM perusahaan WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Perusahaan tidak ditemukan.' });

    await pool.query('DELETE FROM perusahaan WHERE id = ?', [id]);
    return res.json({ message: 'Perusahaan berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal menghapus perusahaan.' });
  }
};

exports.stats = async (req, res) => {
  try {
    const [[{ totalPerusahaan }]] = await pool.query('SELECT COUNT(*) as totalPerusahaan FROM perusahaan');
    const [[{ totalMahasiswa }]] = await pool.query(
      "SELECT COUNT(*) as totalMahasiswa FROM users WHERE role = 'mahasiswa'"
    );
    const [favorit] = await pool.query(
      `SELECT p.id, p.nama, COUNT(h.id) as jumlah_dipilih
       FROM hasil h
       JOIN perusahaan p ON p.id = h.perusahaan_id
       WHERE h.ranking = 1
       GROUP BY p.id, p.nama
       ORDER BY jumlah_dipilih DESC
       LIMIT 5`
    );

    return res.json({ totalPerusahaan, totalMahasiswa, favorit });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal mengambil statistik.' });
  }
};
