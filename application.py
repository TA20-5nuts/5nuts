import os
import sys

# sys.path.append("c:/users/teres/appdata/local/programs/python/python39/lib/site-packages")

from flask import Flask
from flask import render_template
from flask import make_response, send_from_directory, redirect, jsonify

from model import FoodData
from model import Hospital

from flask_cors import CORS

# app = Flask(__name__)
application = app = Flask(__name__, static_folder="templates/views/assets")

CORS(application)


@application.route("/")
def root():
    return redirect("/home", code=302)


@application.route("/home")
def home():
    return render_template('views/index.html')


@application.route("/facts")
def facts():
    return render_template('views/facts.html')


@application.route("/quiz")
def quiz():
    return render_template('views/quiz.html')


@application.route("/lunchbox")
def lunchbox():
    return render_template('views/lunchbox.html')


@application.route("/game")
def game():
    return render_template('views/game.html')


@application.route("/prevention")
def prevention():
    return render_template('views/prevention.html')


@application.route("/hospital")
def hospital():
    return render_template('views/hospital.html')


@application.route("/test")
def test():
    response = {"result": "result data"}
    return make_response(response, 200)


@application.route("/api/web-link", methods=['POST', 'GET'])
def webLink():
    result = FoodData().get_web_links()
    return jsonify({'data': result})


@application.route("/api/food-avoided", methods=['POST', 'GET'])
def foodAvoided():
    result = FoodData().get_food_avoided()
    return jsonify({'data': result})


# API path, get data from model.py
@application.route("/api/food-info/<food_name>", methods=['POST', 'GET'])
def foodInfo(food_name=None):
    with app.app_context():
        result = FoodData(food_name).get_food_info()
        return jsonify({'data': result})


@application.route("/api/ingredients-info", methods=['POST', 'GET'])
def ingredientsInfo():
    with app.app_context():
        result = FoodData().get_ingredients_info()
        # print(result)
        return jsonify({'data': result})


@application.route("/api/nutrition-info", methods=['POST', 'GET'])
def nutritionInfo():
    with app.app_context():
        result = FoodData().get_nutrition_info()
        return jsonify({'data': result})


@application.route("/api/hospitals-data", methods=['POST', 'GET'])
def hospitalsData():
    with app.app_context():
        result = Hospital().get_hospital_data()
        return jsonify({'data': result})


@application.route("/api/food-ingredients/<food_name>", methods=['POST', 'GET'])
def foodIngredients(food_name=None):
    with app.app_context():
        result = FoodData(food_name).get_ingredients_by_food()
        return jsonify({'data': result})


@application.route("/api/food-nutrition/<food_name>", methods=['POST', 'GET'])
def foodNutrition(food_name=None):
    with app.app_context():
        result = FoodData(food_name).get_nutrition_by_food()
        return jsonify({'data': result})


@application.route("/api/food-specific-nutrition/<food_name>", methods=['POST', 'GET'])
def specificNutrition(food_name=None):
    with app.app_context():
        result = FoodData(food_name).get_specific_nutrition()
        return jsonify({'data': result})


if __name__ == "__main__":
    # application.run(debug=True)  # development
    application.run()  # deployment
