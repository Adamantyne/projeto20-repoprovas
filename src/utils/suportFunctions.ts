import jwt from "jsonwebtoken";
//import Cryptr from "cryptr";
import dotenv from "dotenv";

import userRepository from "../repositories/userRepository.js";

interface JWTData {
  email: string;
  id: number;
}

dotenv.config();
//const cryptr = new Cryptr(process.env.CRYPTER_CODE);

const JWTDataValidate = (input: object | string): input is JWTData => {
  return typeof input === "object" && "email" && "id" in input;
};

export function throwErr(
  type: "conflict" | "not_found" | "unauthorized" | "unprocessable_entity",
  message: string
) {
  throw { type, message };
}

export function createToken(data: {email:string,id:number}) {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export function validateToken(token: string) {
  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    if (JWTDataValidate(jwtData) && jwtData.email && jwtData.id) {
      return jwtData;
    }else{
      throwErr("unauthorized", "Invalid Token");
    }
  } catch (error) {
    throwErr("unauthorized", "Invalid Token");
  }
}

export async function validateUser(email: string, id?: number) {
  const errorMessage = "unregistered email/token";
  if (id) {
    const validUser = await userRepository.findByEmailAndId(email, id);
    if (!validUser) {
      throwErr("unauthorized", errorMessage);
    }
    return validUser;
  } else {
    const validUser = await userRepository.findByEmail(email);
    if (!validUser) {
      throwErr("unauthorized", errorMessage);
    }
    return validUser;
  }
}

// export function decryptString(encryptedString:string){
//   return cryptr.decrypt(encryptedString);
// }

// export function encryptString(string:string){
//   return cryptr.encrypt(string);
// }
