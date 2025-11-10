import { test, expect } from '@playwright/test';
import { getNumericColumnValues } from '../TableUtils';

test.describe('Data Table Interaction and Sorting', () => {

  test('should correctly sort table1 by the "Due" column in ascending order @smoke', async ({ page }) => {
    await page.goto('/tables');

    // Define table locator
    const table1 = page.locator('#table1');

    // Define the locator for the 'Due' header
    const dueHeader = table1.getByRole('cell', { name: 'Due' });

    // Assert page location
    await expect(page.getByRole('heading', { name: 'Data Tables' })).toBeVisible();

    // Click to sort
    await dueHeader.click();

    // Get values from table (Column 4 = Due)
    const actualValues = await getNumericColumnValues(table1, 4);

    // Create copy expected list sorted
    const expectedSortedValues = [...actualValues].sort((a, b) => a - b);

    // Assert comparing list against the sorted one
    await expect(actualValues).toEqual(expectedSortedValues);
  });

});