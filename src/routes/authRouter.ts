import { Router } from "express";

import schemaValidator from "../middlewares/schemaValidator.js";
import { signUpSchema,signInSchema } from "../schemas/authSchemas.js";
import {
  signUpMiddleware,
  signInMiddleware,
} from "../middlewares/authMiddleware.js";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post(
  "/signUp",
  schemaValidator(signUpSchema),
  signUpMiddleware,
  signUp
);
authRouter.post(
  "/signIn",
  schemaValidator(signInSchema),
  signInMiddleware,
  signIn
);

export default authRouter;
