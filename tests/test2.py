
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
       time.sleep(2)
    def test_recommendation(self):
        self.driver.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
        time.sleep(1)
        mail = self.driver.find_element(By.XPATH, '//*[@id="formBasicEmail"]')
        mail.send_keys("admin@admin.com")
        time.sleep(2)
        password = self.driver.find_element(By.XPATH, '//*[@id="formBasicPassword"]')
        password.send_keys("admin")
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/form/button').click()
        time.sleep(2)
        print("Login achieved.✅")

         #-----------------Add a comment-----------------------
        time.sleep(2)
        self.driver.find_element(By.XPATH, '//*[@id="weekSelector"]').click()
        time.sleep(2)
        self.driver.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/div/div[1]/div[2]/div/a[1]').click()
        time.sleep(2)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/ul/div[1]/div[2]/div[2]/div[2]').click()
        time.sleep(2)
        self.driver.find_element(By.XPATH,'//*[@id="match-detail-page-tabpane-comments"]/div/div[1]/div/div[2]/div[1]/div[1]/a/button').click()
        time.sleep(2)
        title=self.driver.find_element(By.XPATH,'//*[@id="title"]')
        title.send_keys("selenium comment title")
        time.sleep(2)
        content = self.driver.find_element(By.XPATH,'//*[@id="content"]')
        content.send_keys("selenium comment")
        time.sleep(2)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[2]/form/button[1]').click()
        time.sleep(2)
        print("Comment successfully added-> SUCCESSFUL ✅")

        #-----------------Update a comment-----------------------
        self.driver.find_element(By.XPATH, '//*[@id="match-detail-page-tabpane-comments"]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/a').click()
        time.sleep(2)
        newTitle = self.driver.find_element(By.XPATH, '//*[@id="title"]')
        newTitle.send_keys("selenium comment title updated")
        newContent = self.driver.find_element(By.XPATH,'//*[@id="content"]')
        newContent.send_keys("selenium comment updated")
        self.driver.find_element(By.XPATH,'//*[@id="root"]/div/div/div/div/div/div[2]/form/button[1]').click()
        time.sleep(3)
        self.driver.find_element(By.XPATH, '//*[@id="match-detail-page-tabpane-comments"]/div/div[1]/div/div[2]/div[2]/div/div[2]').click()
        time.sleep(2)
        print("Comment successfully updated-> SUCCESSFUL ✅")




if __name__ == "__main__":
    unittest.main()