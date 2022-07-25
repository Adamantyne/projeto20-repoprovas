import Joi from "joi";
export var signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required()
});
export var signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
