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
    await driver.findElement(By.id("username")).sendKeys("new2");
    await driver.findElement(By.id("password")).sendKeys("new2");
    await driver.findElement(By.id("confirmPassword")).sendKeys("new2");
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
    await driver.get("https://lesso.help/register");  //Navigate to the register page

    //Find the fields and submit form
    let usernameField = await driver.findElement(By.id("username"));
    let passwordField = await driver.findElement(By.id("password"));
    let confirmPasswordField = await driver.findElement(By.id("confirmPassword"));
    let submitButton = await driver.findElement(By.xpath("//button[@type='submit']"));

    await usernameField.sendKeys("username1");  
    await passwordField.sendKeys("password1");  
    await confirmPasswordField.sendKeys("password1");  
    await submitButton.click();

    //Wait for potential error message
    await driver.sleep(3000);

    try {
        //Locate error message (adjust the selector based on the actual page implementation)
        let errorMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Error registering user username1')]")).getText();

        if (errorMessage.includes("Error registering user username1")) {
            console.log("✅ Duplicate Username Error Displayed. Test Passed.");
        } else {
            console.log("❌ Unexpected Error Message: ", errorMessage);
        }
    } catch (e) {
        console.log("❌ No error message found. Test Failed.");
    }

    //Pause before the next test
    await driver.sleep(3000);
}

async function viewPastLessonsTest(driver) {
    console.log("\n🔹 Running View History Test...");
    await driver.get("https://lesso.help/login");

    //Find the fields    
    await driver.findElement(By.id("username")).sendKeys("username1");
    await driver.findElement(By.id("password")).sendKeys("password1");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    
    await driver.wait(until.urlIs("https://lesso.help/"), 10000);
    
    console.log("Waiting for 3 seconds after reaching the home page...");
    await driver.sleep(2000); //Wait for 3 seconds

    let lessonPlansButton = await driver.findElement(By.id("history-button"));
    await lessonPlansButton.click();

    //Wait for redirect
    await driver.wait(until.urlIs("https://lesso.help/history"), 10000);

    let currentURL = await driver.getCurrentUrl();
    if (currentURL === "https://lesso.help/history") {
        console.log("✅ History Accessed. Test Passed.");
    } else {
        console.log("❌ History Not Accessed. Test Failed.");
    }

    //Pause before next test
    await driver.sleep(3000); 

}

async function generateLessonTest(driver) {
    console.log("\n🔹 Running Generate Lesson Test...");
    await driver.get("https://lesso.help/history");

    await driver.findElement(By.xpath("//button[text()='Create Another']")).click()

    //Find the fields    
    await driver.sleep(1000);
    await driver.findElement(By.id("lesson-plan")).sendKeys("Make a quick lesson plan about Volcanoes");
    await driver.sleep(1000);
    await driver.findElement(By.xpath("//button[text()='Science']")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("time")).sendKeys("30");
    await driver.sleep(8000);
    let getLessonPlanButton = await driver.findElement(By.xpath("//button[@type='submit']"))
    await getLessonPlanButton.click();
    

    //Wait for 3 seconds
    console.log("Waiting for website to fully generate the plan...");
    await driver.sleep(5000);
    let elements = await driver.findElements(By.className("mt-8"));

    if (elements.length > 0) {
        console.log("✅ Lesson plan is generated. Test Passed.");
    } else {
        console.log("❌ Lesson plan is NOT generated. Test Failed");
    }
    await driver.sleep(5000);

    let createAnotherButton = await driver.findElement(By.className("responsive-button"));
    await createAnotherButton.click();

    //Pause before next test
    await driver.sleep(3000); 
}

async function deleteLessonTest(driver) {
    console.log("\n🔹 Running Delete Lesson Test...");
    await driver.get("https://lesso.help/history");

    await driver.sleep(3000);

    //Try to find the heading containing 'volcanoes'
    let headingsBeforeDelete = await driver.findElements(By.xpath("//h3[contains(text(), 'Volcanoes')]"));

    //Check if the heading exists before clicking the delete button
    if (headingsBeforeDelete.length === 0) {
        console.log("❌ Heading not found before deletion.");
        return; //Stop the test if heading is not found
    }

    //Print the heading text to verify it's present before delete
    console.log("Before delete: " + await headingsBeforeDelete[0].getText());

    //Find and click the "Delete" button
    let deleteButton = await driver.findElement(By.xpath("//button[text()='Delete']"));
    await deleteButton.click();

    //Wait for the deletion process to complete (you can adjust the wait or use a more specific condition)
    await driver.sleep(3000); //Wait for 3 seconds (this can be replaced with a more reliable wait if needed)

    //Try to find the heading again after the delete action
    let headingsAfterDelete = await driver.findElements(By.xpath("//h3[contains(text(), 'volcanoes')]"));

    //Check if the heading is absent after the delete action
    if (headingsAfterDelete.length === 0) {
        console.log("✅ Lesson Successfully Deleted. Test Passed");
    } else {
        console.log("❌ Lesson Still Exists. Test ");
    }

    //Pause before next test
    await driver.sleep(3000);
}

async function logoutTest(driver) {
    console.log("\n🔹 Running Logout Test...");
    await driver.get("https://lesso.help/");

    await driver.sleep(3000); 

    //Try to find the heading containing 'volcanoes'
    let deleteButton = await driver.findElement(By.xpath("//button[text()='Logout']"));
    deleteButton.click()

    await driver.sleep(5000); 
    let loginButton = await driver.findElement(By.xpath("//button[text()='Login']"));

    if (loginButton) {
        console.log("✅ Logout Successful. Test Passed.");
    } else {
        console.log("❌ Logout Unsuccessful. Test Failed");
    }

    //Pause before next test
    await driver.sleep(3000);
}

//Calls all of the tests in sequence.
(async function runTests() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await loginSuccessTest(driver);
        await registerEmptyUsernameTest(driver);
        await registerEmptyPasswordTest(driver);
        await registerEmptyConfirmPasswordTest(driver);
        // await registerWithFourCharacterUsernameTest(driver) Function should only be called once
        await registerWithExistingUsernameTest(driver);
        await viewPastLessonsTest(driver);
        await generateLessonTest(driver);
        await deleteLessonTest(driver);
        await logoutTest(driver)
    } catch (error) {
        console.error("❌ Test encountered an error:", error);
    } finally {
        await driver.quit();
    }

    //Pause before next test
    await driver.sleep(3000);     
}

)();
