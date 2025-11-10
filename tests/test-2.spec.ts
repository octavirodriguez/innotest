import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // Adjust path as necessary

test.describe("Secure Login Flow", () => {
  test("should successfully log in and log out of the application @smoke", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Navigate and Login
    await loginPage.navigate();
    await loginPage.login("tomsmith", "SuperSecretPassword!");

    // Assertion
    await loginPage.isLoggedIn();

    // Logout from class
    await loginPage.logout();

    // Assert return to Login Page
    await loginPage.isLoggedOut();
  });
});
