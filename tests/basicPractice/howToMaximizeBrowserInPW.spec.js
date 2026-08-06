// @ts-check
import {test,expect} from '@playwright/test'

test.use({viewport:{width:685,height:411}})

test("Verify Title", async ({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle("Google")

    console.log(page.viewportSize()?.width)
    console.log(page.viewportSize()?.height)
})