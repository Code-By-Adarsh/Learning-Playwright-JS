import { test, expect } from '@playwright/test';

if(!process.env.CI){
  test.describe("Sign In Test",{tag:"@signin"},()=>{
    test('Verify valid sign in of Jane Doe', async ({ page }) => {
      await page.goto('https://practicesoftwaretesting.com/');
      await page.locator('[data-test="nav-sign-in"]').click();
      await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
      await page.locator('[data-test="password"]').fill('welcome01');
      await page.locator('[data-test="login-submit"]').click();
      await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
      await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
    });
  })
}

test.describe("Contact test",{tag:"@contact"},()=>{
  test("Verify contact page is accessible",async ({page})=>{
    await page.goto('https://practicesoftwaretesting.com/')
    await page.getByRole('link',{'name':'Contact'}).click();
    await expect(page).toHaveURL(/contact/);
  })
})

test.describe("Verify Categories Functionality",{tag:'@category'},()=>{
  test("Verify Hand Tools Category Page Load",async ({page})=>{
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-hand-tools"]').click();
    await expect(page.locator('[data-test="page-title"]')).toContainText('Category: Hand Tools');
    await expect(page.getByRole('img',{name:'Combination Pliers'})).toBeVisible();
  })
})