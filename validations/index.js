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

const updateValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional(),

    password: Joi.string()
        .alphanum()
        .not('')
        .min(8)
        .max(15)
        .optional(),

    checkPass: Joi.optional(),
    address: Joi.string().not('').optional(),
    phone: Joi.string().not('').optional(),
    name: Joi.string().not('').optional(),
})

const addNewAddressValidation = joi.object({
    address: joi.string().required().not(""),
    addressName: joi.string().required().not(""),
    name: joi.string().required().not(""),
});
module.exports = {
    addNewAddressValidation,
    signupValidation,
    updateValidation
};
