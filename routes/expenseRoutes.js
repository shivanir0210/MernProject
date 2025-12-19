const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense, addTripExpense, getTripExpenses } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getExpenses).post(protect, addExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);
router.route('/trip/:tripId').get(protect, getTripExpenses).post(protect, addTripExpense);

module.exports = router;