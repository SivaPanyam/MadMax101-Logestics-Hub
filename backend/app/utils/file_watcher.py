import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from app.utils.websockets import manager
import asyncio

class JSONChangeHandler(FileSystemEventHandler):
    def __init__(self, loop):
        self.loop = loop
        self.last_triggered = 0

    def on_modified(self, event):
        if event.is_directory:
            return
        if not event.src_path.endswith('.json'):
            return

        # Debounce: avoid multiple triggers for a single save
        current_time = time.time()
        if current_time - self.last_triggered < 0.5:
            return
        self.last_triggered = current_time

        filename = os.path.basename(event.src_path)
        print(f"File Change Detected: {filename}")
        
        # Determine data type
        data_type = filename.replace('.json', '').upper()
        
        # Broadcast to frontend via WebSocket
        # Use run_coroutine_threadsafe since watchdog runs in its own thread
        asyncio.run_coroutine_threadsafe(
            manager.broadcast({
                "type": "DATA_RELOAD",
                "data": {"type": data_type}
            }),
            self.loop
        )

def start_file_watcher():
    from app.services.data_service import DATA_DIR
    
    print(f"Starting File Watcher on {DATA_DIR}...")
    loop = asyncio.get_event_local() if not asyncio.get_event_loop().is_running() else asyncio.get_event_loop()
    
    event_handler = JSONChangeHandler(loop)
    observer = Observer()
    observer.schedule(event_handler, DATA_DIR, recursive=False)
    observer.start()
    
    return observer
