from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager    

class TestRecommendation(unittest.TestCase):
    
    def setUp(self):
       self.driver = webdriver.Chrome(ChromeDriverManager().install())
       self.driver.maximize_window()
       self.driver.get("https://coolafra.herokuapp.com/")
       time.sleep(1)

    def test_recommendation(self):
        #- - - - - - - - - -SELECT A TEAM FROM 2022- - - - - - - - - -
        self.driver.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[5]/a[1]").click()
        time.sleep(2)
        selectedTeam = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[4]/div/div[2]/div")
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div[4]/div").click()
        time.sleep(2)
        currentTeam = self.driver.find_element(By.XPATH, '//*[@id="c-info-head"]')
        self.assertTrue(selectedTeam, currentTeam)
        print("1/2 User can go to a team detail page of a team of current season, first test has passed. ✅")
        time.sleep(2)

        #- - - - - - - - - -SELECT ANOTHER SEASON- - - - - - - - - -

        self.driver.get("https://coolafra.herokuapp.com/")
        time.sleep(2)
        self.driver.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[5]/a[1]").click()
        time.sleep(2)
        self.driver.find_element(By.XPATH,"//*[@id=\"dropdown-basic-button\"]").click()
        time.sleep(2)
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[1]/div/div/div/div/a[5]").click()
        time.sleep(2)
        selectedTeam = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[8]/div/div[2]/div")
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div[8]/div").click()
        time.sleep(3)
        currentTeam = self.driver.find_element(By.XPATH, '//*[@id="c-info-head"]')
        self.assertTrue(selectedTeam, currentTeam)
        print("2/2 User can go to a team detail page of a team of selected season (2018 in this case), first test has passed. ✅")
        time.sleep(2)
        
if __name__ == "__main__":
    unittest.main()