import asyncio
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routes import shipments, simulation, analytics
from app.utils.websockets import manager
from app.utils.background_simulator import start_realtime_simulation
from app.utils.file_watcher import start_file_watcher
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="Logistics Intelligence Hub API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(shipments.router)
app.include_router(simulation.router)
app.include_router(analytics.router)

@app.on_event("startup")
async def startup_event():
    # Start the real-time background simulator
    asyncio.create_task(start_realtime_simulation())
    
    # Start the JSON file watcher
    start_file_watcher()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

# Serve static files from the 'static' directory if it exists
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
else:
    @app.get("/")
    def root():
        return {"message": "Welcome to the Logistics Intelligence Hub API (JSON + Watcher Active)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
