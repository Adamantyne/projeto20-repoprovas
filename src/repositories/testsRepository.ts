import db from "../config/database.js";
import { CreationTestData, TeacherDisciplineObj } from "../schemas/testSchemas.js";

async function getCategories() {
  return await db.category.findMany({});
}

async function findCategoryByName(name: string) {
  return await db.category.findUnique({ where: { name } });
}
async function findTeacherByName(name: string) {
  return await db.teacher.findUnique({ where: { name } });
}
async function findDisciplineByName(name: string) {
  return await db.discipline.findUnique({ where: { name } });
}
async function findTeacherDiscipline(obj: TeacherDisciplineObj) {
  return await db.teacherDiscipline.findFirst({ where: obj });
}
async function createTest(obj: CreationTestData) {
  return await db.test.create({data:obj});
}

const testRepository = {
  findCategoryByName,
  findTeacherDiscipline,
  findDisciplineByName,
  findTeacherByName,
  createTest,
  getCategories
};
export default testRepository;
