from flask import Flask, request, jsonify
from flask_cors import CORS
import database as db
import re

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

@app.route('/getArmas', methods=['GET'])
def getArmas():
    if request.method == 'GET':
        data = db.armas()
        response = []
        for item in data:
            response.append({
                'id': item[0],
                'name':item[1]
            })
        return jsonify(response)

@app.route('/getEdades', methods=['GET'])
def getEdades():
    if request.method == 'GET':
        data = db.edades()
        return jsonify(data)

@app.route('/getDescendencias', methods=['GET'])
def getDescendencias():
    if request.method == 'GET':
        data = db.descendencias()
        response = []
        for item in data:
            if item == 'A':
                response.append({
                    'id': item,
                    'name': 'Otras Asiaticas'
                })
            elif item == 'B':
                response.append({
                    'id': item,
                    'name': 'Negra'
                })
            elif item == 'C':
                response.append({
                    'id': item,
                    'name': 'China'
                })
            elif item == 'D':
                response.append({
                    'id': item,
                    'name': 'Camboyana'
                })
            elif item == 'F':
                response.append({
                    'id': item,
                    'name': 'Filipina'
                })
            elif item == 'G':
                response.append({
                    'id': item,
                    'name': 'Guameño'
                })
            elif item == 'H':
                response.append({
                    'id': item,
                    'name': 'Hispanica'
                })
            elif item == 'I':
                response.append({
                    'id': item,
                    'name': 'India Americana'
                })
            elif item == 'J':
                response.append({
                    'id': item,
                    'name': 'Japonesa'
                })
            elif item == 'K':
                response.append({
                    'id': item,
                    'name': 'Koreana'
                })
            elif item == 'L':
                response.append({
                    'id': item,
                    'name': 'Laosiana'
                })
            elif item == 'P':
                response.append({
                    'id': item,
                    'name': 'Isleña del pacifico'
                })
            elif item == 'S':
                response.append({
                    'id': item,
                    'name': 'Samoana'
                })
            elif item == 'U':
                response.append({
                    'id': item,
                    'name': 'Hawaiiana'
                })
            elif item == 'V':
                response.append({
                    'id': item,
                    'name': 'Vietnamita'
                })
            elif item == 'W':
                response.append({
                    'id': item,
                    'name': 'Blanca'
                })
            elif item == 'X':
                response.append({
                    'id': item,
                    'name': 'Desconocida'
                })
            elif item == 'Z':
                response.append({
                    'id': item,
                    'name': 'India Asiatica'
                })
            else:
                if {
                    'id': 'O',
                    'name': 'Otra'
                } not in response:
                    response.append({
                        'id': 'O',
                        'name': 'Otra'
                    })
        return jsonify(response)

@app.route('/getDataFiltrada/<areaId>/<victAge>/<victSex>/<victDesc>/<crimeWeap>', methods=['GET'])
def getDataFiltrada(areaId,victAge,victSex,victDesc,crimeWeap):
    if request.method == 'GET':
        first = False
        victFilter = ""
        areaFilter = ""
        ageFilter = ""
        sexFilter = ""
        descFilter = ""
        weapFilter = ""

        
        if(int(areaId) in db.areaIds()):
            areaFilter = ' WHERE A.area_codigo = '+areaId

        if(victAge == 'Desconocido'):
            ageFilter = ' WHERE edad < 0'
        elif(victAge == 'Seleccione una edad...'):
            first = True
        else:
            newAge = re.split(r'[-+]+', victAge)
            print(newAge)
            if newAge[1] == '':
                if(int(newAge[0]) < 1000 and int(newAge[0]) >= 0):
                    ageFilter = ' WHERE edad >' + newAge[0]
            else:
                if(int(newAge[0]) >= 0 and int(newAge[0]) < int(newAge[1]) and int(newAge[1]) < 1000):
                    ageFilter = ' WHERE edad >= '+ newAge[0] + ' AND edad <= '+ newAge[1]

        if(victSex == 'X'):
            if(first):
                sexFilter = " WHERE sexo <> 'F' AND sexo <> 'M'"
                first = False
            else:
                sexFilter = " AND sexo <> 'F' AND sexo <> 'M'"
        elif(victSex in ['F','M']):
            if(first):
                sexFilter = " WHERE sexo = '"+victSex+"'"
                first = False
            else:
                sexFilter = " AND sexo = '"+victSex+"'"

        if(victDesc in db.descendencias()):
            if(first):
                descFilter = " WHERE descendencia = '"+victDesc+"'"
                first = False
            else:
                descFilter = " AND descendencia = '"+victDesc+"'"

        print(crimeWeap)
        print(db.armasIds())
        if(int(crimeWeap) in db.armasIds()):
            weapFilter = " WHERE arma_codigo = '"+crimeWeap+"'"
        
        print(areaFilter)
        print(ageFilter)
        print(sexFilter)
        print(descFilter)
        print(weapFilter)

        if(len(ageFilter)>0 or len(sexFilter)>0 or len(descFilter)>0):
            victFilter = (" JOIN (SELECT * FROM victima AS V JOIN crimen_victima AS D ON V.id = D.victima_id%s%s%s) AS C ON A.crimen_id = C.crimen_id" % (ageFilter, sexFilter, descFilter))
                    
        data = db.getCrimenesFiltrados(areaFilter,ageFilter,sexFilter,descFilter,weapFilter,victFilter)
        response = {
            'nCrimes': data
        }
        return response
        
        

if __name__ == "__main__":
    app.run(host="localhost", port="3000", debug=True)