import { Router } from "express";
import authRouter from "./authRouter.js";
import testsRouter from "./testRouter.js";

const routers = Router();

routers.use(authRouter);
routers.use(testsRouter);

export default routers;