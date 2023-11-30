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
    print(data)
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