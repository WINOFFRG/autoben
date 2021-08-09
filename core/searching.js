const { chromium } = require('playwright');

module.exports = async function search(page){
 
    await page.click('xpath=//*[@id="app-bar-2a84919f-59d8-4441-a975-2a8c2643b741"]');
    await page.click('[aria-label="Assignments Toolbar"]');
    return new Promise((resolve, reject) => {
        return resolve();
      });
}