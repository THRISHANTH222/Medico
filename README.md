# Rural Health AI - LiveKit Web Tester

Rural Health AI is a voice-first health assistance and triage prototype designed to provide educational health information and guide users toward appropriate professional care.

This repository is **only the web tester frontend** for an already-deployed Python LiveKit Voice Agent backend.

---

## 🏗️ Architecture

```text
User Browser (Web Tester)
       ↓ (Microphone / Audio)
LiveKit Cloud (WebSockets)
       ↓
Python LiveKit Voice Agent (Backend Worker)
       ↓
OpenAI + MOSS Semantic Search (RAG)
       ↓
Medical Knowledge Base (rural-health index)
```

---

## 🔒 Security Note

- **Server-Side Token Generation:** LiveKit access tokens are generated exclusively via a server-side API route (`/api/token`).
- **Secrets Protection:** `LIVEKIT_API_SECRET` and `LIVEKIT_API_KEY` are **never** exposed to browser/client-side code or bundled into `NEXT_PUBLIC_*` environment variables.

---

## 🚀 Local Setup

### 1. Prerequisites
- Node.js 18.x or higher
- npm (installed automatically with Node.js)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your LiveKit Cloud credentials in `.env.local`:

```env
# Server-Side Only Secrets (Never expose to client)
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_api_secret_here
LIVEKIT_URL=wss://your-project.livekit.cloud

# Public Client Variable
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Under **Project Settings -> Environment Variables**, add:
   - `LIVEKIT_API_KEY` (Server)
   - `LIVEKIT_API_SECRET` (Server)
   - `LIVEKIT_URL` (Server)
   - `NEXT_PUBLIC_LIVEKIT_URL` (Client)
4. Click **Deploy**.

---

## ⚕️ Safety Disclaimer
Educational health assistance only. This service does not diagnose medical conditions, prescribe medication, or replace examination by a qualified healthcare professional. For emergencies, contact local emergency services or seek urgent medical care immediately.
