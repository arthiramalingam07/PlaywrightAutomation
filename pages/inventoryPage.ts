import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {

    readonly products: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;

    constructor(private page: Page) {

        this.products = page.locator('.inventory_item');

        this.cartBadge = page.locator('.shopping_cart_badge');

        this.cartLink = page.locator('.shopping_cart_link');

        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
    }

    async verifyProducts() {

        await expect(this.products).toHaveCount(6);
    }

    async addProduct(productName: string) {

        const product = this.products.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();

        await product.locator('button').click();
    }

    async openCart() {

        await this.cartLink.click();

        await this.page.waitForURL('**/cart.html');
    }

    async sortProducts() {

        await this.sortDropdown.selectOption('az');
    }
}