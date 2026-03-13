import { Page } from "playwright";
import { expect, test } from "@playwright/test";
import EditBoxActions from "./EditboxActions";
import CheckboxActions from "./CheckboxActions";
import DropdownActions from "./DropdownActions";
import AlertActions from "./AlertActions";
import ElementActions from "./ElementActions";
import DateUtil from "../../utils/DateUtils";
import FrameworkConstants from "../../constants/FrameworkConstants";
import FrameActions from "./FrameActions";

export default class PwActions {
    private editBoxActions: EditBoxActions;
    private checkboxActions: CheckboxActions;
    private dropdownActions: DropdownActions;
    private alertActions: AlertActions;
    private elementActions: ElementActions;
    constructor(private page: Page) {
        this.editBoxActions = new EditBoxActions(this.page);
        this.checkboxActions = new CheckboxActions(this.page);
        this.dropdownActions = new DropdownActions(this.page);
        this.alertActions = new AlertActions(this.page);
        this.elementActions = new ElementActions(this.page);
    }

    public getPage() {
        return this.page;
    }

    public setPage(page: Page) {
        this.page = page;
        this.editBoxActions = new EditBoxActions(this.page);
        this.checkboxActions = new CheckboxActions(this.page);
        this.dropdownActions = new DropdownActions(this.page);
        this.alertActions = new AlertActions(this.page);
        this.elementActions = new ElementActions(this.page);
    }

    public alert() {
        return this.alertActions;
    }

    public editBox(selector: string, description: string) {
        return this.editBoxActions.setEditBox(selector, description);
    }

    public checkbox(selector: string, description: string) {
        return this.checkboxActions.setCheckbox(selector, description);
    }

    public dropdown(selector: string, description: string) {
        return this.dropdownActions.setDropdown(selector, description);
    }

    public element(selector: string, description: string) {
        return this.elementActions.setElement(selector, description);
    }

