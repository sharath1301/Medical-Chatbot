#!flask/bin/python
from flask import Flask, request, jsonify

from db.model import DB

app = Flask(__name__)
db = DB()


def get_initial_suggestions(symptoms):
    return [s[::-1] for s in symptoms]


@app.route('/filter', methods=['POST'])
def handle_filter():
    body = request.json
    symptoms = body['symptoms']
    suggestions = get_initial_suggestions(symptoms)
    return jsonify({"suggestions": suggestions})


if __name__ == '__main__':
    app.run(debug=True)
