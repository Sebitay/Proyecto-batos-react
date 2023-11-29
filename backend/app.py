from flask import Flask, request
from flask_cors import CORS
import database as db

app = Flask(__name__)
CORS(app)

@app.route('/infoArea/<id>', methods=['GET'])
def message(id):
    if request.method == 'GET':
        data = db.nCrimenesArea()
        print(data[int(id)-1])
        response = {
            'nCrimes': data[int(id)-1][1]
        }
    return response


if __name__ == "__main__":
    app.run(host="localhost", port="3000", debug=True)