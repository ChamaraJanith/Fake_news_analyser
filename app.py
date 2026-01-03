from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    
    # Placeholder for AI logic
    # In a real scenario, you'd load your scikit-learn/tensorflow model here
    is_fake = len(text) % 2 == 0 # Dummy logic
    
    result = {
        "status": "Reliable" if not is_fake else "Fake",
        "confidence": 0.85,
        "explanation": "Based on our AI analysis, this content shows patterns typical of " + ("reliable" if not is_fake else "misleading") + " news."
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
