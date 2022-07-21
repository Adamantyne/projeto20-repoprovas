//import jwt from "jsonwebtoken";
//import Cryptr from "cryptr";
import dotenv from "dotenv";

interface JWTData {
  email: string;
  id: number
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

// export function createToken(data: {}) {
//   const token = jwt.sign(data, process.env.JWT_SECRET);
//   return token;
// }

// export function validateToken(token: string) {
//   try {
//     const jwtData = jwt.verify(token, process.env.JWT_SECRET);
//     if (JWTDataValidate(jwtData)) {
//       return jwtData.email;
//     }
//   } catch (error) {
//     throwErr("unauthorized","Invalid Token");
//   }
// }

// export function decryptString(encryptedString:string){
//   return cryptr.decrypt(encryptedString);
// }

// export function encryptString(string:string){
//   return cryptr.encrypt(string);
// }

