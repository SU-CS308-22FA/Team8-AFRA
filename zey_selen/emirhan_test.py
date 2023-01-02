from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import unittest
import time


class Test1(unittest.TestCase):

  def setUp(self):
    self.browser = webdriver.Chrome(ChromeDriverManager().install())
    self.browser.get("https://coolafra.herokuapp.com/")
  
  def test(self):    
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicEmail\"]").send_keys("admin@admin.com")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicPassword\"]").send_keys("admin")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/form/button").click()
    time.sleep(3)
    referee = self.browser.find_element(By.XPATH,"/html/body/div/div/div/div/div/ul/div[2]/div/div[3]")
    time.sleep(1)
    txt = referee.text.split(":")[1]
    while txt != " Referee Does not Assign" :
      week = self.browser.find_element(By.XPATH,"//*[@id=\"weekSelector\"]")
      w = int(week.text)
      time.sleep(1)
      week.click()
      time.sleep(1)
      w += 1
      s = "//*[@id=\"root\"]/div/div/div/div/div/div[1]/div[2]/div/a[" + str(w) + "]"
      self.browser.find_element(By.XPATH,s).click()
      time.sleep(3)
      referee = self.browser.find_element(By.XPATH,"/html/body/div/div/div/div/div/ul/div[2]/div/div[3]")
      txt = referee.text.split(":")[1]

    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/div[2]/button").click()
    time.sleep(15)
    obj = self.browser.switch_to.alert
    time.sleep(1)
    obj.accept()
    time.sleep(1)
    referee = self.browser.find_element(By.XPATH,"/html/body/div/div/div/div/div/ul/div[2]/div/div[3]")
    txt = referee.text.split(":")[1]
    self.assertTrue(txt," Referee Does not Assign")
    print("Test 1 has passed! ✅ ")
  
  def tearDown(self):
    self.browser.close()

class Test2(unittest.TestCase):

  def setUp(self):
    self.browser = webdriver.Chrome(ChromeDriverManager().install())
    self.browser.get("https://coolafra.herokuapp.com/")

  def test(self):    
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicEmail\"]").send_keys("admin@admin.com")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicPassword\"]").send_keys("admin")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/form/button").click()
    time.sleep(3)
    referee = self.browser.find_element(By.XPATH,"/html/body/div/div/div/div/div/ul/div[2]/div/div[3]")
    time.sleep(1)
    txt = referee.text.split(":")[1]
    if txt != " Referee Does not Assign":
      self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/div[2]/button").click()
      time.sleep(10)
      obj = self.browser.switch_to.alert
      time.sleep(1)
      self.assertTrue(obj.text, "Referees have already been assigned")
      obj.accept()
      print("Test 2 has passed! ✅ ")
    
    else:
      print("Failed!")


  def tearDown(self):
    self.browser.close()

class Test3(unittest.TestCase):

  def setUp(self):
    self.browser = webdriver.Chrome(ChromeDriverManager().install())
    self.browser.get("https://coolafra.herokuapp.com/")

  def test(self):
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div[2]/a[1]/button").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicEmail\"]").send_keys("admin@admin.com")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"formBasicPassword\"]").send_keys("admin")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/form/button").click()
    time.sleep(3)
    self.browser.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[5]/a[2]").click()
    time.sleep(3)
    self.browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(1)
    self.browser.execute_script("window.scrollTo(document.body.scrollHeight,0)")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"top-scorers-page-tab-top-assists\"]").click()
    time.sleep(2)
    self.browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(1)
    self.browser.execute_script("window.scrollTo(document.body.scrollHeight,0)")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"top-scorers-page-tab-top-yellow-card\"]").click()
    time.sleep(2)
    self.browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(1)
    self.browser.execute_script("window.scrollTo(document.body.scrollHeight,0)")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"top-scorers-page-tab-top-red-card\"]").click()
    time.sleep(2)
    self.browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(1)
    self.browser.execute_script("window.scrollTo(document.body.scrollHeight,0)")
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"top-scorers-page-tab-top-scorers\"]").click()
    time.sleep(2)
    txt = self.browser.find_element(By.XPATH,"//*[@id=\"dropdown-basic\"]").text
    self.assertTrue(txt, "2022")
    print("test 3 has passed! ✅ ")

  def tearDown(self):
    self.browser.close()

class Test4(unittest.TestCase):

  def setUp(self):
    self.browser = webdriver.Chrome(ChromeDriverManager().install())
    self.browser.get("https://coolafra.herokuapp.com/")

  def test(self):
    self.browser.find_element(By.XPATH,"//*[@id=\"responsive-navbar-nav\"]/div[5]/a[2]").click()
    time.sleep(3)
    self.browser.find_element(By.XPATH,"//*[@id=\"dropdown-basic\"]").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/div[2]/div/div/a[2]").click()
    time.sleep(2)
    self.browser.find_element(By.XPATH,"//*[@id=\"dropdown-basic\"]").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/div[2]/div/div/a[3]").click()
    time.sleep(2)
    self.browser.find_element(By.XPATH,"//*[@id=\"dropdown-basic\"]").click()
    time.sleep(1)
    self.browser.find_element(By.XPATH,"//*[@id=\"root\"]/div/div/div/div/div/div[2]/div/div/a[11]").click()
    time.sleep(2)
    txt = self.browser.find_element(By.XPATH,"//*[@id=\"dropdown-basic\"]").text
    self.assertTrue(txt,"2012")
    print("Test 4 has passed! ✅ ")
    

  def tearDown(self):
    self.browser.close()

if __name__ == "__main__":
    unittest.main()