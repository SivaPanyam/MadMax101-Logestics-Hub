from fastapi import APIRouter, HTTPException
from typing import List
from app.services import logic
from app.services.gemini_service import generate_shipment_insight

router = APIRouter(tags=["Analytics"])

@router.get("/alerts")
def read_alerts(skip: int = 0, limit: int = 100):
    return logic.get_alerts(skip=skip, limit=limit)

@router.get("/metrics")
def read_metrics():
    return logic.get_metrics()

@router.get("/risk/{shipment_id}")
def get_risk_prediction(shipment_id: str):
    prediction = logic.predict_risk(shipment_id)
    if not prediction:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return prediction

@router.get("/ai-insights/{shipment_id}")
async def get_ai_insights(shipment_id: str):
    shipment = logic.get_shipment_by_id(shipment_id)
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    risk_data = logic.predict_risk(shipment_id)
    insight = await generate_shipment_insight(shipment, risk_data)
    return insight
