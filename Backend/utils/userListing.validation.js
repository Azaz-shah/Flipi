const joi = require("joi");

const userListingSchema = joi.object({
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
    description: joi.string().min(10).max(500).required()
})

module.exports = {
    userListingSchema
}