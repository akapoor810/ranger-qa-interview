import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */


export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Click the link to view the total number of articles in English */
    // Number of articles is stored as the second element under the "Special:Statistics" title where id="articlecount"
    const totalArticlesLink = page.locator('#articlecount a[title = "Special:Statistics"]').nth(1);
    
    /** STEP: Extract the numerical value */
    const numText = await totalArticlesLink.innerText();
    const numTotalArticles = parseInt(numText.replace(/,/g, ''), 10);
    
    /** STEP: Assert the number is less than 7,000,000 */
    expect(numTotalArticles).toBeLessThan(7000000000)

    /** STEP: Get the default paragraph font size */
    const defaultText = page.locator('p').first();	  
    const defaultSizeStr = await defaultText.evaluate((element) =>	    
        window.getComputedStyle(element).getPropertyValue("font-size")	  
    );
    const defaultSize = parseFloat(defaultSizeStr);
    console.log(`${defaultSize}`);
    
    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
    await smallTextSizeOption.click();
    
    /** STEP: Get the Small paragraph font size */
    const smallText = page.locator('p').first();	  
    const smallSizeStr = await smallText.evaluate((element) =>	    
        window.getComputedStyle(element).getPropertyValue("font-size")	  
    );
    const smallSize = parseFloat(smallSizeStr);
    
    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();
    
    /** STEP: Get the Large paragraph font size */
    const largeText = page.locator('p').first();	  
    const largeSizeStr = await largeText.evaluate((element) =>	    
        window.getComputedStyle(element).getPropertyValue("font-size")	  
    );
    const largeSize = parseFloat(largeSizeStr);


    /** STEP: Assert the text got smaller when the "Small" text size option was selected */
    expect(smallSize).toBeLessThan(defaultSize);

    /** STEP: Assert the text got larger when the "Large" text size option was selected */
    expect(largeSize).toBeGreaterThan(defaultSize);

    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeButton = page.getByLabel('Standard').first();
    await standardTextSizeButton.click();

    /** STEP: Get the default font size */
    const standardText = page.locator('p').first();	  
    const standardSizeStr = await standardText.evaluate((element) =>	    
        window.getComputedStyle(element).getPropertyValue("font-size")	  
);
    const standardSize = parseFloat(standardSizeStr);

    /** STEP: Assert the text reverted to the default size when the "Standard" text size option was selected */
    expect(standardSize).toEqual(defaultSize);
}
