import db from "../config/database.js";
import {
  CreationTestData,
  TeacherDisciplineObj,
} from "../schemas/testSchemas.js";

async function findCategories() {
  return await db.category.findMany({});
}

async function findCategoryByName(name: string) {
  return await db.category.findUnique({ where: { name } });
}
async function findTeacherByName(name: string) {
  return await db.teacher.findUnique({ where: { name } });
}
async function findTeacherById(id: number) {
  return await db.teacher.findUnique({ where: { id } });
}
async function findDisciplineByName(name: string) {
  return await db.discipline.findUnique({ where: { name } });
}
async function findTeacherDiscipline(obj: TeacherDisciplineObj) {
  return await db.teacherDisciplines.findFirst({ where: obj });
}
async function findTests(obj: TeacherDisciplineObj) {
  return await db.teacherDisciplines.findFirst({ where: obj });
}
async function createTest(obj: CreationTestData) {
  return await db.test.create({ data: obj });
}
async function findDisciplinesByTermId(termId: number) {
  const tests = await db.discipline.findMany({
    where: {
      termId,
    },
    select: {
      id: true,
      name: true,
      term: {
        select: {
          id: true,
          number: true,
        },
      },
      teacherDisciplines: {
        select: {
          id: true,
          discipline: {
            select: {
              name: true,
              id:true,
              term:true
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
            },
          },
          tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}

async function findDisciplines(termId: number) {
  const tests = await db.discipline.findMany({
    select: {
      id: true,
      name: true,
      term: {
        select: {
          id: true,
          number: true,
        },
      },
      teacherDisciplines: {
        select: {
          id: true,
          discipline: {
            select: {
              name: true,
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
            },
          },
          tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}

async function findTerms() {
  return await db.term.findMany({});
}
async function findTeacherDisciplines() {
  return await db.teacherDisciplines.findMany({
    select: {
      id: true,
      disciplineId:true,
      discipline:{
        select:{
          name:true,
          id:true,
          term:true
        }
      },
      tests: {
        select: {
          id: true,
          name: true,
          pdfUrl: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

const testRepository = {
  findCategoryByName,
  findTeacherDiscipline,
  findDisciplineByName,
  findTeacherByName,
  createTest,
  findCategories,
  findDisciplinesByTermId,
  findDisciplines,
  findTerms,
  findTeacherDisciplines,
};
export default testRepository;
