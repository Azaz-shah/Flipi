const { createClient } = require("redis");
require("dotenv").config();

const redis_client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis_client.on("connect", () => {
    console.log("FILE: redis.js | connect | Redis connected");
});

redis_client.on("error", (err) => {
    console.error("FILE: redis.js | error | Redis error:", err);
});

(async () => {
    try {
        await redis_client.connect();
        console.log("FILE: redis.js | init | Redis connection established");
    } catch (error) {
        console.error("FILE: redis.js | init | Failed to connect to Redis:", error);
    }
})();

module.exports = redis_client;