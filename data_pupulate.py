import sqlite3
from sqlite3 import Error
import csv
import re
from nltk import word_tokenize
from nltk.corpus import stopwords
from textblob import Word


def get_medicine_details():
    with sqlite3.connect('db/medley.db') as dbconn:
        cursor = dbconn.cursor()
        cursor.execute("SELECT * FROM otc_info")
        med_info = cursor.fetchall()
        # for row in med_info:
        #     print(row)
        with open('a.csv', 'w') as f:
            writer = csv.writer(f)
            for row in med_info:
                uses = row[4].replace('\\t', '')
                uses = uses.replace('\\n', ',')
                uses = uses.replace('\\r', '')
                uses = uses.replace('[', '')
                uses = uses.replace(']', '')
                uses = uses.split(',')
                for use in uses:
                    if use != '':
                        details = [row[0].lower(), row[1].lower(), use.lower()]
                        writer.writerow(details)

def clean_data():
    with open('a.csv', 'r') as f:
        reader = csv.reader(f)
        stop_words = set(stopwords.words('english'))
        with open('cleaned.csv', 'w') as f2:
            writer = csv.writer(f2)
            for row in reader:
                info = row[2]
                tokens = word_tokenize(info)
                stripped = [re.sub(r'[^\w\s]', '', w) for w in tokens]
                words = [word for word in stripped if word.isalpha()]
                words = [word.lower() for word in words if word not in stop_words]
                row[2] = ' '.join(words)
                writer.writerow(row)

def nlp_data():
    with open('cleaned.csv', 'r') as f:
        reader = csv.reader(f)
        with open('nlp_data.csv', 'w') as f2:
            writer = csv.writer(f2)
            for row in reader:

                tokens = word_tokenize(row[2])
                row[2] = tokens.apply(lambda x: " ".join([Word(word).lemmatize() for word in x.split()]))
                print(row)





nlp_data()
#get_medicine_details()