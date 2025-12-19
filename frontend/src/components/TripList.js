import React, { useState, useEffect } from 'react';
import { getTrips } from '../api';
import { useNavigate } from 'react-router-dom';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await getTrips();
        setTrips(data);
      } catch (err) {
        setError('Failed to fetch trips');
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="trip-container">
      <div className="header">
        <h2>My Trips</h2>
        <button onClick={() => navigate('/trips/create')} className="create-btn">
          Create New Trip
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="trip-grid">
        {trips.length === 0 ? (
          <p>No trips found. Create your first trip!</p>
        ) : (
          trips.map((trip) => (
            <div key={trip._id} className="trip-card" onClick={() => navigate(`/trips/${trip._id}`)}>
              <h3>{trip.name}</h3>
              <p>{trip.description}</p>
              <div className="trip-meta">
                <span>{trip.members?.length || 0} members</span>
                <span>₹{trip.totalExpenses || 0}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripList;