import supertest from "supertest";

import { TestInput } from "../../src/schemas/testSchemas.js";
import app from "../../src/app.js";

const defaultTestData = {
  discipline: "JavaScript",
  teacher: "Diego Pinho",
  name: "a",
  pdfUrl: "a",
  category: "Projeto",
};

async function getCategories(token: string) {
  const response = await supertest(app)
    .get("/categories")
    .set("Authorization", token);
  return response;
}

async function postTest(token: string, obj?: TestInput) {
  if (obj) {
    return await supertest(app)
      .post("/tests")
      .send(obj)
      .set("Authorization", token);
  }
  return await supertest(app)
    .post("/tests")
    .send({ invalidTestData: "invalid" })
    .set("Authorization", token);
} 

async function getTests(token: string, groupBy?: string) {
  return await supertest(app)
    .get(`/tests?groupBy=${groupBy}`)
    .set("Authorization", token);
}

const testFactory = { defaultTestData, getCategories, postTest,getTests };
export default testFactory;
