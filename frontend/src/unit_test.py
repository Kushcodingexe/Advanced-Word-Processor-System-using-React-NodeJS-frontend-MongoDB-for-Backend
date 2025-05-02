import unittest
from selenium import webdriver

class ReactAppTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_title(self):
        self.driver.get("http://localhost:3000")
        self.assertIn("My React App", self.driver.title)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
