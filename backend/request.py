import re
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

        #file = open("soup.txt","w")
        #file.write(soup.prettify())
        #file.close()

        # Parsing the filing txt
        # define a dictionary that will house all filings.
        master_filings_dict = {}

        # add a new level to our master_filing_dict, this will also be a dictionary.
        master_filings_dict[accession_number] = {}

        # this dictionary will contain two keys, the sec header content, and a documents key.
        master_filings_dict[accession_number]['sec_header_content'] = {}
        master_filings_dict[accession_number]['filing_documents'] = None

        # grab the sec-header tag, so we can store it in the master filing dictionary.
        sec_header_tag = soup.find('sec-header')

        # store the tag in the dictionary just as is.
        master_filings_dict[accession_number]['sec_header_content']['sec_header_code'] = sec_header_tag

        # display the sec header tag, so you can see how it looks.
        # print(sec_header_tag)

        master_document_dict = {}

        # find all the documents in the filing.
        for filing_document in soup.find_all('document'):
            
            # define the document type, found under the <type> tag, this will serve as our key for the dictionary.
            document_id = filing_document.type.find(text=True, recursive=False).strip()
            
            # here are the other parts if you want them.
            document_sequence = filing_document.sequence.find(text=True, recursive=False).strip()
            document_description = filing_document.description.find(text=True, recursive=False).strip()
            
            # initalize our document dictionary
            master_document_dict[document_id] = {}
            
            # add the different parts, we parsed up above.
            master_document_dict[document_id]['document_sequence'] = document_sequence
            master_document_dict[document_id]['document_description'] = document_description

            # store the document itself, this portion extracts the HTML code. We will have to reparse it later.
            #master_document_dict[document_id]['document_code'] = filing_document.extract()
            
            
            # grab the text portion of the document, this will be used to split the document into pages.
            filing_doc_text = filing_document.find('text').extract()
            
            page_document = filing_doc_text.find('page')

            table_document = page_document.find_all('table')
            print(len(table_document))
            for table in table_document:
                print("#########################")
                print(table)
                
            
            #print(all_page_numbers)
        
        return (True, filing_url)

    except Exception as e:
        #return (False, "Error occured during request processing")
        return (False, str(e))