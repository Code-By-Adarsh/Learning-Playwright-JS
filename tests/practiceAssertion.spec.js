//@ts-check
import {test,expect} from '@playwright/test'

test.describe("Basic Functionality Testing with no auth",()=>{
    test.beforeEach("Open page",async ({page})=>{
        await page.goto('https://practicesoftwaretesting.com/')
    })

    test("Verify Sign In Link Present",async ({page})=>{
        await expect(page.locator('[data-test="nav-sign-in"]')).toHaveText('Sign in')
    })

    test("Verify visual test for no auth",async ({page})=>{
        await expect(page).toHaveScreenshot("no-auth-ss.png")
    })

    test("Verify Title", async ({page})=>{
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0")
    })

    test("Verify counting of items displayed",async ({page})=>{
        const productGrid = page.locator(".col-md-9")
        await expect(productGrid.getByRole("link")).toHaveCount(9)
    })

    test("Verify searching functionality",async ({page})=>{
        await page.locator('[data-test="search-query"]').fill("Thor Hammer")
        await page.locator('[data-test="search-submit"]').click()
        await expect(page.getByAltText("Thor Hammer")).toBeVisible()
    })
})

test.describe("Basic functionality testing with auth",()=>{
    test.use({storageState:".auth/customer01.json"})

    test.beforeEach(async({page})=>{
        await page.goto("https://practicesoftwaretesting.com/")
    })

    test("Verify customer 01 is logged in",async ({page})=>{
        await expect(page.locator('[data-test="nav-menu"]')).toHaveText(/Howe/)
    })

    test("Visual test for auth",async ({page})=>{
        await page.waitForLoadState("networkidle")
        await expect(page).toHaveScreenshot("auth-ss.png")
    })
})