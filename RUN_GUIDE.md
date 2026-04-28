# 🚢 Logistics Intelligence Hub - Launch Guide

Follow these steps to get your mission control dashboard up and running with real-time JSON storage and Gemini AI.

## 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

---

## 2. Backend Setup
1. **Navigate to backend**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   pip install fastapi uvicorn python-dotenv watchdog google-genai
   ```
3. **Configure Environment**:
   - Open `backend/.env` and add your key:
     ```env
     GEMINI_API_KEY=your_actual_key_here
     ```
4. **Launch Backend**:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   *The backend will start on `http://127.0.0.1:8000`. It will automatically start the real-time background simulator.*

---

## 3. Frontend Setup
1. **Navigate to frontend**:
   ```bash
   cd logistics-hub
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Launch Frontend**:
   ```bash
   npm run dev
   ```
   *The dashboard will be available at `http://localhost:5173`.*

---

## 4. Verification Features
- **Real-Time Simulation**: Watch the dashboard update automatically every 5-10 seconds.
- **JSON Hot-Reload**: Manually edit any file in `backend/data/` and watch the UI update instantly.
- **AI Insights**: Visit a shipment detail page (or call the API) to see Gemini 2.0 generated strategic advice.

---

## Troubleshooting
- **WebSocket Connection**: If the "Live Link" in the header is red, ensure the backend is running and check your browser console for CORS or network errors.
- **AI Insights 404**: Ensure your `GEMINI_API_KEY` is valid and the Generative AI API is enabled on your account.

Enjoy your Mission Control Hub! 🚀
