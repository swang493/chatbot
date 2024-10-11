from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_internal_policy import LLM_Query

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chatbot-request', methods=['POST'])
def ChatbotRequest():
    data = request.get_json()
    msg = data.get('message', 'default')
    result = LLM_Query(msg)
    return jsonify(message=f"{result}!")

if __name__ == '__main__':
    app.run(debug=True)
