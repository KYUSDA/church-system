import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId:'sgmu0lrq',
    dataset:'production',
    apiVersion:'2022-02-01',
    useCdn:true,
    token:'sk3NzJGgFEYhdmoRlkxJluQOf2sD8LWoAjay2wsylcpxPK9cttyp1lElY4Rwk03elUKOX2YLmjebzHSZygiNiNAVYpLTryE8O6YWs0NwUWw4GsoyI0AeCZfbx24zPAhLY3Lx1K4cGXNRbo56XvfvvBdZLwDAdWbEXc5iehjk8lixoPhKyLIs'
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
