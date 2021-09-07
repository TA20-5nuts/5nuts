import pandas as pd

import sqlite3
from sqlite3 import Error

dataset = "./datasets/food_details_db.csv"


class Food:
    def __init__(self, key, name, desc):
        self.key = key
        self.name = name
        self.desc = desc

    def get_info(self):
        info = list()
        info.append(self.key)
        info.append(self.name)
        info.append(self.desc)
        return info


def load_file(file_name: str):
    return pd.read_csv(file_name)


def parse_data(file_data):
    result = list()
    for index, row in file_data.iterrows():
        key = row[0]
        name = row[1]
        desc = row[2]
        temp_food = Food(key, name, desc)
        result.append(temp_food)

    return result


data = load_file(dataset)
foods = parse_data(data)


database_file = "nutsndairy.db"


def connect_db(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return connection


def insert(temp_conn, food: Food):
    info = food.get_info()
    query = '''INSERT INTO food VALUES (?,?,?)'''
    try:
        cur = temp_conn.cursor()
        cur.execute(query, info)
        temp_conn.commit()
    except Error as e:
        print(e)


db_connection = connect_db(database_file)

for f in foods:
    insert(db_connection, f)


if db_connection:
    db_connection.close()
