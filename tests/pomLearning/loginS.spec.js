import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../../pages/loginPageS'

const test = base.extend({
    loginPage:async({page},use)=>{
        const loginPage = new LoginPage(page)
        await loginPage.goTo()
        await use(loginPage)
    }
})

test('Verify standard login',async({page,loginPage})=>{
    await loginPage.login('standard_user')
    await expect(page).toHaveURL(/inventory/)
})

test('Verify locked out user login behavior',async({page,loginPage})=>{
    await loginPage.login('locked_out_user')
    await expect(page.getByRole('heading',{name:'Epic sadface: Sorry, this user has been locked out.'})).toBeVisible()
})

test('Verify problem user login behavior',async({page,loginPage})=>{
    await loginPage.login('problem_user')
    await page.getByText('Sauce Labs Fleece Jacket').click()
    await expect(page.getByText('ITEM NOT FOUND')).toBeVisible()
})

test('Verify performance glitch user login behavior',async({page,loginPage})=>{
    await loginPage.login('performance_glitch_user')
    await expect(page.getByRole('img',{name:'Sauce Labs Backpack'})).toBeVisible({timeout:3_000})
})

test('Verify error user login behavior',async({page,loginPage})=>{
    await loginPage.login('error_user')
    await page.getByRole('button',{name:'Add to cart'}).first().click()
    await page.getByRole('button',{name:'Remove'}).click()
    await page.locator('#shopping_cart_container').click()
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
})

test('Verify visual user login behavior',async({page,loginPage})=>{
    await loginPage.login('visual_user')
    await expect(page).toHaveScreenshot('Visual_user.png')
})