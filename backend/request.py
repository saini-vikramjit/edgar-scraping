import requests
from bs4 import BeautifulSoup

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
        print(len(entries))

        master_list_xml = []

        for entry in entries:
            
            accession_num = entry.find('accession-number').text

            entry_dict = {}
            entry_dict[accession_num] = {}
            
            category_info = entry.find('category')    
            entry_dict[accession_num]['category'] = {}
            entry_dict[accession_num]['category']['label'] = category_info['label']
            entry_dict[accession_num]['category']['scheme'] = category_info['scheme']
            entry_dict[accession_num]['category']['term'] =  category_info['term']

            entry_dict[accession_num]['file_info'] = {}
            entry_dict[accession_num]['file_info']['act'] = entry.find('act').text
            entry_dict[accession_num]['file_info']['file_number'] = entry.find('file-number').text
            entry_dict[accession_num]['file_info']['file_number_href'] = entry.find('file-number-href').text
            entry_dict[accession_num]['file_info']['filing_date'] =  entry.find('filing-date').text
            entry_dict[accession_num]['file_info']['filing_href'] = entry.find('filing-href').text
            entry_dict[accession_num]['file_info']['filing_type'] =  entry.find('filing-type').text
            entry_dict[accession_num]['file_info']['form_number'] =  entry.find('film-number').text
            entry_dict[accession_num]['file_info']['form_name'] =  entry.find('form-name').text
            entry_dict[accession_num]['file_info']['file_size'] =  entry.find('size').text
            
            entry_dict[accession_num]['request_info'] = {}
            entry_dict[accession_num]['request_info']['link'] =  entry.find('link')['href']
            entry_dict[accession_num]['request_info']['title'] =  entry.find('title').text
            entry_dict[accession_num]['request_info']['last_updated'] =  entry.find('updated').text
            
            master_list_xml.append(entry_dict)

        return master_list_xml
    except:
        return False