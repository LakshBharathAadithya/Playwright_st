import ElementActions from "./ElementActions";
import { test, expect } from "@playwright/test";

export default class DropdownActions extends ElementActions {

    public setDropdown(selector: string, description: string) {
        super.setElement(selector, description);
        return this;
    }

    public setLocator(selector: string, description: string) {
        super.setLocator(selector, description);
        return this;
    }

    public async selectByValue(value: string) {
        await test.step(`Selecting value: ${value} from dropdown ${this.description}`, async () => {
            await this.getLocator().selectOption({ value });
        });
        return this;
    }

    public async selectByText(text: string) {
        await test.step(`Selecting text: ${text} from dropdown ${this.description}`, async () => {
            await this.getLocator().selectOption({ label: text });
        });
        return this;
    }

    public async selectByIndex(index: number) {
        await test.step(`Selecting dropdown ${this.description} option with an index of ${index}`, async () => {
            await this.getLocator().selectOption({ index });
        });
        return this;
    }

    public async getAllOptions(): Promise<string[]> {
        let selectOptions: string[] = [];
        await test.step(`Getting all options from dropdown ${this.description}`, async () => {
            const element = await this.getLocator();
            await element.waitFor();
            selectOptions = await element.locator('option').allTextContents();
        });
        return selectOptions;
    }

    public async getAllSelectedOptions(): Promise<string[]> {
        let selectedOptions: string[] = [];
        await test.step(`Getting all selected options from dropdown ${this.description}`, async () => {
            const element = await this.getLocator();
            await element.waitFor();
            selectedOptions = await element.locator('option[selected]').allTextContents();
        });
        return selectedOptions;
    }

    public async retrieveAllSelectedOption() {
        let selectedOption;
        await test.step(`Retieving the all selected options from ${this.description}`, async () => {
            await this.getLocator().evaluate((ele) => {
                const selectElement = ele as HTMLSelectElement;
                selectedOption = Array.from(selectElement.selectedOptions).map((option) => option.textContent);
            });
        });
        return selectedOption;
    }

    public async getselectedOption() {
        let selectedOption;
        await test.step(`Getting the selected option from dropdown ${this.description}`, async () => {
            const selectedOptions = (await this.getAllSelectedOptions()) ?? [];
            selectedOption = selectedOptions.length > 0 ? selectedOptions[0] : "Select";
        });
        return selectedOption;
    }

    public async selectByPartialText(partialText: string) {
        await test.step(`Selecting dropdown ${this.description} option with partial text: ${partialText}`, async () => {
            const options = (await this.getAllOptions()) ?? [];
            const optionToSelect = options.find((option) => option.includes(partialText));
            if (optionToSelect) {
                await this.selectByText(optionToSelect);
            } else {
                throw new Error(`No option found with partial text: ${partialText}`);
            }
        });
        return this;
    }
}