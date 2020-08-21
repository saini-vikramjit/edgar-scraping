from bs4 import BeautifulSoup

def check_none(entry, type):
    if not entry.find(type):
        return ""
    return entry.find(type).text