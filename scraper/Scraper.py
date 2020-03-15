import newspaper
from newspaper import Article
from googletrans import Translator

translator = Translator()
test_url = "https://www.nrk.no/urix/koronaviruset-kutter-en-firedel-av-kinas-klimagassutslipp-1.14922099"

#list of places to get articles from major news sites in Norway.
aftenposten_klima = newspaper.build("https://www.aftenposten.no/tag/Klima_og_milj%C3%B8", memoize_articles=False)
aftenposten_miljo = newspaper.build("https://www.aftenposten.no/tag/Milj%C3%B8", memoize_articles=False)
dagbladet_miljo = newspaper.build('https://www.dagbladet.no/emne/milj%C3%B8', memoize_articles=False)
norge_miljo = newspaper.build('https://www.google.com/search?q=norge+milj%C3%B8&source=lnms&tbm=nws&sa=X', memoize_articles=False)




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


# while True:
#     print("insert url.\n If you want to exit input 0\n")
#     input_url = input()
#     if input_url == 0: break
#     article = recive_and_parse(input_url)
#     vital_info(article)
#     #print(article.text)
#     print(no_to_en(article.text))


def NRK_miljø():
    NRK_paper = newspaper.build('https://www.nrk.no/emne/klima-og-miljo-1.4295299', memoize_articles=False)
    for article in NRK_paper.articles:
        if ("www.nrk" in article.url):
            if ("nrk.no/dokumentar" in article.url): continue
            print(article.url)
            news_article = recive_and_parse(article.url)
            try:
                vital_info(news_article)
                print(no_to_en(news_article.text))
            except IndexError as e:
                print("error")
                continue
    print(NRK_paper.size())


