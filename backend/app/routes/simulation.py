from fastapi import APIRouter
from app.schemas.api import SimulateRequest, OptimizeRequest
from app.services import logic
from app.utils.websockets import manager

router = APIRouter(tags=["Simulation"])

@router.post("/optimize-route")
def optimize_route(request: OptimizeRequest):
    return logic.optimize_route(request.origin, request.destination)

@router.post("/simulate")
async def run_simulation(request: SimulateRequest):
    result = logic.run_simulation(request.scenario, request.parameters)
    
    # Broadcast updates
    for update in result["updates"]:
        await manager.broadcast({
            "type": "SHIPMENT_UPDATE",
            "data": update
        })
    
    await manager.broadcast({
        "type": "NEW_ALERT",
        "data": result["new_alert"]
    })
    
    return result
