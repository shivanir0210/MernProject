import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripExpenses, addTripExpense, deleteExpense } from '../api';

const TripExpenseList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const { data } = await getTripExpenses(id);
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [id]);



  const handleDelete = async (expenseId) => {
    if (window.confirm('Delete this expense?')) {
      try {
        await deleteExpense(expenseId);
        fetchExpenses();
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  return (
    <div className="trip-expenses">
      <div className="header">
        <button onClick={() => navigate(`/trips/${id}`)} className="back-btn">← Dashboard</button>
        <h2>Trip Expenses</h2>
        <button onClick={() => navigate(`/trips/${id}/add-expense`)} className="add-btn">
          Add Expense
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-card">
            <div className="expense-header">
              <h4>{expense.title}</h4>
              <span className="category-tag">{expense.category}</span>
            </div>
            <div className="expense-details">
              <p>Amount: ₹{expense.amount}</p>
              <p>Paid by: {expense.paidBy}</p>
              <p>Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(expense._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripExpenseList;