//@ts-check
import { test, expect } from '@playwright/test';

test('Verify Add Item', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('Playwright Learn');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Study Blockchain');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Playwright Learn')).toBeVisible();
  await expect(page.getByText('Study Blockchain')).toBeVisible();
});

test("Verify Remove Item", async ({page})=> {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('Study');
  await page.getByTestId('text-input').press('Enter');
  const todoItem = page.getByRole('listitem').filter({hasText:'Study'})
  await todoItem.hover()
  await todoItem.getByTestId('todo-item-button').click();
  await expect(page.getByText('Study')).toHaveCount(0)
})

test("Verify complete button", async ({page})=>{
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').fill('study');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('running');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('playing');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'study' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('listitem').filter({ hasText: 'running' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByText('study')).toBeVisible();
    await expect(page.getByText('running')).toBeVisible();
})

test("Verify active button",async ({page})=>{
    await page.goto('https://todomvc.com/examples/react/dist/');await page.getByTestId('text-input').fill('coding');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('playing');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'coding' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-item-label')).toContainText('playing');
})

test("Verify edit item functionality 1", async ({page})=>{
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').fill('study')
    await page.getByTestId('text-input').press('Enter')
    const todoItem = page.getByRole('listitem')
    await todoItem.getByTestId('todo-item-label').dblclick()
    const editItem = todoItem.getByTestId('text-input')
    await editItem.fill('coding')
    await editItem.press('Enter')
    await expect(page.getByTestId('todo-item-label')).toContainText('coding')
})

test("Verify edit item functionality 2", async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('coding');
  await page.getByTestId('text-input').press('Enter');
  const todoItem = page.getByTestId('todo-item');
  await todoItem.getByTestId('todo-item-label').dblclick(); // yaha dblclick chahiye
  const editInput = todoItem.getByTestId('text-input');
  await editInput.fill('study');
  await editInput.press('Enter');
  await expect(page.getByTestId('todo-item-label')).toContainText('study');
});

test("Verify clear complete button", async ({page})=>{
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').fill('study');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('coding');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'study' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('listitem').filter({ hasText: 'study' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('listitem').filter({ hasText: 'coding' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.locator('body')).toBeVisible();
})