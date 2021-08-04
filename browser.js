const { chromium } = require('playwright');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({path: './config.env'});

(async () => {

  const browser = await chromium.launch({ 
    channel: 'msedge',
    headless: false,
    // devtools: true
  });

  const context = await browser.newContext({
    permissions: ['microphone'],
    colorScheme: 'dark',
    locale: 'en-US' 
  });

  await context.route('**/*', route => route.continue());

  const page = await context.newPage();
  await page.goto('https://teams.microsoft.com');
  

      await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
      await page.click('text=Next');
      await page.fill('[placeholder="Password"]', process.env.PASSWORD);
      await page.click('text=Sign in');
      await context.storageState({ path: 'state.json' });

      const text = await page.innerText('.text-title');
      if(text === "Stay signed in?") await page.click('text=No');      
  
  console.log("Signed In Successfully");

  await page.waitForTimeout(30000);
  // const [response] = await Promise.all([
  //   // Waits for the next response with the specified url
  //   page.waitForResponse('https://teams.microsoft.com/_#/school/conversations/General?threadId=19:c36076e6eb2f46e4832fb5b0346dfde0@thread.tacv2&ctx=channel'),
  //   // Triggers the response
  //   page.click('button.triggers-response'),
  // ]);

  console.log("Sync Cookies");
  const cookies = await context.cookies();
  const cookieJson = JSON.stringify(cookies);
  fs.writeFileSync('cookies.json', cookieJson);

  console.log("Local Storage");
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));
  fs.writeFileSync('localstorage.json', localStorage)

  // await page.pause();
})();