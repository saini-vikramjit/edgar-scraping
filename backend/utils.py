import re

from bs4 import BeautifulSoup

def check_none(entry, type):
    if not entry.find(type):
        return ""
    return entry.find(type).text

def remove_hyphen(str):
    return str.replace('-', '')

def create_url(base_url, comp):
    url = base_url
    for r in comp:
        url = '{}/{}'.format(url, r)
    return url

def filter_record(arr):
    pattern = '.txt$'
    for rec in arr:
        result = re.search(pattern, rec['name'])
        if result is not None:
            return rec
    return None