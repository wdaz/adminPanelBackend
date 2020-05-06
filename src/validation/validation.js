const Joi = require('@hapi/joi');

const userValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
        phoneNumber: Joi.string()
            .min(13)
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

module.exports.userValidation = userValidation;
module.exports.singInValidation = singInValidation;