const { chromium } = require('playwright');
const dotenv = require('dotenv');

require('dotenv').config({path: './config.env'});

(async () => {
  // Make sure to run headed.
  const browser = await chromium.launch({ 
    channel: 'msedge',  
    headless: false 
});

  // Setup context however you like.
  const context = await browser.newContext({
    permissions: ['microphone'],
    colorScheme: 'dark',
    locale: 'en-US' });
  await context.route('**/*', route => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
  await page.goto('https://teams.microsoft.com');
  await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
  await page.click('text=Next');
  await page.fill('[placeholder="Password"]', process.env.PASSWORD);
  await page.click('text=Sign in');
  
  console.log("Signed In Successfully");

  const text = await page.innerText('.text-title');
  if(text === "Stay signed in?") await page.click('text=Yes'); 

  await page.pause();
})();