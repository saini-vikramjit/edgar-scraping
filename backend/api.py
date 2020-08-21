import copy
import logging
import os

from flask import request, jsonify, send_from_directory
from flask import Flask
from flask_compress import Compress
from flask_cors import cross_origin
from werkzeug.utils import secure_filename

from request import endpoint_search_by_company_id

app = Flask(__name__)
COMPRESS_MIMETYPES = [
    'text/html',
    'text/css',
    'application/json'
]
COMPRESS_LEVEL = 6
COMPRESS_MIN_SIZE = 500
Compress(app)


def error_response(msg, code):
    err_msg = jsonify({'error':msg})
    return (err_msg, code)

@app.route('/')
def home():
    return 'Check the API\'s'


@app.route('/api/search-by-company-id', methods=['POST'])
@cross_origin()
def search_by_company_id():
    search_json = request.get_json()
    if search_json is None:
        return error_response("Bad arguments", 400)
    cik = search_json['cik']
    if cik is None:
        return error_response("Company Id missing", 400)
    form_type = search_json['type']
    try:
        status, response = endpoint_search_by_company_id(cik, form_type)
        if not status:
            return error_response(response, 400)
        
        if len(response) == 0:
            return error_response("No record found", 200)
        
        return jsonify(response)
    except Exception:
        error_response('Failed to retrieve data', 400)


if __name__ == '__main__':
    app.run(host='localhost', port=5001, debug=True)
