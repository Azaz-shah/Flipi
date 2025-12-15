const express = require('express');
const { userCreation, userLogin, getAllUsers, getUserById } = require("../Controllers/user.controller")
const { validateUserCreation, validateUserLogin } = require("../Middlewares/validation")
const router = express.Router();

router.post("/create", validateUserCreation, userCreation)
router.post("/login", validateUserLogin, userLogin)

router.get("/getUsers", getAllUsers)
router.get("/getUser/:id", getUserById)

module.exports = router