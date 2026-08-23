import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'

test("Verify valid login",async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login('test@gmail.com','test123')
    await expect(page).toHaveURL(/test12/)
})