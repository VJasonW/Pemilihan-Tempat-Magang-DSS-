const express = require('express');
const router = express.Router();
const hasilController = require('../controllers/hasilController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.post('/proses', verifyToken, hasilController.proses);
router.get('/preferensi', verifyToken, hasilController.getPreferensi);
router.get('/terakhir', verifyToken, hasilController.hasilTerakhir);
router.get('/riwayat', verifyToken, hasilController.riwayat);
router.get('/semua', verifyToken, requireRole('admin'), hasilController.semuaHasil);

module.exports = router;
