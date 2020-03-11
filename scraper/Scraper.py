from newspaper import Article
from googletrans import Translator

translator = Translator()


test_url = "https://www.nrk.no/urix/koronaviruset-kutter-en-firedel-av-kinas-klimagassutslipp-1.14922099"

def recive_and_parse(url):
    article = Article(url)
    article.download()
    article.html
    article.parse()
    return article

def vital_info(article):
    print(article.title)
    print(article.authors[0])
    print(article.publish_date)

def no_to_en(no_text):
    translation = translator.translate(no_text, dest='en')
    return translation.text


while True:
    print("insert url.\n If you want to exit input 0\n")
    input_url = input()
    if input_url == 0: break
    article = recive_and_parse(input_url)
    vital_info(article)
    #print(article.text)
    print(no_to_en(article.text))

