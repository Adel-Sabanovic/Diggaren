import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import { hasTokenGuard } from "./guards";

import { getStoredTokenMetadata } from "./utilis";

import {fetchCurrentPlayingSong, searchSpotify} from "./controllers/current-playing-song-controller"; 

// import {searchSpotify} from "./controllers/current-playing-song-controller"; 




const app = express();

app.use(json());

app.use(hasTokenGuard);

app.use((req, res, next) => {

    const access_token = getStoredTokenMetadata(req).token.access_token;

    fetchCurrentPlayingSong("din_gata").then(song => {
        console.log(song);
        searchSpotify(access_token, song.title , song.artist).then(console.log);
        
    });

    res.send("Trying to update spotify token");
});

app.use(rootRouter);

app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));
