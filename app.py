import os

from flask import Flask
from flask import render_template
from flask import make_response
# from flask_cors import CORS
# app = Flask(__name__)
app = Flask(__name__, static_folder="templates/static")
# CORS(app)


@app.route("/")
def home():
    return render_template('views/Home.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, "templates"), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route("/test")
def test():
    response = {"result": "result data"}
    return make_response(response, 200)


if __name__ == "__main__":
    app.run(debug=True)

