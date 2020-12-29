import fetch from "node-fetch";

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

const currentPlayedSongsUrls = {
    p1: getCurrentPlayedSongUrlFromChannel(132),
    p2: getCurrentPlayedSongUrlFromChannel(163),
    din_gata: getCurrentPlayedSongUrlFromChannel(2576)
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
 * @param { "p1" | "p2" | "din_gata" } channel 
 * 
 * @returns {Promise<Song>}
 */
export async function fetchCurrentPlayingSong(channel) {

    const currentPlayedSongsUrl = currentPlayedSongsUrls[channel];

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