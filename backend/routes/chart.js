const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const auth = require('../middleware/auth');  // ✅ FIXED

// Generate chart
router.post('/generate', auth, chartController.generateChart);

// Get chart history for logged-in user
router.get('/history/:userId', auth, chartController.getChartHistory);

module.exports = router;
