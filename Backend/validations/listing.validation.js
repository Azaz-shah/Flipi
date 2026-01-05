const { verify } = require("crypto");
const joi = require("joi");

const listing_creation_schema = joi.object({
    title: joi.string().min(3).max(100).required(),
    plateform: joi.string().valid('Instagram', 'YouTube', 'Twitter', 'Telegram', 'TikTok', 'Facebook').required(),
    userName: joi.string().min(3).max(50).required(),
    category: joi.string().valid("food", "lifestyle", "entertainment", "health", "beauty", "finance", "education", "gaming", "sports").min(3).max(50).required(),
    followers: joi.number().integer().min(0).required(),
    Engagement_Rate: joi.number().min(0).max(100).required(),
    impression: joi.number().integer().min(0).required(),
    country: joi.string().min(2).max(50).required(),
    age: joi.number().integer().min(13).max(100).required(),
    price: joi.number().integer().min(1).required(),
    description: joi.string().min(10).max(500).required(),
    isVerified: joi.boolean().required(),
    isMonetized: joi.boolean().required(),
    isActive: joi.boolean().required(),
    sold: joi.boolean().required()
});

const listing_update_schema = joi.object({
    title: joi.string().min(3).max(100).optional(),
    plateform: joi.string().valid('Instagram', 'YouTube', 'Twitter', 'Telegram', 'TikTok', 'Facebook').optional(),
    userName: joi.string().min(3).max(50).optional(),
    category: joi.string().valid("food", "lifestyle", "entertainment", "health", "beauty", "finance", "education", "gaming", "sports").min(3).max(50).optional(),
    followers: joi.number().integer().min(0).optional(),
    Engagement_Rate: joi.number().min(0).max(100).optional(),
    impression: joi.number().integer().min(0).optional(),
    country: joi.string().min(2).max(50).optional(),
    age: joi.number().integer().min(13).max(100).optional(),
    price: joi.number().integer().min(1).optional(),
    description: joi.string().min(10).max(500).optional()
});

const listing_filter_schema = joi.object({
    plateform: joi.string().valid('Instagram', 'YouTube', 'Twitter', 'Telegram', 'TikTok', 'Facebook').optional(),
    category: joi.string().valid("food", "lifestyle", "entertainment", "health", "beauty", "finance", "education", "gaming", "sports").optional(),
    minPrice: joi.number().integer().min(0).optional(),
    maxPrice: joi.number().integer().min(0).optional(),
    minFollowers: joi.number().integer().min(0).optional(),
    maxFollowers: joi.number().integer().min(0).optional(),
    isVerified: joi.string().valid('true', 'false').optional(),
    isMonetized: joi.string().valid('true', 'false').optional()
});

module.exports = {
    listing_creation_schema,
    listing_update_schema,
    listing_filter_schema
};