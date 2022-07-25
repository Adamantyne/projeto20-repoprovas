import { Router } from "express";

import authValidator from "../middlewares/authValidator.js";
import { postTestMiddleware } from "../middlewares/testMiddleware.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { postTestSchema } from "../schemas/testSchemas.js";
import { postTest,getCategories,getTests } from "../controllers/testController.js";

const testsRouter = Router();

testsRouter.get("/categories",authValidator,getCategories)
testsRouter.post("/tests",authValidator,schemaValidator(postTestSchema),postTestMiddleware,postTest);
testsRouter.get("/tests",authValidator,getTests);

export default testsRouter;