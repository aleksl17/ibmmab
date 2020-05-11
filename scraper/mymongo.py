import datetime
import pymongo
from newspaper import Article

from pymongo import MongoClient

class mymongo:
    def __init__(self):
        MyClient = pymongo.MongoClient('localhost', 27017)

        db = MyClient.ibmmab
        collection = db.analysisdatas


#client = pymongo.MongoClient("http://localhost:3000/api/anData")            #Fix this
def topost(article):
    article.text = article.text.replace("\n", " ")
    post = {
        "text": article.text,
        "title": article.title,
        "author": article.authors,
        "url": article.url,
        "scrape_date": datetime.datetime.utcnow().date(),
    }
    return post




