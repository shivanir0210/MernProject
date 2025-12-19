const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  category: {
    type: String,
    default: 'General',
  },
  participants: [{
    name: String,
    share: Number,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Expense', expenseSchema);