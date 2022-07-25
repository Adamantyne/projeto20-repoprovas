import supertest from "supertest";
import app from "../src/app.js";

import db from "../src/config/database.js";
import authFactory from "./factories/authFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
  await db.$executeRaw`TRUNCATE TABLE users;`;
});

describe("geral tests", () => {
  it("(non-existent page) should answer with status 404", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

describe("sign up tests", () => {
  it("should answer with status 422 when trying to create an invalid user", async () => {
    const response = await authFactory.signUp(authFactory.invalidSignUpData);
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 201 when trying to create a valid user", async () => {
    const response = await authFactory.signUp(authFactory.defaultSignUpData);
    expect(response.statusCode).toEqual(201);
  });

  it("should answer with status 409 when trying to create a already existing user", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    const response = await authFactory.signUp(authFactory.defaultSignUpData);
    expect(response.statusCode).toEqual(409);
  });
});

describe("sign in tests", () => {
  it("should answer with status 422 when trying to sign in with invalid input values", async () => {
    const response = await authFactory.signIn(authFactory.invalidSignInData);
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 401 when trying to sign in with not existing user", async () => {
    const response = await authFactory.signIn(authFactory.defaultSignInData);
    expect(response.statusCode).toEqual(401);
  });

  it("should answer with status 201 when trying to sign in with a valid user", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    const response = await authFactory.signIn(authFactory.defaultSignInData);
    expect(response.statusCode).toEqual(201);
  });
});

describe("get/post tests", () => {
  it("should answer with status 401 when trying to get categories without a valid token", async () => {
    const invalidToken = "response.body.token";
    const response = await testFactory.getCategories(invalidToken);
    expect(response.statusCode).toEqual(401);
  });

  it("should answer with status 200 when trying to get categories with a valid token", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.getCategories(token);
    expect(response.statusCode).toEqual(200);
  });

  it("should answer with status 422 when trying to post a test with invalid input values", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.postTest(token);
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 201 when trying to post a test with valid input values", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.postTest(token, testFactory.defaultTestData);
    expect(response.statusCode).toEqual(201);
  });

  it("should answer with status 200 when trying to get tests group by disciplines", async () => {
    const groupBy = "disciplines";
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.getTests(token, groupBy);
    expect(response.statusCode).toEqual(200);
  });

  it("should answer with status 200 when trying to get tests group by teachers", async () => {
    const groupBy = "teachers";
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.getTests(token, groupBy);
    expect(response.statusCode).toEqual(200);
  });

  it("should answer with status 422 when trying to get tests with invalid 'groupBy' value", async () => {
    const groupBy = "invalid";
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.getTests(token, groupBy);
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 422 when trying to get tests without 'groupBy' value", async () => {
    await authFactory.signUp(authFactory.defaultSignUpData);
    let response = await authFactory.signIn(authFactory.defaultSignInData);
    const token: string = response.body.token;
    response = await testFactory.getTests(token);
    expect(response.statusCode).toEqual(422);
  });
});

afterAll(async () => {
  await db.$executeRaw`DROP TABLE IF EXISTS users,categories,disciplines,teachers,"teachersDisciplines",terms,tests,"_prisma_migrations";`;
  await db.$disconnect();
});
