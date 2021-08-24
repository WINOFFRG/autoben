module.exports = async function leaveMeeting(meeting, page){
    
    if(page.url().indexOf('calling' != -1))
    {
        let uri = meeting.pageUri.substr(meeting.pageUri.indexOf('=') + 1);
        page.goto(`https://teams.microsoft.com/_#/calling/${uri}`);
    }


    await page.locator('#hangup-button');

    await page.evaluate(() => {
        document.querySelector('#hangup-button').click();
    });
    // await page.click('#hangup-button');

    return Promise.resolve("Joined");

}