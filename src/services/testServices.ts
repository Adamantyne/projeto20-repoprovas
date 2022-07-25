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
  return { categoryId, teacherDisciplineId };
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

async function getTests(groupByReference: string) {
  if (groupByReference === "disciplines") {
    return getTestsByDisciplines();
  } else if (groupByReference === "teachers") {
    return getTestsByTeachers();
  } else {
    throwErr(
      "unprocessable_entity",
      `value of querystring "groupBy" must be "disciplines" or "teachers"`
    );
  }
}

async function getTestsByDisciplines() {
  const tests = [];
  const terms = await testRepository.findTerms();

  for (let i = 0; i < terms.length; i++) {
    const disciplines = await testRepository.findDisciplinesByTermId(terms[i].number);
    tests.push({ id: terms[i].id, number: terms[i].number, disciplines });
  }

  return tests;
}

async function getTestsByTeachers() {
  //const tests = [];
  const teacherDisciplines = await testRepository.findTeacherDisciplines();
  return teacherDisciplines;

  // for (let i = 0; i < teacherDisciplines.length; i++) {
  //   const disciplines = await testRepository.findDisciplines(
  //     teacherDisciplines[i].disciplineId
  //   );

  //   tests.push({
  //     id: teacherDisciplines[i].id,
  //     discipline: teacherDisciplines[i].discipline,
  //     teacher: teacherDisciplines[i].teacher,
  //     disciplines: disciplines,
  //     tests:teacherDisciplines[i].tests
  //   });
  //}
  //return tests;
}

const testService = { validateTestData, getTests };
export default testService;
