const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');

dotenv.config({path: './config.env'});

(async() => {
    let responseData = "";
    webApiUrl = process.env.LIST_TEAMS_API_URL;
    
    await axios.get(webApiUrl, { 
        headers: {"Authorization" : `Bearer ${process.env.AUTH_TOKEN}`} }).then( function (response) {
        console.log(response.data['teams']);
        responseData = JSON.stringify(response.data['teams']);
    });

    fs.writeFileSync('responseData.json', responseData);        
    })
();
