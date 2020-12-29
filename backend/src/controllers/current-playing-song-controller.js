import { Request, Response, NextFunction } from "express";

import { fetchCurrentPlayingSong, getStoredTokenMetadata } from "../utilis"

/**
 * 
 * @param { Request } req
 * 
 * @param { Response } res 
 * 
 * @param { NextFunction } next 
 */
export const currentPlayingSongController = async (req, res, next) => {
    
    const { channel } = req.query;

    const { title, artist } = await fetchCurrentPlayingSong(channel);

    const { token } = getStoredTokenMetadata(req);
};