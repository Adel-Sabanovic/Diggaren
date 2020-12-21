import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import passport from "passport";

import {Strategy} from "passport-spotify";

import fetch from "node-fetch";

 import {Headers} from "node-fetch";





const app = express();

app.use(json());

app.use(rootRouter);


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Basic OWUzNzA3MDRiNWU2NDRjYzliMWJjMDExZGEzMzdlZDc6MWQ5NzA5OWE1ZmQ2NDg2M2IxOGE2ZDYyOThkYjIwNTY=");
myHeaders.append("Cookie", "__Host-device_id=AQBKvU9kFsq20aSafhwn9n8Z5cgUJUozznCXUoh8DXNeq-wSo0It3AA3MQ-0GgUwy1dneHs-XFmSTe2kSykBK-mpVORByY3VXFc; __Secure-TPASESSION=AQAEwgcEgOKJ/89nHHXSNzZJoSjJNU3SOjcDLshVTyNtuzzQM56HJz5duvyQJ/KtpJCRO7mhcfZ7l3M08vNBRlBzHAw1gTP3YK8=; csrf_token=AQAwpsOkfL-byT8H200CREDi6lSrfvY0MxOZ_ozN8fOryl6-sl2BzjCTDikQf5ejDcGWKd2-nXVg0TA");

var raw = "grant_type=client_credentials";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

var token;
/*
fetch("https://accounts.spotify.com/api/token", requestOptions)
  .then(response => response.json())
 // .then(result => console.log(result))
  .then(function(data){
    token = data.access_token;
    console.log(data.access_token);
    search(token)
  })
  .catch(error => console.log('error', error));
  */


  // 

  var link, searchQ;

 // function search(tokenRet, track, artist, album){
  var myHeaders2 = new Headers();
myHeaders2.append("Authorization", "Bearer BQA-QO0kmE2NWdeDFhw36JX6KFWFkbT4ipub-TMhqwmP-1QDLUB49z5t8kYNcY5VzwveUeV3LGPk0RsnW34" );

var requestOptions = {
  method: 'GET',
  headers: myHeaders2,
  redirect: 'follow'
};
var artist = "Eminem";
var track = "mockingbird";
var album = "mockingbird";
searchQ = "https://api.spotify.com/v1/search?limit=1&type=track&q=track:" + track + "+artist:" + artist + "+album:" + album;
fetch( searchQ , requestOptions)
  .then(response => response.json())
  //.then(result => console.log(result))
  .then(function(data){
  //  link = data.tracks.items.external_urls.spotify;
  var link = data.tracks.items[0].external_urls.spotify
   console.log(link);
    
  })
  .catch(error => console.log('error', error));


// }



app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));