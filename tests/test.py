##
 ## if __name__ == "__main__":
   ##   browser = webdriver.Chrome(ChromeDriverManager().install())
   ##   browser.maximize_window()
   ##   browser.get("https://coolafra.herokuapp.com/")
   ##   browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
   ##   time.sleep(1)
   ##   mail = browser.find_element(By.XPATH, '//*[@id="formBasicEmail"]')
   ##   mail.send_keys("karadenizsevval@windowslive.com")
   ##   time.sleep(1)
   ##   passw = browser.find_element(By.XPATH, '//*[@id="formBasicPassword"]')
   ##   passw.send_keys("deneme")
    ##  time.sleep(1)
   ##   year= browser.find_element(By.XPATH, '//*[@id="weekSelector"]')
   ##   year.send_keys(1)
    ##  time.sleep(1)

   # browser.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/ul/div[1]/div[2]/div[2]/div[2]').click()
    #time.sleep(1)
    #browser.find_element(By.XPATH, '///*[@id="match-detail-page-tabpane-comments"]/div/div[1]/div/div[2]/div[1]/div[1]/a').click()
    #title = browser.find_element(By.XPATH,'//*[@id="title"]')
    #title.send_keys("match")
    #content = browser.find_element(By.XPATH,'//*[@id="content"]')
    #content.send_keys("good match")
    #browser.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/div/div[2]/form/button[1]').click()
    #time.sleep(1)
    #print("Login achieved.✅")
  

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
       self.driver.get("https://coolafra.herokuapp.com/")
       time.sleep(1)
    def test_recommendation(self):
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
        time.sleep(1)
        mail = self.driver.find_element(By.XPATH, '//*[@id="formBasicEmail"]')
        mail.send_keys("admin@admin.com")
        time.sleep(1)
        password = self.driver.find_element(By.XPATH, '//*[@id="formBasicPassword"]')
        password.send_keys("admin")
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/form/button').click()
        time.sleep(1)
        print("Login achieved.✅")


         #-----------------Postponed-----------------------
        self.driver.find_element(By.XPATH, '//*[@id="seasonSelector"]').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div/a[4]').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, '//*[@id="weekSelector"]').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[1]/div[2]/div/a[1]').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, '/html/body/div/div/div/div/div/ul/div[1]/div[2]/div[1]/div/div[2]/div/button').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/ul/div[1]/div[2]/div[1]/div/div[2]/div/div/a[2]').click()
        time.sleep(1)
        print("Succesfully postponed match -> SUCCESSFUL ✅")
        time.sleep(3)

         #-----------------Change the time of the match-----------------------
        self.driver.find_element(By.XPATH, '//*[@id="dropdown-basic"]').click()
        time.sleep(1)
        self.driver.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/ul/div[1]/div[2]/div[1]/div/div[2]/div/div/a[1]').click()
        time.sleep(1)
        newTime = self.driver.find_element(By.XPATH,'//*[@id="getSelectionForUpdateWeek"]')
        newTime.send_keys("2019-08-01 14:30:00")
        time.sleep(3)
        self.driver.find_element(By.XPATH,'/html/body/div[3]/div/div/div[2]/form/button').click()
        print("Succesfully updated time of the match-> SUCCESSFUL ✅")
        time.sleep(3)

      
       
        

if __name__ == "__main__":
    unittest.main()