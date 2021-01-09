import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import cors from "cors";


const app = express();

const corsMiddleware = cors({ origin: "*" });

app.use(corsMiddleware);

app.use(json());

app.use(rootRouter);

app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));