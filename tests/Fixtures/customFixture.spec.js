import {test as base, expect} from '@playwright/test'

const test = base.extend({
    testData: async({}, use) => {
        const data = {email:"test@example.com",password:"pass123"}
        await use(data)
    }
})

test("Should login in with test data",async ({page,testData})=>{
    await page.goto("https://binaryville.com/account/")

    const emailInput = page.getByRole("textbox",{name:"Email"})
    await emailInput.fill(testData.email)

    await page.locator("[id='password']").fill(testData.password)

    const signinButton = page.getByRole("button",{name:"Sign in"})
    await signinButton.click()

    const url = page.url()
    expect(url).toContain(testData.password)
})