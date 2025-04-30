import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Worstbull"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */


// 2. Complete the Wikipedia search test
// - In `searchWikipedia.ts`, finish the existing test so that it correctly implements the test case in the file
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://www.wikipedia.org/');

    /** STEP: Enter text 'art' into the search input field */
    const searchInputField = page.getByRole('searchbox', {
        name: 'Search Wikipedia',
    });
    await searchInputField.fill('artificial');

    /** STEP: Click the 'Artificial Intelligence' link in the search suggestions */
    const artificialIntelligenceLink = page.getByRole('link', {
        // Exact name filter for "Artificial intelligence"
        name: "Artificial intelligence",
    }).first();
    await artificialIntelligenceLink.click();

    /** STEP: Click 'View History' button */
    await page.getByRole('link', { name: 'View history' }).click();
    
    /** STEP: Wait for the revision list to load */
    await page.waitForSelector('#pagehistory');
    
    /** STEP: Define the latestEditor locator as the editor of the most recent revision */
    // '#pagehistory' selects element with id 'pagehistory'
    // '#pagehistory li' targets each list item in revision history, first() grabs the most recent revision
    // 'a.new.mw-userlink' grabs all <a> elements in first item with class 'new.mw-userlink'
    const latestEditor = page.locator('#pagehistory li').first().locator('a.new.mw-userlink');
    
    /** STEP: Assert latest edit was made by user "Worstbull" */
    await expect(latestEditor).toHaveText("Worstbull")
}
