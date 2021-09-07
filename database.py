#!/usr/bin/python3

import sqlite3
from sqlite3 import Error


class Database:
    def __init__(self, db_name='./database/nutsndairy.db'):
        # connect
        connection = None
        try:
            connection = sqlite3.connect(db_name)
        except Error as e:
            print(e)
        self.connection = connection

    def __del__(self):
        if self.connection:
            self.connection.close()

    def search(self, table):
        query = "SELECT * FROM %s"
        try:
            cur = self.connection.cursor()
            cur.execute(query % table)
            return cur.fetchall()
        except Error as e:
            print(e)

    def search_attribute(self, table, attribute):
        query = "SELECT %s FROM %s"
        try:
            cur = self.connection.cursor()
            cur.execute(query % (attribute, table))
            return cur.fetchall()
        except Error as e:
            print(e)

    def search_ingredients_by_food(self, food_name):
        query_key = "SELECT public_food_key FROM food WHERE food_name LIKE '%s'"
        try:
            cur = self.connection.cursor()
            args = '%' + food_name + '%'
            cur.execute(query_key % args)
            food_key = cur.fetchall()[0][0]
            query_ingredients = "SELECT * FROM ingredient WHERE public_food_key = '%s'"
            cur.execute(query_ingredients % food_key)
            return cur.fetchall()
        except Error as e:
            print(e)

    def search_nutrition_by_food(self, food_name):
        query = "SELECT * FROM nutrition WHERE food_name LIKE '%s'"
        try:
            cur = self.connection.cursor()
            args = '%' + food_name + '%'
            cur.execute(query % args)
            return cur.fetchall()
        except Error as e:
            print(e)

    def search_specific_nutrition(self, food_name):
        query = "SELECT F.food_name, N.protein, N.fat, N.dietary_fibre, I.ingredient_name FROM food F LEFT JOIN ingredient I on F.public_food_key = I.public_food_key JOIN nutrition N on I.ingredient_public_food_key = N.public_food_key WHERE F.food_name LIKE '%s'"
        try:
            cur = self.connection.cursor()
            args = '%' + food_name + '%'
            cur.execute(query % args)
            return cur.fetchall()
        except Error as e:
            print(e)