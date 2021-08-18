module.exports = async function joinMeeting(meeting, page){

    await page.goto(meeting.pageUri);
    console.log("I will now join this meeting");
    console.log(meeting);

    const joinID = 'm' + meeting.meetings[0].id;
    const joinBtn = await page.locator(`div[id='${joinID}'] > calling-join-button > button`);

    if(!joinBtn){
        console.log("Could not find the join button");
        return;
    }

    await joinBtn.click();

    callData = page.locator("button[data-tid='prejoin-join-button']");
    
    if(!callData){
        console.log("Could not find the call data");
        return;
    }

    // document.querySelector('.buttons-container').querySelectorAll('toggle-button')[0].querySelector('.ts-toggle-button').setAttribute('aria-pressed', 'true')
}