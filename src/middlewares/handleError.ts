import { NextFunction, Request, Response } from "express";

export default async function handleError(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type) {
    const code = errorTypeToStatusCode[err.type];
    const standardError = 400;
    return res.status(code ? code : standardError).send(err.message);
  }
  return res.status(500).send(err.message);
}

const errorTypeToStatusCode = {
  "conflict": 409,
  "not_found": 404,
  "unauthorized": 401,
  "unprocessable_entity": 422,
};
