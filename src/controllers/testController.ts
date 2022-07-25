import { Request, Response } from "express";

import { CreationTestData } from "../schemas/testSchemas.js";
import testRepository from "../repositories/testsRepository.js";
import testService from "../services/testServices.js";
import { throwErr } from "../utils/suportFunctions.js";

export async function getCategories(req: Request, res: Response) {
  const categories = await testRepository.findCategories();
  return res.status(200).send({categories});
}

export async function postTest(req: Request, res: Response) {
  const creationTestData: CreationTestData = res.locals.creationTestData;
  await testRepository.createTest(creationTestData);
  res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
  const groupByReference = req.query.groupBy;
  if (typeof groupByReference === "string") {
    const tests = await testService.getTests(groupByReference);
    res.status(200).send({tests});
  }
  else{
    throwErr("unprocessable_entity","groupBy must be a string");
  }
}
