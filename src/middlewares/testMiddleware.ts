import { NextFunction, Request, Response } from "express";

import { TestInput, CreationTestData } from "../schemas/testSchemas";
import testService from "../services/testServices.js";

export async function postTestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const testData: TestInput = req.body;
  const { name, pdfUrl } = testData;
  const { teacherDisciplineId, categoryId } =
    await testService.validateTestData(testData);

  const creationTestData: CreationTestData = {
    name,
    pdfUrl,
    teacherDisciplineId,
    categoryId,
  };

  res.locals.creationTestData = creationTestData;
  next();
}
