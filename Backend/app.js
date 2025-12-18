require('dotenv').config();
const express = require('express');

// Initialize event-driven services
const listing_queue_service = require('./event_driven_services/listing_queue.service');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('FILE: app.js | root_endpoint | Health check requested');
    res.json({
        STATUS: "SUCCESSFUL",
        ERROR_CODE: "",
        ERROR_FILTER: "",
        ERROR_DESCRIPTION: "",
        DB_DATA: { message: "Flipi Backend API is running" }
    });
});

// Routes
app.use("/api/users", require("./Routes/user.route"));
app.use("/api/listings", require("./routes/listing.route"));

app.listen(PORT, () => {
    console.log(`FILE: app.js | server_start | Server is listening at http://localhost:${PORT}`);
});