import pandas as pd

import sqlite3
from sqlite3 import Error

dataset = "./datasets/Food_table.csv"


class Food:
    def __init__(self, food_id, food_name):
        self.food_id = food_id
        self.food_name = food_name

    def print_info(self):
        print("ID: {}, Name: {}".format(self.food_id, self.food_name))

    def get_info(self):
        info = list()
        info.append(self.food_id)
        info.append(self.food_name)
        return info


def load_file(file_name: str):
    return pd.read_csv(file_name)


def parse_data(file_data):
    result_list = list()
    for index, row in file_data.iterrows():
        temp_id = row[0]
        temp_name = row[1]

        temp_food = Food(temp_id, temp_name)
        result_list.append(temp_food)

    return result_list


data = load_file(dataset)
foods = parse_data(data)
# for food in foods:
#     food.print_info()


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
    query = '''INSERT INTO food VALUEs (?,?)'''
    try:
        cur = temp_conn.cursor()
        cur.execute(query, info)
        temp_conn.commit()
    except Error as e:
        pass


db_connection = connect_db(database_file)

for f in foods:
    insert(db_connection, f)

if db_connection:
    db_connection.close()
