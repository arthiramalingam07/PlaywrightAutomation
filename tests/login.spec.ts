import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';

test.describe('SauceDemo Login Tests', () => {

    test('Verify successful login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.navigate();

        await login.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(page).toHaveURL(/inventory.html$/);

    });

    test('Verify invalid login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.navigate();

        await login.loginWithInvalidCredentials(
            'standard_user',
            'wrong_password'
        );

        await expect(login.errorMessage).toContainText(
            'Username and password do not match'
        );

    });

    test('Verify locked user login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.navigate();

        await login.loginWithInvalidCredentials(
            'locked_out_user',
            'secret_sauce'
        );

        await expect(login.errorMessage).toContainText(
            'locked out'
        );

    });

});