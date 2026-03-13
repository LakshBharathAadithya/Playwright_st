import PwActions from "../../framework/playwright/actions/pwActions";
import constants from "../constants/constants";
import Constants from "../constants/constants";
import LoginPage from "../pages/LoginPage";

export default class LoginSteps {
    constructor(private pw: PwActions) { }

    public async login(username: string, password: string) {
        await this.pw.editBox(LoginPage.USERNAME_EDITBOX, Constants.USERNAME).fill(username);
        await this.pw.editBox(LoginPage.PASSWORD_EDITBOX, Constants.PASSWORD).fill(password);
        await this.pw.element(LoginPage.LOGIN_BUTTON, Constants.LOGIN_BUTTON).click();
    }
}