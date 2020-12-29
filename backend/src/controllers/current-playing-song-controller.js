import { Request, Response, NextFunction } from "express";

import fetch from "node-fetch";

import { SETTINGS } from "../settings.js";


/**
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
async function fetchCurrentPlayingSong(channel) {

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
