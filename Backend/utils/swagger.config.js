const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flipi API',
            version: '1.0.0',
            description: 'API documentation for Flipi - Social Media Account Marketplace',
            contact: {
                name: 'Flipi Team',
                email: 'support@flipi.com'
            }
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Listing: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        plateform: { 
                            type: 'string',
                            enum: ['Instagram', 'YouTube', 'Twitter', 'Telegram', 'TikTok', 'Facebook']
                        },
                        userName: { type: 'string' },
                        category: {
                            type: 'string',
                            enum: ['food', 'lifestyle', 'entertainment', 'health', 'beauty', 'finance', 'education', 'gaming', 'sports']
                        },
                        followers: { type: 'integer', minimum: 0 },
                        Engagement_Rate: { type: 'number', minimum: 0, maximum: 100 },
                        impression: { type: 'integer', minimum: 0 },
                        country: { type: 'string' },
                        age: { type: 'integer', minimum: 13, maximum: 100 },
                        price: { type: 'integer', minimum: 1 },
                        description: { type: 'string' },
                        isActive: { type: 'boolean' },
                        sold: { type: 'boolean' },
                        isVerified: { type: 'boolean' },
                        isMonetized: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                StandardResponse: {
                    type: 'object',
                    properties: {
                        STATUS: { type: 'string', enum: ['SUCCESSFUL', 'ERROR'] },
                        ERROR_CODE: { type: 'string' },
                        ERROR_FILTER: { type: 'string' },
                        ERROR_DESCRIPTION: { type: 'string' },
                        DB_DATA: { type: 'object' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        STATUS: { type: 'string', example: 'ERROR' },
                        ERROR_CODE: { type: 'string' },
                        ERROR_FILTER: { 
                            type: 'string',
                            enum: ['VALIDATION_ERROR', 'AUTH_ERROR', 'TECHNICAL_ISSUE', 'INVALID_REQUEST']
                        },
                        ERROR_DESCRIPTION: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};