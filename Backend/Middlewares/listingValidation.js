const { userListingSchema } = require("../utils/userListing.validation");

const validateUserListing = (req, res, next) => {
    const { error } = userListingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message
        });
    }
    next();
};

module.exports = {
    validateUserListing
};