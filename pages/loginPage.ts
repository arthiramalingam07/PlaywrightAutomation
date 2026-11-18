import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(private page: Page) {

        this.username = page.locator('[data-test="username"]');

        this.password = page.locator('[data-test="password"]');

        this.loginButton = page.locator('[data-test="login-button"]');

        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {

        await this.page.goto('/', {
            waitUntil: 'domcontentloaded'
        });

        await expect(this.loginButton).toBeVisible();
    }

    async login(username: string, password: string) {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

        await this.page.waitForURL('**/inventory.html', {
            timeout: 15000
        });
    }

    async loginWithInvalidCredentials(
        username: string,
        password: string
    ) {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

        await expect(this.errorMessage).toBeVisible();
    }
}