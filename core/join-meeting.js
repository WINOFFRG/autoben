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

    let video_btn = await page.locator("toggle-button[data-tid='toggle-video']>div>button");
    let video_is_on = await video_btn.getAttribute("aria-pressed");

    if(video_is_on == "true"){
        video_btn.click();
        console.log("Turned off Video"); 
    }
    
    let audio_btn = await page.locator("toggle-button[data-tid='toggle-mute']>div>button");
    let audio_is_on = await audio_btn.getAttribute("aria-pressed");

    if(audio_is_on == "true"){
        audio_btn.click();
        console.log("Turned off Microphone"); 
    }

    await page.waitForTimeout(1000);

    let joinButton = await page.locator("button[data-tid='prejoin-join-button']");
    await joinButton.click();

    console.log("Joined Meeting Successfully 🎉🥳");

    return Promise.resolve("Joined");
    // document.querySelector('.buttons-container').querySelectorAll('toggle-button')[0].querySelector('.ts-toggle-button').setAttribute('aria-pressed', 'true')
}