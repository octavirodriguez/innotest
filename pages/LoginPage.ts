import { type Page, expect } from '@playwright/test';

export class LoginPage {
  // Locators
  private readonly page: Page;
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly logoutLink;
  private readonly loginPageHeading;

  // Initialize Locators
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.loginPageHeading = page.getByRole('heading', { name: 'Login Page' });
  }

  // Steps
  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  // Reusable assertions
  async isLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
  }

  async isLoggedOut() {
    await expect(this.loginPageHeading).toBeVisible();
  }
}