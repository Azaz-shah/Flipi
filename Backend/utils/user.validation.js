const joi = require("joi");

const userCreationSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required()

})
const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required()
})


module.exports = {
    userCreationSchema,
    userLoginSchema
}