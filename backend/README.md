# 🖥️ FinSmart Backend

The backend of FinSmart is a robust Node.js and Express.js API that handles data persistence, authentication, and AI integrations.

## 🚀 Key Features
- **RESTful API**: Clean endpoints for managing transactions, budgets, and user profiles.
- **JWT Authentication**: Secure user sessions with JSON Web Tokens.
- **Database**: MongoDB for scalable data storage.
- **AI Integration**: Leverages Google Gemini for financial analysis and insights.
- **Global Error Handling**: Centralized middleware for consistent error responses.

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (json webtokens)**
- **Bcrypt.js**
- **Google Gemini SDK**

---

## ⚙️ Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Start the server:
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

---

## 📡 Core API Modules

### `/api/auth`
- Handles user registration, login, profile updates, and password resets.

### `/api/transactions`
- CRUD operations for user financial transactions.

### `/api/dashboard`
- Aggregates data for the dashboard summary (total balance, income, expenses).

### `/api/budgets`
- Manages budget goals and tracking.

### `/api/ai`
- Endpoint for chatting with the AI financial coach.

### `/api/notifications`
- Fetches and manages user alerts.

---

## 🏗️ Folder Structure
```
backend/
├── config/        # DB and other configurations
├── controllers/   # Request handling logic
├── middleware/    # Auth and error handling filters
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── utils/         # Helper functions
└── server.js      # Entry point
```
