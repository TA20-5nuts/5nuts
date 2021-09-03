import sqlite3

connection = sqlite3.connect('database\\nutsndairy.db')
cursor = connection.cursor()
query = "SELECT * from hospitals"
cursor.execute(query)
results = cursor.fetchall()
x= []
for r in results:
    x.append(r)
print(x)
cursor.close()
connection.close()


class FoodData:
    def __init__(self):
        self.weblinks_info = []
        self.food_avoided = []
        self.food_info = []
        self.ingredients_info = []
        self.nutrition_info = []

    def get_nutrition_info(self, food_name):
        query = "SELECT * from nutrition"
        cursor.execute(query)
        results = cursor.fetchall()
        for r in results:
            self.nutrition_info.append(r)
        cursor.close()
        connection.close()
        return self.nutrition_info

    def get_food_info(self):
        query = "SELECT * from food"
        cursor.execute(query)
        results = cursor.fetchall()
        for r in results:
            self.food_info.append(r)
        cursor.close()
        connection.close()
        return self.food_info

    def get_ingredients_info(self):
        query = "SELECT * from ingredient"
        cursor.execute(query)
        results = cursor.fetchall()
        for r in results:
            self.ingredients_info.append(r)
        cursor.close()
        connection.close()
        return self.ingredients_info

    def get_web_links(self):
        f = open("./.data/WebLinks.csv", "r", encoding='utf-8-sig')
        reader = csv.reader(f)
        for row in reader:
            self.weblinks_info.append(row)
        f.close()
        return self.weblinks_info

    def get_food_avoided(self):
        f = open("./.data/Aged2YearsAndOverTypeOfFoodAvoided.csv", "r", encoding='utf-8-sig')
        reader = csv.reader(f)
        for row in reader:
            self.food_avoided.append(row)
        f.close()
        return self.food_avoided

class Hospital:

    def __init__(self):
        self.hospitals = []

    def get_hospital_data(self):
        query = "SELECT * from hospitals"
        cursor.execute(query)
        results = cursor.fetchall()
        for r in results:
            self.hospitals.append(r)
        cursor.close()
        connection.close()
        return self.hospitals

