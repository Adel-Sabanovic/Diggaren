import fetch from "node-fetch";

import { Song } from "./fetch-current-playing-song";

import { Token } from "../stored-token-metadata";

import { SETTINGS } from "../../settings";



/**
 * @typedef { Song & {
 *  url: string;
 *  image: string;
 * }} SongWithUrl
 */

/**
 * Fetches and retrieves a songs url from spotify if found
 * 
 * @param { Token } token 
 * 
 * @param { Song } song 
 * 
 * @returns { Promise<SongWithUrl | null> } song url
 */
export async function fetchSpotifySong(token, song) {

    const { access_token } = token;

    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
        redirect: 'follow'
    };

    const { title, artist } = song;

    const fetchSpotifySongUrl = `${SETTINGS.SPOTIFY_API}/search?limit=1&type=track&q=track:${title}+artist:${artist}`;

    const response = await fetch(fetchSpotifySongUrl , requestOptions);        

    const data = await response.json();

    const [ songFromSpotify = null ] = data.tracks.items;

    if (!songFromSpotify) return songFromSpotify;

    const [ imageObject = null ] = songFromSpotify.album.images;

    const { url: image } = imageObject;

    const url = songFromSpotify.external_urls.spotify;

    const songWithUrl = {
        url,
        title,
        artist,
        image
    }

    return songWithUrl;
}