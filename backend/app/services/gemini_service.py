import os
import json
from google import genai
from typing import Dict, Any

def get_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None
    return genai.Client(api_key=api_key)

async def generate_shipment_insight(shipment: Dict[str, Any], risk_data: Dict[str, Any]) -> Dict[str, Any]:
    """Generates AI-powered insights for a specific shipment using the new google-genai SDK."""
    client = get_client()
    if not client:
        return {
            "insight": "AI Insights are currently unavailable. Please configure GEMINI_API_KEY.",
            "action": "Check system configuration.",
            "prediction_reason": "N/A"
        }

    prompt = f"""
    You are a logistics intelligence AI. Analyze the following shipment data and provide strategic insights.
    
    SHIPMENT DATA:
    - ID: {shipment.get('id')}
    - Origin: {shipment.get('origin')}
    - Destination: {shipment.get('destination')}
    - Status: {shipment.get('status')}
    - Vessel: {shipment.get('vessel', 'Unknown')}
    
    RISK ANALYSIS:
    - Risk Score: {risk_data.get('risk_score')}
    - Category: {risk_data.get('category')}
    - Factors: {json.dumps(risk_data.get('factors', {}))}
    
    Please provide the response in the following JSON format:
    {{
        "insight": "A brief summary of the risk situation (max 2 sentences)",
        "action": "The single most effective suggested action to mitigate risk",
        "prediction_reason": "A technical explanation of why the delay is predicted"
    }}
    """

    try:
        # Use the new synchronous call (awaiting if the SDK supports async, but genai.Client is usually sync or has its own patterns)
        # For simplicity, we'll use the client's generate_content method
        response = client.models.generate_content(
            model='gemini-2.0-flash', # Let's use the newest 2.0 model!
            contents=prompt
        )
        
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except Exception as e:
        print(f"Gemini (google-genai) Error: {e}")
        return {
            "insight": f"Analysis failed for {shipment.get('id')}.",
            "action": "Manual review required.",
            "prediction_reason": f"AI engine returned an error: {str(e)}"
        }
