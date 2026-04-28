from pydantic import BaseModel
from typing import Optional, Any, List
from datetime import datetime
from enum import Enum

class SeverityEnum(str, Enum):
    low = "low"
    medium = "medium"
    critical = "critical"

class ShipmentStatusEnum(str, Enum):
    on_time = "ON_TIME"
    delayed = "DELAYED"
    critical = "CRITICAL"

class ShipmentBase(BaseModel):
    id: str
    origin: str
    destination: str
    status: ShipmentStatusEnum
    risk_score: float
    eta: datetime
    route: Optional[Any] = None

class ShipmentResponse(ShipmentBase):
    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: str
    message: str
    severity: SeverityEnum
    timestamp: datetime

    class Config:
        from_attributes = True

class OptimizeRequest(BaseModel):
    origin: str
    destination: str

class SimulateRequest(BaseModel):
    scenario: str
    parameters: dict

class RiskPredictionResponse(BaseModel):
    shipment_id: str
    risk_score: float
    category: str
    explanation: str
    factors: dict
