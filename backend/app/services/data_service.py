import json
import os
import uuid
import threading
from typing import List, Dict, Any, Optional

# Define base data directory
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")

# Global lock for thread safety
_file_lock = threading.Lock()

def _ensure_dir():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)

def _get_path(filename: str) -> str:
    return os.path.join(DATA_DIR, filename if filename.endswith('.json') else f"{filename}.json")

def read_json(filename: str) -> List[Dict[str, Any]]:
    """Reads data from a JSON file. Returns empty list if file doesn't exist or is empty."""
    _ensure_dir()
    path = _get_path(filename)
    if not os.path.exists(path):
        return []
    
    with _file_lock:
        try:
            with open(path, "r") as f:
                content = f.read()
                return json.loads(content) if content else []
        except (json.JSONDecodeError, IOError):
            return []

def write_json(filename: str, data: List[Dict[str, Any]]):
    """Writes the entire data list to a JSON file."""
    _ensure_dir()
    path = _get_path(filename)
    with _file_lock:
        with open(path, "w") as f:
            json.dump(data, f, indent=2)

def append_data(filename: str, item: Dict[str, Any]) -> Dict[str, Any]:
    """Appends a new item to the data list. Generates a UUID if 'id' is missing."""
    data = read_json(filename)
    if "id" not in item:
        item["id"] = str(uuid.uuid4())
    data.append(item)
    write_json(filename, data)
    return item

def update_data(filename: str, item_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Updates an existing item by ID."""
    data = read_json(filename)
    for i, item in enumerate(data):
        if str(item.get("id")) == str(item_id):
            data[i] = {**item, **updates}
            write_json(filename, data)
            return data[i]
    return None

def delete_data(filename: str, item_id: str) -> bool:
    """Deletes an item by ID."""
    data = read_json(filename)
    original_len = len(data)
    filtered_data = [item for item in data if str(item.get("id")) != str(item_id)]
    if len(filtered_data) < original_len:
        write_json(filename, filtered_data)
        return True
    return False

def get_by_id(filename: str, item_id: str) -> Optional[Dict[str, Any]]:
    """Retrieves a single item by ID."""
    data = read_json(filename)
    return next((item for item in data if str(item.get("id")) == str(item_id)), None)

# ---------------------------------------------------------
# Legacy Class Wrapper for existing service compatibility
# ---------------------------------------------------------
class JSONStore:
    def __init__(self, filename: str):
        self.filename = filename

    def get_all(self) -> List[Any]:
        return read_json(self.filename)

    def get_by_id(self, id: str) -> Optional[Any]:
        return get_by_id(self.filename, id)

    def create(self, item: Any):
        return append_data(self.filename, item)

    def update(self, id: str, updates: Any):
        return update_data(self.filename, id, updates)

    def delete(self, id: str):
        return delete_data(self.filename, id)

# Initialize specific stores for compatibility
shipment_store = JSONStore("shipments.json")
alert_store = JSONStore("alerts.json")
metrics_store = JSONStore("metrics.json")
route_store = JSONStore("routes.json")

# Initial Seeding if empty
def seed_if_empty():
    if not read_json("shipments"):
        initial_shipments = [
            {"id": "SHP-9012", "origin": "Shanghai", "destination": "Rotterdam", "status": "IN_TRANSIT", "risk_score": 0.12, "eta": "2026-05-12", "route": "Pacific Ocean Route"},
            {"id": "SHP-4432", "origin": "Singapore", "destination": "Los Angeles", "status": "DELAYED", "risk_score": 0.65, "eta": "2026-05-15", "route": "Direct Pacific"},
            {"id": "SHP-7821", "origin": "Mumbai", "destination": "New York", "status": "CRITICAL", "risk_score": 0.89, "eta": "2026-05-20", "route": "Suez Canal Bypass"}
        ]
        for s in initial_shipments: append_data("shipments", s)
        
    if not read_json("alerts"):
        initial_alerts = [
            {"id": str(uuid.uuid4()), "message": "High wind alert near Taiwan Strait", "severity": "warning", "timestamp": "14:22:10"},
            {"id": str(uuid.uuid4()), "message": "Port strike in Los Angeles imminent", "severity": "critical", "timestamp": "15:45:30"}
        ]
        for a in initial_alerts: append_data("alerts", a)

seed_if_empty()
