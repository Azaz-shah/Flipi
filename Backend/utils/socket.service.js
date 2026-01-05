class socket_service {
    constructor() {
        this.io = null;
        console.log("FILE: socket.service.js | constructor | Socket service initialized");
    }

    init(server) {
        try {
            const { Server } = require('socket.io');
            this.io = new Server(server, {
                cors: {
                    origin: process.env.FRONTEND_URL || "http://localhost:3000",
                    methods: ["GET", "POST"]
                }
            });

            this.setup_connection_handlers();
            console.log("FILE: socket.service.js | init | Socket.IO server initialized");
        } catch (error) {
            console.error("FILE: socket.service.js | init | Error initializing Socket.IO:", error);
            throw error;
        }
    }

    setup_connection_handlers() {
        this.io.on("connection", (socket) => {
            console.log(`FILE: socket.service.js | setup_connection_handlers | Client connected: ${socket.id}`);

            // Handle listing updates
            // socket.on("join_listing_updates", () => {
            //     socket.join("listing_updates");
            //     console.log(`FILE: socket.service.js | setup_connection_handlers | Client ${socket.id} joined listing updates`);
            // });

            // // Handle user notifications
            // socket.on("join_user_notifications", (user_id) => {
            //     if (user_id) {
            //         socket.join(`user_${user_id}`);
            //         console.log(`FILE: socket.service.js | setup_connection_handlers | Client ${socket.id} joined user notifications for user: ${user_id}`);
            //     }
            // });

            // Handle general messages
            socket.on("message", (message) => {
                try {
                    console.log(`FILE: socket.service.js | setup_connection_handlers | Received message from ${socket.id}:`, message);
                    socket.broadcast.emit("message", {
                        id: socket.id,
                        message: message,
                        timestamp: new Date().toISOString()
                    });
                } catch (error) {
                    console.error("FILE: socket.service.js | setup_connection_handlers | Error handling message:", error);
                }
            });

            // Handle disconnection
            socket.on("disconnect", (reason) => {
                console.log(`FILE: socket.service.js | setup_connection_handlers | Client ${socket.id} disconnected: ${reason}`);
            });

            // Handle connection errors
            socket.on("error", (error) => {
                console.error(`FILE: socket.service.js | setup_connection_handlers | Socket error for ${socket.id}:`, error);
            });
        });
    }

    // Emit listing created notification
    emit_listing_created(listing_data) {
        try {
            if (this.io) {
                this.io.to("listing_updates").emit("listing_created", {
                    type: "listing_created",
                    data: listing_data,
                    timestamp: new Date().toISOString()
                });
                console.log(`FILE: socket.service.js | emit_listing_created | Listing created notification sent: ${listing_data.id}`);
            }
        } catch (error) {
            console.error("FILE: socket.service.js | emit_listing_created | Error emitting listing created:", error);
        }
    }

    // Emit listing updated notification
    emit_listing_updated(listing_data) {
        try {
            if (this.io) {
                this.io.to("listing_updates").emit("listing_updated", {
                    type: "listing_updated",
                    data: listing_data,
                    timestamp: new Date().toISOString()
                });
                console.log(`FILE: socket.service.js | emit_listing_updated | Listing updated notification sent: ${listing_data.id}`);
            }
        } catch (error) {
            console.error("FILE: socket.service.js | emit_listing_updated | Error emitting listing updated:", error);
        }
    }

    // Emit user notification
    emit_user_notification(user_id, notification_data) {
        try {
            if (this.io) {
                this.io.to(`user_${user_id}`).emit("user_notification", {
                    type: "user_notification",
                    data: notification_data,
                    timestamp: new Date().toISOString()
                });
                console.log(`FILE: socket.service.js | emit_user_notification | User notification sent to user: ${user_id}`);
            }
        } catch (error) {
            console.error("FILE: socket.service.js | emit_user_notification | Error emitting user notification:", error);
        }
    }

    // Get connected clients count
    get_connected_clients_count() {
        try {
            if (this.io) {
                return this.io.engine.clientsCount;
            }
            return 0;
        } catch (error) {
            console.error("FILE: socket.service.js | get_connected_clients_count | Error getting clients count:", error);
            return 0;
        }
    }
}

module.exports = new socket_service();