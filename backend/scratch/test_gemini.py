import asyncio
import os
import sys
from dotenv import load_dotenv

# Add backend dir to path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.gemini_service import generate_shipment_insight

async def test_gemini():
    load_dotenv()
    print("Testing Gemini AI Insight Generation...")
    
    mock_shipment = {
        "id": "SHP-TEST-001",
        "origin": "Shanghai",
        "destination": "Rotterdam",
        "status": "DELAYED",
        "vessel": "AI Test Explorer"
    }
    
    mock_risk = {
        "risk_score": 0.85,
        "category": "High",
        "factors": {"weather": 0.9, "traffic": 0.7, "delay_history": 0.5}
    }
    
    insight = await generate_shipment_insight(mock_shipment, mock_risk)
    print("\n--- GEMINI INSIGHT RESULT ---")
    import json
    print(json.dumps(insight, indent=2))
    print("-----------------------------\n")

if __name__ == "__main__":
    asyncio.run(test_gemini())
