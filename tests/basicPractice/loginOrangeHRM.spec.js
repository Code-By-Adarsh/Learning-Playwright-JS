//@ts-check
import {test,expect} from '@playwright/test'

test("Valid login",async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    //getBy
    await page.getByPlaceholder("Username").fill("Admin")
    //by css locator
    await page.locator("input[name='password']").fill("admin123")
    //by xpath
    await page.locator("//button[@type='submit']").click()
    await expect(page).toHaveURL(/dashboard/)
})

test("Valid logout", async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.locator("input[name='password']").fill("admin123")
    await page.locator("//button[@type='submit']").click()
    await expect(page).toHaveURL(/dashboard/)
    await page.getByAltText("profile picture").first().click()
    await page.getByText("Logout").click()
    await expect(page).toHaveURL(/login/)
})