import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
    useCdn: true,
    apiVersion: "2024-03-24",
    token: process.env.SANITY_API_TOKEN,
});
