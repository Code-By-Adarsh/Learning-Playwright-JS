//@ts-check
//auth-setup.js
import {test as setup} from '@playwright/test'

setup("Authenticate as a customer 2 - Jack Howe", async ({page})=>{
    const email = "customer2@practicesoftwaretesting.com"
    const password = "welcome01"
    const customer02AuthFile = ".auth/customer02.json"

    await page.goto("https://practicesoftwaretesting.com/auth/login")
    await page.locator('[data-test="email"]').fill(email)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-submit"]').click()
    await page.waitForURL('**/account')
    await page.context().storageState({path:customer02AuthFile})
})