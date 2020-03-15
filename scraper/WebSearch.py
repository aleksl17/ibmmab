from selenium import webdriver
from selenium.webdriver import Chrome


browser = webdriver.ChromeOptions()
browser.add_argument("headless")

search_string = input("Input the URL or string you want to search for:")
#Need to replace space with + for the seach to work.
search_string = search_string.replace(' ', '+')

for i in range(1):
    matched_elements = browser.get("https://www.google.com/search?q =" + search_string + "&start =" + str(i))

print(matched_elements)
