from flask import Flask, request, jsonify
from flask_cors import CORS
import database as db

app = Flask(__name__)
CORS(app)

@app.route('/infoArea/<id>', methods=['GET'])
def message(id):
    if request.method == 'GET':
        data = db.nCrimenesArea()
        response = {
            'nCrimes': data[int(id)-1][1]
        }
    return response

@app.route('/infoAreaId/<id>', methods = ['GET'])
def infoAreaId(id):
    if request.method == 'GET':
        data = db.nCrimenesAreaId(id)
        response = {
            'nCrimes': data
        }
    return response

@app.route('/infoMap', methods=['GET'])
def infoMap():
    if request.method == 'GET':
        data = db.nCrimenesArea()
        response = []
        for item in data:
            response.append(item[1])
    return jsonify(response)

@app.route('/areaChart/<id>', methods=['GET'])
def infoArea(id):
    if request.method == 'GET':
        data = db.crimenesCuatrimestre(id)
        response = []
        for item in data:
            response.append({
                'cuatrimestre': item[0].strftime("%Y-%m-%d"),
                'nCrimes': item[1]
            })
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="localhost", port="3000", debug=True)