import psycopg2

def getCon():
    conn = psycopg2.connect(host ="0.0.0.0",
                            database ="cc3201",
                            user ="cc3201",
                            password ="se3Ej9ea4kee", port ="5432")
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
    conn = getCon()
    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchone()
    cur.close()
    return data

def topArma(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT descripcion, COUNT(*)
                FROM crimen_area A
                JOIN (
                    SELECT crimen_id, descripcion
                    FROM crimen_arma
                    JOIN arma ON arma_codigo = codigo) AS B
                ON A.crimen_id = B.crimen_id
                WHERE A.area_codigo = %s
                AND descripcion <> 'No information'
                GROUP BY descripcion
                ORDER BY count DESC LIMIT 1;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[0]

def topSexo(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT sexo, COUNT(*)
                FROM crimen_area A
                JOIN (
                    SELECT crimen_id, sexo
                    FROM crimen_victima
                    JOIN victima ON victima_id = id) AS B
                ON A.crimen_id = B.crimen_id
                WHERE A.area_codigo = %s
                GROUP BY sexo
                ORDER BY count DESC LIMIT 1;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[0]

def topEdad(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT
                    CASE
                        WHEN v.edad BETWEEN 0 AND 17 THEN '0-17'
                        WHEN v.edad BETWEEN 18 AND 24 THEN '18-24'
                        WHEN v.edad BETWEEN 25 AND 34 THEN '25-34'
                        WHEN v.edad BETWEEN 35 AND 44 THEN '35-44'
                        WHEN v.edad BETWEEN 45 AND 54 THEN '45-54'
                        WHEN v.edad BETWEEN 55 AND 64 THEN '55-64'
                        WHEN v.edad >= 65 THEN '65+'
                        ELSE 'Desconocido'
                    END AS grupo_etario, COUNT(*)
                FROM crimen_area ca
                JOIN crimen_victima cv ON ca.crimen_id = cv.crimen_id
                JOIN victima v ON cv.victima_id = v.id
                WHERE ca.area_codigo = %s
                GROUP BY grupo_etario
                ORDER BY count DESC LIMIT 1;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[0]

def topDesc(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT descendencia, COUNT(*)
                FROM crimen_area A
                JOIN (
                    SELECT crimen_id, descendencia 
                    FROM crimen_victima
                    JOIN victima ON victima_id = id) AS B
                ON A.crimen_id = B.crimen_id
                WHERE A.area_codigo = %s
                GROUP BY descendencia
                ORDER BY count DESC LIMIT 1;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[0]

def topPrem(areaId):
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT descripcion, COUNT(*)
                FROM crimen_area A
                JOIN (
                    SELECT crimen_id, descripcion 
                    FROM crimen_premisa
                    JOIN premisa ON premisa_codigo = codigo) AS B
                ON A.crimen_id = B.crimen_id
                WHERE A.area_codigo = %s
                GROUP BY descripcion
                ORDER BY count DESC LIMIT 1;
                """, (areaId,))
    data = cur.fetchone()
    cur.close()
    return data[0]

def areasPorSobre():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                WITH crimenes_por_area AS (
                    SELECT area_codigo, COUNT(*) AS crimenes
                    FROM crimen_area
                    GROUP BY area_codigo),
                    promedio_crimenes_por_area AS (
                		SELECT AVG(crimenes) AS promedio
                		FROM crimenes_por_area)
                SELECT area.nombre, tt.porcentaje_diferencia, tt.diferencia
                FROM area
                JOIN (
                    SELECT area_codigo, 
                  	(crimenes - p.promedio) as diferencia, 
                  	((crimenes -p.promedio) / p.promedio)*100 AS porcentaje_diferencia
                	FROM crimenes_por_area, promedio_crimenes_por_area p
                    WHERE crimenes > p.promedio
                ) AS tt ON area.codigo = tt.area_codigo
                ORDER BY porcentaje_diferencia DESC;
                """)
    data = cur.fetchall()
    cur.close()
    return data

def areasPorBajo():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                WITH crimenes_por_area AS (
                    SELECT area_codigo, COUNT(*) AS crimenes
                    FROM crimen_area
                    GROUP BY area_codigo),
                    promedio_crimenes_por_area AS (
                		SELECT AVG(crimenes) AS promedio
                		FROM crimenes_por_area)
                SELECT area.nombre, tt.porcentaje_diferencia, tt.diferencia
                FROM area
                JOIN (
                    SELECT area_codigo, 
                  	(p.promedio - crimenes) as diferencia, 
                  	((p.promedio - crimenes) / p.promedio)*100 AS porcentaje_diferencia
                	FROM crimenes_por_area, promedio_crimenes_por_area p
                    WHERE crimenes < p.promedio
                ) AS tt ON area.codigo = tt.area_codigo
                ORDER BY porcentaje_diferencia DESC;
                """)
    data = cur.fetchall()
    cur.close()
    return data