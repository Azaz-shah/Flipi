const user_service = require('../services/user.service');

class user_controller {
    
    async create_user(req, res) {
        try {
            console.log("FILE: user.controller.js | create_user | Request received");
            
            const user_data = req.body;
            const result = await user_service.create_user(user_data);
            
            return res.status(201).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { user: result }
            });
        } catch (error) {
            console.error("FILE: user.controller.js | create_user | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "VALIDATION_ERROR",
                ERROR_CODE: "VTAPP-USR001",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async login_user(req, res) {
        try {
            console.log("FILE: user.controller.js | login_user | Request received");
            
            const login_data = req.body;
            const result = await user_service.authenticate_user(login_data);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: result
            });
        } catch (error) {
            console.error("FILE: user.controller.js | login_user | Error:", error);
            
            return res.status(401).json({
                STATUS: "ERROR",
                ERROR_FILTER: "AUTH_ERROR",
                ERROR_CODE: "VTAPP-USR002",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_all_users(req, res) {
        try {
            console.log("FILE: user.controller.js | get_all_users | Request received");
            
            const users = await user_service.get_all_users();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { users }
            });
        } catch (error) {
            console.error("FILE: user.controller.js | get_all_users | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-USR003",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_user_by_id(req, res) {
        try {
            console.log("FILE: user.controller.js | get_user_by_id | Request received");
            
            const { id } = req.params;
            const user = await user_service.get_user_by_id(id);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { user }
            });
        } catch (error) {
            console.error("FILE: user.controller.js | get_user_by_id | Error:", error);
            
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_FILTER: "INVALID_REQUEST",
                ERROR_CODE: "VTAPP-USR004",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async forget_password(req, res) {
        try {
            console.log("FILE: user.controller.js | forget_password | Request received");
            
            const { email } = req.body;
            const result = await user_service.initiate_password_reset(email);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: result
            });
        } catch (error) {
            console.error("FILE: user.controller.js | forget_password | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "INVALID_REQUEST",
                ERROR_CODE: "VTAPP-USR005",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async reset_password(req, res) {
        try {
            console.log("FILE: user.controller.js | reset_password | Request received");
            
            const reset_data = req.body;
            const result = await user_service.reset_password(reset_data);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: result
            });
        } catch (error) {
            console.error("FILE: user.controller.js | reset_password | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "INVALID_REQUEST",
                ERROR_CODE: "VTAPP-USR006",
                ERROR_DESCRIPTION: error.message
            });
        }
    }
}

module.exports = new user_controller();