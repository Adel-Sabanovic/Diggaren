import { Router } from "express";

import { rootController } from "../controllers/index";



export const rootRouter = Router();

rootRouter.use("/", rootController);