import db from "../config/database.js";

import { SignInInput } from "../schemas/authSchemas.js";

async function findByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

async function findByEmailAndId(email: string,id:number) {
  return await db.user.findFirst({ where: { email,id } });
}

async function insertUser(inputData: SignInInput) {
  return await db.user.create({ data: inputData });
}

const userRepository = {
  findByEmail,
  insertUser,
  findByEmailAndId
};
export default userRepository;
