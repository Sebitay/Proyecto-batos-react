from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/message', methods=['GET'])
def message():
    if request.method == 'GET':
        response = {
            'message': 'Hello, world!'
        }
    return response

if __name__ == "__main__":
    app.run(host="localhost", port="3000", debug=True)