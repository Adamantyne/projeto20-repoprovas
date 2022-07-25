export default function schemaValidator(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            console.log(validation.error.message);
            return res.status(422).send({ error: validation.error.message });
        }
        next();
    };
}
