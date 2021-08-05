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
  const context = await browser.newContext({
    permissions: ['microphone'],
    colorScheme: 'dark',
    locale: 'en-US' ,
    storageState: 'state.json'
  });

  await context.route('**/*', route => route.continue());

  const page = await context.newPage();
  await page.goto('https://teams.microsoft.com');
  

      // await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
      // await page.click('text=Next');
      // await page.fill('[placeholder="Password"]', process.env.PASSWORD);
      // await page.click('text=Sign in');

      // const text = await page.innerText('.text-title');
      // if(text === "Stay signed in?") await page.click('text=No');      
  
  console.log("Signed In Successfully");

  await page.waitForTimeout(30000);

  await context.storageState({ path: '../config/state.json' });

  await page.pause();
})();