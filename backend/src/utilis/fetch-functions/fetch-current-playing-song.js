import fetch from "node-fetch";

import { fetchAllChannels } from "./fetch-all-channels";

import { SETTINGS } from "../../settings.js";



/**
 * Returns an url that corresponds to the current played songs in sveriges radio channel 
 * 
 * @param { number } channelId - The id of the channel
 * 
 * @returns { string }
 */
function getCurrentPlayedSongUrlFromChannel(channelId) {

    return `${SETTINGS.SVERIGE_RADIO_API}/v2/playlists/rightnow?format=json&channelid=${channelId}`;
};

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

    if (!channelName) {
        
        return null;
    }

    const currentPlayedSongsUrl = getCurrentPlayedSongUrlFromChannel(channelId);

    const res = await fetch(currentPlayedSongsUrl);

    const data = await res.json();

    const { 
        previoussong,
        song = previoussong
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