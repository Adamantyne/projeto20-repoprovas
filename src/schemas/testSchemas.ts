import Joi, { string } from "joi";
import { Test, teacherDisciplines } from "@prisma/client";

interface testData extends Test {
  discipline: string;
  teacher: string;
  category: string;
}

export type TestInput = Omit<
  testData,
  "id" | "teacherDisciplineId" | "categoryId"
>;
export type CreationTestData = Omit<Test, "id">;
export type TeacherDisciplineObj = Omit<teacherDisciplines, "id">;

export const postTestSchema = Joi.object<TestInput>({
  discipline: Joi.string().required(),
  teacher: Joi.string().required(),
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  category: Joi.string().required(),
});
