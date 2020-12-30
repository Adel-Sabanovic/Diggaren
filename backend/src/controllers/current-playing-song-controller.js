import { Request, Response, NextFunction } from "express";

import fetch from "node-fetch";

import { SETTINGS } from "../settings.js";

import {Headers} from "node-fetch";

import { getStoredTokenMetadata } from "../utilis";



/**
 * 
 * @param { Request } req
 * 
 * @param { Response } res 
 * 
 * @param { NextFunction } next 
 */
export const currentPlayingSongController = async (req, res, next) => {
    
    
};

const currentPlayedSongsUrls = {
    p1: getCurrentPlayedSongUrlFromChannel(132),
    p2: getCurrentPlayedSongUrlFromChannel(163),
    din_gata: getCurrentPlayedSongUrlFromChannel(2576)
};


/**
 * @typedef {{
 *  title: string;
 *  artist: string;
 * }} - Song 
 */


/**
 * Fetches a the current played song from a one of these channels p1, p2, din gata
 * 
 * @param { "p1" | "p2" | "din_gata" } channel 
 * 
 * @returns {Promise<Song>}
 */
export async function fetchCurrentPlayingSong(channel) {

    const currentPlayedSongsUrl = currentPlayedSongsUrls[channel];

    const res = await fetch(currentPlayedSongsUrl);

    const data = await res.json();

    const { 
        prevSong,
        song = prevSong,
    } = data.playlist;

    const { 
        title,
        artist
    } = song;

    return {
        title,
        artist
    };
};


/**
 * Return an url that corresponds to the current played songs in sveriges radio channel 
 * 
 * @param { number } channelId - The id of the channel
 * 
 * @returns { string }
 */
function getCurrentPlayedSongUrlFromChannel(channelId) {

    return `${SETTINGS.SVERIGE_RADIO_API}/v2/playlists/rightnow?format=json&channelid=${channelId}`;
};



//Searches spotify for a song based on title name and artist. Returns a link to the song
export function searchSpotify(token, title, artist){
    let header = new Headers();
    header.append("Authorization", "Bearer " + token);
  
    let requestOptions = {
      method: 'GET',
      headers: header,
      redirect: 'follow'
    };
  
    let searchQ = "https://api.spotify.com/v1/search?limit=1&type=track&q=track:" + title + "+artist:" + artist;
    fetch( searchQ , requestOptions)
    .then(response => response.json())
    .then(function(data){
      let link = data.tracks.items[0].external_urls.spotify;
      console.log("länk från searhc metod" + link);
      return link;
    })
    
    .catch(error => console.log('error', error));
   }
   
  
