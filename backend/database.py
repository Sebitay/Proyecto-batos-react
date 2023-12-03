import psycopg2

def getCon():
    conn = psycopg2.connect(host ="cc3201.dcc.uchile.cl",
                            database ="cc3201",
                            user ="cc3201",
                            password ="se3Ej9ea4kee", port ="5524")
    return conn

def areaIds():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT distinct codigo
                FROM area;
                """)
    data = cur.fetchall()
    cur.close()
    response = []
    for item in data:
        response.append(item[0])
    return response

def nCrimenesArea():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT A.area_codigo, COUNT(A.crimen_id)
                FROM crimen_area A
                GROUP BY A.area_codigo
                ORDER BY A.area_codigo ASC;
                """)
    data = cur.fetchall()
    cur.close()
    return data

def nCrimenesAreaId(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT A.area_codigo, COUNT(A.crimen_id)
                FROM crimen_area A
                WHERE A.area_codigo = %s
                GROUP BY A.area_codigo
                ORDER BY A.area_codigo ASC;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[1]

def crimenesCuatrimestre(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT cuatrimestre, cantidad_crimenes
                FROM crimenes_por_area_y_periodo
                WHERE codigo_area = %s
                ORDER BY cuatrimestre ASC;
                """, (areaId,))
    data = cur.fetchall()
    cur.close()
    return data

def areasConMayorCrimen():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT a.nombre
                FROM area AS a
                JOIN crimen_area AS ca ON a.codigo = ca.area_codigo
                GROUP BY a.nombre
                HAVING COUNT(ca.crimen_id) > (
                    SELECT AVG(CantidadCrímenes) FROM (
                        SELECT area_codigo, COUNT(*) AS CantidadCrímenes
                        FROM crimen_area
                        GROUP BY area_codigo
                    ) AS Promedio
                );
                """)
    data = cur.fetchall()
    cur.close()
    return data

def armas():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT DISTINCT codigo, descripcion 
                FROM arma
                ORDER BY descripcion ASC;
                """)
    data = cur.fetchall()
    cur.close()
    return data

def armasIds():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT DISTINCT codigo 
                FROM arma
                ORDER BY codigo ASC;
                """)
    data = cur.fetchall()
    response = []
    for item in data:
        response.append(item[0])
    cur.close()
    return response

def edades():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT DISTINCT
                CASE
                    WHEN edad BETWEEN 0 AND 17 THEN '0-17'
                    WHEN edad BETWEEN 18 AND 24 THEN '18-24'
                    WHEN edad BETWEEN 25 AND 34 THEN '25-34'
                    WHEN edad BETWEEN 35 AND 44 THEN '35-44'
                    WHEN edad BETWEEN 45 AND 54 THEN '45-54'
                    WHEN edad BETWEEN 55 AND 64 THEN '55-64'
                    WHEN edad >= 65 THEN '65+'
                    ELSE 'Desconocido'
                END AS grupo_etario
                FROM victima
                ORDER BY grupo_etario ASC;
                """)
    data = cur.fetchall()
    cur.close()
    response = []
    for item in data:
        response.append(item[0])
    return response

def descendencias():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT DISTINCT descendencia 
                FROM victima
                ORDER BY descendencia ASC;
                """)
    data = cur.fetchall()
    cur.close()
    response = []
    for item in data:
        response.append(item[0])
    return response


def getCrimenesFiltrados(areaId, victAge, victSex, victDesc, crimeWeap, vict):
    query = ("SELECT COUNT(*) FROM crimen_area AS A JOIN (SELECT * FROM crimen_arma%s) AS B ON A.crimen_id = B.crimen_id%s%s;" % (crimeWeap, vict, areaId))
    print(query)
    conn = getCon()
    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchone()
    cur.close()
    return data