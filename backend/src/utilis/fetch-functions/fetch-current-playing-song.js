import fetch from "node-fetch";

import { fetchAllChannels } from "./fetch-all-channels";

import { SETTINGS } from "../../settings.js";

export const ENUM = {
    CHANNEL_NOT_FOUND: "Channel not found",
    CHANNEL_NOT_PLAYING_MUSIC: "Channel is not playing music", 
}
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
        
        return {
            result: ENUM.CHANNEL_NOT_FOUND
        };
    }

    const res = await fetch(`${SETTINGS.SVERIGE_RADIO_API}/v2/playlists/rightnow?format=json&channelid=${channelId}`);

    const data = await res.json();

    const { 
        previoussong,
        song = previoussong
    } = data.playlist;

    if(!song){

        return {
            result: ENUM.CHANNEL_NOT_PLAYING_MUSIC,
            data: song
        };
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