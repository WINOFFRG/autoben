module.exports =  async function filterTeams(teams, blacklist){
    
    teams = JSON.parse(teams);
    teams = teams['teams'];
        
        for(var team in teams){
            Object.entries(teams[team]).forEach(
                ([key, value]) => {
                    if(key === 'displayName' || key === 'id'){
                        // console.log(value);
                    } 
                     else {
                    delete teams[team][key];
                    }
                });
        }
    

        return new Promise((resolve, reject) => {
            data = JSON.stringify(teams);
            return resolve(data);
    })
}