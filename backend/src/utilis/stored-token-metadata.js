import { Request } from "express";



/**
 * @typedef {{ 
 *  access_token: string;
 *  token_type: string;
 *  expires_in: number;
 *  scope: string;
 * }} Token - Is actually the spotify token 
 */

/**
 * @typedef {{
 *  token: Token;
 *  expireDate: number;
 * }} TokenMetadata - Is the spotify token with an expire date
 */

/**
 * Retrieves the token metadata from locally in req.app.locals
 * 
 * @param { Request } req 
 * 
 * @returns { TokenMetadata } Token metadata
 */
export function getStoredTokenMetadata(req) {

    return req.app.locals.tokenMetadata;
};

/**
 * Sets (stores) the value of the token metadata locally in req.app.locals
 * 
 * @param { Request } req 
 * 
 * @param { TokenMetadata } tokenMetadata 
 * 
 * @returns { void }
 */
export function setStoredTokenMetadata(req, tokenMetadata) {

    req.app.locals.tokenMetadata = tokenMetadata;
};