const { chromium } = require('playwright');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const openBrowser = require('./core/open-browser');
const findTeamsNChannel = require('./core/find-teams');
const searchMeetings = require('./core/search-meetings');

dotenv.config({path:  path.join( __dirname, '../config/config.env')});

/* 👋 AutoBen - Bot Code start from Here down down 👇 */

(async () => {

        if(process.env.EMAIL.length == 0 || process.env.PASSWORD.length == 0) 
        return Promise.reject(new Error("Error: Email or Password is Empty!"));

    // Define Browser
    const browser = await chromium.launch({ 
        headless: false,
        channel: 'msedge',
        devtools: false
    });
    
    // Define Browser Properties
    const context = await browser.newContext({
        permissions: ['microphone','camera','geolocation'],
        colorScheme: 'dark',
        locale: 'en-US' ,
        // storageState: '../config/state.json',
    });

    // Define Context    
    await context.route('**/*', route => route.continue());
    
    // Setup Page
    const page = await context.newPage();

        console.log("Bot Initilized Succesfully 🤖 ");
        callOpenBrowser(page);

    async function callOpenBrowser(page){

        await openBrowser(page).then( data => {
            
            console.log("Signed In Succesfully 🔐");
            searchTeams(data);

        }).catch( error => {
                console.log(error.message);
            });
    }


    async function searchTeams(data){

        if(data == undefined || data.length == 0) 
            return new Error("⚠ There was a problem in reading Data");

        if(Number(process.env.syncTeams)){
            await findTeamsNChannel(data).then( () => {

                console.log("Teams and Channels Synced Successfully 🧭");

            }).catch(  error => {
                    console.log(error);
            });
        } else{

            var data = fs.readFileSync('./config/filtered-teams.json', {encoding:'utf8', flag:'r'});
            data = JSON.parse(data);
            
            await searchMeetings(data, page).then( () => {

                console.log("Found Meetings 🤝");

            }).catch(  error => {
                    console.log(error);
            });
        }
    }

    /* This function is used to do I/O Operations without running the bot 🔋 */
    async function tempReadFileAndFilter(){
        
        const data = fs.readFileSync('./config/teams.json',
                                            {encoding:'utf8', flag:'r'});

        searchTeams(data).then( () => {
            
            console.log("Temp function Ran Successfully ✅");

            }).catch( error => {
                console.log(error.message);
        });
    };

})();