from Scraper import norge_klima, translate_article
from mymongo import topost
from googletrans import Translator
translator = Translator()

def main():
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
        print(postable)




if __name__ == '__main__':
    main()

