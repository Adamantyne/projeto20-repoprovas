import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";

import { SignUpInput } from "../schemas/authSchemas.js";

async function createUser({ email, password }: SignUpInput) {
  const sault = 10;
  const encryptedPassword = bcrypt.hashSync(password, sault);
  const insertUserData = { email, password: encryptedPassword };
  await userRepository.insertUser(insertUserData);
}

const authServices = { createUser };
export default authServices;
