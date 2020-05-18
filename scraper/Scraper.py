import newspaper
from newspaper import Article
from googletrans import Translator
from google_news import norge_klima_search, search_with_inmput


"""
class Scraped_Article:
    def __init__(self, url):
        self.article = url
        self.article.download()
        self.article.html
        self.article.parse()
        self.article_title = self.article.title
        self.author = self.article.title
        self.publish_date = self.article.publish_date
        self.text = ""

"""        # Scraped Article Class Ended up never being used, but could be if one wanted to make it cleaner


translator = Translator()

def recive_and_parse(url):      # Downloads the article and gets it ready
    article = Article(url)
    article.download()
    article.html
    article.parse()
    return article


def vital_info(article):            #Function to get title, author and publish date from the article
    print(article.title)
    print(article.authors[0])
    print(article.publish_date)


def no_to_en(no_text):  #Takes in simple text
    try:
        translation = translator.translate(no_text, dest='en').text     #Uses the googletrans to translate
    except Exception:
        return "NA"             #Some articles don't like to be translated is set up for removal later.

    return translation  #Returns translated text


def translate_article(article):             # Takes in article, translates and replace the text of the article.
    article.text = no_to_en(article.text)


def check_unwanted(article):                # Hardcoded removals of unwanted stuff
    if (len(article.text) == 0): return True    # Removes anything where we can't get the text from the article
    if ("Allerede abonnent?" in article.text): return True  # Removes articles behind a paywall
    if (".tv" in article.url): return True  # Removes news that are videos not text articles
    if ("tv." in article.url): return True  # Same as above
    if ("må ha et aktivt abonnement" in article.url): return True # Removes articles behind a paywall
    if ("Ikke abonnent" in article.text): return True   # Removes articles behind a paywall
    else:
        return False



"""""
def NRK_miljo():
    NRK_paper = newspaper.build(nrk_klima, memoize_articles=False)
    NRK_papers = []
    for article in NRK_paper.articles:
        if ("www.nrk" in article.url):
            if ("nrk.no/dokumentar" in article.url): continue               //Started with getting 
            if ("nrk.no/video" in article.url): continue
            # print(article.url)
            news_article = recive_and_parse(article.url)
            NRK_papers.append(news_article)
            """""
"""""
            try:
                vital_info(news_article)
                print(no_to_en(news_article.text))
            except IndexError as e:
                print("error")
                continue
                """""               #NRK miljo hardkoding
"""""
    print(NRK_paper.size())
    return NRK_papers
"""""

"""""
def Dagbladet_miljo():
    Dag_paper = newspaper.build('https://www.dagbladet.no/emne/milj%C3%B8', memoize_articles=False)
    Dag_papers = []
    for article in Dag_paper.articles:
        temp_paper = recive_and_parse(article.url)
        # temp_paper = Scraped_Article(article.url)
        Dag_papers.append(temp_paper)
    return Dag_papers
"""""               #Dagbladet miljo hardkoding


def norge_klima():                      # Google search using "norge klima" as the search
    temp_list = norge_klima_search()
    search_papers = []
    for paper in temp_list:
        try:
            temp_paper = recive_and_parse(paper)        # Skips articles that won't be parsed (Could otherwise cause the program to stop)
        except Exception:
            continue
        if check_unwanted(temp_paper): continue
        search_papers.append(temp_paper)
    return search_papers                    # Returns list of scraped articles

