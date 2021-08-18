import os

from flask import Flask
from flask import render_template
from flask import send_from_directory
from flask import make_response
# app = Flask(__name__)
app = Flask(__name__, static_folder="templates/static")


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
    # return Response(jsonify(response), mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)
