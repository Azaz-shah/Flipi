const connectRabbitMQ = require('./connection')

const consumeListings = async () => {
    try {
        const channel = await connectRabbitMQ()
        await channel.assertQueue('listing')

        console.log('Waiting for listings...')

        channel.consume('listing', (message) => {
            if (message) {
                const listing = JSON.parse(message.content.toString())
                console.log('Received listing:', listing)

                // Process the listing here
                // Example: send email, update analytics, etc.
                processListing(listing)

                channel.ack(message)
            }
        })
    } catch (error) {
        console.error('Consumer error:', error.message)
    }
}

const processListing = (listing) => {
    // Add your processing logic here
    console.log(`Processing listing: ${listing.title} on ${listing.plateform}`)
    // Example: send notification, update cache, etc.
}

module.exports = { consumeListings }