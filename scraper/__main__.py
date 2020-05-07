from Scraper import norge_klima, translate_article


def main():
    enda = norge_klima()
    print(len(enda))
    length = 0
    how_many = 0

    for item in enda:
        print(item.url)
        translate_article(item)
        print(item.text)
        length += len(item.text)
        how_many += 1

    print("total length:" + str(length))
    print(length / how_many)


if __name__ == '__main__':
    main()

