from flask import Flask, request, json, jsonify
from gevent.pywsgi import WSGIServer
from flask_restful import Resource, Api, reqparse
from MedicineDetails import MedicineDetails

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
# add the appropriate args after deciding on the json form the chatbot to the API.
parser.add_argument('temp')
meds = MedicineDetails()


"""
Get call to the Chatbot backend
TODO: call the backend after it is created
"""
@app.route('/medicine/<name>', methods=['GET'])
def get_medicine(name):
    response = {}
    response["details"] = meds.get_medicine_details(name) # replace with the function call
    return jsonify(response)

if __name__ == '__main__':
    # Debug/Development
    app.run(debug=True)
    # Production
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()