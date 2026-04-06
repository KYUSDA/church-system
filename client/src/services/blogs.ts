import groq from "groq";

// blogs
export const getAllBlogsQuery = `
*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  content,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt,
  publishedAt,
  readingTime,

  // category
  category->{
    _id,
    name,
    slug
  },

  // optional author
  author->{
    name,
    email
  }
}
`;

export const getBlogBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content,
  publishedAt,
  updatedAt,
  readingTime,

  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt,

  tags,

  // SEO
  seo {
    metaTitle,
    metaDescription,
    keywords
  },

  category->{
    name,
    slug
  },

  // optional author (safe)
  author->{
    name,
   email
  }
}
`;

export const getBlogsByCategoryQuery = `
*[_type == "blog" && category->slug.current == $slug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  content,
  "thumbnail": thumbnail.asset->url,
  publishedAt,
  readingTime,

  category->{
    name,
    slug
  }
}
`;

export const getBlogsByTagQuery = `
*[_type == "blog" && $tag in tags] | order(publishedAt desc) {
  _id,
  title,
  slug,
  content,
  "thumbnail": thumbnail.asset->url,
  publishedAt,
  readingTime
}
`;

export const searchBlogsQuery = `
*[_type == "blog" && (
  title match $search + "*"
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  content,
  "thumbnail": thumbnail.asset->url,
  publishedAt
}
`;

export const getRelatedBlogsQuery = `
*[_type == "blog" && category._ref == $categoryId && slug.current != $slug] 
| order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  content,
  "thumbnail": thumbnail.asset->url,
  publishedAt
}
`;

export const getLatestBlogsQuery = `
*[_type == "blog"] | order(publishedAt desc)[0...5] {
  title,
  slug,
  "thumbnail": thumbnail.asset->url,
  publishedAt
}
`;

export const getBlogsByDateQuery = groq`
  *[
    _type == "blog" &&
    string::startsWith(publishedAt, $datePrefix)
  ] | order(publishedAt desc) {
    _id, title, slug, publishedAt, readingTime,
    "thumbnail":    mainImage.asset->url,
    "thumbnailAlt": mainImage.alt
  }
`;
