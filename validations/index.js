const joi = require("joi");
const Joi = require("joi");

const signupValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .alphanum()
        .not('')
        .min(8)
        .max(15)
        .required(),

    confirm: Joi.equal(Joi.ref('password')).messages({
        'any.only': '비밀번호가 일치하지 않습니다.'
    }),
    address: Joi.string().not('').required(),
    phone: Joi.string().not('').required(),
    name: Joi.string().not('').required(),
});

const addNewAddressValidation = joi.object({
    address: joi.string().required().not(""),
    addressName: joi.string().required().not(""),
    name: joi.string().required().not(""),
});
module.exports = {
    addNewAddressValidation,
    signupValidation,
};
