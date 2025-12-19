import React, { useState } from 'react';
import { addExpense } from '../api';

const AddExpense = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({ title: '', amount: '', paidBy: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({ ...formData, amount: Number(formData.amount) });
      setFormData({ title: '', amount: '', paidBy: '' });
      onExpenseAdded();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <div className="expense-form">
      <h3>Add New Expense</h3>
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
        <button type="submit">Add Expense</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddExpense;