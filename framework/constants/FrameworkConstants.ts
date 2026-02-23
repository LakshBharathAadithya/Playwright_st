export default class FrameworkConstants {
    // Project related constants
    static PRODUCT = process.env.PRODUCT?.trim();
    static PROJECT = process.env.PROJECT?.trim();
    static PRODUCT_VERSION = process.env.VERSION;
    static ENV = process.env.ENV?.trim();
    static BASE_URL = process.env.BASE_URL?.trim();
    static TAG = process.env.TAG?.trim();

    // Playwright configuration constants
    static TIME_IN_MIN = 60000;
    static HEADLESS = process.env.HEADLESS?.trim().toLowerCase() === 'true';
    static BROWSER = process.env.BROWSER?.trim().toLowerCase() ?? '';
    static BROWSER_LAUNCH_TIMEOUT = Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT ?? '0', 10);
    static STEP_DELAY = Number.parseInt(process.env.STEP_DELAY ?? '0', 10);
    static ACTION_TIMEOUT = Number.parseInt(process.env.ACTION_TIMEOUT ?? '0', 10) * this.TIME_IN_MIN;
    static NAVIGATION_TIMEOUT = Number.parseInt(process.env.NAVIGATION_TIMEOUT ?? '0', 10) * this.TIME_IN_MIN;
    static RETRIES = Number.parseInt(process.env.RETRIES ?? '0', 10);
    static TEST_TIMEOUT = Number.parseInt(process.env.TEST_TIMEOUT ?? '0', 10) * this.TIME_IN_MIN;
    static EXPECT_TIMEOUT = Number.parseInt(process.env.EXPECT_TIMEOUT ?? '0', 10) * this.TIME_IN_MIN;
    static PARALLEL_THREAD = Number.parseInt(process.env.PARALLEL_THREAD ?? '0', 10);
    static ENVIRONMENT = process.env.ENV;
    static USER_NAME = process.env.USER_NAME;
    static TEST_NAME = process.env.TEST_NAME;
    static readonly DOWNLOAD_PATH = "./test-results/downloads/";
}
