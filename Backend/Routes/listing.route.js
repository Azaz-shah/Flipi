const express = require('express');
const listing_controller = require('../controllers/listing.controller');

const router = express.Router();

/**
 * @route   POST /api/listings
 * @desc    Create a new listing
 * @access  Public
 */
router.post('/', listing_controller.create_listing);

/**
 * @route   GET /api/listings
 * @desc    Get all listings
 * @access  Public
 */
router.get('/', listing_controller.get_all_listings);

/**
 * @route   GET /api/listings/filter
 * @desc    Filter listings by criteria
 * @access  Public
 */
router.get('/filter', listing_controller.filter_listings);

/**
 * @route   GET /api/listings/total
 * @desc    Get total count of listings
 * @access  Public
 */
router.get('/total', listing_controller.get_total_listings);

/**
 * @route   GET /api/listings/active
 * @desc    Get active listings
 * @access  Public
 */
router.get('/active', listing_controller.get_active_listings);

/**
 * @route   GET /api/listings/sold
 * @desc    Get sold listings
 * @access  Public
 */
router.get('/sold', listing_controller.get_sold_listings);

/**
 * @route   GET /api/listings/total-value
 * @desc    Get total value of all listings
 * @access  Public
 */
router.get('/total-value', listing_controller.get_total_value);

/**
 * @route   GET /api/listings/:id
 * @desc    Get listing by ID
 * @access  Public
 */
router.get('/:id', listing_controller.get_listing_by_id);

/**
 * @route   PUT /api/listings/:id
 * @desc    Update listing by ID
 * @access  Public
 */
router.put('/:id', listing_controller.update_listing);

/**
 * @route   DELETE /api/listings/:id
 * @desc    Delete listing by ID
 * @access  Public
 */
router.delete('/:id', listing_controller.delete_listing);

module.exports = router;