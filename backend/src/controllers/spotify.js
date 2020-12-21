import { response } from "express";
import fetch from "node-fetch";
import passport from "passport";
import SpotifyStrategy from "passport-spotify";

//Spotify app credentials


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

fetch("https://accounts.spotify.com/api/token", requestOptions)
  .then(response => response.text())
  .then(result => console.log("result"))
  .catch(error => console.log('error', error));



