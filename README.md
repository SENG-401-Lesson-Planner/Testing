# Setup

1. Ensure you have VSCode and Google Chrome downloaded.

   Link to download Chrome: [Google Chrome Download]([url](https://www.google.com/chrome/bsem/download/en_ca?brand=VDKB&ds_kid=43700052806461236&&utm_source=bing&utm_medium=cpc&utm_campaign=1709650%20%7C%20Chrome%20Win11%20%7C%20DR%20%7C%20ESS01%20%7C%20NA%20%7C%20CA%20%7C%20en%20%7C%20Desk%20%7C%20SEM%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20%7C%20Bing_Top%20KWDS&utm_term=google%20chrome&utm_content=Desk%20%7C%20BKWS%20-%20EXA%20%7C%20Txt_Google%20Chrome%20Top%20KWDS&gclid=a3ff50fcfd3e109d041a3720596385a6&gclsrc=3p.ds))

   Link to download Visual Studio Code: [Visual Studio Code Download]([url](https://code.visualstudio.com/download))

3. Open VSCode and open the "Test" folder * Create it if it is not there
4. Input "npm init -y" in the terminal *This creates node_modules and json files
5. Input "npm install selenium-webdriver mocha chromedriver" in the terminal. *This downloads the necessary dependencies in your package.json file
6. Go to your package.json file and replace the value of the the "test" key under the "scripts" objects to "mocha".

# Usage

1. To execute the tests, navigate to the test folder which contains the test file, in this case "test.js".
2. Then go to your terminal and input "node test.js"
3. It should start opening up the website and executing the tests. The results of the tests should be outputted in the terminal.
