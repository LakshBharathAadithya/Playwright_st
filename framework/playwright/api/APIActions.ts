import { Page } from "playwright";
import RestRequest from "./rest/RestRequest";
import RequestHeader from "./RequestHeader";
import RestHeader from "./rest/RestHeader";

export default class APIActions {
    constructor(private page: Page) {}

    public get rest(){
        return new RestRequest(this.page);
    }

    public get restHeader() {
        return new RestHeader();
    }
}
