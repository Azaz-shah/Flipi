const joi = require("joi");

const user_creation_schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required()
});

const user_login_schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required()
});

const password_reset_request_schema = joi.object({
    email: joi.string().email().required()
});

const password_reset_schema = joi.object({
    token: joi.string().required(),
    new_password: joi.string().min(8).max(30).required()
});

module.exports = {
    user_creation_schema,
    user_login_schema,
    password_reset_request_schema,
    password_reset_schema
};