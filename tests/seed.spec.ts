import { test, expect } from '@playwright/test';

/* test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
  });
}); */



import { DropdownPage } from '../pages/DropdownPage';

test.describe('Dropdown Functionality Tests', () => {

  test('should select options by value and confirm selection', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigate();

    // Select and assert 1
    await dropdownPage.selectOptionByValue('1');
    await dropdownPage.assertSelectedValue('1');

    // Select and assert 2
    await dropdownPage.selectOptionByValue('2');
    await dropdownPage.assertSelectedValue('2');
  });

});