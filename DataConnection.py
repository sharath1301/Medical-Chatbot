import sqlite3
from sqlite3 import Error


class DbConnection:
    def __init__(self, db_file):
        self.db_file = db_file
        self.conn = self.create_connection(self.db_file)

    def create_connection(self, db_file):
        """ create a database connection to the SQLite database
            specified by the db_file
        :param db_file: database file
        :return: Connection object or None
        """
        try:
            conn = sqlite3.connect(db_file)
            return conn
        except Error as e:
            print(e)

        return None

if __name__ == '__main__':
    db_conn = DbConnection("db/medley.db")