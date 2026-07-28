//@ts-check
import {test as setUp,expect} from '@playwright/test'

setUp("Create customer 01 auth", async ({page,context})=>{
    const email = "customer@practicesoftwaretesting.com"
    const password = "welcome01"
    const customer01AuthFile = ".auth/customer01.json"

    await page.goto("https://practicesoftwaretesting.com/auth/login")
    await page.locator('[data-test="email"]').fill(email)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-submit"]').click()
    await expect(page.locator('[data-test="nav-menu"]')).toHaveText(/Jane/)

    await context.storageState({path:customer01AuthFile})
})