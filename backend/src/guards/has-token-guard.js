import fetch from "node-fetch";

import { SETTINGS } from "../settings";

import { getStoredTokenMetadata } from "../utilis"



export const hasTokenGuard = async (req, _, next) => {

    const token = getStoredTokenMetadata(req);

    const hasStoredToken = !!token;

    if (hasStoredToken) {
        
        const hasExpired = hasTokenExpired(req);

        if (hasExpired) {
            
            await fetchAndStoreTokenAndExpireDate(req);
        }
    }
    else if (!hasStoredToken) {
        
        await fetchAndStoreTokenAndExpireDate(req);
    }

    next();
};

function hasTokenExpired(req) {

    const { expireDate } = getStoredTokenMetadata(req);

    return expireDate <= (Date.now() / 1000);
};

async function fetchAndStoreTokenAndExpireDate(req) {

    const token = await fetchToken();

    storeTokenAndExpireDate(req, token);
};

function storeTokenAndExpireDate(req, token) {

    let storedToken = addDefaultStoredTokenIfDoesNotExist(req)

    storedToken.token = token;

    const expireDate = createExpireDate(token);

    storedToken.expireDate = expireDate;
};

function addDefaultStoredTokenIfDoesNotExist(req) {
    
    let storedToken = getStoredTokenMetadata(req);

    if (!storedToken) {

        req.app.locals.tokenMetadata = {};

        storedToken = getStoredTokenMetadata(req);
    }

    return storedToken;
};

function createExpireDate(token) {
    
    const { expires_in } = token;

    const expireDate = (Date.now() / 1000) + expires_in;

    return expireDate;
};


const SPOTIFY_TOKEN_URL = `${SETTINGS.SPOTIFY_AUTH}api/token`;

const CLIENT_ID_AND_SECRET = `${SETTINGS.SPOTIFY_CLIENT_ID}:${SETTINGS.SPOTIFY_CLIENT_SECRET}`;

const CLIENT_ID_AND_SECRET_IN_BASE_64 = Buffer.from(CLIENT_ID_AND_SECRET).toString("base64");

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