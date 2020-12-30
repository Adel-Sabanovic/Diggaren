import { Request, Response, NextFunction } from "express";

import { 
    fetchSpotifySong,
    fetchCurrentPlayingSong, 
    getStoredTokenMetadata,
    resultMessage,
} 
from "../utilis";

import { OK, GATEWAY_TIMEOUT } from "http-status";



/**
 * Retrieves an url from spotify of the current playing song in one of sveriges radio channels "p1", "p2" and "din_gata"
 * 
 * @param { Request } req
 * 
 * @param { Response } res 
 * 
 * @param { NextFunction } next 
 */
export const currentPlayingSongController = async (req, res) => {
    
    try {
        const { channel } = req.query;

        const { token } = getStoredTokenMetadata(req);

        const song = await fetchCurrentPlayingSong(channel);

        const songUrl = await fetchSpotifySong(token, song);

        const response = (
            resultMessage(
                true, 
                OK, 
                "Succeded fetching song from spotify", 
                { songUrl }
            )
        );

        return (
            res
            .status(OK)
            .json(response)
        );
    }
    catch(error) {
        
        const response = (
            resultMessage(
                false, 
                GATEWAY_TIMEOUT,
                "Spotify server is busy wait a sec"
            )
        );

        return (
            res
            .status(GATEWAY_TIMEOUT)
            .json(response)
        );
    }
};