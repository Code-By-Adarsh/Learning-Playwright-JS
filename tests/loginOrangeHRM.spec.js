import {test,expect} from '@playwright/test'

test("Valid login",async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //getBy
    await page.getByPlaceholder("Username").fill("Admin")

    //by css locator
    await page.locator("input[name='password']").fill("admin123")

    //by xpath
    await page.locator("//button[@type='submit']").click()

    await expect(page.url().includes("dashboard")).toBeTruthy()
})