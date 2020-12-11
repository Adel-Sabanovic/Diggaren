import express from "express";

import { rootRouter } from "./routes";

import { json } from "body-parser"


const app = express();

const port = 8000;

app.use(json());

app.use(rootRouter);

app.listen(port, () => console.log("server started"));