import pymongo
import time

from Scraper import norge_klima, translate_article
from mymongo import topost
from googletrans import Translator
import mymongo
translator = Translator()

def main():
    MyClient = pymongo.MongoClient('localhost', 27017)
    db = MyClient.ibmmab
    collection = db.analysisdatas

    enda = norge_klima()
    print(len(enda))
    length = 0
    how_many = 0

    for item in enda:
        print(item.url)
        translate_article(item)
        if (item.text == "NA"): continue
        #print(item.text)
        #length += len(item.text)
        how_many += 1
        print(how_many)
        postable = topost(item)
        post = collection.insert_one(postable)
        time.sleep(30)
        print("posted")
        #print(post.inserted_id)
        #print(postable)




if __name__ == '__main__':
    main()

