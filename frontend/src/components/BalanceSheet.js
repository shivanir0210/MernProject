import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripBalances } from '../api';
import SettlementSummary from './SettlementSummary';

const BalanceSheet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [balances, setBalances] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const { data } = await getTripBalances(id);
        setBalances(data.balances || {});
        setSettlements(data.settlements || []);
        setTotalExpenses(data.totalExpenses || 0);
      } catch (err) {
        setError('Failed to fetch balances');
      }
    };
    fetchBalances();
  }, [id]);

  return (
    <div className="balance-sheet">
      <div className="header">
        <button onClick={() => navigate(`/trips/${id}`)} className="back-btn">← Dashboard</button>
        <h2>Balance Sheet</h2>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="total-section">
        <h3>Total Trip Cost: ₹{totalExpenses || 0}</h3>
      </div>

      <div className="balances-section">
        <h3>Individual Balances</h3>
        <div className="balance-list">
          {Object.entries(balances).map(([person, amount]) => (
            <div key={person} className={`balance-item ${amount >= 0 ? 'positive' : 'negative'}`}>
              <span className="person-name">{person}</span>
              <span className="balance-amount">
                {amount >= 0 ? '+' : ''}₹{amount}
              </span>
              <span className="balance-status">
                {amount >= 0 ? ' (gets back)' : ' (owes)'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SettlementSummary settlements={settlements} />
    </div>
  );
};

export default BalanceSheet;