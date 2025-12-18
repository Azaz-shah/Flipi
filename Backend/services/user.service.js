const user_data_repository = require('../data_repositories/user.data_repository');
const email_service = require('../utils/email.service');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

class user_service {
    constructor() {
        console.log("FILE: user.service.js | constructor | Service initialized");
    }

    async create_user(user_data) {
        try {
            console.log(`FILE: user.service.js | create_user | Creating user: ${user_data.email}`);
            
            const { name, email, password } = user_data;
            
            if (!name || !email || !password) {
                throw new Error("Please provide all the required fields");
            }

            // Check if user already exists
            const existing_user = await user_data_repository.get_user_by_email(email);
            if (existing_user) {
                throw new Error("User already exists with this email");
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            const new_user_data = {
                name,
                email,
                password: hashed_password
            };

            const user = await user_data_repository.create_user(new_user_data);
            
            // Send welcome email (non-blocking)
            email_service.send_welcome_email(user.email, user.name)
                .catch(error => {
                    console.error(`FILE: user.service.js | create_user | Failed to send welcome email:`, error);
                });
            
            // Remove password from response
            const { password: _, ...user_without_password } = user;
            
            console.log(`FILE: user.service.js | create_user | User created successfully: ${user.id}`);
            return user_without_password;
        } catch (error) {
            console.error(`FILE: user.service.js | create_user | Error:`, error);
            throw error;
        }
    }

    async authenticate_user(login_data) {
        try {
            console.log(`FILE: user.service.js | authenticate_user | Authenticating user: ${login_data.email}`);
            
            const { email, password } = login_data;

            if (!email || !password) {
                throw new Error("Please provide all the required fields");
            }

            const user = await user_data_repository.get_user_by_email(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }

            const is_password_match = await bcrypt.compare(password, user.password);
            if (!is_password_match) {
                throw new Error("Invalid email or password");
            }

            // Generate JWT token
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: "1d" });

            // Remove password from response
            const { password: _, ...user_without_password } = user;

            console.log(`FILE: user.service.js | authenticate_user | User authenticated successfully: ${user.id}`);
            return {
                user: user_without_password,
                token
            };
        } catch (error) {
            console.error(`FILE: user.service.js | authenticate_user | Error:`, error);
            throw error;
        }
    }

    async get_all_users() {
        try {
            console.log("FILE: user.service.js | get_all_users | Fetching all users");
            
            const users = await user_data_repository.get_all_users();
            
            // Remove passwords from response
            const users_without_passwords = users.map(user => {
                const { password, ...user_without_password } = user;
                return user_without_password;
            });

            console.log(`FILE: user.service.js | get_all_users | Retrieved ${users.length} users`);
            return users_without_passwords;
        } catch (error) {
            console.error(`FILE: user.service.js | get_all_users | Error:`, error);
            throw error;
        }
    }

    async get_user_by_id(user_id) {
        try {
            console.log(`FILE: user.service.js | get_user_by_id | Fetching user: ${user_id}`);
            
            const user = await user_data_repository.get_user_by_id(user_id);
            
            if (!user) {
                throw new Error("User not found");
            }

            // Remove password from response
            const { password, ...user_without_password } = user;
            
            return user_without_password;
        } catch (error) {
            console.error(`FILE: user.service.js | get_user_by_id | Error:`, error);
            throw error;
        }
    }

    async initiate_password_reset(email) {
        try {
            console.log(`FILE: user.service.js | initiate_password_reset | Initiating reset for: ${email}`);
            
            if (!email) {
                throw new Error("Email is required");
            }

            const user = await user_data_repository.get_user_by_email(email);
            if (!user) {
                throw new Error("User not found");
            }

            // Generate reset token
            const reset_token = crypto.randomBytes(32).toString("hex");
            
            // Hash token before saving
            const hashed_token = crypto.createHash("sha256").update(reset_token).digest("hex");
            
            // Save token with expiry (10 minutes)
            await user_data_repository.update_user_by_email(email, {
                resetToken: hashed_token,
                resetTokenExpiry: new Date(Date.now() + 10 * 60 * 1000)
            });

            // Send password reset email
            await email_service.send_password_reset_email(email, reset_token, user.name);

            console.log(`FILE: user.service.js | initiate_password_reset | Reset email sent successfully to: ${email}`);
            
            return {
                message: "Password reset link sent to your email"
            };
        } catch (error) {
            console.error(`FILE: user.service.js | initiate_password_reset | Error:`, error);
            throw error;
        }
    }

    async reset_password(reset_data) {
        try {
            console.log("FILE: user.service.js | reset_password | Processing password reset");
            
            const { token, new_password } = reset_data;
            
            if (!token || !new_password) {
                throw new Error("Token and new password are required");
            }

            // Hash the provided token
            const hashed_token = crypto.createHash("sha256").update(token).digest("hex");
            
            // Find user with valid token
            const user = await user_data_repository.get_user_by_reset_token(hashed_token);
            
            if (!user || user.resetTokenExpiry < new Date()) {
                throw new Error("Invalid or expired reset token");
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(new_password, salt);

            // Update password and clear reset token
            await user_data_repository.update_user(user.id, {
                password: hashed_password,
                resetToken: null,
                resetTokenExpiry: null
            });

            console.log(`FILE: user.service.js | reset_password | Password reset successfully for user: ${user.id}`);
            return { message: "Password reset successfully" };
        } catch (error) {
            console.error(`FILE: user.service.js | reset_password | Error:`, error);
            throw error;
        }
    }
}

module.exports = new user_service();