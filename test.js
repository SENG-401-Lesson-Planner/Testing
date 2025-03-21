const { Builder, By, Key, until } = require("selenium-webdriver");


async function loginSuccessTest(driver) {
    console.log("\n🔹 Running Login Success Test...");
    await driver.get("https://lesso.help/login");

    //Find the fields    
    await driver.findElement(By.id("username")).sendKeys("username1");
    await driver.findElement(By.id("password")).sendKeys("password1");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();

    //Wait for redirect
    await driver.wait(until.urlIs("https://lesso.help/"), 10000);

    let currentURL = await driver.getCurrentUrl();
    if (currentURL === "https://lesso.help/") {
        console.log("✅ Login successful. Test Passed.");
    } else {
        console.log("❌ Login failed. Test Failed.");
    }

    //Pause before next test
    await driver.sleep(3000); 
}

async function registerEmptyUsernameTest(driver) {
    console.log("\n🔹 Running Register Empty Username Test...");
    await driver.get("https://lesso.help/register");

    let usernameField = await driver.findElement(By.id("username"));
    let passwordField = await driver.findElement(By.id("password"));
    let confirmPasswordField = await driver.findElement(By.id("confirmPassword"));
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    await usernameField.clear();
    await passwordField.sendKeys("TestPassword");
    await confirmPasswordField.sendKeys("TestConfirmPassword");

    await submitButton.click();

    let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", usernameField);

    if (validationMessage && validationMessage.length > 0) {
        console.log("✅ Empty Username Field Text Appeared. Test Passed.");
    } else {
        console.log("❌ No Empty Username Field Text. Test Failed.");
    }

    //Pause before next test
    await driver.sleep(3000);
}

async function registerEmptyPasswordTest(driver) {
    console.log("\n🔹 Running Register Empty Password Test...");
    await driver.get("https://lesso.help/register");

    //Find the fields
    let usernameField = await driver.findElement(By.id("username"));
    let passwordField = await driver.findElement(By.id("password"));
    let confirmPasswordField = await driver.findElement(By.id("confirmPassword"));
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    //Input in the fields
    await usernameField.sendKeys("TestUser");
    await passwordField.clear();
    await confirmPasswordField.sendKeys("TestConfirmPassword");

    await submitButton.click();

    let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", passwordField);

    if (validationMessage && validationMessage.length > 0) {
        console.log("✅ Empty Password Field Text Appeared. Test Passed.");
    } else {
        console.log("❌ No Empty Password Field Text. Test Failed.");
    }
    //Pause before next test
    await driver.sleep(3000); 
}

async function registerEmptyConfirmPasswordTest(driver) {
    console.log("\n🔹 Running Register Empty Confirm Password Test...");
    await driver.get("https://lesso.help/register");

    //Find the fields
    let usernameField = await driver.findElement(By.id("username"));
    let passwordField = await driver.findElement(By.id("password"));
    let confirmPasswordField = await driver.findElement(By.id("confirmPassword"));
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    //Input in the fields
    await usernameField.sendKeys("TestUser");
    await passwordField.sendKeys("TestPassword");
    await confirmPasswordField.clear()

    await submitButton.click();

    let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", 
                                                        confirmPasswordField);

    if (validationMessage && validationMessage.length > 0) {
        console.log("✅ Empty Confirm Password Field Text Appeared. Test Passed.");
    } else {
        console.log("❌ No Empty Confirm Password Field Text. Test Failed.");
    }
    //Pause before next test
    await driver.sleep(3000); 
}

//Test can only be done once unless mock is used or data must be taken out of database

async function registerWithFourCharacterUsernameTest(driver) {
    console.log("\n🔹 Running Register With Four Character Username Test...");
    await driver.get("https://lesso.help/register");

    //Find the fields
    await driver.findElement(By.id("username")).sendKeys("four");
    await driver.findElement(By.id("password")).sendKeys("fourpassword");
    await driver.findElement(By.id("confirmPassword")).sendKeys("fourpassword");
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    await submitButton.click();

    //Wait for redirect
    await driver.wait(until.urlIs("https://lesso.help/"), 10000);

    let currentURL = await driver.getCurrentUrl();
    if (currentURL === "https://lesso.help/") {
        console.log("✅ Register successful with Four Character Username. Test Passed.");
    } else {
        console.log("❌ Login failed. Test Failed.");
    }

    //Pause before next test
    await driver.sleep(3000);   
}


async function registerWithExistingUsernameTest(driver) {
    console.log("\n🔹 Running Register With Existing Username Test...");
    await driver.get("https://lesso.help/register");  // Navigate to the register page

    // Find the fields and submit form
    let usernameField = await driver.findElement(By.id("username"));
    let passwordField = await driver.findElement(By.id("password"));
    let confirmPasswordField = await driver.findElement(By.id("confirmPassword"));
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    await usernameField.sendKeys("username1");  
    await passwordField.sendKeys("password1");  
    await confirmPasswordField.sendKeys("password1");  
    await submitButton.click();

    // Wait for potential error message
    await driver.sleep(3000);

    try {
        // Locate error message (adjust the selector based on the actual page implementation)
        let errorMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Error registering user username1')]")).getText();

        if (errorMessage.includes("Error registering user username1")) {
            console.log("✅ Duplicate Username Error Displayed. Test Passed.");
        } else {
            console.log("❌ Unexpected Error Message: ", errorMessage);
        }
    } catch (e) {
        console.log("❌ No error message found. Test Failed.");
    }

    // Pause before the next test
    await driver.sleep(3000);
}

// Roblox


//Calls all of the tests in sequence.
(async function runTests() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // await loginSuccessTest(driver);
        // await registerEmptyUsernameTest(driver);
        // await registerEmptyPasswordTest(driver);
        // await registerEmptyConfirmPasswordTest(driver);
        //await registerWithFourCharacterUsernameTest(driver) Function should only be called once
        await registerWithExistingUsernameTest(driver);
    } catch (error) {
        console.error("❌ Test encountered an error:", error);
    } finally {
        await driver.quit();
    }

    //Pause before next test
    await driver.sleep(3000);     
}

)();
