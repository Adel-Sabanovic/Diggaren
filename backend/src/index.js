import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import fetch from "node-fetch";

import {Headers} from "node-fetch";

import {Buffer} from "buffer";

const app = express();

app.use(json());

app.use(rootRouter);



let token, expires, link, client_id, client_secret, authEncoded;
client_id = "9e370704b5e644cc9b1bc011da337ed7";
client_secret = "1d97099a5fd64863b18a6d6298db2056";
let auth = client_id + ":" + client_secret;
let buffer = Buffer.from(auth);
authEncoded = buffer.toString('base64');
// onsole.log(authEncoded);

startingOut("sunburn", "muse", "");

  function startingOut(track, artist, album){ //potentiellt lägga till in letiabler artist/track/album här som sedan skickas med till searchSpotify, så att delen från sveriges radio bara anropar denna
    if(token==null){
    getNewToken(track, artist, album);
    }
    else if(Date.now > expires){
    getNewToken(track, artist, album);
    }
    else{
    searchSpotify(token, track, artist, album) //potentiellt invariabler här
    }
  }

  //Method for retrieving new spotify api access token
  function getNewToken(track, artist, album){

    // post request header is made based on client_id and client_secret of project spotify account

    //potentiellt lägga variabel
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic OWUzNzA3MDRiNWU2NDRjYzliMWJjMDExZGEzMzdlZDc6MWQ5NzA5OWE1ZmQ2NDg2M2IxOGE2ZDYyOThkYjIwNTY=");
    myHeaders.append("Cookie", "__Host-device_id=AQBKvU9kFsq20aSafhwn9n8Z5cgUJUozznCXUoh8DXNeq-wSo0It3AA3MQ-0GgUwy1dneHs-XFmSTe2kSykBK-mpVORByY3VXFc; __Secure-TPASESSION=AQAEwgcEgOKJ/89nHHXSNzZJoSjJNU3SOjcDLshVTyNtuzzQM56HJz5duvyQJ/KtpJCRO7mhcfZ7l3M08vNBRlBzHAw1gTP3YK8=; csrf_token=AQAwpsOkfL-byT8H200CREDi6lSrfvY0MxOZ_ozN8fOryl6-sl2BzjCTDikQf5ejDcGWKd2-nXVg0TA");

    let raw = "grant_type=client_credentials";

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://accounts.spotify.com/api/token", requestOptions)
      .then(response => response.json())
      .then(function(data){
        token = data.access_token;
        expires = Date.now() + (data.expires_in/1000) - 120000;   //Sätter expires till epochformat. Ett visst antal ms i framtiden baserad på expires_in. Tar bort 2 min som buffer
  //     console.log(data.access_token);
        searchSpotify(token, track, artist, album);
    })
    .catch(error => console.log('error', error));
  }

//Searches spotify for a song based on track name, artist and album. Returns a link to the song
function searchSpotify(token, track, artist, album){
  let myHeaders = new Headers();
  console.log(token);
  myHeaders.append("Authorization", "Bearer " + token);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let searchQ = "https://api.spotify.com/v1/search?limit=1&type=track&q=track:" + track + "+artist:" + artist + "+album:" + album;
  fetch( searchQ , requestOptions)
  .then(response => response.json())
  .then(function(data){
    link = data.tracks.items[0].external_urls.spotify
  //  console.log(data);
    console.log(link);
    
  })
  .catch(error => console.log('error', error));


 }



app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));
