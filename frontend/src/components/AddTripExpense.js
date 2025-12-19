import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addTripExpense } from '../api';

const AddTripExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', amount: '', category: 'Food', paidBy: '', participants: ''
  });
  const [error, setError] = useState('');

  const categories = ['Food', 'Transport', 'Accommodation', 'Entertainment', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const participantsList = formData.participants.split(',').map(p => p.trim()).filter(p => p);
      const sharePerPerson = Number(formData.amount) / participantsList.length;
      
      const participantsWithShares = participantsList.map(name => ({
        name: name,
        share: sharePerPerson
      }));
      
      await addTripExpense(id, {
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        paidBy: formData.paidBy,
        participants: participantsWithShares
      });
      navigate(`/trips/${id}/expenses`);
    } catch (err) {
      setError(`Failed to add expense: ${err.response?.data?.message || err.message}`);
      console.error('Error details:', err.response?.data || err);
    }
  };

  return (
    <div className="add-expense-container">
      <div className="header">
        <button onClick={() => navigate(`/trips/${id}/expenses`)} className="back-btn">← Back</button>
        <h2>Add Trip Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
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
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Paid By"
          value={formData.paidBy}
          onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Participants (comma separated)"
          value={formData.participants}
          onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddTripExpense;