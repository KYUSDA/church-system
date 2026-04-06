export function getBasePath() {
  const hostname = window.location.hostname;

  if (hostname.startsWith("blogs.")) {
    return ""; // already inside blog domain
  }

  return "/blogs"; // main domain needs prefix
}
