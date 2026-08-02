//@ts-check
import {test,expect} from '@playwright/test'

test.describe("Challenge Accepted",()=>{
    test.use({
        storageState:".auth/customer02.json"
    })

    test.beforeEach(async({page})=>{
        await page.goto("https://practicesoftwaretesting.com/")
    })

    test("Challenge 1 - Checkout Flow",async ({page})=>{
        await page.locator('[data-test="nav-home"]').click();
        await page.getByAltText("Combination Pliers").click();
        await page.locator('[data-test="add-to-cart"]').click();
        await page.locator('[data-test="nav-cart"]').click();
        await page.locator('[data-test="proceed-1"]').click();
        await page.locator('[data-test="proceed-2"]').click();await page.locator('[data-test="postal_code"]').fill('0000');
        await page.locator('[data-test="house_number"]').fill('103');
        await expect.soft(page.locator('[data-test="proceed-3"]')).toBeEnabled({timeout:20000})
        await page.locator('[data-test="proceed-3"]').click();
        await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
        await page.locator('[data-test="finish"]').click();
        await expect.soft(page.locator('[data-test="payment-success-message"]')).toContainText('Payment was successful');
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('#order-confirmation')).toHaveText(/Thanks for your order!/);
    })

    test("Challenge 2 - Visual Test",async ({page})=>{
        await page.locator('[data-test="nav-home"]').click();
        await page.getByAltText("Combination Pliers").click();
        await expect(page.locator('[data-test="product-name"]')).toBeVisible();
        await expect(page).toHaveScreenshot("Combination-Pliers.png")
    })
})