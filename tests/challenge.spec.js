//@ts-check
import {test,expect} from '@playwright/test'

test.describe("Challenge tests",()=>{
    test.use({
        storageState:".auth/customer01.json"
    })

    test.beforeEach(async ({page})=>{
        await page.goto("https://practicesoftwaretesting.com/account")
    })

    // test("1st checkout flow",async ({page})=>{
    //     await expect(page.locator('[data-test="nav-menu"]')).toHaveText(/Howe/)
    // })

    test("2nd visual test",async ({page})=>{
        await expect(page.locator('[data-test="nav-menu"]')).toHaveText(/Howe/)
        await expect(page).toHaveScreenshot("homepage.png")
    })
})