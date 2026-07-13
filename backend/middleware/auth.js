// ============================================================
// Middleware autentikasi JWT dan otorisasi berbasis role.
// ============================================================
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Memverifikasi token JWT yang dikirim melalui header Authorization
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login kembali.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
    }
    req.user = decoded; // { id, nama, email, role }
    next();
  });
}

// Membatasi akses hanya untuk role tertentu, contoh: requireRole('admin')
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Anda tidak memiliki akses ke resource ini.' });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
