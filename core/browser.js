const { chromium } = require('playwright');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({path:'../config/config.env'});

(async () => {

  const browser = await chromium.launch({ 
    channel: 'msedge',
    headless: false,
    // devtools: true
  });

  // Define Chromium Properties
  const context = await browser.newContext({
    permissions: ['microphone'],
    colorScheme: 'dark',
    locale: 'en-US' ,
    storageState: '../config/state.json',
  });

  await context.route('**/*', route => route.continue());
  const page = await context.newPage();
  // await page.setViewportSize({ width: null, height: null });
  
  await page.goto('https://teams.microsoft.com');
  
  // Check if login Required or Not
  if(page.url().indexOf('https://login.microsoftonline.com/common/oauth2/authorize?') == 0) 
  {
      await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
      await page.click('text=Next');
      await page.fill('[placeholder="Password"]', process.env.PASSWORD);
      await page.click('text=Sign in');

      const text = await page.innerText('.text-title');
      if(text === "Stay signed in?") await page.click('text=No');
      
      console.log("Signed In Successfully");
  }
  
  await page.waitForTimeout(10000);

  //Save session Data
  await context.storageState({ path: '../config/state.json' });
  console.log("Saved Session Data");

  await page.pause();
})();