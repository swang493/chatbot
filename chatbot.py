from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chatbot-request', methods=['POST'])
def ChatbotRequest():
    data = request.get_json()
    msg = data.get('message', 'default')
    return jsonify(message=f"Message: {msg}!")

if __name__ == '__main__':
    app.run(debug=True)
