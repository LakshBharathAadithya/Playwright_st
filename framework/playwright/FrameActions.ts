
import { FrameLocator, Page } from "@playwright/test";
import ElementActions from "./ElementActions";
import { test, expect } from "@playwright/test";
import EditBoxActions from "./EditboxActions";
import CheckboxActions from "./CheckboxActions";
import DropdownActions from "./DropdownActions";
export default class FrameActions {
    protected page: Page;
    protected frameSelector: string;
    protected frameLocator: FrameLocator;

    constructor(page: Page, frameSelector: string) {
        this.page = page;
        this.frameSelector = frameSelector;
        this.frameLocator = this.page.frameLocator(frameSelector);
    }

    public setFrame(frameSelector: string) {
        this.frameSelector = frameSelector;
        this.frameLocator = this.page.frameLocator(frameSelector);
        return this;
    }

    public get frame() {
        return this.frameLocator.first();
    }

    public setInnerFrame(innerFrameSelector: string) {
        const innerFrame = new FrameActions(this.page, this.frameSelector);
        innerFrame.frameLocator = innerFrame.frame.frameLocator(innerFrameSelector);
        return innerFrame;
    }

    public getFrameElementLocator(selector: string) {
        return this.frame.locator(selector).first();
    }
    
    public getFrameElements(selector: string) {
        return this.frame.locator(selector);
    }

    public editBox(selector: string, description: string) {
        return new EditBoxActions(this.page).setLocator(this.getFrameElementLocator(selector), description);
    }

    public element(selector: string, description: string) {
        return new ElementActions(this.page).setLocator(this.getFrameElementLocator(selector), description);
    }

    public dropdown(selector: string, description: string) {
        return new DropdownActions(this.page).setLocator(this.getFrameElementLocator(selector), description);
    }

    public checkbox(selector: string, description: string) {
        return new CheckboxActions(this.page).setLocator(this.getFrameElementLocator(selector), description);
    }
}
