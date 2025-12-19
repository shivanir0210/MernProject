import React, { useState, useEffect } from 'react';
import { updateExpense } from '../api';

const EditExpense = ({ expense, onExpenseUpdated, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', amount: '', paidBy: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        paidBy: expense.paidBy
      });
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(expense._id, { ...formData, amount: Number(formData.amount) });
      onExpenseUpdated();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update expense');
    }
  };

  return (
    <div className="expense-form">
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Paid By"
          value={formData.paidBy}
          onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
          required
        />
        <div className="form-buttons">
          <button type="submit">Update Expense</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditExpense;