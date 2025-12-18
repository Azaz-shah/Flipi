const express = require('express');
const prisma = require("../prisma/index")
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const userCreation = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new Error("Please provide all the required fields")
        }


        //Hashing the password
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, await salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        console.log("Login route hit");
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please provide all the required fields")
        }

        const user = await prisma.user.findUnique({
            where: { email }

        })
        if (!user) {
            throw new Error("Invalid email or password")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password")
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1d" }

        )


        res.status(200).json({
            status: "success",
            data: {
                user,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (!users) {
            throw new Error("No users found")
        }

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            throw new Error("User not found")
        }
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const forgetPassword = async () => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("User not found")
        }

        //generate Token

        const resetToken = crypto.randomBytes(32).toString("hex");

        //Hash token before saving

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        //save Token + expriry

        await prisma.user.update({
            where: {
                email
            },
            data: {
                resetToken: hashedToken,
                resetTokenExpiry: Date.now() + 10 * 60 * 1000
            }
        })

        //Create Reset Url
        const resetUrl = " "

        console.log("Reset url", resetUrl)
        res.json({ message: "Password reset link sent" });


    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })

    }
}

const resetPassword = () => {
    try {

    } catch (error) {

    }
}

module.exports = { userCreation, userLogin, getAllUsers, resetPassword, forgetPassword, getUserById }