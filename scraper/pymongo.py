
import pymongo

MyClient = pymongo.MongoClient("mongodb://localhost:27017/")

db = MyClient.test_database

#client = pymongo.MongoClient("http://localhost:3000/api/anData")            #Fix this

print(MyClient)


