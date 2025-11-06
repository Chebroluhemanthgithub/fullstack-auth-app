# Fullstack Auth App

A **full-stack authentication app** built with **React.js (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
It includes **user registration, login, JWT-based authentication, protected routes**, and **localStorage session handling**.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local)
- **Authentication:** JWT (JSON Web Token)
- **HTTP Requests:** Axios

---

## 🔥 Features

- User Registration with duplicate email check
- Login with JWT authentication
- Protected Dashboard route
- Responsive design (desktop & mobile)
- Dark-themed UI
- LocalStorage session persistence


---

### 1. Clone the repository

git clone https://github.com/Chebroluhemanthgithub/fullstack-auth-app.git



Backend Setup
cd backend
npm install


Create a .env file (never commit this):

PORT=5000
MONGO_URI=
JWT_SECRET=


Start backend:

npm run dev

3. Frontend Setup
cd frontend
npm install


You can use .env for frontend (public API URL only):

VITE_API_URL=http://localhost:5000/api


Start frontend:

npm run dev


Now open http://localhost:5173
 in your browser.

✅ Usage

Register a new user account.

Login with registered credentials.

Access protected Dashboard after authentication.

⚠️ Notes

Do NOT commit backend/.env (contains secrets)

Frontend .env is safe to commit if it only contains the public API URL

LocalStorage is used for session persistence in this demo

