import {test,expect} from '@playwright/test'

test("Taking screenshot",async ({page})=>{
    await page.goto("https://www.skillta.tech/")

    //basic screenshot
    await page.screenshot({path:".screenshot/half-page-screenshot.png"})

    //full page scrollable screenshot
    await page.screenshot({path:".screenshot/full-page-screenshot.png",fullPage:true})

    //buffered screenshot -> easily replacable by playwright built in screenshot assertion : page(locator).toHaveScreenshot()

    //element locator
    //syntax : page.locator('').screenshot({path:""});
})