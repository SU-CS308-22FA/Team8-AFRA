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

        #- - - - - - - - - -ALL FIELDS ARE FILLED CASE- - - - - - - - - -

        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
        time.sleep(1)
        mail = self.driver.find_element(By.XPATH, '//*[@id="formBasicEmail"]')
        mail.send_keys("kaancadalilar@gmail.com")
        time.sleep(1)
        password = self.driver.find_element(By.XPATH, '//*[@id="formBasicPassword"]')
        password.send_keys("kaann")
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/form/button').click()
        time.sleep(1)
        print("Login achieved.✅")
        self.driver.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[2]/a").click()
        self.driver.find_element(By.XPATH,"//*[@id=\"dropdown-button\"]").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/form/div[1]/div/div/div/a[7]").click()
        detail = self.driver.find_element(By.XPATH, '//*[@id="formBasic"]')
        detail.send_keys("Referees page is being loaded slowly.")
        time.sleep(1)
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/form/button").click()
        time.sleep(1)
        isSuccess = self.driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div/div[1]/div[2]/div/strong')
        print(isSuccess)
        self.assertTrue(isSuccess, "Bug Report is added!")
        print("1/2 User can send the report by clicking the submit button, first test has passed. ✅")
        time.sleep(2)

        #- - - - - - - - - -EMPTY FIELD CASE- - - - - - - - - -

        self.driver.get("https://coolafra.herokuapp.com/")
        time.sleep(1)
        self.driver.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[2]/a").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH,"//*[@id=\"dropdown-button\"]").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/form/div[1]/div/div/div/a[7]").click()
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/form/button").click()
        time.sleep(2)
        isSuccess = self.driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div/div[1]/div[2]/div/strong')
        self.assertTrue(isSuccess, "Fields cannot be empty.")
        print("2/2 User cannot send the report when does not enter a bug detail, second test has passed. ✅")
        time.sleep(2)
        
if __name__ == "__main__":
    unittest.main()