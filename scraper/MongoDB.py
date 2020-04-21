import pymongo
from pymongo import MongoClient

client = MongoClient()
client = MongoClient("http://localhost:3000/api/anData")            #Fix this
