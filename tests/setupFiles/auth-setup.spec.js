//@ts-check
//auth-setup.js
import {test as setup} from '@playwright/test'
import { request } from 'https'

//basic ui login that always get failed in ci due to cloudflare bot protection
/*
setup("Authenticate as a customer 2 - Jack Howe", async ({page})=>{
    const email = process.env.testEmail
    const password = process.env.testPassword
    const customer02AuthFile = ".auth/customer02.json"

    
    await page.goto("https://practicesoftwaretesting.com/auth/login")
    await page.locator('[data-test="email"]').fill(email)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-submit"]').click()
    await page.waitForURL('account')
    await page.context().storageState({path:customer02AuthFile})
})
*/

//so i am using api to login
setup("Authenticate as a customer 2 - Jack Howe", async ({request, page})=>{
    const email = process.env.testEmail
    const password = process.env.testPassword
    const customer02AuthFile = ".auth/customer02.json"

    const response = await request.post("https://api.practicesoftwaretesting.com/users/login",{
        data:{
            email:email,
            password:password
        },
    })

    if (!response.ok()) {
        throw new Error(`Login failed with status ${response.status()}`)
    }

    const body = await response.json()
    if (!body.access_token) {
        throw new Error("Login response does not contain access_token")
    }

    await page.goto("https://practicesoftwaretesting.com/")
    await page.evaluate((token) => {
        localStorage.setItem("auth-token", token)
    }, body.access_token)
    //await page.waitForURL('**/account')
    await page.context().storageState({path:customer02AuthFile})
})
