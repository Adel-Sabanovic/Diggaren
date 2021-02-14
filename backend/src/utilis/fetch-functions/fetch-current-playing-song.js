import fetch from "node-fetch";

import { fetchAllChannels } from "./fetch-all-channels";

import { SETTINGS } from "../../settings.js";



/**
 * @typedef {{
 *  title: string;
 *  artist: string;
 * }} Song - Represents a song
 */

/**
 * Fetches a the current played song from a one of these channels p1, p2, din gata
 * 
 * @param { string } channelName
 * 
 * @returns {Promise<Song|null>}
 */
export async function fetchCurrentPlayingSong(channelName) {

    const allChannels = await fetchAllChannels();

    const channelId = allChannels[channelName]; 

    if (!channelId) {
        
        return null;
    }

    const res = await fetch(`${SETTINGS.SVERIGE_RADIO_API}/v2/playlists/rightnow?format=json&channelid=${channelId}`);

    const data = await res.json();

    const { 
        previoussong,
        song = previoussong
    } = data.playlist;
    if(!song){
        return null;
    }
    const { 
        title,
        artist
    } = song;

    return {
        title,
        artist
    };
};