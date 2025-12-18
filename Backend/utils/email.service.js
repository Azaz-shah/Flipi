const nodemailer = require("nodemailer");
require("dotenv").config();

class email_service {
    constructor() {
        console.log("FILE: email.service.js | constructor | Email service initialized");
        this.transporter = null;
        this.init_transporter();
    }

    init_transporter() {
        try {
            console.log("FILE: email.service.js | init_transporter | Initializing email transporter");
            
            this.transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            console.log("FILE: email.service.js | init_transporter | Email transporter initialized successfully");
        } catch (error) {
            console.error("FILE: email.service.js | init_transporter | Error initializing transporter:", error);
            throw error;
        }
    }

    async send_password_reset_email(user_email, reset_token, user_name = '') {
        try {
            console.log(`FILE: email.service.js | send_password_reset_email | Sending password reset email to: ${user_email}`);
            
            if (!user_email || !reset_token) {
                throw new Error("Email and reset token are required");
            }

            const reset_url = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
            
            const mail_options = {
                from: process.env.EMAIL,
                to: user_email,
                subject: "Password Reset Request - Flipi",
                html: this.get_password_reset_template(user_name, reset_url)
            };

            const result = await this.transporter.sendMail(mail_options);
            
            console.log(`FILE: email.service.js | send_password_reset_email | Password reset email sent successfully to: ${user_email}`);
            return {
                success: true,
                message: "Password reset email sent successfully",
                message_id: result.messageId
            };
        } catch (error) {
            console.error(`FILE: email.service.js | send_password_reset_email | Error sending email to ${user_email}:`, error);
            throw error;
        }
    }

    async send_welcome_email(user_email, user_name) {
        try {
            console.log(`FILE: email.service.js | send_welcome_email | Sending welcome email to: ${user_email}`);
            
            if (!user_email || !user_name) {
                throw new Error("Email and user name are required");
            }

            const mail_options = {
                from: process.env.EMAIL,
                to: user_email,
                subject: "Welcome to Flipi!",
                html: this.get_welcome_template(user_name)
            };

            const result = await this.transporter.sendMail(mail_options);
            
            console.log(`FILE: email.service.js | send_welcome_email | Welcome email sent successfully to: ${user_email}`);
            return {
                success: true,
                message: "Welcome email sent successfully",
                message_id: result.messageId
            };
        } catch (error) {
            console.error(`FILE: email.service.js | send_welcome_email | Error sending email to ${user_email}:`, error);
            throw error;
        }
    }

    async send_listing_notification(user_email, user_name, listing_title) {
        try {
            console.log(`FILE: email.service.js | send_listing_notification | Sending listing notification to: ${user_email}`);
            
            if (!user_email || !user_name || !listing_title) {
                throw new Error("Email, user name, and listing title are required");
            }

            const mail_options = {
                from: process.env.EMAIL,
                to: user_email,
                subject: "Your Listing is Live - Flipi",
                html: this.get_listing_notification_template(user_name, listing_title)
            };

            const result = await this.transporter.sendMail(mail_options);
            
            console.log(`FILE: email.service.js | send_listing_notification | Listing notification sent successfully to: ${user_email}`);
            return {
                success: true,
                message: "Listing notification sent successfully",
                message_id: result.messageId
            };
        } catch (error) {
            console.error(`FILE: email.service.js | send_listing_notification | Error sending email to ${user_email}:`, error);
            throw error;
        }
    }

    get_password_reset_template(user_name, reset_url) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .button { background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Password Reset Request</h2>
                    <p>Hello ${user_name || 'User'},</p>
                    <p>You have requested to reset your password for your Flipi account.</p>
                    <p>Click the button below to reset your password:</p>
                    <p><a href="${reset_url}" class="button">Reset Password</a></p>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${reset_url}</p>
                    <p>This link will expire in 10 minutes for security reasons.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <p>Best regards,<br>The Flipi Team</p>
                </div>
            </body>
            </html>
        `;
    }

    get_welcome_template(user_name) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .button { background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Flipi!</h2>
                    <p>Hello ${user_name},</p>
                    <p>Welcome to Flipi! We're excited to have you join our community.</p>
                    <p>You can now start creating and managing your social media listings.</p>
                    <p><a href="${process.env.FRONTEND_URL}/dashboard" class="button">Get Started</a></p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <p>Best regards,<br>The Flipi Team</p>
                </div>
            </body>
            </html>
        `;
    }

    get_listing_notification_template(user_name, listing_title) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .button { background-color: #17a2b8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Your Listing is Now Live!</h2>
                    <p>Hello ${user_name},</p>
                    <p>Great news! Your listing "<strong>${listing_title}</strong>" has been successfully created and is now live on Flipi.</p>
                    <p>Your listing is now visible to potential buyers and you can start receiving inquiries.</p>
                    <p><a href="${process.env.FRONTEND_URL}/my-listings" class="button">View My Listings</a></p>
                    <p>Best regards,<br>The Flipi Team</p>
                </div>
            </body>
            </html>
        `;
    }

    async verify_connection() {
        try {
            console.log("FILE: email.service.js | verify_connection | Verifying email connection");
            
            await this.transporter.verify();
            console.log("FILE: email.service.js | verify_connection | Email connection verified successfully");
            return true;
        } catch (error) {
            console.error("FILE: email.service.js | verify_connection | Email connection verification failed:", error);
            return false;
        }
    }
}

module.exports = new email_service();