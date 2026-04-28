from sqlalchemy import Column, String, Float, DateTime, JSON, Enum
from app.database import Base
import enum
import datetime

class SeverityEnum(str, enum.Enum):
    low = "low"
    medium = "medium"
    critical = "critical"

class ShipmentStatusEnum(str, enum.Enum):
    on_time = "ON_TIME"
    delayed = "DELAYED"
    critical = "CRITICAL"

class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(String, primary_key=True, index=True)
    origin = Column(String, index=True)
    destination = Column(String, index=True)
    status = Column(Enum(ShipmentStatusEnum), default=ShipmentStatusEnum.on_time)
    risk_score = Column(Float, default=0.0)
    eta = Column(DateTime, default=datetime.datetime.utcnow)
    route = Column(JSON, nullable=True)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    message = Column(String)
    severity = Column(Enum(SeverityEnum), default=SeverityEnum.low)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
