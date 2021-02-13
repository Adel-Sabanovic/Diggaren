import { Request, Response, NextFunction } from "express";

import { 
    resultMessage,
    fetchAllChannels,
} 
from "../utilis";

import { OK } from "http-status";



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

    const response = resultMessage(
        true,
        OK,
        "Fetching all channels succeeded",
        allChannels
    );

    res
    .status(OK)
    .json(response)
};