import { test, expect } from '@playwright/test';
import LoginSteps from '../saucelabs/steps/LoginSteps';
import PwActions from '../framework/playwright/actions/pwActions';

test('get started link', async ({ page }) => {
  const loginStep = new LoginSteps(new PwActions(page));
  await loginStep.login("standard_user", "secret_sauce");
});
