import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const getExpenses = () => API.get('/expenses');
export const addExpense = (expenseData) => API.post('/expenses', expenseData);
export const updateExpense = (id, expenseData) => API.put(`/expenses/${id}`, expenseData);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

// Trip APIs
export const getTrips = () => API.get('/trips');
export const createTrip = (tripData) => API.post('/trips', tripData);
export const getTripExpenses = (tripId) => API.get(`/expenses/trip/${tripId}`);
export const addTripExpense = (tripId, expenseData) => API.post(`/expenses/trip/${tripId}`, expenseData);
export const getTripBalances = (tripId) => API.get(`/balances/trip/${tripId}`);