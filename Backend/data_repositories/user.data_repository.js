const prisma = require("../prisma/index");

class user_data_repository {
    constructor() {
        console.log("FILE: user.data_repository.js | constructor | Data Repository initialized");
    }

    async create_user(user_data) {
        try {
            console.log(`FILE: user.data_repository.js | create_user | Creating user: ${user_data.email}`);
            
            const user = await prisma.user.create({
                data: user_data
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | create_user | Error:`, error);
            throw error;
        }
    }

    async get_user_by_email(email) {
        try {
            console.log(`FILE: user.data_repository.js | get_user_by_email | Fetching user: ${email}`);
            
            const user = await prisma.user.findUnique({
                where: { email }
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | get_user_by_email | Error:`, error);
            throw error;
        }
    }

    async get_user_by_id(user_id) {
        try {
            console.log(`FILE: user.data_repository.js | get_user_by_id | Fetching user: ${user_id}`);
            
            const user = await prisma.user.findUnique({
                where: { id: user_id }
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | get_user_by_id | Error:`, error);
            throw error;
        }
    }

    async get_all_users() {
        try {
            console.log("FILE: user.data_repository.js | get_all_users | Fetching all users");
            
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | get_all_users | Error:`, error);
            throw error;
        }
    }

    async update_user(user_id, update_data) {
        try {
            console.log(`FILE: user.data_repository.js | update_user | Updating user: ${user_id}`);
            
            const user = await prisma.user.update({
                where: { id: user_id },
                data: update_data
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | update_user | Error:`, error);
            throw error;
        }
    }

    async update_user_by_email(email, update_data) {
        try {
            console.log(`FILE: user.data_repository.js | update_user_by_email | Updating user: ${email}`);
            
            const user = await prisma.user.update({
                where: { email },
                data: update_data
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | update_user_by_email | Error:`, error);
            throw error;
        }
    }

    async get_user_by_reset_token(reset_token) {
        try {
            console.log(`FILE: user.data_repository.js | get_user_by_reset_token | Finding user by reset token`);
            
            const user = await prisma.user.findFirst({
                where: { 
                    resetToken: reset_token,
                    resetTokenExpiry: {
                        gt: new Date()
                    }
                }
            });
            
            return user;
        } catch (error) {
            console.error(`FILE: user.data_repository.js | get_user_by_reset_token | Error:`, error);
            throw error;
        }
    }
}

module.exports = new user_data_repository();