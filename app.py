from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

@app.route('/')
def home():
    return ('Available Routes:</br>/features - Spotify Features for Each Track </br>\
            /genres - Genre Stats for each Period</br> /periods - Features Stats for each Period')

@app.route('/features')
def features():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_path = os.path.join(SITE_ROOT, "Extraction/Outputs", "features.json")
    with open(json_path, encoding='utf-8') as data:
        data = json.load(data)
        return jsonify(data)

@app.route('/genres')
def genres():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_path = os.path.join(SITE_ROOT, "Extraction/Outputs", "genre_stats.json")
    with open(json_path, encoding='utf-8') as data:
        data = json.load(data)
        return jsonify(data)

@app.route('/periods')
def periods():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_path = os.path.join(SITE_ROOT, "Extraction/Outputs", "period_stats.json")
    with open(json_path, encoding='utf-8') as data:
        data = json.load(data)
        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)