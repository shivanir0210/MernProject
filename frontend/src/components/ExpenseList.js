import React, { useState, useEffect } from 'react';
import { getExpenses, deleteExpense } from '../api';
import { useNavigate } from 'react-router-dom';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';

const ExpenseList = ({ user, onLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const { data } = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleExpenseUpdated = () => {
    setEditingExpense(null);
    fetchExpenses();
  };

  return (
    <div className="expense-container">
      <div className="header">
        <h2>All Expenses - Welcome {user.name}</h2>
        <div className="nav-buttons">
          <button onClick={() => navigate('/trips')} className="nav-btn">My Trips</button>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {editingExpense ? (
        <EditExpense
          expense={editingExpense}
          onExpenseUpdated={handleExpenseUpdated}
          onCancel={() => setEditingExpense(null)}
        />
      ) : (
        <AddExpense onExpenseAdded={fetchExpenses} />
      )}

      {error && <p className="error">{error}</p>}

      <div className="expense-list">
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses found. Add your first expense above!</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense._id} className="expense-item">
              <div className="expense-details">
                <h4>{expense.title}</h4>
                <p>Amount: ₹{expense.amount}</p>
                <p>Paid by: {expense.paidBy}</p>
                <p>Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="expense-actions">
                <button onClick={() => setEditingExpense(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;