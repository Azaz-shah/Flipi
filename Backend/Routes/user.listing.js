const express = require('express');
const { validateUserListing } = require("../Middlewares/listingValidation")
const { createListing, totalListing, activeListing, soldListing, totalValue } = require("../Controllers/userListing.controller")
const router = express.Router();

router.post("/createListing", validateUserListing, createListing)
router.get("/totalListing", totalListing)
router.get("/activeListing", activeListing)
router.get("/soldListing", soldListing)
router.get("/totalValue", totalValue)

module.exports = router