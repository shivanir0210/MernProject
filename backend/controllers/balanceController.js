const Expense = require('../models/Expense');

const calculateTripBalances = async (req, res) => {
  try {
    const expenses = await Expense.find({ tripId: req.params.tripId });
    
    const balances = {};
    const settlements = [];

    // Calculate who paid what and who owes what
    expenses.forEach(expense => {
      const paidBy = expense.paidBy;
      
      // Initialize balances
      if (!balances[paidBy]) balances[paidBy] = 0;
      
      expense.participants.forEach(participant => {
        if (!balances[participant.name]) balances[participant.name] = 0;
        
        if (participant.name === paidBy) {
          balances[paidBy] += expense.amount - participant.share;
        } else {
          balances[participant.name] -= participant.share;
        }
      });
    });

    // Generate settlement instructions
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([person, amount]) => {
      if (amount > 0) {
        creditors.push({ name: person, amount });
      } else if (amount < 0) {
        debtors.push({ name: person, amount: Math.abs(amount) });
      }
    });

    // Create settlements
    creditors.forEach(creditor => {
      debtors.forEach(debtor => {
        if (creditor.amount > 0 && debtor.amount > 0) {
          const settleAmount = Math.min(creditor.amount, debtor.amount);
          settlements.push(`${debtor.name} pays ${creditor.name} ₹${settleAmount}`);
          creditor.amount -= settleAmount;
          debtor.amount -= settleAmount;
        }
      });
    });

    res.json({
      tripId: req.params.tripId,
      balances,
      settlements,
      totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { calculateTripBalances };