# 🚢 Logistics Intelligence Hub

[![Gemini 2.0](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-blueviolet)](https://deepmind.google/technologies/gemini/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The **Logistics Intelligence Hub** is a high-performance, real-time mission control dashboard designed to transform global shipping telemetry into actionable strategic insights. Built for high-stakes supply chain management, it combines millisecond-perfect data synchronization with the analytical power of **Google Gemini 2.0**.

![Dashboard Overview](assets/dashboard.png)

---

## ✨ Key Features

### 📡 Real-Time Telemetry & Hot-Reload
- **Zero-Refresh UI**: Powered by a native WebSocket bridge, the dashboard updates instantly as global shipping events occur.
- **JSON-Sync Engine**: A lightweight, thread-safe persistence layer that detects manual data modifications and broadcasts updates to all connected clients.

### 🧠 Gemini AI Strategic Insights
- **Predictive Analysis**: Analyzes complex risk factors (weather, traffic, port congestion) to predict delays before they happen.
- **Tactical Advice**: Generates human-readable mitigation strategies, such as priority berthing or alternative routing protocols.

### 🧪 Strategic Simulation Mode
- **What-If Scenarios**: Stress-test your supply chain by manipulating environmental variables like weather severity and regional congestion.
- **Impact Streaming**: Visualize cascading risks across your entire fleet in a dynamic, real-time feed.

---

## 📸 Screenshots

| Global Monitoring | Fleet Telemetry |
| :---: | :---: |
| ![Dashboard](assets/dashboard.png) | ![Live Shipments](assets/shipments.png) |
| **Risk Intelligence** | **Stress Testing** |
| ![Risk Monitoring](assets/risk.png) | ![Simulation Mode](assets/simulation.png) |

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Zustand, Leaflet.
- **Backend**: FastAPI (Python), Uvicorn, Python-Dotenv, Watchdog.
- **AI**: Google Gemini 2.0 Flash (via `google-genai` SDK).
- **Deployment**: Docker, Docker Compose.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- [Gemini API Key](https://aistudio.google.com/)

### Quick Run (Docker)
1. Set your API Key: `export GEMINI_API_KEY=your_key`
2. Run: `docker-compose up --build`
3. Access: `http://localhost:8000`

### Manual Setup
Refer to the [RUN_GUIDE.md](./RUN_GUIDE.md) for detailed local development instructions.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for the Global Logistics Community.**
