import { User } from "@prisma/client";
import { Request, Response } from "express";

import { SignUpInput } from "../schemas/authSchemas.js";
import authServices from "../services/authServices.js";
import { createToken } from "../utils/suportFunctions.js";

export async function signIn(req:Request,res:Response) {
    const { email, id }:User = res.locals.userData;
    const token = createToken({ email, id });
    res.status(201).send({token});
}

export async function signUp(req:Request,res:Response) {
    const inputData:SignUpInput = req.body;
    await authServices.createUser(inputData);
    res.sendStatus(201);
}