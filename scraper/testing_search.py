import Scraper

nrk_papers = Scraper.NRK_miljo()
dag = Scraper.Dagbladet_miljo()

for x in dag:
    print(x.url)