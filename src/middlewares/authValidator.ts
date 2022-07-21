import { NextFunction, Request, Response } from "express";

//import { throwErr, validateToken } from "../utils/suportFunctions.js";
import { throwErr } from "../utils/suportFunctions.js";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer","")?.trim();
  if (!token) {
    throwErr("unauthorized", "You must be logged in to do this.");
  }
  //const userEmail = validateToken(token);
  //res.locals.userEmail = userEmail;
  next();
}
