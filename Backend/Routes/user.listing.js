const express = require('express');
const { userListingSchema } = require("../utils/userListing.validation")
const { createListing } = require("../Controllers/userListing.controller")
const router = express.Router();

router.post("/createListing", userListingSchema, createListing)