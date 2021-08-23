const { chromium } = require('playwright');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

const openBrowser = require('./core/open-browser');
const findTeamsNChannel = require('./core/find-teams');
const searchMeetings = require('./core/search-meetings');
const decideMeeting = require('./core/decide-meeting');
const joinMeeting = require('./core/join-meeting');

dotenv.config({path:  path.join( __dirname, '../config/config.env')});

/* 👋 AutoBen - Bot Code start from Here 👇 */
 async function init(){

    if(process.env.EMAIL.length == 0 || process.env.PASSWORD.length == 0) 
    return Promise.reject(new Error("Error: Email or Password is Empty!"));

    // Define Browser
    const browser = await chromium.launch({ 
        args: ["--start-maximized"],
        headless: false,
        channel: 'chrome',
        devtools: false
    });

    // Define Browser Properties
    const context = await browser.newContext({
        permissions: ['microphone','camera','geolocation'],
        colorScheme: 'dark',
        locale: 'en-US' ,
        viewport: null,
        // storageState: './config/state.json',
    });

    // Define Context
    await context.route('**/*', route => route.continue());

    // Setup Page
    const page = await context.newPage();

        log(chalk.blue.bold("Bot Initilized Succesfully 🤖 "));
        callOpenBrowser(page);

    async function callOpenBrowser(page){

        await openBrowser(page).then( data => {

            log(chalk.green("Signed In Succesfully 🔐"));
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
            teams = JSON.parse(data);
            var allMeetings =[];

            for(let team in teams){

                const channels = teams[team].channels;
                let meeting;

                for(let channel in channels){
                    await searchMeetings(channels[channel], page).then( meetings => {

                        if(meetings.length != 0) 
                        {
                            console.log(`Found Meetings 🤝 in ${teams[team].displayName} 👉 ${channels[channel].displayName} channel`);
                            // console.log(meetings);
                        
                            meeting = {
                                pageUri : `https://teams.microsoft.com/_#/school/conversations/${channels[channel].displayName}?threadId=${channels[channel].id}&ctx=channel`,
                                meetings : meetings   
                            }
                        }
                    });

                    if(meeting) allMeetings.push(meeting);
                }
            }

            passToLogic(allMeetings);
        }
        // await context.storageState({ path: './config/state.json' });
    }

    async function passToLogic(meetings){

        decideMeeting(meetings).then( decidedMeeting => {

            log(chalk.cyanBright("Decided Meeting 🤓"));
            joinMeeting(decidedMeeting, page);

        }).catch( error => {
                console.log(error)
        });
    }
};

init();