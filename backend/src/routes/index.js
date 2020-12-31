/**
 * All the code and files here are used for specifing the url resources for the server
 */

import { Router } from "express";

import { 
    pageNotFoundController,
    internalServerErrorController,
    currentPlayingSongController
}
from "../controllers/index";

import { currentPlayingSongParamsGuard } from "../guards"



export const rootRouter = Router();

rootRouter.get("/channel/:channelName", currentPlayingSongParamsGuard, currentPlayingSongController);

rootRouter.use("/", pageNotFoundController);

rootRouter.use("/", internalServerErrorController);