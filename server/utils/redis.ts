// import Redis from "ioredis";
// import "dotenv/config";

// export const rdis = new Redis(process.env.REDIS_URL as string);

// rdis.on("connect", () => {
//   console.log("✅ Connected to Redis");
// });

// rdis.on("error", (err) => {
//   console.error("❌ Redis error:", err);
// });

// export const setCache = async (
//   key: string,
//   value: any,
//   ttlSeconds?: number,
// ) => {
//   try {
//     await rdis.set(key, JSON.stringify(value), "EX", ttlSeconds || 3600);
//   } catch (err) {
//     console.error("Error setting cache:", err);
//   }
// };

// export const getCache = async (key: string) => {
//   try {
//     const data = await rdis.get(key);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error("Error getting cache:", err);
//     return null;
//   }
// };

// export const delCache = async (key: string) => {
//   try {
//     await rdis.del(key);
//   } catch (err) {
//     console.error("Error deleting cache:", err);
//   }
// };
