const fs = require('fs');
const { resolve } = require('path');

module.exports = async function searchMeetings(teams, page){

    await page.goto('https://teams.microsoft.com/_#/school/conversations/aa?threadId=19:25bcecf8dae64023b13eeaac03b10094@thread.tacv2&ctx=channel');

    // await page.waitForTimeout(5000);  NEED TO CHECK BELOW METHO NEVERS FACES AN ISSUE
    await page.waitForSelector('#app-messages-header >> :nth-match(div:has-text("Team"), 3)');

    const meetings = await page.evaluate( () => {
        
        let array = [], 
        options = {
          hour12: true,
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata'
        };

        const meetings = document.querySelectorAll('.ts-calling-thread-header');

        for(const meeting of meetings){
            
            const title = meeting.querySelector('.title').innerText;
            const id = meeting.getAttribute('id');
            var time_started = id.replace("m", "");
            var time = new Date(parseInt(time_started));
            time = new Intl.DateTimeFormat('en-US', options).format(time);
    
            let object = {
                title: title,
                id: time_started,
                time: time
            }
    
            array.push(object);
        }
        return array;
    });
    
    return meetings;
}