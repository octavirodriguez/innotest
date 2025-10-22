import { expect, type Page } from '@playwright/test';

export class DropdownPage {
    private readonly page: Page;
    private readonly dropdownLocator;

    constructor(page: Page) {
        this.page = page;
        this.dropdownLocator = page.locator('#dropdown');
    }

    async navigate() {
        await this.page.goto('/dropdown');
    }

    async selectOptionByValue(value: string) {
        await this.dropdownLocator.selectOption(value);
    }

    // Assert locator
    async assertSelectedValue(expectedValue: string) {

        await expect(this.dropdownLocator).toBeVisible();

        await expect(this.dropdownLocator).toHaveValue(expectedValue);
    }
}