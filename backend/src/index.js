import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import { hasTokenGuard } from "./guards";



const app = express();

app.use(json());

app.use(hasTokenGuard);

app.use(rootRouter);

app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));