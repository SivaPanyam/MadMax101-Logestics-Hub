from fastapi import APIRouter, HTTPException
from typing import List
from app.services import logic
from app.utils.websockets import manager
from app.services.data_service import update_data, get_by_id

router = APIRouter(prefix="/shipments", tags=["Shipments"])

@router.get("/")
def read_shipments(skip: int = 0, limit: int = 100):
    return logic.get_shipments(skip=skip, limit=limit)

@router.get("/{shipment_id}")
def read_shipment(shipment_id: str):
    shipment = logic.get_shipment_by_id(shipment_id)
    if shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment

@router.patch("/{shipment_id}")
async def update_shipment(shipment_id: str, updates: dict):
    shipment = get_by_id("shipments", shipment_id)
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    updated_shipment = update_data("shipments", shipment_id, updates)
    
    # Broadcast update
    await manager.broadcast({
        "type": "SHIPMENT_UPDATE",
        "data": {
            "id": updated_shipment["id"],
            "status": updated_shipment["status"],
            "risk_score": updated_shipment["risk_score"]
        }
    })
    
    return updated_shipment
