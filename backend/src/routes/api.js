import { Router } from "express";

import { currentPlayingSongController, getAllChannels } from "../controllers/index";

import { hasTokenGuard } from "../guards"



export const apiRouter = Router();

apiRouter.use(hasTokenGuard);

apiRouter.get("/channel/:channelName", currentPlayingSongController);

apiRouter.get("/all-channels", getAllChannels)