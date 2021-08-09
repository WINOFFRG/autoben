const fs = require('fs');
const initBrowser = require('./core/browser');
const filterTeams = require('./core/channels');
const search = require('./core/searching');

(async () => {

    await initBrowser().then( (page) => {
        readFile();
        search(page);

    });

    function readFile(){
        
        fs.readFile('./config/capture-api-response.json','utf-8', async function(err, jsonData){
            if (err) throw err;    
            var content = JSON.stringify(jsonData);
            var data = JSON.parse(content);
            // return await data;

            printFilteredTeams(data);
        });
    }
    
    async function printFilteredTeams(data){
        
        filterTeams(data).then( (resp) => {
            fs.writeFile('./config/filtered-teams.json', resp, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
            console.log('handle success here');
            console.log('Starting Searching');
         }).catch((e) => {
            console.log('handle error here: ', e.message)
         })
    }

    readFile();
})();
