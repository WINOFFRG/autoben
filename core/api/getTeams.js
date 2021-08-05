const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');

dotenv.config({path: '../../config/config.env'});

// state >> JSONKEY->origins >> ARRAY->json >> JSONKEY->localStorage >> ARRAY->JSONKEY->KEY >> KEY->name == ""

async function tokenObject(){
    var stateData, tokenObjectJSON, tempKey;

    fs.readFile(__dirname + "../../../config/state.json", (error, data) => {

        if (error) {
            throw error;
        }

        // WARNING: HEAVY OBJECT, DON'T PRINT!

        stateData = JSON.parse(data.toString());
        var obj = stateData["origins"][0]["localStorage"];

        // WARNING: HEAVY OBJECT, DON'T PRINT!
        
        Object.keys(obj).forEach(key => {
            var uri = obj[key]["name"].toString();
            if (uri.indexOf("cache.token.https://chatsvcagg.teams.microsoft.com") > -1)
            tokenObjectJSON = JSON.parse(obj[key]["value"]);
        });

        tempKey = tokenObjectJSON["token"];
        console.log(tokenObjectJSON["expiration"]);
        callApi();
    });

    async function callApi() {

        let responseData = "";
        webApiUrl = process.env.LIST_TEAMS_API_URL;
        console.log(tempKey);
        await axios.get(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tempKey}`} }).then( function (response) {
            console.log(response.data['teams']);
            responseData = JSON.stringify(response.data['teams']);
        });
    
        fs.writeFileSync('responseData.json', responseData);        
    }
}

tokenObject();
