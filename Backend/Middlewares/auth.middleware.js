const jwt = require('jsonwebtoken');
require('dotenv').config();

class auth_middleware {
    
    authenticate(req, res, next) {
        try {
            console.log("FILE: auth.middleware.js | authenticate | Authentication request received");
            
            const auth_header = req.headers.authorization;

            if (!auth_header || !auth_header.startsWith('Bearer ')) {
                console.log("FILE: auth.middleware.js | authenticate | No token provided");
                return res.status(401).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "AUTH_ERROR",
                    ERROR_CODE: "VTAPP-AUTH001",
                    ERROR_DESCRIPTION: "Unauthorized - No token provided"
                });
            }

            const token = auth_header.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decoded;
            console.log(`FILE: auth.middleware.js | authenticate | User authenticated: ${decoded.id}`);
            next();

        } catch (error) {
            console.error("FILE: auth.middleware.js | authenticate | Authentication failed:", error);
            
            return res.status(401).json({
                STATUS: "ERROR",
                ERROR_FILTER: "AUTH_ERROR",
                ERROR_CODE: "VTAPP-AUTH002",
                ERROR_DESCRIPTION: "Unauthorized - Invalid token"
            });
        }
    }

    authorize_roles(...allowed_roles) {
        return (req, res, next) => {
            try {
                console.log(`FILE: auth.middleware.js | authorize_roles | Checking roles for user: ${req.user.id}`);
                
                if (!req.user) {
                    return res.status(401).json({
                        STATUS: "ERROR",
                        ERROR_FILTER: "AUTH_ERROR",
                        ERROR_CODE: "VTAPP-AUTH003",
                        ERROR_DESCRIPTION: "User not authenticated"
                    });
                }

                if (req.user.role && allowed_roles.includes(req.user.role)) {
                    console.log(`FILE: auth.middleware.js | authorize_roles | User authorized with role: ${req.user.role}`);
                    next();
                } else {
                    console.log(`FILE: auth.middleware.js | authorize_roles | User not authorized. Required roles: ${allowed_roles.join(', ')}`);
                    return res.status(403).json({
                        STATUS: "ERROR",
                        ERROR_FILTER: "AUTH_ERROR",
                        ERROR_CODE: "VTAPP-AUTH004",
                        ERROR_DESCRIPTION: "Insufficient permissions"
                    });
                }
            } catch (error) {
                console.error("FILE: auth.middleware.js | authorize_roles | Authorization error:", error);
                
                return res.status(500).json({
                    STATUS: "ERROR",
                    ERROR_FILTER: "TECHNICAL_ISSUE",
                    ERROR_CODE: "VTAPP-AUTH005",
                    ERROR_DESCRIPTION: "Authorization check failed"
                });
            }
        };
    }
}

module.exports = new auth_middleware();