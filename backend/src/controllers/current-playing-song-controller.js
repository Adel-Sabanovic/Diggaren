import { Request, Response, NextFunction } from "express";

import { 
    fetchSpotifySong,
    fetchCurrentPlayingSong, 
    getStoredTokenMetadata,
    resultMessage,
    ENUM
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
    
    const { channelName } = req.params;

    const { token } = getStoredTokenMetadata(req);

    const song = await fetchCurrentPlayingSong(channelName);

    let response;

    let statusCode;

    if (ENUM.CHANNEL_NOT_FOUND==song.result) {

        response = resultMessage(
            false,
            NOT_FOUND,
            "Channel not found",
            null
        );

        statusCode = NOT_FOUND;
    }
    else if(ENUM.CHANNEL_NOT_PLAYING_MUSIC==song.result){

        response = resultMessage(
            false,
            NOT_FOUND,
            "Channel is not playing music",
            song.data
        );

        statusCode = NOT_FOUND;
    }
    else {
        try {
            const songWithUrl = await fetchSpotifySong(token, song);
    
            if (songWithUrl) {
    
                response = resultMessage(
                    true, 
                    OK, 
                    `Song found`,
                    songWithUrl
                )
    
                statusCode = OK;
            }
            else {
    
                response = resultMessage(
                    false,
                    NOT_FOUND,
                    "Song not found in spotify",
                    song
                );
    
                statusCode = NOT_FOUND;
            }
        }
        catch(error) {
                    
            response = resultMessage(
                false, 
                GATEWAY_TIMEOUT,
                `Spotify server are busy and song cannot be fetched at the moment`,
                song
            );
    
            statusCode = GATEWAY_TIMEOUT;
        }
    }

    res
    .status(statusCode)
    .json(response);
};