# Travel Expense Splitter Frontend

A React.js frontend application for managing travel expenses that integrates with the MERN backend API.

## Features

- User authentication (Register/Login)
- JWT token management
- Add, view, edit, and delete expenses
- Responsive design
- Protected routes

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## Backend Integration

Make sure your backend server is running on `http://localhost:3001` before using the frontend.

## API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ExpenseList.js
│   │   ├── AddExpense.js
│   │   └── EditExpense.js
│   ├── api.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Usage

1. Register a new account or login with existing credentials
2. Add expenses with title, amount, and payer information
3. View all your expenses in a list format
4. Edit or delete expenses as needed
5. Logout when done