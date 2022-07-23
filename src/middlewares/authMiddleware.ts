import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { SignUpInput, SignInInput } from "../schemas/authSchemas.js";
import { throwErr,validateUser } from "../utils/suportFunctions.js";
import userRepository from "../repositories/userRepository.js";
import { User } from "@prisma/client";

export async function signUpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: SignUpInput = req.body;
  const alreadyExist = await userRepository.findByEmail(email);
  if (alreadyExist) {
    throwErr("conflict", "email already registered");
  }
  next();
}

export async function signInMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const inputData: SignInInput = req.body;

  const user:User = await validateUser(inputData.email);

  const validPassword = bcrypt.compareSync(inputData.password, user.password);
  if (!validPassword) {
    throwErr("unauthorized", "incorrect password");
  }

  res.locals.userData = user;
  next();
}
