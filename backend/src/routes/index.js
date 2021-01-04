/**
 * All the code and files here are used for specifing the url resources for the server
 */

import { Router } from "express";

import { 
    pageNotFoundController,
    internalServerErrorController
}
from "../controllers/index";

import { apiRouter } from "./api";



export const rootRouter = Router();

rootRouter.use("/api", apiRouter);

rootRouter.use(pageNotFoundController);

rootRouter.use(internalServerErrorController);