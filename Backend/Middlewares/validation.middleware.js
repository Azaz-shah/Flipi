const { user_creation_schema, user_login_schema, password_reset_request_schema, password_reset_schema } = require("../validations/user.validation");
const { listing_creation_schema, listing_update_schema, listing_filter_schema } = require("../validations/listing.validation");

class validation_middleware {

    validate_user_creation(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_user_creation | Validating user creation data");
            
            const { error } = user_creation_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_user_creation | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL001",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_user_creation | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_user_creation | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL002",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_user_login(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_user_login | Validating user login data");
            
            const { error } = user_login_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_user_login | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL003",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_user_login | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_user_login | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL004",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_password_reset_request(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_password_reset_request | Validating password reset request");
            
            const { error } = password_reset_request_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_password_reset_request | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL005",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_password_reset_request | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_password_reset_request | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL006",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_password_reset(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_password_reset | Validating password reset data");
            
            const { error } = password_reset_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_password_reset | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL007",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_password_reset | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_password_reset | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL008",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_listing_creation(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_listing_creation | Validating listing creation data");
            
            const { error } = listing_creation_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_listing_creation | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL009",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_listing_creation | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_listing_creation | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL010",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_listing_update(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_listing_update | Validating listing update data");
            
            const { error } = listing_update_schema.validate(req.body);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_listing_update | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL011",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_listing_update | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_listing_update | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL012",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }

    validate_listing_filter(req, res, next) {
        try {
            console.log("FILE: validation.middleware.js | validate_listing_filter | Validating listing filter data");
            
            const { error } = listing_filter_schema.validate(req.query);
            if (error) {
                console.log(`FILE: validation.middleware.js | validate_listing_filter | Validation failed: ${error.details[0].message}`);
                return res.status(400).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "VALIDATION_ERROR",
                    ERROR_CODE: "VTAPP-VAL013",
                    ERROR_DESCRIPTION: error.details[0].message
                });
            }
            
            console.log("FILE: validation.middleware.js | validate_listing_filter | Validation passed");
            next();
        } catch (error) {
            console.error("FILE: validation.middleware.js | validate_listing_filter | Validation error:", error);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-VAL014",
                ERROR_DESCRIPTION: "Validation process failed"
            });
        }
    }
}

module.exports = new validation_middleware();