import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */

test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }

    /** STEP: Navigate to Wikipedia sign-in page */
    await page.goto('https://en.wikipedia.org/wiki/Special:UserLogin')

    /** STEP: Enter username into Username field */
    const username = page.getByRole('textbox', { name: 'Username' });
    await username.click()
    await username.fill(wikipediaUsername);
    
    /** STEP: Enter password into Password field */
    const password = page.getByRole('textbox', { name: 'Password' });
    await password.click();
    await password.fill(wikipediaPassword);
    
    /** STEP: Click Log in button */
    await page.getByRole('button', { name: 'Log in' }).click();

    /** STEP: Capture storage state and save in file */
    await page.context().storageState({ path: authFile });
});
