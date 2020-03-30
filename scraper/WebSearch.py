from selenium import webdriver
from selenium.webdriver import Chrome


browser = webdriver.ChromeOptions()
browser.add_argument("headless")
browser.add_argument('--ignore-certificate-errors')
browser.add_argument("--test-type")

#Need to replace space with + for the seach to work.

browser.get("https://www.google.com/search?q=norge+milj%C3%B8&source=lnms&tbm=nws&sa=X")

for a in browser.find_elements_by_xpath('.//a'):
    print(a.get_attribute('href'))

