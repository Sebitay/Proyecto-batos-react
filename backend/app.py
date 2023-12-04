from flask import Flask, request, jsonify
from flask_cors import CORS
import database as db
import re

app = Flask(__name__)
CORS(app)


DESCS = [
    {
        'id': 'A',
        'name': 'Otras Asiaticas'
    },
    {
        'id': 'B',
        'name': 'Negra'
    },
    {
        'id': 'C',
        'name': 'China'
    },
    {
        'id': 'D',
        'name': 'Camboyana'
    },
    {
        'id': 'F',
        'name': 'Filipina'
    },
    {
        'id': 'G',
        'name': 'Guameño'
    },
    {
        'id': 'H',
        'name': 'Hispanica'
    },
    {
        'id': 'I',
        'name': 'India Americana'
    },
    {
        'id': 'J',
        'name': 'Japonesa'
    },
    {
        'id': 'K',
        'name': 'Koreana'
    },
    {
        'id': 'L',
        'name': 'Laosiana'
    },
    {
        'id': 'P',
        'name': 'Isleña del pacifico'
    },
    {
        'id': 'S',
        'name': 'Samoana'
    },
    {
        'id': 'U',
        'name': 'Hawaiiana'
    },
    {
        'id': 'V',
        'name': 'Vietnamita'
    },
    {
        'id': 'W',
        'name': 'Blanca'
    },
    {
        'id': 'X',
        'name': 'Desconocida'
    },
    {
        'id': 'Z',
        'name': 'India Asiatica'
    }]
    



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

        if(int(crimeWeap) in db.armasIds()):
            weapFilter = " WHERE arma_codigo = '"+crimeWeap+"'"
    
        if(len(ageFilter)>0 or len(sexFilter)>0 or len(descFilter)>0):
            victFilter = (" JOIN (SELECT * FROM victima AS V JOIN crimen_victima AS D ON V.id = D.victima_id%s%s%s) AS C ON A.crimen_id = C.crimen_id" % (ageFilter, sexFilter, descFilter))
                    
        data = db.getCrimenesFiltrados(areaFilter,ageFilter,sexFilter,descFilter,weapFilter,victFilter)
        response = {
            'nCrimes': data
        }
        return response
        

@app.route('/getTableData/<areaId>', methods=['GET'])
def getTableData(areaId):
    if(0<int(areaId)<22):
        arma = db.topArma(areaId)
        edad = db.topEdad(areaId)
        sexo = db.topSexo(areaId)
        desc = db.topDesc(areaId)
        prem = db.topPrem(areaId)
    
    if(sexo == 'M'):
        sexo = 'Hombre'
    elif(sexo == 'F'):
        sexo = 'Mujer'
    else:
        sexo = 'Otro'

    for item in DESCS:
        if(desc == item['id']):
            newDesc = item['name']
            break
        newDesc = 'Otras'
    desc = newDesc

    response = {
        'arma': arma,
        'edad': edad,
        'sexo': sexo,
        'desc': desc,
        'prem': prem
    }
    return jsonify(response)

@app.route('/chartPage', methods=['GET'])
def chartPage():
    tempOver = db.areasPorSobre()
    tempUnder = db.areasPorBajo()
    over = []
    under = []

    for item in tempOver:
        over.append({
            'area': item[0],
            'info': {
                'perc': int(item[1]),
                'diff': int(item[2])
            }
        })

    for item in tempUnder:
        under.append({
            'area': item[0],
            'info': {
                'perc': int(item[1]),
                'diff': int(item[2])
            }
        })

    response = {
        'over': over,
        'under': under
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="localhost", port="3000", debug=True)