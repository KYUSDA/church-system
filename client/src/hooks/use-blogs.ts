import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/client";
import {
  getAllBlogsQuery,
  getBlogBySlugQuery,
  getBlogsByCategoryQuery,
  getBlogsByDateQuery,
  getBlogsByTagQuery,
  getRelatedBlogsQuery,
  searchBlogsQuery,
} from "@/services/blogs";

// ─── Query Keys ────────────────────────────────────────────────────────────────
// Centralised key factory — makes invalidation predictable and refactoring safe.
export const blogKeys = {
  all: () => ["blogs"] as const,
  lists: () => [...blogKeys.all(), "list"] as const,
  detail: (slug: string) => [...blogKeys.all(), "detail", slug] as const,
  byCategory: (slug: string) =>
    [...blogKeys.lists(), "category", slug] as const,
  byTag: (tag: string) => [...blogKeys.lists(), "tag", tag] as const,
  search: (search: string) => [...blogKeys.lists(), "search", search] as const,
  related: (categoryId: string, slug: string) =>
    [...blogKeys.all(), "related", categoryId, slug] as const,
  byDate: (date: string) => [...blogKeys.lists(), "date", date] as const,
};

// ─── Types ─────────────────────────────────────────────────────────────────────
export type Blog = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  thumbnail: string;
  thumbnailAlt: string;
  author?: { name: string; email: string };
  category: { _id: string; name: string; slug: { current: string } };
  tags?: string[];
  content: any[];
};

// ─── Fetchers ──────────────────────────────────────────────────────────────────
// Keeping fetch logic outside hooks makes them testable independently.
const fetchAllBlogs = () => client.fetch<Blog[]>(getAllBlogsQuery);
const fetchBlogBySlug = (slug: string) =>
  client.fetch<Blog>(getBlogBySlugQuery, { slug });
const fetchByCategory = (slug: string) =>
  client.fetch<Blog[]>(getBlogsByCategoryQuery, { slug });
const fetchByTag = (tag: string) =>
  client.fetch<Blog[]>(getBlogsByTagQuery, { tag });
const fetchSearch = (search: string) =>
  client.fetch<Blog[]>(searchBlogsQuery, { search });
const fetchRelated = (categoryId: string, slug: string) =>
  client.fetch<Blog[]>(getRelatedBlogsQuery, { categoryId, slug });
const fetchByDate = (datePrefix: string) =>
  client.fetch<Blog[]>(getBlogsByDateQuery, { datePrefix });

// ─── Hooks ─────────────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts.
 * Cached for 5 min, refetches in background when window regains focus.
 */
export function useBlogs() {
  return useQuery({
    queryKey: blogKeys.lists(),
    queryFn: fetchAllBlogs,
    staleTime: 5 * 60 * 1000, // 5 min — good for a blog list that rarely changes
  });
}

/**
 * Fetch a single post by slug.
 * Disabled until a slug is provided.
 */
export function useBlog(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlogBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000, // 10 min — individual posts change even less often
  });
}

/**
 * Fetch posts filtered by category slug.
 */
export function useBlogsByCategory(slug: string) {
  return useQuery({
    queryKey: blogKeys.byCategory(slug),
    queryFn: () => fetchByCategory(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch posts filtered by tag.
 */
export function useBlogsByTag(tag: string) {
  return useQuery({
    queryKey: blogKeys.byTag(tag),
    queryFn: () => fetchByTag(tag),
    enabled: Boolean(tag),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Search blogs with built-in debounce via `enabled`.
 * Pass a debounced value from the component — see note below.
 */
export function useSearchBlogs(search: string) {
  return useQuery({
    queryKey: blogKeys.search(search),
    queryFn: () => fetchSearch(search),
    enabled: search.trim().length > 1, // don't fire on 0–1 chars
    staleTime: 2 * 60 * 1000, // search results stale faster
    placeholderData: (prev) => prev, // keep previous results visible while typing
  });
}

/**
 * Fetch related posts by category, excluding the current post.
 */
export function useRelatedBlogs(categoryId: string, slug: string) {
  return useQuery({
    queryKey: blogKeys.related(categoryId, slug),
    queryFn: () => fetchRelated(categoryId, slug),
    enabled: Boolean(categoryId && slug),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch posts published on a specific calendar date (YYYY-MM-DD).
 * Disabled when date is empty.
 */
export function useBlogsByDate(date: string) {
  return useQuery({
    queryKey: blogKeys.byDate(date),
    queryFn: () => fetchByDate(date),
    enabled: Boolean(date),
    staleTime: 5 * 60 * 1000,
  });
}
