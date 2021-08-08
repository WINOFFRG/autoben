const fs = require('fs');
const initBrowser = require('./core/browser');
const filterTeams = require('./core/channels');

(async () => {

    await initBrowser().then( () => {
        console.log("Reading File");
        readFile();
    });

    function readFile(){
        
        fs.readFile('./config/capture-api-response.json','utf-8', function(err, jsonData){
            if (err) throw err;    
            var content = JSON.stringify(jsonData);
            var data = JSON.parse(content);
            
            printFilteredTeams(data);
        });
    }

    async function printFilteredTeams(data){
        
        // let save = await filterTeams(data);
        
        filterTeams(data).then( (resp) => {
            fs.writeFile('./config/filtered-teams.json', resp, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
            console.log('handle success here');
         }).catch((e) => {
            console.log('handle error here: ', e.message)
         })
    }

    // readFile();

})();
