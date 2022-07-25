import { Router } from "express";
import authRouter from "./authRouter.js";
import testsRouter from "./testRouter.js";
var routers = Router();
routers.use(authRouter);
routers.use(testsRouter);
export default routers;
