const express = require('express');
const { validateUserListing } = require("../Middlewares/listingValidation")
const { createListing, filterListings, totalListing, deleteListing, updateListing, getListById, activeListing, soldListing, totalValue } = require("../Controllers/userListing.controller")


const router = express.Router();


router.post("/createListing", validateUserListing, createListing)
router.get("/totalListing", totalListing)
router.get("/activeListing", activeListing)
router.get("/soldListing", soldListing)
router.get("/totalValue", totalValue)
router.delete("/deleteListing/:id", deleteListing)
router.put("/updateListing/:id", validateUserListing, updateListing)
router.get("/getListById/:id", getListById)

//Filters
router.get('/platform', filterListings)

module.exports = router