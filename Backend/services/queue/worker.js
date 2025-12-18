const { consumeListings } = require('./consumer')

// Start the worker
const startWorker = async () => {
    console.log('Starting queue worker...')
    await consumeListings()
}

startWorker().catch(console.error)