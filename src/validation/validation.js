const Joi = require('@hapi/joi');

const singUpValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
    });
    // Validate the date
    return schema.validate(data)

}

const singInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
    });
    // Validate the date
    return schema.validate(data)

}

module.exports.singUpValidation = singUpValidation;
module.exports.singInValidation = singInValidation;