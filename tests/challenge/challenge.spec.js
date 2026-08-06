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

    test("Challenge 3 - Api test product/{id} endpoint",async ({request})=>{
        //const productId = "01KZ45NMWK3VKC8T6HXQJMCR5J"
        const listResponse = await request.get(`https://api.practicesoftwaretesting.com/products?q=Combination Pliers`);
        expect(listResponse.status()).toBe(200);
        const listBody = await listResponse.json();
        const productId = listBody.data[0].id;

        const apiUrl = `https://api.practicesoftwaretesting.com/products/${productId}`
        const response = await request.get(apiUrl)

        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toHaveProperty("id",productId)
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("description")
        expect(body).toHaveProperty("price")
        //console.log(body)
    })
})