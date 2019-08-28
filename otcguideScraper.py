from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import *
import csv
import re


def get_html(url):
    try:
        with closing(get(url, stream=True)) as resp:
            if resp.status_code == 200:
                return resp.content
            else:
                return None
    except RequestException as e:
        log_error(str.format("error", e.message))


def log_error(error_message):
    print(error_message)


def get_level_urls(url, file, mode):
    response = get_html(url)
    if response is not None:
        try:
            html = BeautifulSoup(response, 'html.parser')

            links = html.select("div.contentBG a")
            links = [link['href'] for link in links]
            links = set(links)

            with open(file, mode) as f:
                for link in links:
                    f.write(link + '\n')
        except Exception as e:
            log_error(e.message)


def get_level2_urls():
    with open('l1_urls.txt', 'r') as f:
        for line in f:
            url = line.strip()
            get_level_urls(url, 'l2_urls.txt', 'a')


def get_otc_urls_and_usage():
    with open('l2_urls.txt', 'r') as f:
        for line in f:
            url = line.strip()
            try:
                response = get_html(url)
                html = BeautifulSoup(response, 'html.parser')
                drugs = {}
                ranklist = html.select('div.contentBG div.rankList')
                drug_type = html.select("div.content div")[4]
                drug_type = drug_type.text
                rec_count = html.select('div.contentBG')[1]
                rec_count = rec_count.text
                rec_count = re.findall('[0-9\,]+', rec_count)[0]
                for ele in ranklist:
                    value = ele.select('div.productValue')[0].text

                    link = ele.select('div.productName a')
                    if len(link) > 0:
                        url = link[0]['href']
                        name = link[0]['title']
                        drugs[name] = [url, drug_type, value, rec_count]

                with open('otc_recommendation.csv', 'a') as f2:
                    writer = csv.writer(f2)
                    for drug in drugs:
                        row= [drug]
                        for i in drugs[drug]:
                            row.append(i)
                        writer.writerow(row)
            except Exception as e:
                log_error(e.message)


def get_drug_info():
    with open("otc_recommendation.csv", 'r') as f:
        reader = csv.reader(f)
        with open("otc_info.csv", 'a') as otc:
            writer = csv.writer(otc)
            for row in reader:
                drug_info = [row[0]] + row[2:]
                url = row[1].strip()
                response = get_html(url)
                html = BeautifulSoup(response, 'html.parser')
                links = html.select('div.contentBG a')
                if len(links) > 0:
                    try:
                        links = [link['href'] for link in links]
                        links = set(links)
                        with open('l2_drug_urls.csv', 'a') as f2:
                            wr = csv.writer(f2)
                            for link in links:
                                row[1] = link
                                wr.writerow(row)
                    except Exception as e:
                        print e.message
                else:
                    act_ingr = html.select('div#content_headerDrugFacts')[0]
                    drug_info.append(act_ingr.text.encode('utf-8').strip())
                    uses = html.select('div#content_headerUses ul')
                    if len(uses) > 0:
                        uses = uses[0].select('li')
                        uses = [use.text.encode('utf-8').strip() for use in uses]
                        drug_info.append(uses)
                    writer.writerow(drug_info)


def otc_info():
    with open("l2_drug_urls.csv", 'r') as f:
        reader = csv.reader(f)
        with open("otc_info1.csv", 'a') as otc:
            writer = csv.writer(otc)
            for row in reader:
                drug_info = [row[0]] + row[2:]
                url = row[1].strip()
                print(url)
                response = get_html(url)
                html = BeautifulSoup(response, 'html.parser')

                act_ingr = html.select('div#content_headerDrugFacts')[0]
                drug_info.append(act_ingr.text.encode('utf-8').strip())
                uses = html.select('div#content_headerUses ul')
                if uses is not None and len(uses) > 0:
                    uses = uses[0].select('li')
                    uses = [use.text.encode('utf-8').strip() for use in uses]
                    drug_info.append(uses)
                writer.writerow(drug_info)

# get_level_urls('https://www.otcguide.net/browse', 'l1_urls.txt', 'w')
# get_level2_urls()
# get_otc_urls_and_usage()
# get_drug_info()
otc_info()