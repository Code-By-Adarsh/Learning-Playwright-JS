import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'

const test = base.extend({
    loginPage:async({page}, use)=>{
        const loginPage = new LoginPage(page)
        await use(loginPage)
    }
})

test("Verify valid login",async({page,loginPage})=>{
    await loginPage.goTo()
    await loginPage.login('test@gmail.com','test123')
    await expect(page).toHaveURL(/test12/)
})