import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";



const app = express();

//app.use(json());

//app.use(rootRouter);

app.use("/", function(req, res){
    res.send("Hej på dig mohammeeeeed")
})

app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));