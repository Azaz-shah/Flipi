const { userCreationSchema, userLoginSchema } = require("../utils/user.validation");

const validateUserCreation = (req, res, next) => {
    const { error } = userCreationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message
        });
    }
    next();
};

const validateUserLogin = (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message
        });
    }
    next();
};

module.exports = {
    validateUserCreation,
    validateUserLogin
};