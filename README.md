# Legacy FE Candidate Assignment
## 🚀 Live Demo
- Frontend (Vercel): https://legacy-fe-candidate-assignment-lf25.vercel.app/
- Backend (Render): https://legacy-fe-candidate-assignment-1gx8.onrender.com

---

## 📦 Project Structure
- /frontend   → React app (deployed on Vercel)
- /backend    → Express + TypeScript API (deployed on Render)

---

## ⚡ Tech Stack
- Frontend: React, TypeScript, Vercel
- Backend: Express, TypeScript, Render

---

## 🛠️ Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/komangsidhiartha/legacy-fe-candidate-assignment.git
cd legacy-fe-candidate-assignment
```

---

### 2. Install dependencies

#### Frontend:
```bash
cd frontend
npm install
npm run dev   # runs on http://localhost:5173
```

#### Backend:
```bash
cd backend
npm install
npm run dev   # runs on http://localhost:4000
```

---

### 🔑 Environment Variables
#### Frontend (Vercel)
```bash
VITE_BACKEND_URL=https://legacy-fe-candidate-assignment-1gx8.onrender.com
```

#### Backend (Render)
```bash
PORT=4000
```
For local development, create a .env file in each folder.

---

### 🧪 Testing
Currently minimal:
```bash
npm run test
```

---

### 📖 Notes
- Bonus requirement met: Deployed FE (Vercel) + BE (Render).
- If backend sleeps on free Render plan, first request may take a few seconds.
- Project structured for easy local dev & deployment.
