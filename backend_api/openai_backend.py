from flask import Flask, request, jsonify
import openai
import os
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Set your OpenAI API key as an environment variable for security
openai.api_key = os.getenv("OPENAI_API_KEY")

# --- DATABASE SETUP ---
Base = declarative_base()
engine = create_engine('sqlite:///simulation_logs.db')
Session = sessionmaker(bind=engine)

class SimulationLog(Base):
    __tablename__ = 'simulation_logs'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    scenario_id = Column(String(128))
    parent_choices = Column(Text)
    outcome_scores = Column(Text)
    start_time = Column(String(64))
    end_time = Column(String(64))
    elapsed_seconds = Column(Integer)
    user_agent = Column(Text)
    meta = Column(Text)

Base.metadata.create_all(engine)

def safe_json_parse(text):
    try:
        return json.loads(text)
    except Exception:
        # Try to fix common formatting issues from LLM output
        text = text.strip()
        # Remove code block markers if present
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        try:
            return json.loads(text)
        except Exception:
            return None

@app.route('/api/generateSchoolResponseAndOptions', methods=['POST'])
def generate_school_response_and_options():
    data = request.json
    scenario_background = data.get('scenarioBackground', '')
    school_line = data.get('schoolLine', '')
    parent_history = data.get('parentHistory', [])
    irp_type = data.get('irpType', '')

    # Compose prompt similar to your React app logic
    prompt = f"""
You are simulating an IEP scenario between a parent and a school. 
Given the scenario background, the last school line, and the parent/school history, generate the school's next response and 2-4 possible parent responses (with IRP type and a brief explanation for each).

Respond in JSON format:
{{
  "schoolResponse": "<school's reply>",
  "options": [
    {{ "type": "<interests|rights|power>", "text": "<parent response>", "textExplanation": "<brief explanation>" }},
    ...
  ]
}}

Scenario background: {scenario_background}
Last school line: {school_line}
Parent/school history: {parent_history}
Parent IRP type: {irp_type}
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.3
        )
        response_text = response.choices[0].message.content
        result = safe_json_parse(response_text)
        if not result or "schoolResponse" not in result or "options" not in result:
            return jsonify({"error": "Malformed OpenAI response", "raw": response_text}), 500
        # Ensure options are in expected format
        for opt in result["options"]:
            opt.setdefault("type", "")
            opt.setdefault("text", "")
            opt.setdefault("textExplanation", "")
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/scoreOutcomes', methods=['POST'])
def score_outcomes():
    data = request.json
    previous_scores = data.get('previousScores', [])
    potential_outcomes = data.get('potentialOutcomes', [])
    last_exchange = data.get('lastExchange', {})

    prompt = f"""
You are an expert in special education advocacy. Given the possible outcomes and the last parent/school exchange, score the likelihood (0-100) of each outcome and provide a brief explanation.

Respond in JSON format:
[
  {{ "outcome": "<outcome>", "score": <number>, "explanation": "<reason>" }},
  ...
]

Possible outcomes: {potential_outcomes}
Last exchange: {last_exchange}
Previous scores: {previous_scores}
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.2
        )
        response_text = response.choices[0].message.content
        scores = safe_json_parse(response_text)
        if not isinstance(scores, list):
            return jsonify({"error": "Malformed OpenAI response", "raw": response_text}), 500
        # Ensure each score dict has required fields
        for o in scores:
            o.setdefault("outcome", "")
            o.setdefault("score", 0)
            o.setdefault("explanation", "")
        return jsonify(scores)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- LOGGING ENDPOINT ---
@app.route('/api/logSimulation', methods=['POST'])
def log_simulation():
    data = request.json
    session = Session()
    log_entry = SimulationLog(
        scenario_id = data.get("scenarioId"),
        parent_choices = json.dumps(data.get("parentChoices", [])),
        outcome_scores = json.dumps(data.get("outcomeScores", [])),
        start_time = str(data.get("startTime")),
        end_time = str(data.get("endTime")),
        elapsed_seconds = data.get("elapsedSeconds"),
        user_agent = request.headers.get("User-Agent"),
        meta = json.dumps(data.get("meta", {}))
    )
    session.add(log_entry)
    session.commit()
    session.close()
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(port=5000)