import { Router } from "express";

import { currentPlayingSongController, getAllChannels } from "../controllers/index";

import { currentPlayingSongParamsGuard } from "../guards";

import { hasTokenGuard } from "../guards"



export const apiRouter = Router();

apiRouter.use(hasTokenGuard);

apiRouter.get("/channel/:channelName", currentPlayingSongParamsGuard, currentPlayingSongController);

apiRouter.get("/all-channels", getAllChannels)