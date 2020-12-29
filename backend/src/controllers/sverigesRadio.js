import fetch from "node-fetch";

import {SETTINGS} from "../settings.js";



function channelPages(pageNbr){
    
    return SETTINGS.SVERIGE_RADIO_API + "/v2/channels?format=json&page=" + pageNbr
  
} 

export async function fetchPages(pageNbr){
    
    let page = channelPages(pageNbr)
    
    let response = await fetch(page);

    // let jsonData = await response.body.json();
}


fetchPages(1);