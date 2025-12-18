const amqp = require("amqplib");
require("dotenv").config()

const connectToRabbitmq = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost')
        const channel = await connection.createChannel()
        console.log("Connected to RabbitMQ");
        return channel
    } catch (error) {
        console.error("RabbitMQ connection error:", error.message)
        throw error
    }
}

module.exports = connectToRabbitmq