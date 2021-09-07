import pandas as pd

import sqlite3
from sqlite3 import Error

dataset = "./datasets/Nutrition_Database.csv"


class Nutrition:
    def __init__(self, food_key, classification, food_name, energy_dietary_fibre, energy_no_dietary_fibre, moisture, protein, fat, dietary_fibre, calcium, sodium, vitamin_b12, vitamin_c, vitamin_d3, vitamin_e, sat_fat_percent, sat_fat_gram):
        self.food_key = food_key
        self.classification = classification
        self.food_name = food_name
        self.energy_dietary_fibre = energy_dietary_fibre
        self.energy_no_dietary_fibre = energy_no_dietary_fibre
        self.moisture = moisture
        self.protein = protein
        self.fat = fat
        self.dietary_fibre = dietary_fibre
        self.calcium = calcium
        self.sodium = sodium
        self.vitamin_b12 = vitamin_b12
        self.vitamin_c = vitamin_c
        self.vitamin_d3 = vitamin_d3
        self.vitamin_e = vitamin_e
        self.sat_fat_percent = sat_fat_percent
        self.sat_fat_gram = sat_fat_gram

    def get_info(self):
        info = list()
        info.append(self.food_key)
        info.append(self.classification)
        info.append(self.food_name)
        info.append(self.energy_dietary_fibre)
        info.append(self.energy_no_dietary_fibre)
        info.append(self.moisture)
        info.append(self.protein)
        info.append(self.fat)
        info.append(self.dietary_fibre)
        info.append(self.calcium)
        info.append(self.sodium)
        info.append(self.vitamin_b12)
        info.append(self.vitamin_c)
        info.append(self.vitamin_d3)
        info.append(self.vitamin_e)
        info.append(self.sat_fat_percent)
        info.append(self.sat_fat_gram)

        return info


def load_csv(file_name: str):
    return pd.read_csv(file_name)


def parse_data(file_data):
    result_list = list()
    for index, row in file_data.iterrows():
        # print(row[0])
        temp_nutrition = Nutrition(row[0], row[1], row[2], row[3], row[4], row[5], row[6],
                                   row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16])
        result_list.append(temp_nutrition)

    return result_list


data = load_csv(dataset)
nutritions = parse_data(data)

database_file = "nutsndairy.db"


def connect_db(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return connection


def insert(temp_conn, nutrition: Nutrition):
    info = nutrition.get_info()
    query = '''INSERT INTO nutrition VALUEs (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'''
    try:
        cur = temp_conn.cursor()
        cur.execute(query, info)
        temp_conn.commit()
    except Error as e:
        pass


db_connection = connect_db(database_file)

for n in nutritions:
    insert(db_connection, n)


if db_connection:
    db_connection.close()
