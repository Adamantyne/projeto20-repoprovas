import Joi from "joi";
export var postTestSchema = Joi.object({
    discipline: Joi.string().required(),
    teacher: Joi.string().required(),
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string().required()
});
