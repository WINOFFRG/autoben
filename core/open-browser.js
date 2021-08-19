const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({path: path.join( __dirname, '../config/config.env')});

module.exports = async function openBrowser(page){

    await page.goto('https://teams.microsoft.com');
  
    await page.fill('[placeholder="Email, phone, or Skype"]', process.env.EMAIL);
    await page.click('text=Next');
    
    await page.fill('[placeholder="Password"]', process.env.PASSWORD);
    await page.click('text=Sign in');

    const text = await page.innerText('.text-title');
    if(text === "Stay signed in?") await page.click('text=No');

    /* Choose Account and Page Timeout Missing */
    
    // Capture teams API Request from MST
    page.setDefaultTimeout(60000);
    const response = await page.waitForResponse(response => response.url().includes('https://teams.microsoft.com/api/csa/api/v1/teams/users/me?isPrefetch=false&enableMembershipSummary=') && response.status() === 200);
    const responseBody = (await response.body()).toString();
    
    return await new Promise( (resolve, reject) => {
        resolve(responseBody);
        reject(new Error("Unable to initialize Browser!"));
    });
}


/* NOTES :

Three test cases are left where bot can fail to Open the browser and login

1. Get Window Application, Continue to Web App
2. Ask again for our account Signin if already saved
3. _---_
*/