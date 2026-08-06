//@ts-check
import {test,expect} from '@playwright/test'

test("Verify Invalid Credential Error Message", async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Adarsh")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator("//button[@type='submit']").click()

    //wrong locating
    //await expect(page.getByText("Invalid credentials")).toHaveText("Invalid credentials")

    //correct locating
    var errorMsg = await page.locator("//p[contains(@class,'alert-content-text')]").textContent()
    console.log("Error Message: ",errorMsg)

    //partial match
    expect(errorMsg?.includes("Invalid")).toBeTruthy()

    //full match
    expect(errorMsg==="Invalid credentials").toBeTruthy()
})