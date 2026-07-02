# SmartCompiler 🚀

SmartCompiler is a modern, web-based interactive compiler for C code built with Express, React (Vite), and WebSockets. It compiles and runs code inside sandboxed Docker containers (or fallbacks) and provides real-time terminal emulation using `xterm.js`.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (optional, but required for sandboxed execution)

### Installation
1. Initialize dependencies for both frontend and backend:
   ```bash
   npm run setup
   ```
2. Set up your `.env` variables (e.g., Supabase credentials).

### Running Locally
To launch both the UI dev server and the backend API concurrently:
```bash
npm run dev
```

---

## 📈 Load & Performance Testing (k6)

The project includes a load testing script using **k6** to benchmark the compiler server under concurrent loads (up to 200 users running compilation processes simultaneously).

### 1. Install k6
Follow instructions at [k6.io/docs/getting-started/installation](https://k6.io/docs/getting-started/installation/) to install the k6 CLI for your OS.

### 2. Retrieve Your Auth Token
Since compilation is authenticated:
1. Log in to the application.
2. Open the browser DevTools Console (F12).
3. Type `allow pasting` if prompted.
4. Run the following code in the console to copy your JWT token:
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
Execute the test from the root directory by specifying your target host and your authentication token:

```bash
k6 run -e K6_TARGET_HOST=smartcompiler.maadiotsolutions.co.in -e K6_TOKEN=YOUR_TOKEN load-test.js
```

### Options
- `-e K6_TARGET_HOST=<host>`: Set target server (default is `localhost:3001`).
- `-e K6_TOKEN=<token>`: The Supabase user access token.
- `-e K6_HTTPS=true`: Force HTTPS/WSS (automatic for non-localhost environments).