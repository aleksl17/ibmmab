from GoogleNews import GoogleNews

googlenews = GoogleNews()
googlenews.setlang('no')

def search_with_inmput(input): #googleNews takler ikke spesial karakterer som æ ø å
    googlenews.search(input)
    googlenews.getpage(2)
    googlenews.getpage(3)
    news_links = googlenews.get__links()
    googlenews.clear()
    return news_links

def norge_klima_search():           # Searching google news using Norge and klima
    googlenews.search('norge klima')
    googlenews.getpage(2)
    googlenews.getpage(3)
    news_links = googlenews.get__links()
    googlenews.clear()
    return news_links
