const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ createdBy: req.user._id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addExpense = async (req, res) => {
  const { title, amount, paidBy } = req.body;

  try {
    const expense = new Expense({
      title,
      amount,
      paidBy,
      createdBy: req.user._id,
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.createdBy.toString() === req.user._id.toString()) {
      expense.title = req.body.title || expense.title;
      expense.amount = req.body.amount || expense.amount;
      expense.paidBy = req.body.paidBy || expense.paidBy;
      expense.category = req.body.category || expense.category;
      expense.participants = req.body.participants || expense.participants;

      const updatedExpense = await expense.save();
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.createdBy.toString() === req.user._id.toString()) {
      await Expense.findByIdAndDelete(req.params.id);
      res.json({ message: 'Expense removed' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTripExpense = async (req, res) => {
  const { title, amount, paidBy, category, participants } = req.body;

  try {
    const expense = new Expense({
      title,
      amount,
      paidBy,
      category,
      participants,
      tripId: req.params.tripId,
      createdBy: req.user._id,
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ tripId: req.params.tripId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense, addTripExpense, getTripExpenses };