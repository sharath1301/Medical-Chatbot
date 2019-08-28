import sqlite3
from sqlite3 import Error

class MedicineDetails:
    def __init__(self):
        self.db_file = 'db/medley.db'

    def get_medicine_details(self, name):
        with sqlite3.connect(self.db_file) as dbconn:
            cursor = dbconn.cursor()
            cursor.execute("SELECT * FROM medicine WHERE name=?", (name, ))
            med_info = cursor.fetchall()
            for row in med_info:
                print(row)
            return med_info

    def filter_symptoms(self, symptoms):
        with sqlite3.connect(self.db_file) as dbconn:
            cursor = dbconn.cursor()
            cursor.execute('SELECT * FROM condition_symptom_freq_view WHERE symptom=? ORDER BY appearances desc', (symptoms, ))
            conditions = cursor.fetchall()
            for row in conditions:
                print(row)
            return conditions

if __name__ =='__main__':
    meds = MedicineDetails()
    # meds.get_medicine_details('advil')
    meds.filter_symptoms('headache')
