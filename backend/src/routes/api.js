import { Router } from "express";

import { currentPlayingSongController } from "../controllers/index";

import { currentPlayingSongParamsGuard } from "../guards";

import { hasTokenGuard } from "../guards"



export const apiRouter = Router();

apiRouter.use(hasTokenGuard);

apiRouter.get("/channel/:channelName", currentPlayingSongParamsGuard, currentPlayingSongController);