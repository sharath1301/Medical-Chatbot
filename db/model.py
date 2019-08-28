from sqlalchemy import create_engine

DATABASE_URI = 'sqlite:///medley.db'


class DB:
    def __init__(self):
        self.engine = None

    def connect(self):
        self.engine = create_engine(DATABASE_URI)

    def run_query(self, query):
        return self.engine.execute(query)
