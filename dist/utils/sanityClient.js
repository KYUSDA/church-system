"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanity = void 0;
const client_1 = require("@sanity/client");
exports.sanity = (0, client_1.createClient)({
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
    useCdn: true,
    apiVersion: "2024-03-24",
    token: process.env.SANITY_API_TOKEN,
});
