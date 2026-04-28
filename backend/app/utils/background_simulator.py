import asyncio
import random
import uuid
from datetime import datetime
from app.services.data_service import read_json, update_data, append_data
from app.utils.websockets import manager

async def start_realtime_simulation():
    """Background task to simulate real-time logistics events."""
    print("Starting Real-Time Logistics Simulator...")
    
    shipment_ids = ["SHP-2024-001", "SHP-2024-002", "SHP-2024-003", "SHP-2024-004", "SHP-2024-005"]
    statuses = ["IN_TRANSIT", "DELAYED", "CRITICAL", "ARRIVED"]
    
    while True:
        try:
            # 1. Randomly wait 5-10 seconds
            wait_time = random.randint(5, 10)
            await asyncio.sleep(wait_time)
            
            # 2. Randomly decide to update a shipment OR add an alert
            if random.random() > 0.3:
                # Update a shipment
                ship_id = random.choice(shipment_ids)
                new_status = random.choice(statuses)
                new_risk = round(random.uniform(0.05, 0.95), 2)
                
                updates = {"status": new_status, "risk_score": new_risk}
                updated_shipment = update_data("shipments", ship_id, updates)
                
                if updated_shipment:
                    print(f"Simulated Update: {ship_id} is now {new_status} (Risk: {new_risk})")
                    await manager.broadcast({
                        "type": "SHIPMENT_UPDATE",
                        "data": {
                            "id": ship_id,
                            "status": new_status,
                            "risk_score": new_risk
                        }
                    })
            else:
                # Add a random alert
                incident_types = ["Weather Warning", "Port Congestion", "Vessel Maintenance", "Logistics Delay"]
                regions = ["Pacific Rim", "North Atlantic", "Suez Canal", "South China Sea"]
                
                new_alert = {
                    "id": str(uuid.uuid4()),
                    "message": f"ALERT: {random.choice(incident_types)} reported in {random.choice(regions)}.",
                    "severity": random.choice(["warning", "critical", "info"]),
                    "timestamp": datetime.now().strftime("%H:%M:%S")
                }
                
                append_data("alerts", new_alert)
                print(f"Simulated Alert: {new_alert['message']}")
                await manager.broadcast({
                    "type": "NEW_ALERT",
                    "data": new_alert
                })
                
        except Exception as e:
            print(f"Simulator Error: {e}")
            await asyncio.sleep(10) # Wait before retry
