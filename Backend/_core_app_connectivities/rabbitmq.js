const amqp = require("amqplib");
require("dotenv").config();

class rabbitmq_ops {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
            this.channel = await this.connection.createChannel();
            console.log("FILE: rabbitmq.js | connect | RabbitMQ connected");
            return this.channel;
        } catch (error) {
            console.error("FILE: rabbitmq.js | connect | RabbitMQ connection error:", error);
            throw error;
        }
    }

    async get_channel() {
        if (!this.channel) {
            await this.connect();
        }
        return this.channel;
    }

    async send_to_queue(queue_name, message) {
        try {
            const channel = await this.get_channel();
            await channel.assertQueue(queue_name);
            channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(message)));
            console.log(`FILE: rabbitmq.js | send_to_queue | Message sent to queue: ${queue_name}`);
        } catch (error) {
            console.error(`FILE: rabbitmq.js | send_to_queue | Error sending to queue ${queue_name}:`, error);
            throw error;
        }
    }
}

module.exports = new rabbitmq_ops();