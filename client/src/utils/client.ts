import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'sgmu0lrq',
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: 'sk0MvfKD103oqOs5PGzZMThedbLgDAsg1ojGTfBQdQdJMk3Jb9CpMgCp9Xv9YZDXBlYt3zFKN4hQOBSEMWcZAnICVAQZNydbTlMDl34Z7NGr8yB88fqIFFyw8nJmvwCtpAObFbFTreM1YTwcpIArWi4cBPZYM1l3FesmbB3U4xq9lrxjtRjZ'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
