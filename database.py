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

    # def search(self, table):
    #     query = "SELECT * FROM %s"
    #     try:
    #         cur = self.connection.cursor()
    #         cur.execute(query % table)
    #         return cur.fetchall()
    #     except Error as e:
    #         print(e)
    #
    # def search_attribute(self, table, attribute):
    #     query = "SELECT %s FROM %s"
    #     try:
    #         cur = self.connection.cursor()
    #         cur.execute(query % (attribute, table))
    #         return cur.fetchall()
    #     except Error as e:
    #         print(e)

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

    def search_food_by_food(self, food_name):
        query = "select distinct name from (SELECT substr(name, 1, instr(name, ',') -1) AS name FROM food WHERE name LIKE '%s')"
        try:
            cur = self.connection.cursor()
            args = food_name + '%'
            cur.row_factory = lambda cursor, row: row[0]
            cur.execute(query % args)
            value = cur.fetchall()
            list = []
            result = []
            merge_list = []
            new_value = []

            for i in value:
                matches = ['raw', 'Dripping', 'Breadcrumbs']
                matches_exact = ['Bread']
                if any(x in i for x in matches):
                    print("error")
                elif any(x in i for x in matches_exact):
                    new_value.append(i)
                    query_others = "SELECT desc FROM food WHERE substr(name, 1, instr(name, ',') -1) = '%s' limit 1"
                    cur = self.connection.cursor()
                    args = i
                    cur.row_factory = lambda cursor, row: row[0]
                    cur.execute(query_others % args)
                    value_others = cur.fetchone()
                    list.append(value_others)
                else:
                    new_value.append(i)
                    query_others = "SELECT desc FROM food WHERE name LIKE '%s' limit 1"
                    cur = self.connection.cursor()
                    args = i + '%'
                    cur.row_factory = lambda cursor, row: row[0]
                    cur.execute(query_others % args)
                    value_others = cur.fetchone()
                    list.append(value_others)

            for i in range(len(list)):
                new_list = []
                new_list.append(new_value[i])
                new_list.append(list[i])
                merge_list.append(new_list)
                Key = ("Food name", "Description")
                result.append(dict(zip(Key, merge_list[i])))
            print(result)
            return result
        except Error as e:
            print(e)

    def search_specific_nutrition(self, food_name):
        query = """
        SELECT F.name, sum(N.protein), sum(N.fat), sum(N.dietary_fibre) 
        from food as F join ingredient as I on F.public_food_key = I.public_food_key 
        join nutrition as N on I.ingredient_public_food_key = N.public_food_key
        WHERE F.name LIKE '%s'
        group by F.name
        """
        try:
            cur = self.connection.cursor()
            args = '%' + food_name + '%'
            cur.execute(query % args)
            value = cur.fetchall()
            result = []
            for i in value:
                Key = ("Food name", "Protein", "Fat", "Dietary fibre")
                result.append(dict(zip(Key, i)))
            return result
        except Error as e:
            print(e)


# Database().search_food_by_food("bread")
