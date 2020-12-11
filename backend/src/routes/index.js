import { Router } from "express";

import { 
    pageNotFoundController,
    internalServerErrorController
}
from "../controllers/index";



export const rootRouter = Router();

rootRouter.use("/", pageNotFoundController);

rootRouter.use("/", internalServerErrorController);