const joi = require("joi");

const addNewAddressValidation = joi.object({
    address: joi.string().required().not(""),
    addressName: joi.string().required().not(""),
    name: joi.string().required().not(""),
});
module.exports = {addNewAddressValidation};
