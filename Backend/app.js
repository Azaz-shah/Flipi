const express = require('express');
const cors = require("cors")

const { swaggerUi, specs } = require('./utils/swagger.config');
const socket_service = require('./utils/socket.service');

require('dotenv').config();
const http = require('http');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
socket_service.init(server);

// Initialize event-driven services
// const listing_queue_service = require('./event_driven_services/listing_queue.service');


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors(
    "*"
))

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
            documentation: "/api-docs",
            socket_clients: socket_service.get_connected_clients_count()
        }
    });
});

// Routes
app.use("/api/users", require("./routes/user.route"));
app.use("/api/listings", require("./routes/listing.route"));


server.listen(PORT, () => {
    console.log(`FILE: app.js | server_start | Server is listening at http://localhost:${PORT}`);
    console.log(`FILE: app.js | server_start | API Documentation available at http://localhost:${PORT}/api-docs`);
});