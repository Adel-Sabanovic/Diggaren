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

import { currentPlayingSongQueryGuard } from "../guards"



export const rootRouter = Router();

rootRouter.get("/current-playing-song", currentPlayingSongQueryGuard, currentPlayingSongController);

rootRouter.use("/", pageNotFoundController);

rootRouter.use("/", internalServerErrorController);