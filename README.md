# Legacy FE Candidate Assignment
## 🚀 Live Demo
- Frontend (Vercel): https://legacy-fe-candidate-assignment-lf25.vercel.app/
- Backend (Render): https://legacy-fe-candidate-assignment-1gx8.onrender.com

---

## 📦 Project Structure
- `/frontend-vite` → Modern Vite + React + TypeScript app (deployed on Vercel)
- `/backend`    → Express + TypeScript API (deployed on Render)

---

## ⚡ Tech Stack
- Frontend (Vite): React 19, TypeScript, Vite, Vitest, Testing Library
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
cd frontend-vite
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

### 🧪 Testing

#### Frontend (Vite):
```bash
cd frontend-vite
# Run tests
npm run test

# Generate test coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

#### Backend:
```bash
cd backend
npm run test
```

---

### 🔑 Environment Variables
#### Frontend
```bash
VITE_BACKEND_URL=https://legacy-fe-candidate-assignment-1gx8.onrender.com
```
or 

```bash
VITE_BACKEND_URL=http://localhost:4000  # for local development
```

#### Backend
```bash
PORT=4000
```
For local development, create a .env file in each folder.

---

### 📖 Notes
- Bonus requirement met: Deployed FE (Vercel) + BE (Render).
- The frontend-vite implementation includes modern tooling with Vite and comprehensive test setup.
- If backend sleeps on free Render plan, first request may take a few seconds.
- Project structured for easy local development & deployment.
