import React, { useState } from 'react';
import { createTrip } from '../api';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTrip(formData);
      navigate(`/trips/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip');
    }
  };

  return (
    <div className="create-trip-container">
      <h2>Create New Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <input
          type="text"
          placeholder="Trip Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Trip Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
        />
        <div className="form-buttons">
          <button type="submit">Create Trip</button>
          <button type="button" onClick={() => navigate('/trips')}>Cancel</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateTrip;