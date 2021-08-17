from flask import Flask
from flask import render_template
# app = Flask(__name__)
app = Flask(__name__, static_folder="templates/static")

@app.route("/")
def home():
    return render_template('views/Home.html')

if __name__ == "__main__":
    app.run(debug=True)