//@ts-check
import {test,expect} from '@playwright/test'

test("Verify Title",async ({page})=>{
    await page.goto("https://skillta.tech")
    await expect(page).toHaveTitle("SkillTa — Free AI Career Quiz & Roadmaps 2026")
})