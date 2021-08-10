const fs = require('fs');

module.exports =  async function findTeamsNChannel(teams){
    
    teams = JSON.parse(teams);
    teams = teams['teams'];
        
    for(var team in teams){
        Object.entries(teams[team]).forEach(
            ([key]) => {
                if(key === 'displayName' || key === 'id' || key === 'channels'){
                    // console.log(value);
                } 
                 else
                    delete teams[team][key];
            });
    }

    for(var team in teams){
        Object.entries(teams[team]).forEach(
            ([key, value]) => {
                if(key === 'channels'){
                    for(var channel = 0; channel < value.length ; channel++){
                        Object.entries(value[channel]).forEach(
                            ([key]) => {
                                if(key === 'displayName' || key === 'id'){
                                    // console.log(value);
                                } 
                                else
                                    delete value[channel][key];
                            }
                        )
                    }
                }
            }
        );
    }

    teams = JSON.stringify(teams);

    fs.writeFileSync('./config/filtered-teams.json', teams, (err) => {
        if (err) throw err;
    });

    return new Promise((resolve, reject) => {
        data = JSON.stringify(teams);
        resolve(data);
        reject(new Error('There was an Error in synchronizing yours teams and Channels'));
    })
}