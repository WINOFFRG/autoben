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
        // console.log(tokenObjectJSON["expiration"]);
        callApi();
    });

    let responseData = "";
    
    async function callApi() {

        // tempKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NoYXRzdmNhZ2cudGVhbXMubWljcm9zb2Z0LmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzRjZjA4NGU0LWNkNmUtNDAxYi04OGY2LTUxYWJlNTYyZGM5YS8iLCJpYXQiOjE2MjgyNzkwODIsIm5iZiI6MTYyODI3OTA4MiwiZXhwIjoxNjI4MzU2NDY3LCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVRRQXkvOFRBQUFBQVVFeXpYVFFWM0FmUmZSUFdCbUM5Qmd2Nkx2aDZhdEFYcjVFYWFaeGhxN3pZeEUzN1k1UVVvZU9QSEtCdUhBbiIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI1ZTNjZTZjMC0yYjFmLTQyODUtOGQ0Yi03NWVlNzg3ODczNDYiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IjIwMjFJVEIiLCJnaXZlbl9uYW1lIjoiUk9IQU5HVVBUQSIsImlwYWRkciI6IjIwLjE5Ny41OC4yNSIsIm5hbWUiOiJST0hBTkdVUFRBMjAyMUlUQiIsIm9pZCI6ImNhZmRiZGVlLTYxYzAtNGZlNi1hZjQwLWI3NGRlOGEzOGY2MiIsInB1aWQiOiIxMDAzMjAwMTMwMTlCNTZDIiwicmgiOiIwLkFVa0E1SVR3VEc3TkcwQ0k5bEdyNVdMY21zRG1QRjRmSzRWQ2pVdDE3bmg0YzBaSkFCcy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiI4WXF5b2dfTC00YXJCVUVzbWx4eGpLeDNicWc3SFkyVkZjVVNNU29GdU9jIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNGNmMDg0ZTQtY2Q2ZS00MDFiLTg4ZjYtNTFhYmU1NjJkYzlhIiwidW5pcXVlX25hbWUiOiJST0hBTkdVUFRBMjAyMUlUQkBicGl0ZGVsaGkub25taWNyb3NvZnQuY29tIiwidXBuIjoiUk9IQU5HVVBUQTIwMjFJVEJAYnBpdGRlbGhpLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IjJlUnAtcU5jTVVxSWhVcTk2YjlHQVEiLCJ2ZXIiOiIxLjAiLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIn0.VTI1SDf81WqQ4Xl0zkgxsARkkxlQ_YCZXMjOcO_GIFFFf7XT-wxIHEOIWtPjeTXqkrIEL2Hmb7i-aIfvaRG1ChNJfSuVFHMlpKdW6CWvDSMrHY88zjaN0s_uzpt2D_cM2Mm-LJu2oLlXK6CeM_QlEnukC-2Fi3rbUYNhltj-oUJgXwZPlB9kRHox2lWgVQ4zDSDqPESdvUV-EEnW2LiIacsvpQTkBvsMd8Ra2TR74G-9s3uUJpddTPMXsCdxvVJY7QiayiThg3YRvPIZsSvgLzQRhFp4REMvtn_jU0n3o-H7pnuUvBHRGjwGs0Hyq3EOaMJGlCnzEpWImE0018TH0g";

        webApiUrl = process.env.LIST_TEAMS_API_URL;

        await axios.get(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tempKey}`} }).then( function (response) {
            responseData = JSON.stringify(response.data['teams']);
        }).catch(function (error) {
            console.log(error)    
        });

        console.log(responseData);
        // NETWORK REQUEST FAILED TO BE ADDED

        // let request = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tempKey}`} });
        // request.then( response => {
        //     console.log(response);
        //     return response.data;
        // }).catch(error => {
        //     console.log(error)
        // });
    }
    // return responseData;
}

// tokenObject();