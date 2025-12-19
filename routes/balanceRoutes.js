const express = require('express');
const { calculateTripBalances } = require('../controllers/balanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/trip/:tripId', protect, calculateTripBalances);

module.exports = router;