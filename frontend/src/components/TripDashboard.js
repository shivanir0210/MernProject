import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripExpenses } from '../api';

const TripDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const { data } = await getTripExpenses(id);
        const total = data.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpenses(total);
        setTripData({ expenses: data });
      } catch (err) {
        setError('Failed to fetch trip data');
      }
    };
    fetchTripData();
  }, [id]);

  return (
    <div className="trip-dashboard">
      <div className="dashboard-header">
        <button onClick={() => navigate('/trips')} className="back-btn">← Back to Trips</button>
        <h2>Trip Dashboard</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">₹{totalExpenses}</p>
        </div>
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p className="stat-value">{tripData?.expenses?.length || 0}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate(`/trips/${id}/expenses`)} className="action-btn">
          View Expenses
        </button>
        <button onClick={() => navigate(`/trips/${id}/balances`)} className="action-btn">
          View Balances
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TripDashboard;