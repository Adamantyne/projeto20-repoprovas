import Joi, { string } from "joi";
import { User } from "@prisma/client";

interface userData extends User{
  repeatPassword: string
}

export type SignUpInput = Omit<userData, "id">;
export type SignInInput = Omit<userData, "id"|"repeatPassword">;

export const signUpSchema = Joi.object<SignUpInput>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const signInSchema = Joi.object<SignInInput>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
