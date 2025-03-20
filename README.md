# Setup

1. Navigate to the "Test" folder 
2. Input "npm init -y" in the terminal *This creates node_modules and json files
3. Input "npm install selenium-webdriver mocha chromedriver" in the terminal. *This downloads the necessary dependencies in your package.json file
4. Go to your package.json file and replace the value of the the "test" key under the "scripts" objects to "mocha".

# Usage

1. To execute the tests, navigate to the test folder which contains the test file, in this case "test.js".
2. Then go to your terminal and input "node test.js"
3. It should start opening up the website and executing the tests. The results of the tests should be outputted in the terminal.
