import { NextFunction, Request, Response } from "express";

import { throwErr, validateToken, validateUser } from "../utils/suportFunctions.js";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer", "")?.trim();
  if (!token) {
    throwErr("unauthorized", "You must be logged in to do this.");
  }
  const jwtData = validateToken(token);
  const userData = await validateUser(jwtData.email,jwtData.id);
  res.locals.userEmail = userData.email;
  next();
}
