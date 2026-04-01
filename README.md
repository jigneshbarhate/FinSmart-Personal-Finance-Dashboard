# 💸 FinSmart – Personal Finance Dashboard

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://ai.google.dev/)

## 🚀 Overview

FinSmart is a comprehensive **Full-Stack Personal Finance Management** application. It empowers users to take control of their finances with real-time tracking, beautiful data visualizations, and AI-powered financial insights.

### Key Features
*   **Secure Authentication**: JWT-based user login and registration.
*   **Interactive Dashboard**: Real-time summary of balance, income, and expenses.
*   **Transaction Management**: Add, edit, delete, and filter financial transactions.
*   **Budgeting Goals**: Set and monitor monthly budget targets.
*   **AI Financial Coach**: Chat with an AI assistant powered by Google Gemini for personalized financial advice.
*   **Data Visualization**: Clean charts for visualizing spending patterns.
*   **Notifications**: Real-time updates on budget limits and account activity.

---

## 🧩 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API
- **API Client**: Axios
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & Bcrypt
- **AI Integration**: Google Gemini AI (@google/genai)

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/jigneshbarhate/FinSmart-Personal-Finance-Dashboard.git
cd FinSmart
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
Run the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📡 API Documentation

All API routes are prefixed with `/api`.

### Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT | No |
| PUT | `/auth/profile` | Update user profile | Yes |
| DELETE | `/auth/profile` | Delete user account | Yes |
| PUT | `/auth/password` | Update user password | Yes |

### Transactions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/transactions` | Get all user transactions |
| POST | `/transactions` | Create a new transaction |
| GET | `/transactions/:id` | Get single transaction |
| PUT | `/transactions/:id` | Update transaction |
| DELETE | `/transactions/:id` | Delete transaction |

### Dashboard & Insights
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/dashboard/summary` | Get financial summary |
| POST | `/ai/chat` | Chat with Gemini AI coach |
| GET | `/budgets` | Get budget summary |
| POST | `/budgets` | Set monthly budget |

### Notifications
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/notifications` | Get user notifications |
| PUT | `/notifications/read` | Mark notifications as read |

---

## 🎨 UI Design Principles
- **Modern & Minimal**: Focus on data and clarity.
- **Responsive**: Seamless experience across mobile, tablet, and desktop.
- **Trust-Based Palette**: Professional blues and greens.

---

## 📜 License
Internal Project - All Rights Reserved.
