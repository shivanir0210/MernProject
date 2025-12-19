const express = require('express');
const { getTrips, createTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getTrips).post(protect, createTrip);

module.exports = router;