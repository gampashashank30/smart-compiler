# SmartCompiler 🚀

> A modern, AI-powered web-based compiler with real-time terminal emulation, multi-language support, and an integrated AI tutor — all running in sandboxed Docker containers.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Real-Time Terminal** | Full PTY terminal emulation via `xterm.js` and WebSockets |
| 🧠 **AI Code Assistant** | Groq-powered AI for code explanations, hints, and tutoring |
| 🌐 **Multi-Language Support** | Auto-detects and compiles C, C++, Python, Java, and more |
| 🐳 **Docker Sandboxing** | Isolated, secure code execution inside Docker containers |
| 📜 **Compilation History** | Persistent log of all past runs with output replay |
| 🐛 **Bug Tracker** | Integrated issue tracker tied to your compilation sessions |
| 📊 **Analytics Panel** | Usage stats, performance metrics, and session insights |
| 👨‍🏫 **AI Tutor** | Interactive tutor with diagrams, quizzes, and guided lessons |
| 🔐 **Auth & Admin** | Supabase authentication + Google OAuth + Admin dashboard |
| 📂 **File Upload** | Upload `.c`, `.cpp`, `.py`, `.docx`, and image files (OCR via Tesseract) |

---

## 🏗️ Tech Stack

**Frontend**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [`@xterm/xterm`](https://xtermjs.org/) — terminal emulation
- [`@supabase/supabase-js`](https://supabase.com/docs/reference/javascript) — auth & database
- [`tesseract.js`](https://tesseract.projectnaptha.com/) — OCR for image-to-code uploads
- [`mammoth`](https://github.com/mwilliamson/mammoth.js) — `.docx` parsing

**Backend**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [`ws`](https://github.com/websockets/ws) — WebSocket server
- [`node-pty`](https://github.com/microsoft/node-pty) — pseudo-terminal sessions
- [`passport`](http://www.passportjs.org/) + Google OAuth 2.0
- [`pg`](https://node-postgres.com/) — PostgreSQL via Supabase
- [`helmet`](https://helmetjs.github.io/), `express-rate-limit` — security hardening

**Infrastructure**
- [Docker](https://www.docker.com/) — sandboxed GCC/language container
- [Supabase](https://supabase.com/) — database, auth, and row-level security
- [Groq](https://console.groq.com/) — LLM inference for AI features

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **Docker** *(optional — required for sandboxed execution)*
- **Supabase** project *(for auth and persistence)*
- **Groq API key** *(for AI features)*

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-compiler.git
cd smart-compiler
```

### 2. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and set the following:

```env
# Groq API Keys (https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_KEY_2=optional_fallback_key
GROQ_API_KEY_3=optional_fallback_key

# Supabase (https://supabase.com/dashboard/project/<your-project>/settings/api)
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_role_key_here

# Admin access (comma-separated emails)
ADMIN_EMAILS=you@example.com,colleague@example.com
```

> ⚠️ **Never** commit your `.env` file to version control. It is already listed in `.gitignore`.

### 3. Install Dependencies

Install both frontend and backend dependencies in one step:

```bash
npm run setup
```

### 4. (Optional) Build the Docker Sandbox Image

If you want fully sandboxed execution, build the GCC Docker image:

```bash
cd server
build-image.bat        # Windows
# or manually:
docker build -f Dockerfile.gcc -t smart-compiler-gcc .
```

### 5. Run the App Locally

Launch the frontend dev server and backend API concurrently:

```bash
npm run dev
```

| Service | Default URL |
|---|---|
| Frontend (Vite) | `http://localhost:5173` |
| Backend API | `http://localhost:3001` |

---

## 📁 Project Structure

```
smart-compiler/
├── src/                        # React frontend
│   ├── components/             # UI components
│   │   ├── EditorPanel.jsx     # Code editor
│   │   ├── TerminalPane.jsx    # xterm.js terminal
│   │   ├── AiTutorPanel.jsx    # AI tutor with lessons & diagrams
│   │   ├── AIExplanationTab.jsx# AI code explanation
│   │   ├── BugTrackerPanel.jsx # Bug tracker
│   │   ├── AnalyticsPanel.jsx  # Usage analytics
│   │   ├── CompilationHistoryPanel.jsx
│   │   ├── AdminDashboard.jsx  # Admin-only panel
│   │   └── LoginPage.jsx
│   ├── languageDetector.js     # Multi-language detection engine
│   ├── fileUploader.js         # File + OCR upload handling
│   ├── bugTracker.js           # Bug tracking logic
│   ├── analytics.js            # Analytics helpers
│   └── App.jsx                 # Root application component
│
├── server/                     # Express backend
│   ├── index.js                # Main Express server & API routes
│   ├── executor.js             # Docker/Piston code execution engine
│   ├── ws-executor.js          # WebSocket-based PTY session manager
│   ├── ws-tickets.js           # WebSocket auth ticket system
│   ├── routes/                 # API route handlers
│   └── middleware/             # Auth & rate-limiting middleware
│
├── Dockerfile                  # Production Docker image
├── server/Dockerfile.gcc       # GCC sandbox image
├── load-test.js                # k6 load testing script
└── .env.example                # Environment variable template
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run setup` | Install all frontend + backend dependencies |
| `npm run dev` | Run frontend + backend concurrently (development) |
| `npm run build` | Build the frontend for production |
| `npm run build:all` | Full production build (frontend + server deps) |
| `npm run start` | Start the backend server only |
| `npm run lint` | Run ESLint on the codebase |
| `npm run preview` | Preview the production build locally |

---

## 📈 Load & Performance Testing (k6)

The project includes a load testing script to benchmark the compiler server under concurrent loads (up to 200 simultaneous users).

### 1. Install k6

Follow the instructions at [k6.io/docs/getting-started/installation](https://k6.io/docs/getting-started/installation/) for your OS.

### 2. Retrieve Your Auth Token

Since compilation endpoints are authenticated, you need your JWT:

1. Log in to the application.
2. Open browser DevTools (`F12`) → **Console** tab.
3. Paste and run the following snippet to copy your token:

```javascript
(function() {
  const storages = [localStorage, sessionStorage];
  for (const storage of storages) {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.includes('auth-token')) {
        try {
          const val = JSON.parse(storage.getItem(key));
          if (val && val.access_token) {
            copy(val.access_token);
            console.log("Token copied to clipboard!");
            return;
          }
        } catch (e) {}
      }
    }
  }
})();
```

### 3. Run the Load Test

```bash
k6 run \
  -e K6_TARGET_HOST=smartcompiler.maadiotsolutions.co.in \
  -e K6_TOKEN=YOUR_TOKEN \
  load-test.js
```

### Options

| Flag | Default | Description |
|---|---|---|
| `-e K6_TARGET_HOST=<host>` | `localhost:3001` | Target server hostname |
| `-e K6_TOKEN=<token>` | — | Supabase user JWT access token |
| `-e K6_HTTPS=true` | auto | Force HTTPS/WSS (auto-detected for non-localhost) |

---

## 🔒 Security

- All code execution runs inside **isolated Docker containers** with resource limits.
- API routes are protected via Supabase JWT verification middleware.
- Admin routes additionally require the requesting user's email to appear in `ADMIN_EMAILS`.
- `SUPABASE_SERVICE_KEY` (service role key) is **server-side only** — never exposed to the browser.
- HTTP headers are hardened via [`helmet`](https://helmetjs.github.io/).
- Rate limiting is applied to all compilation endpoints.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

Please run `npm run lint` before submitting a PR.

---

## 📄 License

This project is private. All rights reserved.