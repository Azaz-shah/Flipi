require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./utils/swagger.config');

// Initialize event-driven services
const listing_queue_service = require('./event_driven_services/listing_queue.service');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customSiteTitle: 'Flipi API Documentation',
    customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui { background-color: #ffffff !important; }
        body { background-color: #ffffff !important; }
        .swagger-ui .scheme-container { background-color: #ffffff !important; }
        .swagger-ui .info { background-color: #ffffff !important; }
        .swagger-ui .wrapper { background-color: #ffffff !important; }
    `
}));

app.get('/', (req, res) => {
    console.log('FILE: app.js | root_endpoint | Health check requested');
    res.json({
        STATUS: "SUCCESSFUL",
        ERROR_CODE: "",
        ERROR_FILTER: "",
        ERROR_DESCRIPTION: "",
        DB_DATA: { 
            message: "Flipi Backend API is running",
            documentation: "/api-docs"
        }
    });
});

// Routes
app.use("/api/users", require("./routes/user.route"));
app.use("/api/listings", require("./routes/listing.route"));

app.listen(PORT, () => {
    console.log(`FILE: app.js | server_start | Server is listening at http://localhost:${PORT}`);
    console.log(`FILE: app.js | server_start | API Documentation available at http://localhost:${PORT}/api-docs`);
});