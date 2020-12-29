export function getStoredTokenMetadata(req) {
    
    return req.app.locals.tokenMetadata;
};