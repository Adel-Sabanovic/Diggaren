import { Request, Response, NextFunction } from "express";

import { 
    fetchSpotifySong,
    fetchCurrentPlayingSong, 
    getStoredTokenMetadata,
    resultMessage,
    fetchAllChannels,
} 
from "../utilis";

import { OK, GATEWAY_TIMEOUT, NOT_FOUND } from "http-status";



/**
 * Retrieves all channels avaible in sveriges radio api
 * 
 * @param { Request } req
 * 
 * @param { Response } res 
 * 
 * @param { NextFunction } next 
 */
export const getAllChannels = async (_, res) => {
    
    const allChannels = Object.keys(await fetchAllChannels());

    res
    .status(200)
    .json(allChannels)
};