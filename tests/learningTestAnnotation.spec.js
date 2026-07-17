//@ts-check
import {test,expect} from '@playwright/test'

test("Verify Title of Sauce Labs",{
    annotation: {
        type: 'Category',
        description: 'Verifying title',
    },
},
  async ({page})=>{
    await page.goto("https://www.saucedemo.com/")
    expect(page).toHaveTitle(/Labs/)
})

test.describe("Verify Sauce Labs Title and URL",
    {annotation:{type : "Metadata Checking",
        description : "Checking the title and url of page"
    }},
    () => {

        test("Verify page title",async ({page})=>{
            await page.goto("https://www.saucedemo.com/")
            expect(page).toHaveTitle("Swag Labs")
        })

        test("Verify url", async ({page})=>{
            await page.goto("https://www.saucedemo.com/")
            expect(page).toHaveURL(/saucedemo/)
        })
    }
)