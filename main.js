const express = require('express');
const app = express();
const init = require('./index.js')


app.get('/start', async (req, res) => {
    console.log("GET Request Received");
    try {
        await init();
    }catch (error){ 
        console.log(error);
    }
});
 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));