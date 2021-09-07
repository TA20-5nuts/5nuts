import pandas as pd  # db

import sqlite3
from sqlite3 import Error


class Hospital:
    def __init__(self, hospital_id, formal_name, other_name, emergency_capable, location_address, suburb, postcode,
                 category, agency_type):
        self.hospital_id = hospital_id
        self.formal_name = formal_name
        self.other_name = other_name
        self.emergency_capable = emergency_capable
        self.location_address = location_address
        self.suburb = suburb
        self.postcode = postcode
        self.category = category
        self.agency_type = agency_type

    def print_info(self):
        print("ID: {}, Name: {}, Emergency: {}".format(
            self.hospital_id, self.formal_name, self.emergency_capable))

    def get_info(self):
        info = list()
        info.append(self.hospital_id)
        info.append(self.formal_name)
        info.append(self.other_name)
        info.append(self.emergency_capable)
        info.append(self.location_address)
        info.append(self.suburb)
        info.append(self.postcode)
        info.append(self.category)
        info.append(self.agency_type)
        return info


def load_excel(file_name: str):
    return pd.read_excel(file_name)


def parse_data(file_data):
    result_list = list()
    for index, row in file_data.iterrows():
        hospitals_id = row[0]
        formal_name = row[1]
        other_name = row[2]
        emergency_capable = True if row[3] == "YES" else False
        location_address = row[4]
        suburb = row[5]
        postcode = row[6]
        category = row[7]
        agency_type = row[8]
        temp_hospital = Hospital(hospitals_id, formal_name, other_name, emergency_capable, location_address, suburb,
                                 postcode, category, agency_type)

        result_list.append(temp_hospital)

    return result_list


dataset = "./datasets/HospitalsListVictoria.xlsx"
data = load_excel(dataset)
hospitals = parse_data(data)


# db connection
def connect_db(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return connection


def insert_hos(temp_conn, hospital: Hospital):
    info = hospital.get_info()
    query = '''INSERT INTO hospitals VALUES (?,?,?,?,?,?,?,?,?)'''
    cur = temp_conn.cursor()
    cur.execute(query, info)
    temp_conn.commit()

database_file = "nutsndairy.db"
db_connection = connect_db(database_file)

for hos in hospitals:
    insert_hos(db_connection, hos)

# close db
if db_connection:
    db_connection.close()
