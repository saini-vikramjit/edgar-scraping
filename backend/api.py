import copy
import logging
import os
import sys

from flask import request, jsonify, send_from_directory
from flask import Flask
from flask_compress import Compress
from flask_cors import cross_origin
from werkzeug.utils import secure_filename

from request import endpoint_search_by_company_id


port = 5001
debug = False

if len(sys.argv) > 1:
    port = sys.argv[1]
    if not port.isdigit():
        print(f'Bad port: {port}.')
        sys.exit(-1)
    if len(sys.argv) > 2:
        t = sys.argv[2].lower()
        debug = True if t == 'dev' else False

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


@app.route('/api/get-filing-details', methods=['POST'])
@cross_origin()
def get_filing_details():
    search_json = request.get_json()
    if search_json is None:
        return error_response("Bad arguments", 400)
    cik = search_json['cik']
    if cik is None:
        return error_response("Company Id missing", 400)
    accession_number = search_json['accessionNumber']
    if accession_number is None:
        return error_response("Accession number missing", 400)
    try:
        # code to implement
        
        return jsonify(search_json)
    except Exception:
        error_response('Failed to retrieve data', 400)

if __name__ == '__main__':
    app.run(host='localhost', port=port, debug=debug)
