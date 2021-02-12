import fetch from "node-fetch";

import { SETTINGS } from "../../settings";


/**
 * @typedef {{
 *  [name: string]: id
 * }} Channels
 */


/**
 * @returns { Promise<Channels> }
 */
export async function fetchAllChannels() {
    
    let currentPage = 0;

    let allChannels = [];

    while(true) {
        
        const response = await fetch(`${SETTINGS.SVERIGE_RADIO_API}/v2/channels/?format=json&page=${currentPage}`);

        const { channels } = await response.json();

        const isEmpty = channels.length === 0;

        if (isEmpty) break;

        allChannels = [
            ...allChannels,
            ...channels
        ]

        currentPage++;
    }
 
    const channels = allChannels.reduce((channels, { id, name}) => {

        name = name.toLowerCase().replaceAll(" ", "_");

        return {
            ...channels,
            [name]: id
        };
    }, {});

    return channels;
}