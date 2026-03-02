import { text } from "node:stream/consumers";
import { expect, Locator, Page, test} from "playwright/test";

export default class ElementActions{
    protected selector: string;
    protected locator: Locator;
    protected description: string;

    constructor(private page: Page){ }

    public setLocator(selector: string, description: string): ElementActions {
        this.selector = selector;
        this.description = description;
        return this;
    }

    public setElement(selector: string, description: string): ElementActions {
        this.selector = selector;
        this.description = description;
        this.locator = this.page.locator(this.selector);
        return this;
    }

    public getLocator(): Locator {
        return this.locator.first();
    }

    public getLocators(): Locator {
        return this.locator;
    }

    /**
     * Performs click action on the element.
     */
    public async click() {
        await test.step(`Click on ${this.description}`, async () => {
            await this.getLocator().click();
        });
        return this;
    }

    /**
     * Performs double click action on the element.
     */
    public async doubleClick() {    
        await test.step(`Double Click on ${this.description}`, async () => {
            await this.getLocator().dblclick();
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async scrollIntoView() {
        await test.step(`Scroll into view ${this.description}`, async () => {
            await this.getLocator().scrollIntoViewIfNeeded();
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async hover() {
        await test.step(`Hover on ${this.description}`, async () => {
            await this.getLocator().hover();
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async waitTillVisible() {
        await test.step(`Wait till ${this.description} is visible`, async () => {
            await this.getLocator().waitFor({ state: 'visible' });
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async waitTillInvisible() {
        await test.step(`Wait for ${this.description} to be invisible`, async () => {
            await this.getLocator().waitFor({ state: 'hidden' });
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async waitTillDetached() {
        await test.step(`Wait for ${this.description} to be detached from DOM`, async () => {
            await this.getLocator().waitFor({ state: 'detached' });
        });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public async waitTillPresent() {
        await test.step(`Wait for ${this.description} to be present in DOM`, async () => {
            await this.getLocator().waitFor({ state: 'attached' });
        });
        return this;
    }
    
    /**
     * 
     * @returns 
     */
    public async getInputValue() {
        let value = "";
        await test.step(`Get input value of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            value = await element.inputValue();
        });
        return value;
    }

    /**
     * 
     * @returns 
     */
    public async getTextContent(): Promise<string> {
        let text = "";
        await test.step(`Get text content of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            text = (await element.textContent())?.trim() ?? "";
        });
        return text;
    }

    /**
     * 
     * @param attributeName 
     * @returns 
     */
    public async getAttribute(attributeName: string): Promise<string> {
        let attributeValue = ""; 
        await test.step(`Get attribute ${attributeName} of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            attributeValue = (await element.getAttribute(attributeName))?.trim() ?? "";
        });
        return attributeValue;
    }

    public async getInnerHtml(): Promise<string> {
        let innerHtml = "";
        await test.step(`Get inner HTML of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            innerHtml = (await element.innerHTML())?.trim() ?? "";
        });
        return innerHtml;
    }

    public async getInnerText(): Promise<string> {
        let innerText = "";
        await test.step(`Get inner text of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            innerText = (await element.innerText())?.trim() ?? "";
        });
        return innerText;
    }

    public async isEditable(): Promise<boolean> {
        let editable= false;
        await test.step(`Check if ${this.description} is editable`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            editable = await element.isEditable();
        });
        return editable;
    }

    public async isEnabled(): Promise<boolean> {
        let enabled = false;
        await test.step(`Check if ${this.description} is enabled`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            enabled = await element.isEnabled();    
        });
        return enabled;
    }

    public async isVisible(): Promise<boolean> {
        let visible = false;
        await test.step(`Check if ${this.description} is visible`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            visible = await element.isVisible();    
        });
        return visible;
    }

    public async keyPress(key: string) {
        await test.step(`Press ${key} on ${this.description}`, async () => {
            await this.getLocator().waitFor();
            await this.getLocator().press(key);
        });
        return this;
    }

    public async getAllTextContents(): Promise<string[]> {
        let textContents: string[] = [];
        await test.step(`Get text contents of all elements matching ${this.description}`, async () => {
            const elements = this.getLocators();
            await elements.first().waitFor();
            textContents = await elements.allTextContents();
        });
        return textContents;
    }

    public async getCount(): Promise<number> {
        let count = 0;
        await test.step(`Get count of elements matching ${this.description}`, async () => {
            count = await this.getLocators().count();
        });
        return count;
    }

    public async dispatchEvent() {
        await test.step(`Clicking on ${this.description}`, async () => {
        await this.getLocator().scrollIntoViewIfNeeded();
        await this.getLocator().dispatchEvent('click');
        });
        return this;
    }

    public async isVisibleWithTime(time: number): Promise<boolean> {
        let visible = false;
        await test.step(`Check if ${this.description} is visible within ${time} ms`, async () => {
            try {
                await this.getLocator().waitFor({ state: 'visible', timeout: time });
                visible = true;
            } catch (error) {
                visible = false;
            }
        });
        return visible;
    }

    public async mouseClick() {
        await test.step(`Mouse click on ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            const box = await element.boundingBox();
            if (!box) {
                throw new Error(`Unable to click ${this.description} because its bounding box is not available.`);
            }
            await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        });
        return this;
    }

    public async jsClick() {
        await test.step(`JavaScript click on ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            await element.evaluate((node: HTMLElement) => node.click());
        });
        return this;
    }

    public async rightClick() {
        await test.step(`Right click on ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            await element.click({ button: 'right' });
        });
        return this;
    }

    public async uploadFile(fileName: string) {
        await test.step(`Upload file ${fileName} to ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            await element.setInputFiles(`./path/to/files/${fileName}`);
        });
        return this;
    }

    public async fileUpload() {
        await test.step(`Upload file to ${this.description}`, async () => {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.getLocator().click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles('./path/to/files/fileName');
        });
        return this;
    }

    public async getCssValue(propertyName: string): Promise<string> {
        let cssValue = "";
        await test.step(`Get CSS value of property ${propertyName} for ${this.description}`, async () => {
            const cssPropertyName = propertyName[0] === '-' ? propertyName.replace('-', '') : propertyName;
            const element = this.getLocator();
            await element.waitFor();
            const cssValues = await element.evaluate((ele) => window.getComputedStyle(ele));
            cssValue = cssValues.getPropertyValue(cssPropertyName);
        });
        return cssValue.trim();
    }

    public async expectToBeEnabled() {
        await test.step(`Veifying that ${this.description} is enabled`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to be enabled`).toBeEnabled();
        });
    }

    public async expectToBeDisabled() {
        await test.step(`Veifying that ${this.description} is disabled`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to be disabled`).toBeDisabled();
        });
    }

    public async expectToBeVisible() {
        await test.step(`Veifying that ${this.description} is visible`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to be visible`).toBeVisible();
        });
    }

    public async expectToBeHidden() {
        await test.step(`Veifying that ${this.description} is hidden`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to be hidden`).toBeHidden();
        });
    }

    public async expectToHaveAttribute(attributeName: string, attributeValue: string) {
        await test.step(`Veifying that ${this.description} has attribute ${attributeName} with value ${attributeValue}`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to have attribute ${attributeName} with value ${attributeValue}`).toHaveAttribute(attributeName, attributeValue);
        });
    }

    public async expectedToHaveText(expectedText: string) {
        await test.step(`Veifying that ${this.description} has text ${expectedText}`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to have text ${expectedText}`).toHaveText(expectedText);
        });
    }

    public async expectToHaveClass(expectedClass: string) {
        await test.step(`Veifying that ${this.description} has class ${expectedClass}`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to have class ${expectedClass}`).toHaveClass(expectedClass);
        });
    }

    public async expectToContainText(expectedText: string) {
        await test.step(`Veifying that ${this.description} contains text ${expectedText}`, async () => {
            await expect(this.getLocator(), `Expected ${this.description} to contain text ${expectedText}`).toContainText(expectedText);
        });
    }
}
