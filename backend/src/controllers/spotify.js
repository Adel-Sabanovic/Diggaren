import { response } from "express";
import fetch from "node-fetch";
import passport from "passport";
import SpotifyStrategy from "passport-spotify";

//Spotify app credentials



export const spotifyAuth = passport.authenticate('spotify', {
    showDialog: true
  })



