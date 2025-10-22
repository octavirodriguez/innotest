// Aux function to extract values and convert values from column

import { Locator } from '@playwright/test';

export async function getNumericColumnValues(tableLocator: Locator, columnIndex: number) {
    // Locate all cells from column
    const cells = tableLocator.locator(`tr td:nth-child(${columnIndex})`);

    // Extract text from cells
    const textValues = await cells.allInnerTexts();

    // Clean
    return textValues.map(text => {
        const cleaned = text.replace('$', '').replace(',', '');
        return parseFloat(cleaned);
    });

}