import os

from flask import Flask
from flask import render_template
from flask import make_response, send_from_directory, redirect, jsonify

from model import FoodData

from flask_cors import CORS

# app = Flask(__name__)
application = app = Flask(__name__, static_folder="templates/views/assets")
CORS(application)


@application.route("/")
def root():
    return redirect("/home", code=302)


@application.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, "templates"), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@application.route("/home")
def home():
    return render_template('views/index.html')


@application.route("/introduction")
def introduction():
    return render_template('views/introduction.html')


@application.route("/resources")
def resources():
    return render_template('views/resources.html')


@application.route("/quiz")
def quiz():
    return render_template('views/quiz.html')


@application.route("/game")
def game():
    return render_template('views/game.html')


@application.route("/test")
def test():
    response = {"result": "result data"}
    return make_response(response, 200)


@application.route("/api/web-link")
def webLink():
    result = FoodData().get_web_links()
    return jsonify({'articles_data': result})


@application.route("/api/food-avoided")
def foodAvoided():
    result = FoodData().get_food_avoided()
    return jsonify({'articles_data': result})


if __name__ == "__main__":
    application.run(debug=True)
