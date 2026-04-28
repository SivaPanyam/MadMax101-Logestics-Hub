import heapq
from datetime import datetime
from app.services.data_service import read_json, write_json, append_data, update_data, get_by_id

def get_shipments(skip: int = 0, limit: int = 100):
    return read_json("shipments")[skip:skip+limit]

def get_shipment_by_id(shipment_id: str):
    return get_by_id("shipments", shipment_id)

def get_alerts(skip: int = 0, limit: int = 100):
    return read_json("alerts")[skip:skip+limit]

class RouteGraph:
    def __init__(self):
        self.edges = {
            'SHA': [('SGP', 50), ('LAX', 120)],
            'SGP': [('SHA', 50), ('MUM', 40), ('ROT', 180)],
            'MUM': [('SGP', 40), ('ROT', 150)],
            'ROT': [('SGP', 180), ('MUM', 150), ('NYC', 100)],
            'NYC': [('ROT', 100), ('LAX', 80)],
            'LAX': [('SHA', 120), ('NYC', 80)]
        }

    def dijkstra(self, start, end, weather_penalty=0.1, traffic_penalty=0.1):
        queue = [(0, start, [])]
        seen = set()
        while queue:
            (cost, node, path) = heapq.heappop(queue)
            if node not in seen:
                path = path + [node]
                if node == end:
                    return cost, path
                seen.add(node)
                for (next_node, dist) in self.edges.get(node, []):
                    weighted_cost = dist * (1 + weather_penalty + traffic_penalty)
                    heapq.heappush(queue, (cost + weighted_cost, next_node, path))
        return float("inf"), []

def optimize_route(origin: str, destination: str):
    port_map = {"Shanghai": "SHA", "Singapore": "SGP", "Mumbai": "MUM", "Rotterdam": "ROT", "New York": "NYC", "Los Angeles": "LAX"}
    start_code = port_map.get(origin, "SHA")
    end_code = port_map.get(destination, "ROT")
    graph = RouteGraph()
    
    base_cost, base_path = graph.dijkstra(start_code, end_code, 0, 0)
    opt_cost, opt_path = graph.dijkstra(start_code, end_code, 0.4, 0.3)
    
    time_saved = round(max(0, (base_cost * 1.7) - opt_cost), 1)
    
    result = {
        "origin": origin,
        "destination": destination,
        "current_route": base_path,
        "optimized_route": opt_path,
        "time_saved_hours": time_saved,
        "risk_reduction_pct": "34%",
        "timestamp": datetime.now().isoformat()
    }
    
    # Save to routes.json as requested
    append_data("routes", result)
    
    return {
        "status": "success",
        "current_route": {"path": base_path, "estimated_time_hours": round(base_cost * 1.7, 1), "risk_level": "High"},
        "optimized_route": {"path": opt_path, "estimated_time_hours": round(opt_cost, 1), "risk_level": "Low"},
        "metrics": {"time_saved_hours": time_saved, "risk_reduction_pct": "34%"}
    }

def run_simulation(scenario: str, parameters: dict):
    weather = parameters.get("weather_severity", 0.5)
    traffic = parameters.get("traffic_level", 0.5)
    region = parameters.get("region", "Global")
    
    shipments = read_json("shipments")
    updated_shipments = []
    
    for s in shipments:
        new_risk = min(0.99, s.get("risk_score", 0) + (weather * 0.2) + (traffic * 0.1))
        s["risk_score"] = round(new_risk, 2)
        if s["risk_score"] > 0.8: s["status"] = "CRITICAL"
        elif s["risk_score"] > 0.5: s["status"] = "DELAYED"
        
        update_data("shipments", s["id"], s)
        updated_shipments.append({"id": s["id"], "status": s["status"], "risk_score": s["risk_score"]})
        
    new_alert = {
        "message": f"SIMULATION: {scenario} in {region}",
        "severity": "critical" if weather > 0.7 else "warning",
        "timestamp": datetime.now().strftime("%H:%M:%S")
    }
    created_alert = append_data("alerts", new_alert)
    
    return {
        "status": "simulation_applied",
        "affected_shipments_count": len(updated_shipments),
        "updates": updated_shipments,
        "new_alert": created_alert
    }

def predict_risk(shipment_id: str):
    shipment = get_shipment_by_id(shipment_id)
    if not shipment: return None
    weather = 0.8 if "Shanghai" in shipment.get("origin", "") else 0.2
    traffic = 0.6 if "New York" in shipment.get("destination", "") else 0.3
    delay_history = 0.4
    risk_score = (0.4 * weather) + (0.3 * traffic) + (0.3 * delay_history)
    category = "High" if risk_score > 0.7 else ("Medium" if risk_score > 0.3 else "Low")
    return {
        "shipment_id": shipment_id,
        "risk_score": round(risk_score, 2),
        "category": category,
        "explanation": f"{category} risk detected primarily due to {'severe weather' if weather > 0.5 else 'logistical factors'}.",
        "factors": {"weather": weather, "traffic": traffic, "delay_history": delay_history}
    }

def get_metrics():
    # Try reading from metrics.json first
    metrics_list = read_json("metrics")
    if metrics_list and isinstance(metrics_list, dict):
        return metrics_list
    if metrics_list and isinstance(metrics_list, list):
        return metrics_list[0] if metrics_list else {}
        
    # Fallback to calculation
    shipments = read_json("shipments")
    alerts = read_json("alerts")
    critical_alerts = len([a for a in alerts if a.get("severity") == "critical"])
    return {
        "total_active_shipments": len(shipments),
        "critical_alerts": critical_alerts,
        "system_health": "99.9%"
    }
