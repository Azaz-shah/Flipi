const express = require('express');
const listing_controller = require('../controllers/listing.controller');
const validation_middleware = require("../Middlewares/validation.middleware")
const auth_middleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/listings:
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - plateform
 *               - userName
 *               - category
 *               - followers
 *               - Engagement_Rate
 *               - impression
 *               - country
 *               - age
 *               - price
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               plateform:
 *                 type: string
 *                 enum: [Instagram, YouTube, Twitter, Telegram, TikTok, Facebook]
 *               userName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               category:
 *                 type: string
 *                 enum: [food, lifestyle, entertainment, health, beauty, finance, education, gaming, sports]
 *               followers:
 *                 type: integer
 *                 minimum: 0
 *               Engagement_Rate:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               impression:
 *                 type: integer
 *                 minimum: 0
 *               country:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               age:
 *                 type: integer
 *                 minimum: 13
 *                 maximum: 100
 *               price:
 *                 type: integer
 *                 minimum: 1
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/createListing',
    // auth_middleware.authenticate,
    validation_middleware.validate_listing_creation,
    listing_controller.create_listing
);

/**
 * @swagger
 * /api/listings:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Listings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardResponse'
 *                 - type: object
 *                   properties:
 *                     DB_DATA:
 *                       type: object
 *                       properties:
 *                         listings:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Listing'
 *       400:
 *         description: Technical issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/allListings', listing_controller.get_all_listings);

/**
 * @swagger
 * /api/listings/filter:
 *   get:
 *     summary: Filter listings by criteria
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: plateform
 *         schema:
 *           type: string
 *           enum: [Instagram, YouTube, Twitter, Telegram, TikTok, Facebook]
 *         description: Platform filter
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [food, lifestyle, entertainment, health, beauty, finance, education, gaming, sports]
 *         description: Category filter
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Maximum price
 *       - in: query
 *         name: minFollowers
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum followers
 *       - in: query
 *         name: maxFollowers
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Maximum followers
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Verified account filter
 *       - in: query
 *         name: isMonetized
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Monetized account filter
 *     responses:
 *       200:
 *         description: Filtered listings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/filter',
    validation_middleware.validate_listing_filter,
    listing_controller.filter_listings
);

/**
 * @swagger
 * /api/listings/total:
 *   get:
 *     summary: Get total count of listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Total count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 */
router.get('/total', listing_controller.get_total_listings);

/**
 * @swagger
 * /api/listings/active:
 *   get:
 *     summary: Get active listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Active listings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 */
router.get('/active', listing_controller.get_active_listings);

/**
 * @swagger
 * /api/listings/sold:
 *   get:
 *     summary: Get sold listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Sold listings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 */
router.get('/sold', listing_controller.get_sold_listings);

/**
 * @swagger
 * /api/listings/total-value:
 *   get:
 *     summary: Get total value of all listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Total value retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 */
router.get('/total-value', listing_controller.get_total_value);

/**
 * @swagger
 * /api/listings/{id}:
 *   get:
 *     summary: Get listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *       404:
 *         description: Listing not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', listing_controller.get_listing_by_id);

/**
 * @swagger
 * /api/listings/{id}:
 *   put:
 *     summary: Update listing by ID
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               plateform:
 *                 type: string
 *                 enum: [Instagram, YouTube, Twitter, Telegram, TikTok, Facebook]
 *               userName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               category:
 *                 type: string
 *                 enum: [food, lifestyle, entertainment, health, beauty, finance, education, gaming, sports]
 *               followers:
 *                 type: integer
 *                 minimum: 0
 *               Engagement_Rate:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               impression:
 *                 type: integer
 *                 minimum: 0
 *               country:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               age:
 *                 type: integer
 *                 minimum: 13
 *                 maximum: 100
 *               price:
 *                 type: integer
 *                 minimum: 1
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id',
    auth_middleware.authenticate,
    validation_middleware.validate_listing_update,
    listing_controller.update_listing
);

/**
 * @swagger
 * /api/listings/{id}:
 *   delete:
 *     summary: Delete listing by ID
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *       400:
 *         description: Technical issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id',
    auth_middleware.authenticate,
    listing_controller.delete_listing
);

module.exports = router;