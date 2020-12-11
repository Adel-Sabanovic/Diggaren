import express from "express";

import { rootRouter } from "./routes";


const app = express();

const port = 8000;

app.use(rootRouter);

app.listen(port, () => console.log("server started"));