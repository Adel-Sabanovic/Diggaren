import { json } from "body-parser";
import fetch from "node-fetch";
import {SETTINGS} from "../settings.js";

function din_gata(){
    
    return SETTINGS.SVERIGE_RADIO_API + "/v2/playlists/rightnow?format=json&channelid=2576"
  
} 

async function ifSongExists(){
    
 const res = await fetch(din_gata());
 const data = await res.json();
    console.log(data) 
    let prevSong = data.playlist.previoussong;
    let song = data.playlist.song;
     if (song == undefined){
         song = prevSong
 }
 
 let title = song.title;
 let artist = song.artist;
 
 console.log(title);
 console.log(artist);

return [title, artist]; 
    }
    
    ifSongExists();
    

function channelPages(pageNbr){
    
    return SETTINGS.SVERIGE_RADIO_API + "/v2/channels?format=json&page=" + pageNbr
  
} 

export async function fetchPages(pageNbr){
    let page = channelPages(pageNbr)
    console.log(page)
    let response = await fetch(page);
    let jsonData = await response.body.json();
    console.log(jsonData)

}

//fetchPages(1);
