from GoogleNews import GoogleNews

googlenews = GoogleNews()
googlenews.setlang('no')

def search_with_inmput(pages): #googleNews takler ikke spesial karakterer som æ ø å
    googlenews.search(input)
    if (pages >= 2):
        for x in range(2, pages + 1):
            googlenews.getpage(x)
    #googlenews.getpage(2)
    #googlenews.getpage(3)
    news_links = googlenews.get__links()
    googlenews.clear()
    return news_links

def norge_klima_search(pages):           # Searching google news using Norge and klima
    googlenews.search('norge klima')
    if (pages >= 2):
        for x in range(2, pages + 1):
            googlenews.getpage(x)
    #googlenews.getpage(2)
    #googlenews.getpage(3)
    news_links = googlenews.get__links()
    googlenews.clear()
    return news_links
