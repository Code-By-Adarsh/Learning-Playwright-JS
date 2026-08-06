// @ts-check
import {test,expect} from '@playwright/test'

test("Verify Title", async ({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle("Google")
    var title = await  page.url()
    console.log("Page Title is: ",title)
})