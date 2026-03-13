import StringUtils from "../../utils/StringUtils";
import ElementActions from "./ElementActions";
import { test, expect, Locator } from "@playwright/test";

export default class CheckboxActions extends ElementActions {

    public setCheckbox(selector: string, description: string) {
        super.setElement(selector, description);
        return this;
    }

    public setLocator(locator: Locator, description: string) {
        super.setLocator(locator, description);
        return this;
    }

    public async check() {
        await test.step(`Check checkbox ${this.description}`, async () => {
            await this.getLocator().isChecked().then(async (isChecked) => {
                if (!isChecked) {
                    await this.getLocator().check();
                }
            });
        });
        return this;
    }

    public async unCheck() {
        await test.step(`Uncheck checkbox ${this.description}`, async () => {
            await this.getLocator().isChecked().then(async (isChecked) => {
                if (isChecked) {
                    await this.getLocator().uncheck();
                }
            });
        });
        return this;
    }

    public async isChecked(): Promise<boolean> {
        let checked = false;
        await test.step(`Check if checkbox ${this.description} is checked`, async () => {
            const element = await this.getLocator();
            await element.waitFor();
            checked = await element.isChecked();
         });
        return checked;
    }

    public async checkBasedOnCondition(shouldBeChecked: string) {
        const condition = StringUtils.boolean(shouldBeChecked);
        await test.step(`Check checkbox ${this.description} based on condition: ${condition}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            const isChecked = await element.isChecked();
            if (condition && !isChecked) {
                await element.check();
            } else if (!condition && isChecked) {
                await element.uncheck();
            }
        });
    }

    public async expectedToBeChecked(isChecked: string) {
        const condition = StringUtils.boolean(isChecked);
        await test.step(`Verifying checkbox ${this.description} to be ${condition ? 'checked' : 'unchecked'}`, async () => {
            const element = await this.getLocator();
            await element.waitFor();
            await expect(element, `${this.description} is ${condition ? 'checked' : 'unchecked'}`).toBeChecked({checked: condition});
        });
    }
}
