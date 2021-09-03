#!/usr/bin/python3

import sqlite3
from sqlite3 import Error


class Database:
    def __init__(self, db_name):
        # connect
        connection = None
        try:
            connection = sqlite3.connect(db_name)
        except Error as e:
            print(e)

        self.connection = connection

    def __del__(self):
        if self.connection:
            self.connection.close()

    def search(self, table):
        query = "SELECT * FROM (?)"
        try:
            cur = self.connection.cursor()
            cur.execute(query, table)
            return cur.fetchall()
        except Error as e:
            print(e)

    def search_attribute(self, table, attribute):
        query = "SELECT " + attribute + " FROM " + table
        try:
            cur = self.connection.cursor()
            cur.execute(query, table)
            return cur.fetchall()
        except Error as e:
            print(e)
