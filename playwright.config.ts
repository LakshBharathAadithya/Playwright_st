import {  PlaywrightTestConfig } from "playwright/test";
import BrowserManager from "./framework/manager/BrowserManager";
import FrameworkConstants from "./framework/constants/FrameworkConstants";

const config: PlaywrightTestConfig = {
  use: {
    browserName: BrowserManager.type(process.env.BROWSER || "chrome"),
    channel: BrowserManager.channel(process.env.BROWSER || "chrome"),
    headless: process.env.HEADLESS?.trim().toLowerCase() === 'true',
    launchOptions: {
      args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT ?? "0", 10),
      slowMo: Number.parseInt(process.env.STEP_DELAY ?? "0", 10),
      downloadsPath: FrameworkConstants.DOWNLOAD_PATH,
    },
    viewport: FrameworkConstants.HEADLESS ? { width: 1280, height: 720 } : null,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT ?? "2", 10) * FrameworkConstants.TIME_IN_MIN,
    navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT ?? "2", 10) * FrameworkConstants.TIME_IN_MIN,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  testDir: "./test/specs",
  outputDir: "./test-results",
  retries: Number.parseInt(process.env.RETRIES ?? "0", 10),
  timeout: Number.parseInt(process.env.TEST_TIMEOUT ?? "30", 10) * FrameworkConstants.TIME_IN_MIN,
  expect: {
    timeout: Number.parseInt(process.env.EXPECT_TIMEOUT ?? "2", 10) * FrameworkConstants.TIME_IN_MIN,
  },
  workers: Number.parseInt(process.env.PARALLEL_THREAD ?? "1", 10),
  reporter:[
    ['dot'],
    ['allure-playwright',{
      detail: false,
      suiteTitle: false,
      environmentInfo: {
        PROJECT: FrameworkConstants.PROJECT,
        ENVIRONMENT: FrameworkConstants.ENV,
        BASE_URL: FrameworkConstants.BASE_URL,
        USER: FrameworkConstants.USER_NAME,
        BROWSER: FrameworkConstants.BROWSER,
        TAG: FrameworkConstants.TAG,
      }
    }],
    ["junit", { outputFile: "./test-results/results/results.xml" }],
    ["json", { outputFile: "./test-results/results/results.json" }],
  ]
};

export default config;
