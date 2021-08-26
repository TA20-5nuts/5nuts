import os
import csv

from flask import Flask
from flask import render_template
from flask import make_response, send_from_directory, redirect

from flask_cors import CORS

# app = Flask(__name__)
application = app = Flask(__name__, static_folder="templates/static")
CORS(app)


@application.route("/")
def root():
    return redirect("/home", code=302)


@application.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, "templates"), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@application.route("/home")
def home():
    return render_template('views/Home.html')


@application.route("/introduction")
def introduction():
    return render_template('views/Introduction.html')


@application.route("/resources")
def resources():
    return render_template('views/Resources.html')


@application.route("/quiz")
def quiz():
    return render_template('views/Quiz.html')


@application.route("/game")
def game():
    return render_template('views/Game.html')


@application.route("/test")
def test():
    response = {"result": "result data"}
    return make_response(response, 200)


if __name__ == "__main__":
    application.run(debug=True)
