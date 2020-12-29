import { Request, Response, NextFunction } from "express";

import fetch from "node-fetch";

import { SETTINGS } from "../settings";

import { 
    getStoredTokenMetadata, 
    setStoredTokenMetadata, 
    TokenMetadata,
    Token
}
from "../utilis"


/**
 * A middleware guard that retrieves token and stores it req.app.locals.  
 * If the spotify token cannot be retrievied than an error will be thrown
 * 
 * @param { Request } req 
 * 
 * @param { Response } _ 
 * 
 * @param { NextFunction } next 
 */
export const hasTokenGuard = async (req, _, next) => {

    const token = getStoredTokenMetadata(req);

    const hasStoredToken = !!token;

    if (hasStoredToken) {
        
        const hasExpired = hasTokenExpired(req);

        if (hasExpired) {

            await fetchTokenMetadataAndStoreIt(req);
        }
    }
    else if (!hasStoredToken) {

        await fetchTokenMetadataAndStoreIt(req);
    }
    else {

        throw new Error("Unable to connect with spotify api");
    }

    next();
};

/**
 * Checkes if the stored spotify token has expired
 * 
 * @param { Request } req 
 * 
 * @returns { boolean }
 */
function hasTokenExpired(req) {

    const { expireDate } = getStoredTokenMetadata(req);

    return expireDate < Date.now();
};

/**
 * The functions fetches a token in order to create a token metadata that is stored locally
 * 
 * @param { Request } req 
 * 
 * @returns { Promise<void> }
 */
async function fetchTokenMetadataAndStoreIt(req) {

    const tokenMetadata = await createTokenMetadata(req);

    setStoredTokenMetadata(req, tokenMetadata);
}

/**
 * Creates token metadata
 * 
 * @returns { Promise<TokenMetadata> } Token metadata
 */
async function createTokenMetadata() {
    
    const token = await fetchToken();

    const expireDate = createExpireDate(token);

    return {
        token,
        expireDate
    }
}

/**
 * Creates expire date that is actually an unix timestamp + expire_in prop from token
 * 
 * @param { Token } token 
 * 
 * @returns { number } unix timestamp
 */
function createExpireDate(token) {

    const { expires_in } = token;
    
    const expireDate = Date.now() + expires_in * 1000;
    
    return expireDate;
};



const SPOTIFY_TOKEN_URL = `${SETTINGS.SPOTIFY_AUTH}api/token`;

const CLIENT_ID_AND_SECRET = `${SETTINGS.SPOTIFY_CLIENT_ID}:${SETTINGS.SPOTIFY_CLIENT_SECRET}`;

const CLIENT_ID_AND_SECRET_IN_BASE_64 = Buffer.from(CLIENT_ID_AND_SECRET).toString("base64");

/**
 * Fetches the spotify token
 * 
 * @returns { Promise<Token> } Token
 */
async function fetchToken() {

    const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        body: "grant_type=client_credentials",
        redirect: 'follow',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${CLIENT_ID_AND_SECRET_IN_BASE_64}`
        }
    });

    const json = await response.json();

    return json;
};