import React from 'react';

const SettlementSummary = ({ settlements }) => {
  return (
    <div className="settlement-summary">
      <h3>Settlement Instructions</h3>
      
      {!settlements || settlements.length === 0 ? (
        <p className="no-settlements">All balances are settled!</p>
      ) : (
        <div className="settlement-list">
          {settlements.map((settlement, index) => (
            <div key={index} className="settlement-item">
              {settlement}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettlementSummary;