import pandas as pd

import sqlite3
from sqlite3 import Error

dataset = "./datasets/Ingredient_table.csv"


class Ingredient:
    def __init__(self, food_key, ingredient_key, ingredient_name, ingredient_weight, retention_factor_id):
        self.food_key = food_key
        self.ingredient_key = ingredient_key
        self.ingredient_name = ingredient_name
        self.ingredient_weight = ingredient_weight
        self.retention_factor_id = retention_factor_id

    def get_info(self):
        info = list()
        info.append(self.ingredient_key)
        info.append(self.food_key)
        info.append(self.ingredient_name)
        info.append(self.ingredient_weight)
        info.append(self.retention_factor_id)
        return info


def load_csv(file_name: str):
    return pd.read_csv(file_name)


def parse_data(file_data):
    result_list = list()
    for index, row in file_data.iterrows():
        temp_food_key = row[0]
        temp_ingredient_key = row[1]
        temp_ingredient_name = row[2]
        temp_ingredient_weight = row[3]
        temp_retention_factor_id = row[4]

        temp_ingredient = Ingredient(temp_food_key, temp_ingredient_key,
                                     temp_ingredient_name, temp_ingredient_weight, temp_retention_factor_id)
        result_list.append(temp_ingredient)

    return result_list


data = load_csv(dataset)
ingredients = parse_data(data)

database_file = "nutsndairy.db"


def connect_db(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return connection


def insert(temp_conn, ingredient: Ingredient):
    info = ingredient.get_info()
    query = '''INSERT INTO ingredient VALUEs (?,?,?,?,?)'''
    try:
        cur = temp_conn.cursor()
        cur.execute(query, info)
        temp_conn.commit()
    except Error as e:
        pass


db_connection = connect_db(database_file)

for i in ingredients:
    insert(db_connection, i)

if db_connection:
    db_connection.close()
