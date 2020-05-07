

import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

db = myclient.test_database

#client = pymongo.MongoClient("http://localhost:3000/api/anData")            #Fix this

print(myclient)


