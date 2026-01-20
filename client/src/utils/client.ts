import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_API_TOKEN;

export const client = sanityClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: '2022-02-01',
    useCdn: true,
    token: token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