    public async navigateTo(url: string) {
        await test.step(`Navigating to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    public async goBack() {
        await test.step(`Navigating back`, async () => {
            await this.page.goBack();
        });
    }

    public async goForward() {
        await test.step(`Navigating forward`, async () => {
            await this.page.goForward();
        });
    }

    public async refresh() {
        await test.step(`Refreshing the page`, async () => {
            await this.page.reload();
        });
    }

    public async keyPress(key: string) {
        await test.step(`Pressing key: ${key}`, async () => {
            await this.page.keyboard.press(key);
        });
    }

    public async waitForNavigation() {
        await test.step(`Waiting for navigation to complete`, async () => {
            await this.page.waitForNavigation();
        });
    }

    public async waitForLoadState() {
        await test.step(`Waiting for page to load`, async () => {
            await this.page.waitForLoadState();
        });
    }

    public async waitForDomContentLoaded() {
        await test.step(`Waiting for DOM content to load`, async () => {
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    public async waitForNetworkIdle() {
        await test.step(`Waiting for network to be idle`, async () => {
            await this.page.waitForLoadState('networkidle');
        });
    }

    public async switchToNewWindow(selector: string, description: string) {
        await test.step(`Switching to new window: ${description}`, async () => {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.elementActions.setElement(selector, description).click()
                // Trigger the action that opens the new window here, e.g.:
            ]);
            await newPage.waitForLoadState();
            this.setPage(newPage);
            return newPage;
        });
    }

    // public async switchToNewWindow1(selector: string, description: string) {
    //     await test.step(`Switching to new window: ${description}`, async () => {
    //         const newPagePromise = this.page.context().waitForEvent('page');
    //         await this.elementActions.setElement(selector, description).click();
    //         const newPage = await newPagePromise;
    //         await newPage.waitForLoadState();
    //         this.setPage(newPage);
    //         return newPage;
    //     });
    // }

    public async switchToWindowByIndex(index: number, waitSeconds = 5) {
        return await test.step(`Switching to window with index: ${index}`, async () => {
            const endTime = DateUtil.addSecondsToUnixTime(waitSeconds);
            while (this.page.context().pages().length < index && DateUtil.getUnixTime() < endTime) {
                DateUtil.wait(1);
            }
            if (this.page.context().pages().length < index) {
                throw new Error(`Failed to switch to window with index ${index} within ${waitSeconds} seconds`);
            }
            const pageInstance = this.page.context().pages()[index - 1];
            await pageInstance.waitForLoadState();
            this.setPage(pageInstance);
            return pageInstance;
        });
    }


    public async switchToParentWindow() {
        await test.step(`Switching to parent window`, async () => {
            const pages = this.page.context().pages();
            if (pages.length > 0) {
                const parentPage = await pages[0];
                await parentPage.bringToFront();
                this.setPage(parentPage);
                await parentPage.waitForLoadState();
                return parentPage;
            }
        });
    }

    public async closeWindow(index: number) {
        await test.step(`Closing page with index: ${index}`, async () => {
            const pages = this.page.context().pages();
            if (pages.length > index) {
                const pageToClose = pages[index];
                await pageToClose.close();
            }
        });
    }

    public async closeAllOtherWindows() {
        await test.step(`Closing all other windows except the current one`, async () => {
            const windows = this.page.context().pages();
            for (const window of windows) {
                if (window !== this.page) {
                    await window.close();
                }
            }
        });
    }

    public async openInNewWindow(url: string, description: string) {
        await test.step(`Opening URL: ${url} in new window: ${description}`, async () => {
            const newPageInstance = await this.page.context().newPage();
            await newPageInstance.bringToFront();
            await this.setPage(newPageInstance);
            await this.navigateTo(url);
            await newPageInstance.waitForLoadState();
            return newPageInstance;
        });
    }

    public async handleAlert(selector: string, description: string, message: string) {
        await this.elementActions.setElement(selector, description).click();
        return message;
    }

    public async acceptAlertOnClick(selector: string, description: string) {
        const message = await this.alert().accept();
        return await this.handleAlert(selector, description, message);
    }

    public async dismissAlertOnClick(selector: string, description: string) {
        const message = await this.alert().dismiss();
        return await this.handleAlert(selector, description, message);
    }

    public async acceptPromptOnClick(selector: string, description: string, promptText: string) {
        const message = await this.alert().accept(promptText);
        return await this.handleAlert(selector, description, message);
    }

    public async getPageTitle() {
        let title;
        await test.step(`Getting page title`, async () => {
            title =  await this.page.title();
        });
        return title;
    }

    public async downloadFile(selector: string, description: string, fileName: string) {
        let downloadedFileName;
        await test.step(`Downloading file by clicking on element: ${description}`, async () => {
            const [download] = await Promise.all([
                await this.page.waitForEvent('download'),
                await this.elementActions.setElement(selector, description).click()
            ]);
            downloadedFileName = download.suggestedFilename();
            downloadedFileName = `${fileName}_${DateUtil.getTodayDate("DDMMYYYYHHmmss")}_${downloadedFileName.substring(downloadedFileName.lastIndexOf('.'))}`;
            const filePath = `${FrameworkConstants.DOWNLOAD_PATH}${downloadedFileName}`;
            await download.saveAs(filePath);
            await download.delete();
        });
        return downloadedFileName;
    }

    public async pauseInSec(seconds: number) {
        await test.step(`Pausing for ${seconds} seconds`, async () => {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        });
    }

    public async waitFroLoadingImageToDisappear() {
        await test.step(`Waiting for loading image to disappear`, async () => {
            try {
                await this.page.locator("#floatingScreenShadow").waitFor({ state: 'visible', timeout: 20000 });
                await this.page.locator("#floatingScreenShadow").waitFor({ state: 'hidden' });
                await this.pauseInSec(0.5);
            } catch (error) {
                // If the loading image does not appear, we can ignore the error and continue with the test execution
            }
        });
        return this;
    }

    public async pressTabKey() {
        await test.step(`Pressing Tab key`, async () => {
            await this.page.keyboard.press('Tab');
        });
    }

    public async takeScreenShot(path: string, fileName: string) {
        await test.step(`Taking screenshot`, async () => {
            await this.page.screenshot({ path: `${path}/${fileName}_${DateUtil.getTodayDate("DDMMYYYYHHmmss")}.png`, fullPage: true, animations:'disabled'});
        });
    }

    public frame(frameSelector: string) {
        return new FrameActions(this.page, frameSelector);
    }

    public async expectToHaveTitle(expectedTitle: string) {
        await test.step(`Expecting page to have title: ${expectedTitle}`, async () => {
            expect(this.page, `Expected page to have title: ${expectedTitle}, but found: ${await this.page.title()}`).toHaveTitle(expectedTitle);
        });
    }

    public async expectToHaveURL(expectedURL: string) {
        await test.step(`Expecting page to have URL: ${expectedURL}`, async () => {
            expect(this.page, `Expected page to have URL: ${expectedURL}, but found: ${await this.page.url()}`).toHaveURL(expectedURL);
        });
    }

    public async keyDown(key: string, description: string) {
        await test.step(`Pressing ${description} key`, async () => {
            await this.page.keyboard.press(key);
        });
        return this;
    }

    public async keyUp(key: string, description: string) {
        await test.step(`Releasing ${description} key`, async () => {
            await this.page.keyboard.up(key);
        });
        return this;
    }
}