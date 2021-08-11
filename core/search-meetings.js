module.exports = async function searchMeetings(teams, page){
    // console.log(teams);

    await page.goto('https://teams.microsoft.com/_#/school/conversations/aa?threadId=19:25bcecf8dae64023b13eeaac03b10094@thread.tacv2&ctx=channel');
    const element = await page.waitForSelector('.ts-calling-thread-header', 10);
    
    if(!element)
    {
        console.log("No Meetings Found");
        return; 
    }
    
    var meetings;

    await page.evaluate(() => {
        meetings = document.querySelectorAll('.ts-calling-thread-header')
    console.log(meetings);
    });
    


    meetings.forEach( meeting => {
        var id = meeting.getAttribue('id');
        var time_started = id.replace("m", "");
        var time = new Date(time_started);

        console.log(`Found a meeting with ID: ${id} started at ${time}`);
    });
}