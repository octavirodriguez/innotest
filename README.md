# inno<span style='color:#E64366'>Test</span>

This is the automation assignment I've put together with the time allowed.  
Hope you find everything pretty self-explainatory.  
I've commented everything to make it very easy to follow code reasoning.

Thank heaps!!!

Octavi  


# 🚀 Running Automated Tests

## Prerequisites  
Ensure you have the necessary environment  
1. **Node.js & npm:** Install Node.js (which includes npm).
2. **Install Dependencies:** Navigate to the project root directory in your terminal and install all required packages:  
`npm install`
3. **Install Browser Binaries:** Playwright requires its bundled browsers (Chromium, Firefox, WebKit).  
`npx playwright install`

## Executing Tests  
All tests are configured to use the `baseURL` defined in `playwright.config.ts`.

1. Run All Tests  
To execute the entire test suite simultaneously across all configured browsers (I've only included Chromium):  
`npx playwright test`
2. Run a Specific Test File  
To run tests contained within a single file (e.g. tests/test-1.spec.ts):  
`npx playwright test tests/test-1.spec.ts`

