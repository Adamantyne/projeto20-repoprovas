import {  Request, Response } from "express";

import { CreationTestData } from "../schemas/testSchemas.js";
import testRepository from "../repositories/testsRepository.js";

export async function getCategories(req: Request,res: Response) {
    const categories = await testRepository.getCategories();
    return res.status(200).send(categories);
}

export async function postTest(req: Request,res: Response) {
    const creationTestData:CreationTestData = res.locals.creationTestData;
    await testRepository.createTest(creationTestData);
    res.sendStatus(201);
}