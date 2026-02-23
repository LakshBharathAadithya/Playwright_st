import BrowserConstants from "../constants/BrowserConstants";

export default class BrowserManager {

    public static type(browser: string): any {
        let browserType;
        switch (browser.toLocaleLowerCase()) {
            case BrowserConstants.CHROME:
                browserType = BrowserConstants.CHROMIUM
                break;
            case BrowserConstants.WEBKIT:
                browserType = BrowserConstants.WEBKIT
                break;
            default:
                browserType = BrowserConstants.FIREFOX;
        }
        return browserType;
    }

    public static channel(channel: string) {
        let browserChannel;
        switch (channel.toLocaleLowerCase()) {
            case BrowserConstants.CHROME:
                browserChannel = BrowserConstants.CHROME
                break;
            case BrowserConstants.MSEDGE:
            case BrowserConstants.EDGE:
                browserChannel = BrowserConstants.EDGE
                break;
            default:
                browserChannel = BrowserConstants.BLANK;
        }
        return browserChannel;
    }
}
