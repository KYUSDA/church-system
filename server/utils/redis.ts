import Redis from "ioredis";
import 'dotenv/config';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ Redis connection failed: REDIS_URL is missing in .env");
}

export const redis = new Redis(redisUrl, {
  tls: {
    rejectUnauthorized: false, // ✅ Required for Upstash
  },
  retryStrategy: (times) => Math.min(times * 50, 2000), 
});

redis.on("connect", () => {
  console.log("✅ Redis Connected Successfully!");
});

redis.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err.message);
});
