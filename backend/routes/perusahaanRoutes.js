const express = require('express');
const router = express.Router();
const perusahaanController = require('../controllers/perusahaanController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', verifyToken, perusahaanController.getAll);
router.get('/stats', verifyToken, requireRole('admin'), perusahaanController.stats);
router.get('/:id', verifyToken, perusahaanController.getById);

router.post('/', verifyToken, requireRole('admin'), perusahaanController.create);
router.put('/:id', verifyToken, requireRole('admin'), perusahaanController.update);
router.delete('/:id', verifyToken, requireRole('admin'), perusahaanController.remove);

module.exports = router;
