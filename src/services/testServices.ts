import { TestInput, TeacherDisciplineObj } from "../schemas/testSchemas.js";
import testRepository from "../repositories/testsRepository.js";
import { throwErr } from "../utils/suportFunctions.js";

async function validateTestData({ teacher, discipline, category }: TestInput) {
  const categoryId = await categoryValidate(category);
  const teacherId = await teacherValidate(teacher);
  const disciplineId = await disciplineValidate(discipline);
  const teacherDisciplineId = await teacherDisciplineValidate(
    { teacherId, disciplineId },
    teacher,
    discipline
  );
  return {categoryId,teacherDisciplineId };
}

async function categoryValidate(categoryName: string) {
  const category = await testRepository.findCategoryByName(categoryName);
  if (!category) {
    throwErr("unprocessable_entity", "category not registred");
  }
  return category.id;
}

async function teacherValidate(teacherName: string) {
  const teacher = await testRepository.findTeacherByName(teacherName);
  if (!teacher) {
    throwErr("unprocessable_entity", "teacher not registred");
  }
  return teacher.id;
}

async function disciplineValidate(disciplineName: string) {
  const discipline = await testRepository.findDisciplineByName(disciplineName);
  if (!discipline) {
    throwErr("unprocessable_entity", "discipline not registred");
  }
  return discipline.id;
}

async function teacherDisciplineValidate(
  { teacherId, disciplineId }: TeacherDisciplineObj,
  teacherName: string,
  disciplineName: string
) {
  const teacherDiscipline = await testRepository.findTeacherDiscipline({
    teacherId,
    disciplineId,
  });

  if (!teacherDiscipline) {
    throwErr(
      "unprocessable_entity",
      `discipline "${disciplineName}" doesn't belong to the teacher "${teacherName}"`
    );
  }
  return teacherDiscipline.id;
}

const testService = { validateTestData };
export default testService;
