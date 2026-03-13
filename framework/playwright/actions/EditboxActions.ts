import ElementActions from "./ElementActions";
import test, { expect, Locator } from "@playwright/test";

export default class EditBoxActions extends ElementActions {

    public setEditBox(selector: string, description: string) {
        super.setElement(selector, description);
        return this;
    }

    public setLocator(locator: Locator, description: string) {
        super.setLocator(locator, description);
        return this;
    }

    public async fill(value: string) {
        test.step(`Entering text: ${value} into ${this.description}`, async () => {
            await this.getLocator().fill(value);
        });
        return this;
    }

    public async jsFill(value: string) {
        await test.step(`Entering text: ${value} into ${this.description} using JavaScript`, async () => {
            const element = await this.getLocator();
            await element.waitFor();
            await element.evaluate((el: any, val) => {
                const input = el as HTMLInputElement | HTMLTextAreaElement;
                input.value = '';
                input.value = val;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }, value);
        });
        return this;
    }

    public async fillVisibleFields(value: string) {
        await test.step(`Entering text: ${value} into visible fields in ${this.description}`, async () => {
            const locators = this.getLocators();
            const count = await locators.count();
            for (let i = 0; i < count; i++) {
                const locator = locators.nth(i);
                if (await locator.isVisible()) {
                    await locator.fill(value);
                }
            }
        });
        return this;
    }

    public async type(value: string) {
        await test.step(`Typing text: ${value} into ${this.description}`, async () => {
            await this.getLocator().pressSequentially(value);
        });
        return this;
    }

    public async typeWithDelay(value: string, delay = 100) {
        await test.step(`Typing text: ${value} into ${this.description} with delay of ${delay}ms`, async () => {
            await this.getLocator().pressSequentially(value, { delay });
        });
        return this;
    }

    public async fillAndTab(value: string) {
        await test.step(`Entering text: ${value} into ${this.description} and pressing Tab`, async () => {
            const locator = this.getLocator();
            await locator.fill(value);
            await locator.press('Tab');
        });
        return this;
    }

    public async typeDelayWithTab(value: string, delay = 100) {
        await test.step(`Typing text: ${value} into ${this.description} with delay of ${delay}ms and pressing Tab`, async () => {
            const locator = this.getLocator();
            await locator.pressSequentially(value, { delay });
            await locator.press('Tab');
        });
        return this;
    }

    public async typeAndTab(value: string) {
        await test.step(`Typing text: ${value} into ${this.description} and pressing Tab`, async () => {
            const locator = this.getLocator();
            await locator.pressSequentially(value);
            await locator.press('Tab');
        });
        return this;
    }

    public async forceFill(value: string) {
        await test.step(`Entering text: ${value} into ${this.description} using force option`, async () => {
            await this.getLocator().fill(value, { force: true });
        });
    }


    public async expectToContainValue(expectedValue: string) {
        await test.step(`Expecting ${this.description} to contain value: ${expectedValue}`, async () => {
            const locator = this.getLocator();
            await expect(locator, `Expected ${this.description} to contain value: ${expectedValue}`).toHaveValue(expectedValue);
        });
    }

    public async expectToBeEditable(): Promise<void> {
        await test.step(`Expecting ${this.description} to be editable`, async () => {
            const locator = this.getLocator();
            await expect(locator, `Expected ${this.description} to be editable`).toBeEditable();
        });
    }
}