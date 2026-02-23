import { Reporter, Suite, TestCase, TestError, TestResult, TestStep, FullConfig, FullResult } from '@playwright/test/reporter';
import DateUtil from '../utils/DateUtils';
import CommonConstants from '../constants/CommonConstants';
import HtmlUtils from '../utils/HtmlUtils';
import Logger from './Logger';

    const TEST_SEPARATOR = "##############################################################################";
    const STEP_SEPARATOR = "------------------------------------------------------------------------------";
export default class TestListener implements Reporter {
    private suite!: Suite;
    private startTime!: string;

    onBegin(config: FullConfig, suite: Suite): void {
        this.suite = suite;
        this.startTime = DateUtil.dateGenerator(CommonConstants.DATE_FORMAT, 0, 0, 0)
    }

    onEnd(result: FullResult) {
        const { test, total } = this.summarize(this.suite.allTests());
        HtmlUtils.generateHTMLReport(this.startTime, test.expected, test.unexpected, test.skipped, total);
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        if (result.status === 'failed') {
            Logger.error(`Test: ${test.title} - ${result.status.toUpperCase()}\n${result.error?.stack}`);
        }
        this.printLogs(`Test: ${test.title} - ${result.status.toUpperCase()}`, TEST_SEPARATOR);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === 'test.step') {
            if (typeof step.parent !== "undefined") {
                Logger.info(step.title);
            } else {
                this.printLogs(`Step: ${step.title} Started`, STEP_SEPARATOR);
            }
        }
    }

    onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === 'test.step' && typeof step.parent === "undefined") {
            this.printLogs(`Step: ${step.title} Completed`, STEP_SEPARATOR);
        }
    }

    onError(error: TestError): void {
        Logger.error(`Message: ${error.message}`);
        Logger.error(`Stack: ${error.stack}`);
        Logger.error(`Value: ${error.value}`);
    }


    private summarize(tests: TestCase[]) {
        const counts = {
            flaky: 0,
            expected: 0,
            unexpected: 0,
            skipped: 0,
        };
        // eslint-disable-next-line no-restricted-syntax
        for (const test of tests) {
            counts[test.outcome()] = counts[test.outcome()] + 1;
        }
        return { test: counts, total: tests.length };
    }

    private printLogs(msg: string, separator: string) {
        Logger.info(separator);
        Logger.info(`\t${msg.toUpperCase()}`);
        Logger.info(separator);
    }
}
