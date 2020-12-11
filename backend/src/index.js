import express from "express";

import { rootRouter } from "./routes";

import { json } from "body-parser";

import { config } from "dotenv";

config();



const app = express();

app.use(json());

app.use(rootRouter);

app.listen(process.env.PORT, () => console.log(`server started at http://localhost:${process.env.PORT}/`));