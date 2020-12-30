import { Request, Response, NextFunction } from "express";

import { 
    fetchSpotifySong,
    fetchCurrentPlayingSong, 
    getStoredTokenMetadata,
    resultMessage,
} 
from "../utilis";

import { OK, GATEWAY_TIMEOUT, NOT_FOUND } from "http-status";



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

        const { channelName } = req.params;

        const { token } = getStoredTokenMetadata(req);

        const song = await fetchCurrentPlayingSong(channelName);

        const songWithUrl = await fetchSpotifySong(token, song);

        let response;

        if (songWithUrl) {

            response = (
                resultMessage(
                    true, 
                    OK, 
                    "Succeded fetching song from spotify",
                    songWithUrl
                )
            );
        }
        else {

            response = (
                resultMessage(
                    true,
                    NOT_FOUND,
                    "Song not found in spotify"
                )
            );
        }

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