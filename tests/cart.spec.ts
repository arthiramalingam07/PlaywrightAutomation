import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';

import { InventoryPage } from '../pages/inventoryPage';

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ page }) => {

        const login = new LoginPage(page);

        await login.navigate();

        await login.login(
            'standard_user',
            'secret_sauce'
        );

    });

    test('Add product to cart', async ({ page }) => {

        const inventory = new InventoryPage(page);

        await inventory.verifyProducts();

        await inventory.addProduct('Sauce Labs Backpack');

        await expect(inventory.cartBadge).toHaveText('1');

    });

    test('Add multiple products to cart', async ({ page }) => {

        const inventory = new InventoryPage(page);

        await inventory.addProduct('Sauce Labs Backpack');

        await inventory.addProduct('Sauce Labs Bike Light');

        await expect(inventory.cartBadge).toHaveText('2');

    });

    test('Verify cart page navigation', async ({ page }) => {

        const inventory = new InventoryPage(page);

        await inventory.addProduct('Sauce Labs Backpack');

        await inventory.openCart();

        await expect(page.locator('.cart_item')).toHaveCount(1);

    });

});