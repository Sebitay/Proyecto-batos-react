import psycopg2

def getCon():
    conn = psycopg2.connect(host ="cc3201.dcc.uchile.cl",
                            database ="cc3201",
                            user ="cc3201",
                            password ="se3Ej9ea4kee", port ="5524")
    return conn

def nCrimenesArea():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT A.area_codigo, COUNT(*) 
                FROM crimen C, crimen_area A 
                WHERE C.id = A.crimen_id 
                GROUP BY A.area_codigo
                ORDER BY area_codigo ASC;
                """)
    areas = cur.fetchall()
    print(areas)
    cur.close()
    return 

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
                SELECT DISTINCT descripcion
                FROM arma;
                """)
    data = cur.fetchall()
    cur.close()
    response = []
    for item in data:
        response.append(item[0])
    return response

def edades():
    conn = getCon()
    cur = conn.cursor()
    cur.execute("""
                SELECT 
                DISTINCT
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

print(int('1'))
