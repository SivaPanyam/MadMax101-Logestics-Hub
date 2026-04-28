from app.database import SessionLocal, engine, Base
from app.models.domain import Shipment, Alert
from datetime import datetime

# Make sure tables exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_data():
    # Check if we already have data
    if db.query(Shipment).count() > 0:
        print("Database already seeded.")
        return

    # Seed shipments
    shipments = [
        Shipment(id="SHP-9012", origin="Shanghai, CN", destination="Rotterdam, NL", status="on_time", risk_score=0.1, eta=datetime(2026, 5, 12, 14, 0)),
        Shipment(id="SHP-9013", origin="Mumbai, IN", destination="New York, US", status="delayed", risk_score=0.7, eta=datetime(2026, 5, 15, 8, 30)),
        Shipment(id="SHP-9014", origin="Singapore, SG", destination="Los Angeles, US", status="critical", risk_score=0.95, eta=datetime(2026, 5, 20, 10, 0)),
    ]
    db.add_all(shipments)

    # Seed alerts
    alerts = [
        Alert(id="ALT-001", message="Vessel Delay - Suez Canal. Expected delay: 48h.", severity="critical"),
        Alert(id="ALT-002", message="Weather Warning - N. Atlantic. High seas detected on Route 4A.", severity="medium"),
        Alert(id="ALT-003", message="Port congestion cleared at Long Beach.", severity="low"),
    ]
    db.add_all(alerts)

    db.commit()
    print("Database successfully seeded with mock data.")

if __name__ == "__main__":
    seed_data()
