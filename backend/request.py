import requests
from bs4 import BeautifulSoup

from utils import check_none, remove_hyphen, create_url, filter_record

def endpoint_search_by_company_id(cik, form_type):
    
    try:
        # Edgar endpoint
        endpoint = r"https://www.sec.gov/cgi-bin/browse-edgar"

        # Parparing the payload
        if form_type is not None:
            param_dict = {
                'action':'getcompany',
                'CIK': cik,
                'type': form_type,
                'dateb':'',
                'owner':'exclude',
                'start':'',
                'output':'atom',
                'count':'100'
            }
        else:
            param_dict = {
                'action':'getcompany',
                'CIK': cik,
                'type': '',
                'dateb':'',
                'owner':'exclude',
                'start':'',
                'output':'atom',
                'count':''
            }

        # Calling the endpoint
        response = requests.get(url = endpoint, params = param_dict)
        soup = BeautifulSoup(response.content, 'lxml')
        print(response.url)

        # Parsing the xml reponse
        entries = soup.find_all('entry')

        master_list_xml = []
        print(len(entries))
        if len(entries) == 0:
            return (True, master_list_xml)

        # Find the entries for 'DEF 14A' and 10-K' filings 
        for entry in entries:
            
            accession_num = check_none(entry, 'accession-number')

            entry_dict = {}
            entry_dict[accession_num] = {}
            
            category_info = entry.find('category')    
            entry_dict[accession_num]['category'] = {}
            entry_dict[accession_num]['category']['label'] = category_info['label']
            entry_dict[accession_num]['category']['scheme'] = category_info['scheme']
            entry_dict[accession_num]['category']['term'] =  category_info['term']

            entry_dict[accession_num]['file_info'] = {}
            entry_dict[accession_num]['file_info']['act'] = check_none(entry, 'act')
            entry_dict[accession_num]['file_info']['file_number'] = check_none(entry, 'file-number')
            entry_dict[accession_num]['file_info']['file_number_href'] = check_none(entry, 'file-number-href')
            entry_dict[accession_num]['file_info']['filing_date'] =  check_none(entry, 'filing-date')
            entry_dict[accession_num]['file_info']['filing_href'] = check_none(entry, 'filing-href')
            entry_dict[accession_num]['file_info']['filing_type'] =  check_none(entry, 'filing-type')
            entry_dict[accession_num]['file_info']['form_number'] =  check_none(entry, 'film-number')
            entry_dict[accession_num]['file_info']['form_name'] =  check_none(entry, 'form-name')
            entry_dict[accession_num]['file_info']['file_size'] =  check_none(entry, 'size')
            
            entry_dict[accession_num]['request_info'] = {}
            entry_dict[accession_num]['request_info']['link'] =  entry.find('link')['href']
            entry_dict[accession_num]['request_info']['title'] =  check_none(entry, 'title')
            entry_dict[accession_num]['request_info']['last_updated'] =  check_none(entry, 'updated')
            
            master_list_xml.append(entry_dict)

        return (True, master_list_xml)
    except Exception as e:
        #return (False, "Error occured during request processing")
        return (False, str(e))


def fetch_filing_details(cik, accession_number):
    
    try:
        # Creating the url
        endpoint = r"https://www.sec.gov/Archives/edgar/data"
        url = create_url(endpoint, [cik, remove_hyphen(accession_number), 'index.json'])

        # Calling the url
        response = requests.get(url = url)
        response_json = response.json()
        # print(response_json)

        # add check for response json

        # Filtering the response json
        filter_data = filter_record(response_json['directory']['item'])

        # add check for the filter

        # Creating the "DEF 14A" filing url
        filing_url = create_url(endpoint, [cik, filter_data['name']])
        print(filing_url)

        # Calling the filing url
        filing_response = requests.get(url = filing_url)
        soup = BeautifulSoup(filing_response.content, 'lxml')
        
        return (True, filing_url)

    except Exception as e:
        #return (False, "Error occured during request processing")
        return (False, str(e))