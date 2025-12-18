const rabbitmq_ops = require('../_core_app_connectivities/rabbitmq');

class listing_queue_service {
    constructor() {
        console.log("FILE: listing_queue.service.js | constructor | Service initialized");
        this.setup_queue_consumer();
    }

    async setup_queue_consumer() {
        try {
            console.log("FILE: listing_queue.service.js | setup_queue_consumer | Setting up queue consumer");
            
            const channel = await rabbitmq_ops.get_channel();
            await channel.assertQueue('listing');

            console.log('FILE: listing_queue.service.js | setup_queue_consumer | Waiting for listings...');

            channel.consume('listing', (message) => {
                if (message) {
                    try {
                        const listing = JSON.parse(message.content.toString());
                        console.log(`FILE: listing_queue.service.js | setup_queue_consumer | Received listing: ${listing.id}`);

                        // Process the listing
                        this.process_listing(listing);

                        channel.ack(message);
                    } catch (error) {
                        console.error("FILE: listing_queue.service.js | setup_queue_consumer | Error processing message:", error);
                        channel.nack(message, false, false);
                    }
                }
            });
        } catch (error) {
            console.error("FILE: listing_queue.service.js | setup_queue_consumer | Consumer error:", error);
        }
    }

    process_listing(listing) {
        try {
            console.log(`FILE: listing_queue.service.js | process_listing | Processing listing: ${listing.title} on ${listing.plateform}`);
            
            // Add your processing logic here
            // Example: send notification, update analytics, etc.
            
            console.log(`FILE: listing_queue.service.js | process_listing | Listing processed successfully: ${listing.id}`);
        } catch (error) {
            console.error("FILE: listing_queue.service.js | process_listing | Error processing listing:", error);
        }
    }
}

module.exports = new listing_queue_service();