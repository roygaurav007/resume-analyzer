# ResumeAI — AI-Powered Resume Analyzer

A full-stack MERN application that analyzes resumes using Google Gemini AI and provides ATS scores, specific weaknesses with fixes, improved bullet points, and missing keywords.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Auth
- **AI:** Google Gemini 1.5 Flash API (free tier)
- **File Handling:** Multer, pdf-parse

---

## Setup Instructions

### Step 1 — Clone and open the project
```
cd resume-analyzer
```

### Step 2 — Set up the Backend

```bash
cd server
npm install
```

Open `server/.env` and fill in your values:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=make_this_a_long_random_string
GEMINI_API_KEY=your_gemini_api_key
```

**Getting your MongoDB URI:**
1. Go to mongodb.com/atlas and open your cluster
2. Click "Connect" → "Drivers"
3. Copy the connection string (looks like: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/)
4. Replace `<password>` with your actual password

**Starting the backend:**
```bash
npm run dev
```
You should see: `MongoDB connected successfully` and `Server running on port 5000`

### Step 3 — Set up the Frontend

Open a new terminal:
```bash
cd client
npm install
npm run dev
```

Visit: http://localhost:5173

---

## Project Structure
```
resume-analyzer/
├── server/
│   ├── models/          User.js, Resume.js
│   ├── routes/          auth.js, resume.js
│   ├── middleware/      authMiddleware.js
│   ├── services/        geminiService.js
│   ├── uploads/         temp PDF storage (auto-cleared)
│   ├── index.js
│   └── .env
└── client/
    └── src/
        ├── components/  Navbar, ScoreCard, FeedbackCard, UploadBox
        ├── pages/       Login, Register, Dashboard, Analyze, Results
        ├── context/     AuthContext.jsx
        └── api/         axios.js
```

---

## Features
- JWT-based auth (register/login)
- PDF upload with drag-and-drop
- AI analysis: ATS score, weaknesses, rewritten bullets, missing keywords
- Scan history dashboard with stats
- Delete old scans
- Fully responsive (mobile-friendly)

---

## Deployment

**Frontend → Vercel:**
1. Push client/ to GitHub
2. Import on vercel.com
3. Set environment variable: `VITE_API_URL` (if needed)

**Backend → Render:**
1. Push server/ to GitHub
2. Create Web Service on render.com
3. Add all .env variables in Render dashboard
4. Set start command: `node index.js`

**Database → MongoDB Atlas** (already set up)
