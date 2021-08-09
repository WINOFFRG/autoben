const { chromium } = require('playwright');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({path:  path.join( __dirname, '../config/config.env')});

async function initBrowser(){

  const browser = await chromium.launch({ 
    headless: false,
    channel: 'msedge',
    devtools: true
  });

  // Define Chromium Properties
  const context = await browser.newContext({
    permissions: ['microphone','camera','geolocation'],
    colorScheme: 'dark',
    locale: 'en-US' ,
    // storageState: '../config/state.json',
  });

  await context.route('**/*', route => route.continue());
  const page = await context.newPage();
  
  await page.goto('https://teams.microsoft.com');
  
      await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
      await page.click('text=Next');
      await page.fill('[placeholder="Password"]', process.env.PASSWORD);
      await page.click('text=Sign in');

      const text = await page.innerText('.text-title');
      if(text === "Stay signed in?") await page.click('text=No');
      
    console.log("Signed In Successfully");
  
    const response = await page.waitForResponse(response => response.url().includes('ttps://teams.microsoft.com/api/csa/api/v1/teams/users/me?isPrefetch=false&enableMembershipSummary=') && response.status() === 200);
    const responseBody = (await response.body()).toString();
    console.log("Recieved Response");
    
    fs.writeFile('./config/capture-api-response.json', responseBody, (err) => {
      if (err) throw err;
  });
  
  return new Promise((resolve, reject) => {
    return resolve(page);
  });
}

module.exports = initBrowser;