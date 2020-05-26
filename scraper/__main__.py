import datetime
import pymongo
import moment
import time

from Scraper import norge_klima, translate_article
from googletrans import Translator

translator = Translator()


def main():
    MyClient = pymongo.MongoClient('localhost', 27017)
    db = MyClient.ibmmab
    collection = db.analysisdatas
    enda = norge_klima()

    for item in enda:
        translate_article(item)
        if item.text == "NA":
            continue
        try:
            author = item.authors[0]
        except Exception:
            author = "NA"
        postable = {
            "text": item.text.replace("\n", " "),
            "title": item.title,
            "author": author,
            "url": item.url,
            "scrape_date": moment.utcnow().format('YYYYMMDDhhmmss'),
            "publish_date": item.publish_date,
            "createdAt": moment.utcnow().format('YYYYMMDDhhmmss')
        }
        post = collection.insert_one(postable)
        print("Posted")


if __name__ == '__main__':
    main()
