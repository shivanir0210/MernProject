import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseList from './components/ExpenseList';
import TripList from './components/TripList';
import CreateTrip from './components/CreateTrip';
import TripDashboard from './components/TripDashboard';
import TripExpenseList from './components/TripExpenseList';
import AddTripExpense from './components/AddTripExpense';
import BalanceSheet from './components/BalanceSheet';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/expenses" /> : <Login setUser={handleSetUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/expenses" /> : <Register setUser={handleSetUser} />} 
          />
          <Route 
            path="/expenses" 
            element={user ? <ExpenseList user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips" 
            element={user ? <TripList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips/create" 
            element={user ? <CreateTrip /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips/:id" 
            element={user ? <TripDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips/:id/expenses" 
            element={user ? <TripExpenseList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips/:id/add-expense" 
            element={user ? <AddTripExpense /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/trips/:id/balances" 
            element={user ? <BalanceSheet /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={user ? "/trips" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;