import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import { hasTokenGuard } from "./guards";

import { getStoredTokenMetadata } from "./utilis";



const app = express();

app.use(json());

app.use(hasTokenGuard);

app.use((req, res, next) => {

    const token = getStoredTokenMetadata(req);

    console.log("token: ", token);

    next();
})

app.use(rootRouter);

app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));