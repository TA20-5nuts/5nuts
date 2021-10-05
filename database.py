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
        name = []
        new_food = []
        if food_name == "grain":
            name = ["bread", "breakfast", "potato", "popcorn"]
        elif food_name == "vegetable":
            name = ["carrot", "lettuce", "cucumber", "corn", "tomato"]
        elif food_name == "dairy":
            name = ["cheese", "milk", "soy beverage", "yogurt"]
        elif food_name == "protein":
            name = ["chicken", "ham", "bacon", "sausage", "egg", "chickpea", "tuna", "turkey"]
        elif food_name == "fruit":
            name = ["apple", "banana", "grape", "mango", "berry", "orange", "sultana"]
        else:
            name = ["juice", "water", "soft drink"]

        query = "select distinct name from (SELECT substr(name, 1, instr(name, ',') -1) AS name FROM food WHERE substr(name, 1, instr(name, ',') -1) LIKE '%s')"
        try:

            cur = self.connection.cursor()
            for i in name:
                if i == 'berry':
                    args = '%' + i + '%'
                elif i == 'egg':
                    args = i
                else:
                    args = i + '%'
                cur.row_factory = lambda cursor, row: row[0]
                cur.execute(query % args)
                value = cur.fetchall()
                # print(value)

                if not value:
                    pass
                elif value[0] == 'Breakfast cereal':
                    value[0] = 'Cereal'
                    new_food.append(value)
                else:
                    new_food.append(value)

            list = []
            result = []
            merge_list = []
            new_value = []
            for i in range(0, len(new_food)):
                for j in new_food[i]:
                    matches = ['raw', 'Dripping', 'Breadcrumbs', 'Milkfish', 'crisp', 'Hamburger', 'Grapefruit',
                               'Cranberry', 'Goji berry', 'Mulberry', 'Sausages & vegetables', 'Cornmeal', 'chips',
                               'Water chestnut', 'Watercress', 'Bread roll']
                    matches_exact = ['Bread']
                    if any(x in j for x in matches):
                        print("error")
                    elif any(x in j for x in matches_exact):
                        new_value.append(j)
                        query_others = "SELECT desc FROM food WHERE substr(name, 1, instr(name, ',') -1) = '%s' limit 1"
                        cur = self.connection.cursor()
                        args = j
                        cur.row_factory = lambda cursor, row: row[0]
                        cur.execute(query_others % args)
                        value_others = cur.fetchone()
                        list.append(value_others)
                    else:
                        new_value.append(j)
                        query_others = "SELECT desc FROM food WHERE name LIKE '%s' and desc NOT LIKE '%s' and desc not like '%s' limit 1"
                        cur = self.connection.cursor()
                        args = j + '%'
                        args_2 = '%raw%'
                        args_3 = '%canned%'
                        cur.row_factory = lambda cursor, row: row[0]
                        cur.execute(query_others % (args, args_2, args_3))
                        value_others = cur.fetchone()
                        list.append(value_others)
                # print(listist)
                # print(new_value)

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

    def search_hospital_data(self):
        query = """
        SELECT * FROM hospitals;
        """
        try:
            cur = self.connection.cursor()
            cur.execute(query)
            return cur.fetchall()
        except Error as e:
            print(e)


Database().search_food_by_food("grain")
