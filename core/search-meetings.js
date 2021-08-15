module.exports = async function searchMeetings(channel, page){

    await page.goto(`https://teams.microsoft.com/_#/school/conversations/${channel.displayName}?threadId=${channel.id}&ctx=channel`);

    /* NEED TO CHECK BELOW METHODS, STILL NOW SURE IF BELOW EVALUATION WORKS IN ALL CASES */

    // await page.waitForTimeout(5000);  
    // await page.waitForSelector('#app-messages-header >> :nth-match(div:has-text("Team"), 3)');
    // document.querySelector('virtual-repeat').getAttribute('class').contains('ts-message-list')
    
    /* This evaluates f the middle section has loaded or not*/ 
    
    let loaded = false, loadTime = 0;
    
    while(loaded != true){

        loadTime += 500;
        await page.waitForTimeout(500);
        loaded = await page.evaluate( () => {
            return document.querySelector('message-list').querySelector('.vr-loadmore').classList.contains('hide')
  
        } );

        if(loadTime > 10000){
            return new Error('Timeout while loading chats ❌');
        }
    }

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