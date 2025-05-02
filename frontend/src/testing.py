import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Path to chromedriver installed via npm
project_root = os.path.abspath(os.path.dirname(__file__))
chromedriver_path = os.path.join(project_root, '../node_modules/.bin/chromedriver')

# Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")

# Create WebDriver with npm chromedriver path
service = Service(executable_path=chromedriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    driver.get("http://localhost:3000")

    main_title = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='main-title']"))
    )

    print("Found:", main_title.text)
    assert "Word Document Editor" in main_title.text
    print("✅ Test Passed!")

finally:
    driver.quit()
