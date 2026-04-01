# 🎨 FinSmart Frontend

The frontend of FinSmart is a modern, responsive React-based dashboard built for a seamless personal finance management experience.

## ✨ Key Features
- **Intuitive Dashboard**: Overview of current balance, spending, and income.
- **Transaction History**: Searchable and filterable transaction table.
- **Interactive Charts**: Visual breakdown of financial data using Recharts.
- **Responsive Layout**: Designed for mobile-first access with a collapsible sidebar.
- **Global Data Hub**: Centralized state management using React Context.
- **AI Chatbot UI**: Integrated chat bubble to interact with the financial coach.

---

## 🛠️ Tech Stack
- **React.js (Vite)**
- **Tailwind CSS**
- **Lucide Icons**
- **Recharts**
- **Axios**
- **React Router**
- **React Toastify**

---

## 🏗️ Folder Structure
```
frontend/src/
├── api/          # Axios instance and API calls
├── components/   # Reusable UI components
├── context/      # Global state management
├── pages/        # Main application views
├── routes/       # Route definitions
├── utils/        # Generic helpers
└── App.jsx       # Root component
```

---

## ⚙️ Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

The application runs on `http://localhost:5173` by default.
