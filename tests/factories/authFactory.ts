import supertest from "supertest";

import { SignInInput,SignUpInput } from "../../src/schemas/authSchemas.js";
import app from "../../src/app.js";
import db from "../../src/config/database.js";

const defaultSignUpData = {
  email: "1@gmail.com",
  password: "1",
  repeatPassword: "1",
};
const invalidSignUpData = {
  email: "invalid",
  password: "",
  repeatPassword: "",
};

const defaultSignInData = {
  email: "1@gmail.com",
  password: "1",
};
const invalidSignInData = {
  email: "invalid",
  password: "",
};

async function signUp(body:SignUpInput) {
  const response = await supertest(app).post("/sign-up").send(body);
  return response;
}

async function signIn(body:SignInInput) {
  const response = await supertest(app).post("/sign-in").send(body);
  return response;
}

const authFactory = { defaultSignUpData,invalidSignUpData,defaultSignInData,invalidSignInData,signUp, signIn };
export default authFactory;
