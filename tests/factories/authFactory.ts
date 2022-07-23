import supertest from "supertest";

import { SignInInput,SignUpInput } from "../../src/schemas/authSchemas.js";
import app from "../../src/app.js";
import db from "../../src/config/database.js";

async function signUp(body:SignUpInput) {
  const response = await supertest(app).post("/signUp").send(body);
  return response;
}

async function signIn(body:SignInInput) {
  const response = await supertest(app).post("/signIn").send(body);
  return response;
}

async function signOut(token?: string) {
  const response = await supertest(app)
    .get("/signOut")
    .set("Authorization", token);
  return response;
}

const authFactory = { signUp, signIn, signOut };
export default authFactory;
