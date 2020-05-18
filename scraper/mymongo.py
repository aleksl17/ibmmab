import datetime
import pytz
import pymongo
from newspaper import Article
from pymongo import MongoClient




# client = pymongo.MongoClient("http://localhost:3000/api/anData")            #Fix this
# def topost(article):
    # article.text = article.text.replace("\n", " ")

    # post = {
        # "text": article.text.replace("\n", " "),
        # "title": article.title,
        # "author": article.authors,
        # "url": article.url,
        # "scrape_date": str(datetime.datetime.utcnow().date()),
        # "publish_date": article.publish_date,
        # "createdAt": str(datetime.datetime.now()),
        # "updatedAt": str(datetime.datetime.now())
    # }
    # return post

